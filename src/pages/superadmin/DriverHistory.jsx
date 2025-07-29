import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getApiAuth } from "../../utils/apiServices";
export default function DriverHistory() {
  const { user, token ,authLoading } = useAuth(); // get the logged-in user
  const [drivers, setDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const VITE_API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  // Fetch drivers when user is ready
  useEffect(() => {
    if (!authLoading && user && user._id) {
      fetchDrivers();
    }
  }, [authLoading, user]);

  const fetchDrivers = async () => {
    try {
      const res = await getApiAuth(`view/driver`)
    //   const res = await axios.get(`${VITE_API}view/driver`,{
    //   headers:{
    //     "Content-Type":"application/json",
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
      console.log("Driver list response:", res.data);

      // Adjust according to actual API response
      const driverList = Array.isArray(res.data.driverData)
        ? res.data.driverData
        : res.data.drivers || [];

      setDrivers(driverList);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setDrivers([]);
    }
  };

  const fetchDriverHistory = async (driverId) => {
    if (!user || !user._id) return;

    setSelectedDriverId(driverId);
    setLoading(true);
    try {
      const res = await getApiAuth(`driverRideHistory/driverId=${driverId}`)
    //   const res = await axios.get(`${VITE_API}driverRideHistory/driverId=${driverId}`,{
    //   headers:{
    //     "Content-Type":"application/json",
    //     Authorization: `Bearer ${token}`,
    //   }
    // });
      console.log("Ride history response:", res.data);
      const rideList = Array.isArray(res.data) ? res.data : res.data.rideHistory || [];
      setHistory(rideList);
    } catch (error) {
      console.error("Error fetching ride history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const driverColumns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Mobile", selector: (row) => row.contact, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <button
          // onClick={() => fetchDriverHistory(row._id)}  // Display on same page 
      // onClick={() => navigate(`/superAdmin/viewDriverHistory?driverId=${row._id}`)}   // Display on the redirected page with specifc ID 
      onClick={() => navigate(`/superAdmin/viewDriverHistory/${row._id}`)}
      // onClick={() => navigate(`/superAdmin/viewDriverHistory`)}
      className="text-blue-600 hover:text-blue-800 cursor-pointer"
      title="View Ride History"
        >
          <FaEye />
        </button>
      ),
    },
  ];

  const historyColumns = [
    { name: "From", selector: (row) => row.from, sortable: true },
    { name: "To", selector: (row) => row.to, sortable: true },
    { name: "Ride Time", selector: (row) => row.rideTime, sortable: true },
    {
      name: "Ride Date/Time",
      selector: (row) =>
        row.rideDateTime ? new Date(row.rideDateTime).toLocaleString() : "N/A",
      sortable: true,
    },
    { name: "Status", selector: (row) => row.rideStatus, sortable: true },
  ];

  const customStyles = {
    table: {
      style: {
        borderRadius: "0.75rem",
        overflow: "hidden",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        fontWeight: "600",
        fontSize: "14px",
        borderBottom: "1px solid #e5e7eb",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
        borderBottom: "1px solid #e5e7eb",
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">Driver List</h1>
        <DataTable
          columns={driverColumns}
          data={drivers}
          pagination
          selectableRows
          highlightOnHover
          pointerOnHover
          striped
          customStyles={customStyles}
          noDataComponent="No drivers found."
        />
      </div>

      {selectedDriverId && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Ride History</h2>
          {loading ? (
            <p className="text-center">Loading ride history...</p>
          ) : history.length === 0 ? (
            <p className="text-center">No ride history found for this driver.</p>
          ) : (
            <DataTable
              columns={historyColumns}
              data={history}
              pagination
              highlightOnHover
              pointerOnHover
              striped
              customStyles={customStyles}
              noDataComponent="No ride history found."
            />
          )}
        </div>
      )}
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import { FaEye } from "react-icons/fa";
// import DataTable from "react-data-table-component";

// export default function DriverHistory() {
//   const [drivers, setDrivers] = useState([]);
//   const [selectedDriverId, setSelectedDriverId] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Dummy driver data
//   const dummyDrivers = Array.from({ length: 10 }).map((_, i) => ({
//     _id: `driver${i + 1}`,
//     name: `Driver ${i + 1}`,
//     email: `driver${i + 1}@example.com`,
//     phoneNumber: `99900000${i + 1}`,
//   }));

//   // Dummy ride history data
//   const dummyRideHistory = Array.from({ length: 10 }).map((_, i) => ({
//     from: `Location ${i + 1}`,
//     to: `Destination ${i + 1}`,
//     rideTime: `${20 + i} mins`,
//     rideDateTime: `2025-07-2${i} 10:${i}0 AM`,
//     rideStatus: i % 2 === 0 ? "Completed" : "Cancelled",
//     driverId: `driver${(i % 10) + 1}`,
//   }));

//   useEffect(() => {
//     setDrivers(dummyDrivers);
//   }, []);

//   const fetchDriverHistory = (driverId) => {
//     setSelectedDriverId(driverId);
//     setLoading(true);
//     setTimeout(() => {
//       const filtered = dummyRideHistory.filter((r) => r.driverId === driverId);
//       setHistory(filtered);
//       setLoading(false);
//     }, 500);
//   };

//   const driverColumns = [
//     { name: "Name", selector: (row) => row.name, sortable: true },
//     { name: "Email", selector: (row) => row.email, sortable: true },
//     { name: "Mobile", selector: (row) => row.phoneNumber, sortable: true },
//     {
//       name: "Action",
//       cell: (row) => (
//         <button
//           onClick={() => fetchDriverHistory(row._id)}
//           className="text-blue-600 hover:text-blue-800"
//           title="View Ride History"
//         >
//           <FaEye />
//         </button>
//       ),
//     },
//   ];

//   const historyColumns = [
//     { name: "From", selector: (row) => row.from, sortable: true },
//     { name: "To", selector: (row) => row.to, sortable: true },
//     { name: "Ride Time", selector: (row) => row.rideTime, sortable: true },
//     { name: "Ride Date/Time", selector: (row) => row.rideDateTime, sortable: true },
//     { name: "Status", selector: (row) => row.rideStatus, sortable: true },
//   ];

//   const customStyles = {
//     table: {
//       style: {
//         borderRadius: "0.75rem",
//         overflow: "hidden",
//       },
//     },
//     headRow: {
//       style: {
//         backgroundColor: "#f9fafb",
//         fontWeight: "600",
//         fontSize: "14px",
//         borderBottom: "1px solid #e5e7eb",
//       },
//     },
//     rows: {
//       style: {
//         minHeight: "60px",
//         borderBottom: "1px solid #e5e7eb",
//         "&:hover": {
//           backgroundColor: "#f9fafb",
//         },
//       },
//     },
//     headCells: {
//       style: {
//         fontSize: "14px",
//       },
//     },
//     cells: {
//       style: {
//         fontSize: "14px",
//       },
//     },
//   };

//   return (
//     <div className="p-6 flex flex-col gap-2">
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
//         <h1 className="text-2xl font-bold mb-4">Driver List</h1>
//         <DataTable
//           columns={driverColumns}
//           data={drivers}
//           pagination
//           selectableRows
//           highlightOnHover
//           pointerOnHover
//           striped
//           customStyles={customStyles}
//           noDataComponent="No drivers found."
//         />
//       </div>

//       {selectedDriverId && (
//         <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mt-4">
//           <h2 className="text-xl font-semibold mb-2">Ride History</h2>
//           {loading ? (
//             <p className="text-center">Loading ride history...</p>
//           ) : history.length === 0 ? (
//             <p className="text-center">No ride history found for this driver.</p>
//           ) : (
//             <DataTable
//               columns={historyColumns}
//               data={history}
//               pagination
//               selectableRows
//               highlightOnHover
//               pointerOnHover
//               striped
//               customStyles={customStyles}
//               noDataComponent="No ride history found."
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext"; // adjust the path
// import globalTableStyles from '../../styles/globalTableStyles'; // adjust path


// export default function DriverHistory() {
//   const { user, authLoading } = useAuth(); // 👈 get the logged-in user
//   const [drivers, setDrivers] = useState([]);
//   const [selectedDriverId, setSelectedDriverId] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const VITE_API = import.meta.env.VITE_API;

//   // Fetch all drivers on page load
//   // useEffect(() => {
//   //   const fetchDrivers = async () => {
//   //     try {
//   //       const res = await axios.get(`${VITE_API}view/driver/${user.id}`);
//   //       setDrivers(res.data);
//   //     } catch (err) {
//   //       console.error("Error fetching drivers:", err);
//   //     }
//   //   };
//   //   fetchDrivers();
//   // }, []);
// //   useEffect(() => {
// //   if (!user) return; 

// //   const fetchDrivers = async () => {
// //     try {
// //       const res = await axios.get(`${VITE_API}view/driver/${user.id}`);
// //       setDrivers(res.data);
// //     } catch (err) {
// //       console.error("Error fetching drivers:", err);
// //     }
// //   };

// //   fetchDrivers();
// // }, [user]);
// useEffect(() => {
//   if (authLoading || !user || !user._id) return;

//  const fetchDrivers = async () => {
//   try {
//     const res = await axios.get(`${VITE_API}view/driver/${user._id}`);
//     console.log("Driver data:", res.data);

//     // If API returns { data: [...] }, use:
//     // setDrivers(Array.isArray(res.data) ? res.data : res.data.data || []);
//     setDrivers(Array.isArray(res.data.driverData) ? res.data.driverData : []);

//   } catch (err) {
//     console.error("Error fetching drivers:", err);
//     setDrivers([]); // fallback to empty array to avoid crash
//   }
// };


//   fetchDrivers();
// }, [user, authLoading]);


//   // Fetch ride history for selected driver
//   // const fetchDriverHistory = async (driverId) => {
//   //   setSelectedDriverId(driverId);
//   //   setLoading(true);
//   //   try {
//   //     const res = await axios.get(`${VITE_API}/driverRideHistory/${user.id}?driverId=${driverId}`);
//   //     setHistory(res.data);
//   //   } catch (err) {
//   //     console.error("Error fetching ride history:", err);
//   //     setHistory([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
// const fetchDriverHistory = async (driverId) => {
//   if (!user) return;

//   setSelectedDriverId(driverId);
//   setLoading(true);

//   try {
//     const res = await axios.get(`${VITE_API}driverRideHistory/${user._id}?driverId=${driverId}`);
//     setHistory(res.data);
//   } catch (err) {
//     console.error("Error fetching ride history:", err);
//     setHistory([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Driver List</h1>

//       {/* Driver Table */}
//       <div className="overflow-x-auto mb-8">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-gray-100 text-sm font-semibold">
//             <tr>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">Mobile</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {drivers.map((driver) => (
//               <tr key={driver._id} className="text-sm text-gray-700">
//                 <td className="p-2 border">{driver.name}</td>
//                 <td className="p-2 border">{driver.email}</td>
//                 <td className="p-2 border">{driver.phoneNumber}</td>
//                 <td className="p-2 border text-center">
//                   <button
//                     onClick={() => fetchDriverHistory(driver._id)}
//                     className="text-blue-600 hover:text-blue-800"
//                     title="View Ride History"
//                   >
//                     <FaEye />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Ride History */}
//       {selectedDriverId && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Ride History</h2>
//           {loading ? (
//             <p>Loading ride history...</p>
//           ) : history.length === 0 ? (
//             <p>No ride history found for this driver.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border border-gray-300">
//                 <thead className="bg-gray-200 text-sm font-semibold">
//                   <tr>
//                     <th className="p-2 border">From</th>
//                     <th className="p-2 border">To</th>
//                     <th className="p-2 border">Ride Time</th>
//                     <th className="p-2 border">Ride Date/Time</th>
//                     <th className="p-2 border">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {history.map((ride, index) => (
//                     <tr key={index} className="text-sm">
//                       <td className="p-2 border">{ride.from}</td>
//                       <td className="p-2 border">{ride.to}</td>
//                       <td className="p-2 border">{ride.rideTime}</td>
//                       <td className="p-2 border">{ride.rideDateTime}</td>
//                       <td className="p-2 border">{ride.rideStatus}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";

// export default function DriverHistory() {
//   const { driverId } = useParams();
//   const [history, setHistory] = useState([]);
//   const [driverInfo, setDriverInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     const fetchDriverHistory = async () => {
//       try {
//         // Fetch driver details
//         const driverRes = await axios.get(`${VITE_API}view/driver`);
//         setDriverInfo(driverRes.data);
//         // Fetch ride history
//         const historyRes = await axios.get(`${VITE_API}/driverRideHistory?driverId=${driverId}`);
//         setHistory(historyRes.data);
//       } catch (error) {
//         console.error("Error fetching driver history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDriverHistory();
//   }, [driverId]);

//   return (
//     <div className="p-6">
//       <Link to="/driverHistory" className="text-blue-600 underline mb-4 inline-block">
//         ← Back to Drivers
//       </Link>

//       <h1 className="text-2xl font-bold mb-2">Driver History</h1>

//       {driverInfo && (
//         <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
//           <p><strong>Id:</strong> {driverInfo._id}</p>
//           <p><strong>From:</strong> {driverInfo.from}</p>
//           <p><strong>To:</strong> {driverInfo.to}</p>
//           <p><strong>RideTime:</strong> {driverInfo.rideTime}</p>
//           <p><strong>Email:</strong> {driverInfo.email}</p>
//           <p><strong>RideDateTime:</strong> {driverInfo.rideDateTime}</p>
//           <p><strong>RideStatus:</strong> {driverInfo.rideStatus}</p>
//         </div>
//       )}

//       {loading ? (
//         <p>Loading...</p>
//       ) : history.length === 0 ? (
//         <p>No ride history found for this driver.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead className="bg-gray-200 text-sm font-semibold">
//               <tr>
//                 <th className="p-2 border">Id</th>
//                 <th className="p-2 border">From</th>
//                 <th className="p-2 border">To</th>
//                 <th className="p-2 border">RideTime</th>
//                 <th className="p-2 border">Email</th>
//                 <th className="p-2 border">RideDateTime</th>
//                 <th className="p-2 border">Ride Status</th>

//               </tr>
//             </thead>
//             <tbody>
//               {history.map((ride, index) => (
//                 <tr key={index} className="text-sm text-gray-700">
//                   {/* <td className="p-2 border">{new Date(ride.date).toLocaleDateString()}</td> */}
//                   <td className="p-2 border">{ride._id}</td>
//                   <td className="p-2 border">{ride.from}</td>
//                   <td className="p-2 border">{ride.to}</td>
//                   <td className="p-2 border">{ride.rideTime}</td>
//                   <td className="p-2 border">₹{ride.email}</td>
//                   <td className="p-2 border">₹{ride.rideDateTime}</td>
//                   <td className="p-2 border">₹{ride.rideStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
