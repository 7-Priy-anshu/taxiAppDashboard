import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
export default function ClientDetails() {
  const {token} = useAuth();
  const { clientId } = useParams();
  const VITE_API = import.meta.env.VITE_API; // Fallback for testing

  const [client, setClient] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [hubs, setHubs] = useState([]);
  const [rideCounts, setRideCounts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clientId) {
      console.log("No clientId provided");
      return;
    }
    console.log("clientId:", clientId);

    async function fetchData() {
      try {
        const [clientRes] = await Promise.all([
          axios.get(`${VITE_API}view/client/${clientId}`,{
      headers:{
        "Content-Type":"json/application",
        Authorization: `Bearer ${token}`,
      }
    }),
          // axios.get(`${VITE_API}view/driver/client/${clientId}`), // Uncomment and adjust
          // axios.get(`${VITE_API}view/customer/client/${clientId}`),
          // axios.get(`${VITE_API}view/car/client/${clientId}`),
          // axios.get(`${VITE_API}view/hub/client/${clientId}`),
          // axios.get(`${VITE_API}view/ride/summary/client/${clientId}?month=07&year=2025`),
        ]);

        console.log("Client Response", clientRes.data);
        setClient(clientRes.data);
      } catch (err) {
        console.error("Error loading client details:", err.message);
        setError(err.message);
      }
    }

    fetchData();
  }, [clientId, VITE_API]);

  // Debug state
  console.log("Client State", client);

  if (!client && !error) {
    return <div className="p-4 text-center text-gray-600">Loading client details…</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        Company Details – {client?.clientName || "Unknown Client"}
      </h1>

      {/* Basic Info */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Basic Information</h2>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/superAdmin/client/:clientId/clientInvoice">
            <Button text="View Invoice"/>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div><strong className="text-gray-900">ID:</strong> {clientId}</div>
          <div><strong className="text-gray-900">Registered:</strong> {client?.createdAt?.split("T")[0] || "N/A"}</div>
          <div><strong className="text-gray-900">Client Name:</strong> {client?.clientName || "N/A"}</div>
          <div><strong className="text-gray-900">Email:</strong> {client?.clientEmail || "N/A"}</div>
          <div><strong className="text-gray-900">Phone:</strong> {client?.clientPhone || "N/A"}</div>
          <div className="sm:col-span-2"><strong className="text-gray-900">Address:</strong> {client?.address || "N/A"}</div>
        </div>
      </div>

      {/* Resource Summary */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div><strong className="text-gray-900">Drivers:</strong> {drivers.length} – <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500 hover:underline">View</Link></div>
          <div><strong className="text-gray-900">Customers:</strong> {customers.length} – <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500 hover:underline">View</Link></div>
          <div><strong className="text-gray-900">Cars:</strong> {cars.length} – <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500 hover:underline">View</Link></div>
          <div><strong className="text-gray-900">Hubs:</strong> {hubs.length} – {/* Add manage hubs link if needed */}</div>
        </div>
      </div>

      {/* Ride Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Employee Rides (July 2025)</h2>
        {Object.keys(rideCounts).length === 0 ? (
          <p className="text-gray-500">No ride data available.</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-gray-700 font-medium">Employee ID</th>
                <th className="p-2 border text-gray-700 font-medium">Name</th>
                <th className="p-2 border text-gray-700 font-medium">Rides</th>
                <th className="p-2 border text-gray-700 font-medium">Car Used</th>
                <th className="p-2 border text-gray-700 font-medium">Approved By</th>
                <th className="p-2 border text-gray-700 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rideCounts).map(([empId, data]) => (
                <tr key={empId} className="hover:bg-gray-100 transition-colors">
                  <td className="p-2 border text-gray-600">{empId}</td>
                  <td className="p-2 border text-gray-600">{data.name || "–"}</td>
                  <td className="p-2 border text-gray-600">{data.totalRides || 0}</td>
                  <td className="p-2 border text-gray-600">{data.car || "–"}</td>
                  <td className="p-2 border text-gray-600">{data.approvedBy || "–"}</td>
                  <td className="p-2 border text-gray-600">{data.status || "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// // src/pages/superadmin/ClientDetails.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// export default function ClientDetails() {
//   const { clientId } = useParams();
//   const VITE_API = import.meta.env.VITE_API;

//   const [client, setClient] = useState(null);
//   const [drivers, setDrivers] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [hubs, setHubs] = useState([]);
//   const [rideCounts, setRideCounts] = useState({});

//   useEffect(() => {
//     if (!clientId) return;

//     async function fetchData() {
//       try {
//         const [
//           clientRes,
//           driversRes,
//           customersRes,
//           carsRes,
//           hubsRes,
//           ridesRes
//         ] = await Promise.all([
//           axios.get(`${VITE_API}view/client/${clientId}`),
//           axios.get(`${VITE_API}view/driver/client/${clientId}`),
//           axios.get(`${VITE_API}view/customer/client/${clientId}`),
//           axios.get(`${VITE_API}view/car/client/${clientId}`),
//           axios.get(`${VITE_API}view/hub/client/${clientId}`),
//           // axios.get(`${VITE_API}ride/summary/client/${clientId}?month=07&year=2025`)
//         ]);
 
//         console.log("Client",clientRes.data.client)
//         console.log("Drivers",driversRes.data.drivers )
//         console.log("Customers",customersRes.data.customers)
//         console.log("Cars",carsRes.data.cars)
//         console.log("Hubs",hubsRes.data.hubs)
//         console.log("Rides",ridesRes.data.rideCounts)
//         setClient(clientRes.data.client);
//         setDrivers(driversRes.data.drivers || []);
//         setCustomers(customersRes.data.customers || []);
//         setCars(carsRes.data.cars || []);
//         setHubs(hubsRes.data.hubs || []);
//         // setRideCounts(ridesRes.data.rideCounts || {});
//       } catch (err) {
//         console.error("Error loading client details:", err);
//       }
//     }

//     fetchData();
//   }, [clientId]);

//   if (!client) {
//     return <div className="p-4">Loading client details…</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         Company Details – {client.clientName}
//       </h1>

//       {/* Basic Info */}
//       <div className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <div><strong>ID:</strong> {clientId}</div>
//           <div><strong>Registered:</strong> {client.createdAt?.split("T")[0]}</div>
//           <div><strong>Contact:</strong> {client.contactPerson}</div>
//           <div><strong>Email:</strong> {client.email}</div>
//           <div><strong>Phone:</strong> {client.phone}</div>
//           <div className="sm:col-span-2"><strong>Address:</strong> {client.address}</div>
//         </div>
//       </div>

//       {/* Resource Summary */}
//       <div className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Resources</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <div><strong>Drivers:</strong> {drivers.length} – <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500">View</Link></div>
//           <div><strong>Customers:</strong> {customers.length} – <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500">View</Link></div>
//           <div><strong>Cars:</strong> {cars.length} – <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500">View</Link></div>
//           <div><strong>Hubs:</strong> {hubs.length} – {/* manage hubs link if needed */}</div>
//         </div>
//       </div>

//       {/* Ride Summary */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Employee Rides (July 2025)</h2>

//         {Object.keys(rideCounts).length === 0 ? (
//           <p className="text-gray-500">No ride data.</p>
//         ) : (
//           <table className="min-w-full border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2">Employee ID</th>
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Rides</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(rideCounts).map(([empId, data]) => (
//                 <tr key={empId}>
//                   <td className="p-2 border">{empId}</td>
//                   <td className="p-2 border">{data.name}</td>
//                   <td className="p-2 border">{data.totalRides}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// export default function ClientDetails() {
//   const { clientId } = useParams();
//   const API = import.meta.env.VITE_API;

//   const [client, setClient] = useState(null);
//   const [drivers, setDrivers] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [hubs, setHubs] = useState([]);
//   const [rideCounts, setRideCounts] = useState({});

//   // Fetch client data
//   useEffect(() => {
//     if (!clientId) return;

//     const fetchData = async () => {
//       try {
//         const [
//           clientRes,
//           driversRes,
//           customersRes,
//           carsRes,
//           hubsRes,
//           ridesRes
//         ] = await Promise.all([
//           axios.get(`${API}client/${clientId}`),
//           axios.get(`${API}driver/client/${clientId}`),
//           axios.get(`${API}customer/client/${clientId}`),
//           axios.get(`${API}car/client/${clientId}`),
//           axios.get(`${API}hub/client/${clientId}`),
//           axios.get(`${API}ride/summary/client/${clientId}?month=07&year=2025`)
//         ]);

//         setClient(clientRes.data.client || {});
//         setDrivers(driversRes.data.drivers || []);
//         setCustomers(customersRes.data.customers || []);
//         setCars(carsRes.data.cars || []);
//         setHubs(hubsRes.data.hubs || []);
//         setRideCounts(ridesRes.data.rideCounts || {});
//       } catch (err) {
//         console.error("Error loading client details:", err);
//       }
//     };

//     fetchData();
//   }, [clientId]);

//   if (!client) {
//     return <div className="p-4">Loading client details...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left text-gray-800">
//         Company Details - {client.clientName || "N/A"}
//       </h1>

//       {/* Basic Info */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Company ID:</strong> {clientId}</p>
//           <p><strong className="text-gray-900">Registration Date:</strong> {client.createdAt?.split("T")[0]}</p>
//           <p><strong className="text-gray-900">Contact Name:</strong> {client.contactPerson || "N/A"}</p>
//           <p><strong className="text-gray-900">Email:</strong> {client.email}</p>
//           <p><strong className="text-gray-900">Phone:</strong> {client.phone}</p>
//           <p className="sm:col-span-2"><strong className="text-gray-900">Address:</strong> {client.address}</p>
//         </div>
//       </div>

//       {/* Resources */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Resources</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Total Drivers:</strong> {drivers.length}</p>
//           <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500 hover:underline">View Drivers</Link>
//           <p><strong className="text-gray-900">Total Customers:</strong> {customers.length}</p>
//           <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500 hover:underline">View Customers</Link>
//           <p><strong className="text-gray-900">Total Cars:</strong> {cars.length}</p>
//           <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500 hover:underline">View Cars</Link>
//           <p><strong className="text-gray-900">Total Hubs:</strong> {hubs.length}</p>
//           <Link to="/superadmin/addHub" className="text-blue-500 hover:underline">Manage Hubs</Link>
//         </div>
//       </div>

//       {/* Employee Ride Summary */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Employee Rides (July 2025)</h2>
//         {Object.keys(rideCounts).length === 0 ? (
//           <p className="text-gray-500">No ride data available.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="py-2 px-4 border">Employee ID</th>
//                   <th className="py-2 px-4 border">Name</th>
//                   <th className="py-2 px-4 border">Rides</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(rideCounts).map(([empId, data]) => (
//                   <tr key={empId}>
//                     <td className="py-2 px-4 border">{empId}</td>
//                     <td className="py-2 px-4 border">{data.name || "N/A"}</td>
//                     <td className="py-2 px-4 border">{data.totalRides}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// // src/pages/superadmin/ClientDetails.jsx
// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";

// export default function ClientDetails() {
//   const { clientId } = useParams();

//   const initialEmployees = [
//     { id: "EMP001", name: "Alice Smith" },
//     { id: "EMP002", name: "Bob Johnson" },
//     { id: "EMP003", name: "Charlie Brown" },
//     { id: "EMP004", name: "David Lee" },
//     { id: "EMP005", name: "Eva Green" },
//     { id: "EMP006", name: "Frank Wright" },
//     { id: "EMP007", name: "Grace Hopper" },
//     { id: "EMP008", name: "Henry Ford" },
//     { id: "EMP009", name: "Isla Fisher" },
//     { id: "EMP010", name: "Jack Ryan" },
//   ];

//   const initialRides = {
//     EMP001: 8,
//     EMP002: 12,
//     EMP003: 5,
//     EMP004: 7,
//     EMP005: 10,
//     EMP006: 6,
//     EMP007: 9,
//     EMP008: 4,
//     EMP009: 11,
//     EMP010: 3,
//   };

//   const [employees, setEmployees] = useState(initialEmployees);
//   const [rideCounts, setRideCounts] = useState(initialRides);

//   const handleAddEmployee = () => {
//     const newId = `EMP${(employees.length + 1).toString().padStart(3, "0")}`;
//     const newName = `Employee ${employees.length + 1}`;
//     const randomRides = Math.floor(Math.random() * 15) + 1;

//     const newEmployee = { id: newId, name: newName };
//     setEmployees((prev) => [...prev, newEmployee]);
//     setRideCounts((prev) => ({ ...prev, [newId]: randomRides }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left text-gray-800">
//         Company Details - Alpha Tech Solutions
//       </h1>

//       {/* Basic Info */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Company ID:</strong> {clientId || "CLT123"}</p>
//           <p><strong className="text-gray-900">Registration Date:</strong> 2023-05-15</p>
//           <p><strong className="text-gray-900">Contact Name:</strong> John Doe</p>
//           <p><strong className="text-gray-900">Email:</strong> john.doe@alphatech.com</p>
//           <p><strong className="text-gray-900">Phone:</strong> +91-9876543210</p>
//           <p className="sm:col-span-2"><strong className="text-gray-900">Address:</strong> 123 Business Park, Mumbai, India</p>
//         </div>
//       </div>

//       {/* Resources */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Resources</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Total Drivers:</strong> 15</p>
//           <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500 hover:underline">View Drivers</Link>
//           <p><strong className="text-gray-900">Total Customers:</strong> 50</p>
//           <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500 hover:underline">View Customers</Link>
//           <p><strong className="text-gray-900">Total Cars:</strong> 10</p>
//           <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500 hover:underline">View Cars</Link>
//           <p><strong className="text-gray-900">Total Hubs:</strong> 2</p>
//           <Link to="/superadmin/addHub" className="text-blue-500 hover:underline">Manage Hubs</Link>
//         </div>
//       </div>

//       {/* Employee List */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Employees</h2>
//           <button
//             onClick={handleAddEmployee}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             + Add Employee
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border">ID</th>
//                 <th className="py-2 px-4 border">Name</th>
//                 <th className="py-2 px-4 border">Rides (July 2025)</th>
//                 <th className="py-2 px-4 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <tr key={emp.id}>
//                   <td className="py-2 px-4 border">{emp.id}</td>
//                   <td className="py-2 px-4 border">{emp.name}</td>
//                   <td className="py-2 px-4 border">{rideCounts[emp.id] || 0}</td>
//                   <td className="py-2 px-4 border">
//                     <Link
//                       to={`/superadmin/client/${clientId}/employee/${emp.id}`}
//                       className="text-blue-600 hover:underline"
//                     >
//                       View Details
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// export default function ClientDetails() {
//   const { clientId } = useParams();

//   const initialEmployees = [
//     { id: "EMP001", name: "Alice Smith" },
//     { id: "EMP002", name: "Bob Johnson" },
//     { id: "EMP003", name: "Charlie Brown" },
//     { id: "EMP004", name: "David Lee" },
//     { id: "EMP005", name: "Eva Green" },
//     { id: "EMP006", name: "Frank Wright" },
//     { id: "EMP007", name: "Grace Hopper" },
//     { id: "EMP008", name: "Henry Ford" },
//     { id: "EMP009", name: "Isla Fisher" },
//     { id: "EMP010", name: "Jack Ryan" },
//   ];

//   const initialRides = {
//     EMP001: 8,
//     EMP002: 12,
//     EMP003: 5,
//     EMP004: 7,
//     EMP005: 10,
//     EMP006: 6,
//     EMP007: 9,
//     EMP008: 4,
//     EMP009: 11,
//     EMP010: 3,
//   };

//   const [employees, setEmployees] = useState(initialEmployees);
//   const [rideCounts, setRideCounts] = useState(initialRides);
//   const [selectedEmployee, setSelectedEmployee] = useState("EMP001");
//   const [rideCount, setRideCount] = useState(initialRides["EMP001"]);

//   const handleEmployeeChange = (e) => {
//     const selectedId = e.target.value;
//     setSelectedEmployee(selectedId);
//     setRideCount(rideCounts[selectedId] || 0);
//   };

//   const handleAddEmployee = () => {
//     const newId = `EMP${(employees.length + 1).toString().padStart(3, "0")}`;
//     const newName = `Employee ${employees.length + 1}`;
//     const randomRides = Math.floor(Math.random() * 15) + 1;

//     const newEmployee = { id: newId, name: newName };
//     setEmployees((prev) => [...prev, newEmployee]);
//     setRideCounts((prev) => ({ ...prev, [newId]: randomRides }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left text-gray-800">
//         Company Details - Alpha Tech Solutions
//       </h1>

//       {/* Basic Info */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Company ID:</strong> {clientId || "CLT123"}</p>
//           <p><strong className="text-gray-900">Registration Date:</strong> 2023-05-15</p>
//           <p><strong className="text-gray-900">Contact Name:</strong> John Doe</p>
//           <p><strong className="text-gray-900">Email:</strong> john.doe@alphatech.com</p>
//           <p><strong className="text-gray-900">Phone:</strong> +91-9876543210</p>
//           <p className="sm:col-span-2"><strong className="text-gray-900">Address:</strong> 123 Business Park, Mumbai, India</p>
//         </div>
//       </div>

//       {/* Resources */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Resources</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Total Drivers:</strong> 15</p>
//           <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500 hover:underline">View Drivers</Link>
//           <p><strong className="text-gray-900">Total Customers:</strong> 50</p>
//           <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500 hover:underline">View Customers</Link>
//           <p><strong className="text-gray-900">Total Cars:</strong> 10</p>
//           <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500 hover:underline">View Cars</Link>
//           <p><strong className="text-gray-900">Total Hubs:</strong> 2</p>
//           <Link to="/superadmin/addHub" className="text-blue-500 hover:underline">Manage Hubs</Link>
//         </div>
//       </div>

//       {/* Employee Ride Usage */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Employee Ride Usage (July 2025)</h2>
//           <button
//             onClick={handleAddEmployee}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             + Add Employee
//           </button>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
//           <select
//             value={selectedEmployee}
//             onChange={handleEmployeeChange}
//             className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//           >
//             <option value="">Select an Employee</option>
//             {employees.map((emp) => (
//               <option key={emp.id} value={emp.id}>
//                 {emp.name}
//               </option>
//             ))}
//           </select>
//           <p className="text-lg font-medium text-gray-700">
//             Rides Used: <span className="text-blue-600 font-bold">{rideCount}</span>
//           </p>
//         </div>
//         {/* Employee Ride Usage */}
// <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//   <div className="flex justify-between items-center mb-4">
//     <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Employees</h2>
//   </div>

//   <div className="overflow-x-auto">
//     <table className="min-w-full border border-gray-200">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="py-2 px-4 border">ID</th>
//           <th className="py-2 px-4 border">Name</th>
//           <th className="py-2 px-4 border">Rides (July 2025)</th>
//           <th className="py-2 px-4 border">Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {employees.map((emp) => (
//           <tr key={emp.id}>
//             <td className="py-2 px-4 border">{emp.id}</td>
//             <td className="py-2 px-4 border">{emp.name}</td>
//             <td className="py-2 px-4 border">{rideCounts[emp.id] || 0}</td>
//             <td className="py-2 px-4 border">
//               <Link
//                 to={`/superadmin/employee/${emp.id}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 View Details
//               </Link>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// export default function ClientDetails() {
//   const { clientId } = useParams();
//   const [selectedEmployee, setSelectedEmployee] = useState("EMP001"); // Default to first employee
//   const [rideCount, setRideCount] = useState(8); // Initial ride count

//   const handleEmployeeChange = (e) => {
//     const selectedId = e.target.value;
//     setSelectedEmployee(selectedId);
//     const rideCounts = {
//       EMP001: 8,
//       EMP002: 12,
//       EMP003: 5,
//     };
//     setRideCount(rideCounts[selectedId] || 0);
//   };

//   const clientData = {
//     _id: clientId || "CLT123",
//     clientName: "Alpha Tech Solutions",
//     createdAt: "2023-05-15",
//     contactName: "John Doe",
//     email: "john.doe@alphatech.com",
//     phone: "+91-9876543210",
//     address: "123 Business Park, Mumbai, India",
//     driverCount: 15,
//     customerCount: 50,
//     carCount: 10,
//     hubCount: 2,
//     totalRides: 120,
//     activeRides: 5,
//     revenue: "$15,000",
//     employees: [
//       { id: "EMP001", name: "Alice Smith" },
//       { id: "EMP002", name: "Bob Johnson" },
//       { id: "EMP003", name: "Charlie Brown" },
//     ],
//     admins: [
//       { id: "ADM001", name: "Admin A", createdAt: "2025-06-01" },
//       { id: "ADM002", name: "Admin B", createdAt: "2025-07-01" },
//     ],
//     hr: [
//       { id: "HR001", name: "HR Officer C", createdAt: "2025-06-15" },
//       { id: "HR002", name: "HR Officer D", createdAt: "2025-07-10" },
//     ],
//   };

//   const chartData = {
//     labels: clientData.employees.map((e) => e.name),
//     datasets: [
//       {
//         label: "Rides in July 2025",
//         data: [8, 12, 5],
//         backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
//         borderColor: ["#1E40AF", "#065F46", "#D97706"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Number of Rides",
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: "Employees",
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left text-gray-800">
//         Company Details - {clientData.clientName}
//       </h1>

//       {/* Basic Information */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Company Name:</strong> {clientData.clientName}</p>
//           <p><strong className="text-gray-900">Company ID:</strong> {clientData._id}</p>
//           <p><strong className="text-gray-900">Registration Date:</strong> {clientData.createdAt}</p>
//           <p><strong className="text-gray-900">Contact Name:</strong> {clientData.contactName}</p>
//           <p><strong className="text-gray-900">Email:</strong> {clientData.email}</p>
//           <p><strong className="text-gray-900">Phone:</strong> {clientData.phone}</p>
//           <p className="sm:col-span-2"><strong className="text-gray-900">Address:</strong> {clientData.address}</p>
//         </div>
//       </div>

//       {/* Resources */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Resources</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Total Drivers:</strong> {clientData.driverCount}</p>
//           <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500 hover:underline">
//             View Drivers
//           </Link>
//           <p><strong className="text-gray-900">Total Customers:</strong> {clientData.customerCount}</p>
//           <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500 hover:underline">
//             View Customers
//           </Link>
//           <p><strong className="text-gray-900">Total Cars:</strong> {clientData.carCount}</p>
//           <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500 hover:underline">
//             View Cars
//           </Link>
//           <p><strong className="text-gray-900">Total Hubs:</strong> {clientData.hubCount}</p>
//           <Link to="/superadmin/addHub" className="text-blue-500 hover:underline">
//             Manage Hubs
//           </Link>
//         </div>
//       </div>

//       {/* Employee Ride Usage */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Employee Ride Usage (July 2025)</h2>
//         <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
//           <select
//             value={selectedEmployee}
//             onChange={handleEmployeeChange}
//             className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//           >
//             <option value="">Select an Employee</option>
//             {clientData.employees.map((emp) => (
//               <option key={emp.id} value={emp.id} className="text-gray-700">
//                 {emp.name}
//               </option>
//             ))}
//           </select>
//           <p className="text-lg font-medium text-gray-700">
//             Rides Used: <span className="text-blue-600 font-bold">{rideCount}</span>
//           </p>
//         </div>
//         <div className="w-full h-64">
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";

// export default function ClientDetails() {
//   const { clientId } = useParams();
//   const [clientData, setClientData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [rideCount, setRideCount] = useState(0);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const dummyClientData = {
//       _id: clientId || "CLT123",
//       clientName: "Alpha Tech Solutions",
//       createdAt: "2023-05-15",
//       contactName: "John Doe",
//       email: "john.doe@alphatech.com",
//       phone: "+91-9876543210",
//       address: "123 Business Park, Mumbai, India",
//       driverCount: 15,
//       customerCount: 50,
//       carCount: 10,
//       hubCount: 2,
//       totalRides: 120,
//       activeRides: 5,
//       revenue: "$15,000",
//       employees: [
//         { id: "EMP001", name: "Alice Smith" },
//         { id: "EMP002", name: "Bob Johnson" },
//         { id: "EMP003", name: "Charlie Brown" },
//       ],
//       admins: [
//         { id: "ADM001", name: "Admin A", createdAt: "2025-06-01" },
//         { id: "ADM002", name: "Admin B", createdAt: "2025-07-01" },
//       ],
//       hr: [
//         { id: "HR001", name: "HR Officer C", createdAt: "2025-06-15" },
//         { id: "HR002", name: "HR Officer D", createdAt: "2025-07-10" },
//       ],
//     };

//     const calculateRideCount = (employeeId) => {
//       const rideData = {
//         EMP001: 8,
//         EMP002: 12,
//         EMP003: 5,
//       };
//       return rideData[employeeId] || 0;
//     };

//     setTimeout(() => {
//       setClientData(dummyClientData);
//       setRideCount(calculateRideCount(dummyClientData.employees[0]?.id));
//       setLoading(false);
//     }, 1000);
//   }, [clientId]);

//   const handleEmployeeChange = (e) => {
//     const selectedId = e.target.value;
//     setSelectedEmployee(selectedId);
//     const count = clientData.employees.find(emp => emp.id === selectedId)
//       ? calculateRideCount(selectedId)
//       : 0;
//     setRideCount(count);
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen"><div className="loader"></div></div>;
//   if (error) return <p>Error loading client data: {error}</p>;
//   if (!clientData) return <p>No client data found.</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
//         Company Details - {clientData.clientName}
//       </h1>

//       {/* Basic Information */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <p><strong>Company Name:</strong> {clientData.clientName}</p>
//           <p><strong>Company ID:</strong> {clientData._id}</p>
//           <p><strong>Registration Date:</strong> {clientData.createdAt}</p>
//           <p><strong>Contact Name:</strong> {clientData.contactName}</p>
//           <p><strong>Email:</strong> {clientData.email}</p>
//           <p><strong>Phone:</strong> {clientData.phone}</p>
//           <p className="sm:col-span-2"><strong>Address:</strong> {clientData.address}</p>
//         </div>
//       </div>

//       {/* Resources */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Resources</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <p><strong>Total Drivers:</strong> {clientData.driverCount}</p>
//           <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500 hover:underline">
//             View Drivers
//           </Link>
//           <p><strong>Total Customers:</strong> {clientData.customerCount}</p>
//           <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500 hover:underline">
//             View Customers
//           </Link>
//           <p><strong>Total Cars:</strong> {clientData.carCount}</p>
//           <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500 hover:underline">
//             View Cars
//           </Link>
//           <p><strong>Total Hubs:</strong> {clientData.hubCount}</p>
//           <Link to="/superadmin/addHub" className="text-blue-500 hover:underline">
//             Manage Hubs
//           </Link>
//         </div>
//       </div>

//       {/* Employee Ride Count */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Employee Ride Usage (This Month)</h2>
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           <select
//             value={selectedEmployee}
//             onChange={handleEmployeeChange}
//             className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select an Employee</option>
//             {clientData.employees.map((emp) => (
//               <option key={emp.id} value={emp.id}>
//                 {emp.name}
//               </option>
//             ))}
//           </select>
//           <p className="text-lg font-medium">
//             Rides Used: <span className="text-blue-600">{rideCount}</span>
//           </p>
//         </div>
//       </div>

//       {/* Admins and HR */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Created Users</h2>
//         <div className="space-y-4">
//           {/* Admins */}
//           <div>
//             <h3 className="text-lg font-medium mb-2">Admins</h3>
//             <ul className="list-disc pl-5">
//               {clientData.admins.map((admin) => (
//                 <li key={admin.id} className="hover:bg-gray-100 p-1 rounded transition">
//                   {admin.name} (Created: {admin.createdAt})
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {/* HR */}
//           <div>
//             <h3 className="text-lg font-medium mb-2">HR Officers</h3>
//             <ul className="list-disc pl-5">
//               {clientData.hr.map((hr) => (
//                 <li key={hr.id} className="hover:bg-gray-100 p-1 rounded transition">
//                   {hr.name} (Created: {hr.createdAt})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Ride Statistics */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Ride Statistics</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <p><strong>Total Rides Booked:</strong> {clientData.totalRides}</p>
//           <p><strong>Active Rides:</strong> {clientData.activeRides}</p>
//           <p><strong>Revenue:</strong> {clientData.revenue}</p>
//         </div>
//         <Link to={`/superadmin/client/${clientId}/bookRide`} className="text-blue-500 hover:underline mt-4 inline-block">
//           View Recent Bookings
//         </Link>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function ClientDetails() {
//   const { clientId } = useParams();
//   const [clientData, setClientData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     const fetchClientDetails = async () => {
//       try {
//         const res = await axios.get(`${VITE_API}view/client/${clientId}`);
//         console.log("Client details:", res.data);
//         setClientData(res.data); // Assuming res.data contains company details
//       } catch (err) {
//         console.error("Error fetching client details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientDetails();
//   }, [clientId]);

//   if (loading) return <p>Loading client details...</p>;
//   if (!clientData) return <p>No client data found.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Company Details - {clientData.clientName}</h1>

//       {/* Basic Information */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
//         <p><strong>Company Name:</strong> {clientData.clientName}</p>
//         <p><strong>Company ID:</strong> {clientData._id}</p>
//         <p><strong>Registration Date:</strong> {clientData.createdAt || "N/A"}</p>
//         <p><strong>Contact Name:</strong> {clientData.contactName || "N/A"}</p>
//         <p><strong>Email:</strong> {clientData.email || "N/A"}</p>
//         <p><strong>Phone:</strong> {clientData.phone || "N/A"}</p>
//         <p><strong>Address:</strong> {clientData.address || "N/A"}</p>
//       </div>

//       {/* Administrative Details */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-2">Administrative Details</h2>
//         <p><strong>Owner:</strong> {clientData.owner || "N/A"}</p>
//         <p><strong>Total Admins:</strong> {clientData.adminCount || 0}</p>
//         <Link to={`/superadmin/client/${clientId}/viewAdmin`} className="text-blue-500 hover:underline">
//           View Admins
//         </Link>
//         <p><strong>Status:</strong> {clientData.status || "Active"}</p>
//       </div>

//       {/* HR and Resource Overview */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-2">Resources</h2>
//         <p><strong>Total Drivers:</strong> {clientData.driverCount || 0}</p>
//         <Link to={`/superadmin/client/${clientId}/viewDriver`} className="text-blue-500 hover:underline">
//           View Drivers
//         </Link>
//         <p><strong>Total Customers:</strong> {clientData.customerCount || 0}</p>
//         <Link to={`/superadmin/client/${clientId}/viewCustomer`} className="text-blue-500 hover:underline">
//           View Customers
//         </Link>
//         <p><strong>Total Cars:</strong> {clientData.carCount || 0}</p>
//         <Link to={`/superadmin/client/${clientId}/viewCar`} className="text-blue-500 hover:underline">
//           View Cars
//         </Link>
//         <p><strong>Total Hubs:</strong> {clientData.hubCount || 0}</p>
//         <Link to="/superadmin/addHub" className="text-blue-500 hover:underline">
//           Manage Hubs
//         </Link>
//       </div>

//       {/* Ride Statistics */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-2">Ride Statistics</h2>
//         <p><strong>Total Rides Booked:</strong> {clientData.totalRides || 0}</p>
//         <p><strong>Active Rides:</strong> {clientData.activeRides || 0}</p>
//         <p><strong>Revenue:</strong> {clientData.revenue || "N/A"}</p>
//         <Link to={`/superadmin/client/${clientId}/bookRide`} className="text-blue-500 hover:underline">
//           View Recent Bookings
//         </Link>
//       </div>

//       {/* Metadata */}
//       <div className="bg-white p-4 rounded-lg shadow-md mt-6">
//         <h2 className="text-xl font-semibold mb-2">Metadata</h2>
//         <p><strong>Created By:</strong> {clientData.createdBy || "N/A"}</p>
//         <p><strong>Last Updated:</strong> {clientData.updatedAt || "N/A"}</p>
//         <p><strong>Notes:</strong> {clientData.notes || "N/A"}</p>
//       </div>
//     </div>
//   );
// }

// import React from 'react';

// // Mock Data
// const client = {
//   companyLogo: '/images/taxiLogo.png', // Replace with real logo URL
//   companyName: 'TechCorp Inc.',
//   employees: [
//     { id: 1, name: 'Alice Johnson', role: 'Software Engineer', carModel: 'Tesla Model 3' },
//     { id: 2, name: 'Bob Smith', role: 'Product Manager', carModel: 'BMW i3' },
//     { id: 3, name: 'Clara Green', role: 'UX Designer', carModel: 'Audi A4' },
//   ],
// };

// export default function ClientDetails() {
//   return (
//     <div className="p-6 flex flex-col gap-4">
//       {/* Company Header */}
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex items-center gap-4">
//         <img
//           src={client.companyLogo}
//           alt={`${client.companyName} Logo`}
//           className="w-20 h-20 rounded object-cover"
//         />
//         <h1 className="text-2xl font-semibold">{client.companyName}</h1>
//       </div>

//       {/* Employee List */}
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
//         <h2 className="text-xl font-semibold mb-4">Employees Using Company Cars</h2>
//         <ul className="divide-y divide-gray-100">
//           {client.employees.map((employee) => (
//             <li key={employee.id} className="py-3 flex justify-between items-center">
//               <div>
//                 <p className="font-medium text-gray-800">{employee.name}</p>
//                 <p className="text-sm text-gray-500">{employee.role}</p>
//               </div>
//               <div className="text-sm text-gray-600">{employee.carModel}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
