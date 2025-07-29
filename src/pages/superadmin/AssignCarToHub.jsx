// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import BackButton from "../../components/BackButton";

// export default function AssignCarToHub() {
//   const { hubId } = useParams();
//   const navigate = useNavigate();
//   const VITE_API = import.meta.env.VITE_API;

//   const [hub, setHub] = useState(null);
//   const [cars, setCars] = useState([]);
//   const [selectedCarIds, setSelectedCarIds] = useState([]);

//   useEffect(() => {
//     // Get hub details
//     axios.get(`${VITE_API}hub/${hubId}`)
//       .then((res) => setHub(res.data))
//       .catch((err) => console.error("Failed to fetch hub", err));

//     // Get unassigned cars
//     axios.get(`${VITE_API}unassigned-cars`)
//       .then((res) => setCars(res.data))
//       .catch((err) => console.error("Failed to fetch cars", err));
//   }, [hubId]);

//   const handleSubmit = async () => {
//     try {
//       await axios.post(`${VITE_API}assign/car-to-hub`, {
//         hubId,
//         carIds: selectedCarIds,
//       });
//       alert("Cars assigned successfully!");
//       navigate(`/superadmin/viewHub`);
//     } catch (error) {
//       console.error("Assignment failed", error);
//       alert("Failed to assign cars");
//     }
//   };

//   const toggleSelection = (carId) => {
//     setSelectedCarIds((prev) =>
//       prev.includes(carId)
//         ? prev.filter((id) => id !== carId)
//         : [...prev, carId]
//     );
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <Link to="/superadmin/viewHub">
//           <BackButton text="Back" />
//         </Link>
//         <h2 className="text-2xl font-bold">Assign Cars to {hub?.hubName}</h2>
//       </div>

//       {cars.length === 0 ? (
//         <p>No available cars to assign.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {cars.map((car) => (
//             <div
//               key={car._id}
//               className={`border rounded-lg p-4 cursor-pointer ${
//                 selectedCarIds.includes(car._id)
//                   ? "bg-blue-100 border-blue-500"
//                   : "bg-white"
//               }`}
//               onClick={() => toggleSelection(car._id)}
//             >
//               <p><strong>Name:</strong> {car.carName}</p>
//               <p><strong>Model:</strong> {car.carModel}</p>
//               <p><strong>Number:</strong> {car.carNumber}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {cars.length > 0 && (
//         <div className="mt-6 flex justify-end">
//           <button
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             onClick={handleSubmit}
//             disabled={selectedCarIds.length === 0}
//           >
//             Assign Selected Cars
//           </button>
//         </div>
//       )}
//     </div>
//   );
// // }
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaPlus, FaCheck, FaArrowLeft } from "react-icons/fa";

// export default function AssignCarToHub() {
//   const { hubId } = useParams();
//   const navigate = useNavigate();
//   const [hub, setHub] = useState(null);
//   const [showCarList, setShowCarList] = useState(false);
//   const [cars, setCars] = useState([]);
//   const [selectedCars, setSelectedCars] = useState([]);
//   const [assignedCars, setAssignedCars] = useState([]);

//   useEffect(() => {
//     setHub({
//       _id: hubId,
//       name: "Central Hub",
//       location: "MP Nagar, Bhopal",
//       capacity: 12,
//     });

//     setCars([
//       { _id: "1", carNumber: "DL-01-1234", carModel: "Maruti", carName: "Alto" },
//       { _id: "2", carNumber: "DL-02-5678", carModel: "Hyundai", carName: "i10" },
//       { _id: "3", carNumber: "DL-03-9999", carModel: "Tata", carName: "Nexon" },
//       { _id: "4", carNumber: "DL-04-1122", carModel: "Mahindra", carName: "XUV" },
//       { _id: "5", carNumber: "DL-05-3344", carModel: "Honda", carName: "City" },
//     ]);
//   }, [hubId]);

//   const handleCheckbox = (carId) => {
//     setSelectedCars((prev) =>
//       prev.includes(carId)
//         ? prev.filter((id) => id !== carId)
//         : [...prev, carId]
//     );
//   };

//   const handleAssign = () => {
//     const newlyAssigned = cars.filter((car) => selectedCars.includes(car._id));
//     setAssignedCars((prev) => [...prev, ...newlyAssigned]);
//     setCars((prev) => prev.filter((car) => !selectedCars.includes(car._id)));
//     setSelectedCars([]);
//     setShowCarList(false);
//   };

//   return (
//     <div className="p-6 bg-[#fff] min-h-screen">
//       {/* Top Header */}
//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center bg-white px-4 py-2 rounded-md shadow text-blue-600 border hover:bg-gray-100"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back
//         </button>
//         <h2 className="text-2xl font-semibold">Assign Cars to Hub</h2>
//         <div></div>
//       </div>

//       {/* Hub Details */}
//       <div className="bg-white p-4 rounded-lg shadow  mb-4">
//         <p><strong>Hub Name:</strong> {hub?.name}</p>
//         <p><strong>Location:</strong> {hub?.location}</p>
//         <p><strong>Capacity:</strong> {hub?.capacity}</p>
//       </div>

//       {/* Assign New Cars Button */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Assigned Cars</h3>
//         <button
//           onClick={() => setShowCarList((prev) => !prev)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
//         >
//           <FaPlus />
//           {showCarList ? "Hide Car List" : "Assign New Cars"}
//         </button>
//       </div>

//       {/* Car List Form */}
//       {showCarList && (
//         <div className="bg-white p-4 rounded-lg shadow border mb-6">
//           <h4 className="text-md font-medium mb-3">Select Cars</h4>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//             {cars.map((car) => (
//               <label
//                 key={car._id}
//                 className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-50 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedCars.includes(car._id)}
//                   onChange={() => handleCheckbox(car._id)}
//                 />
//                 <span>{car.carNumber} - {car.carName} ({car.carModel})</span>
//               </label>
//             ))}
//           </div>
//           {selectedCars.length > 0 && (
//             <button
//               onClick={handleAssign}
//               className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
//             >
//               <FaCheck />
//               Assign Selected Cars
//             </button>
//           )}
//         </div>
//       )}

//       {/* Assigned Cars Table */}
//       <div className="bg-white p-4 rounded-lg shadow ">
//         {assignedCars.length === 0 ? (
//           <p className="text-gray-500">No cars assigned yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-sm">
//               <thead className="bg-gray-100 text-left">
//                 <tr>
//                   <th className="border px-3 py-2">Car Number</th>
//                   <th className="border px-3 py-2">Car Name</th>
//                   <th className="border px-3 py-2">Car Model</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {assignedCars.map((car) => (
//                   <tr key={car._id} className="hover:bg-gray-50">
//                     <td className="border px-3 py-2">{car.carNumber}</td>
//                     <td className="border px-3 py-2">{car.carName}</td>
//                     <td className="border px-3 py-2">{car.carModel}</td>
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
//---------------------------------------------------Perfetctly Designed with Dynamically and Send hubId to the backend------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { useAuth } from "../../context/AuthContext";
import BackButton from "../../components/BackButton";

export default function AssignCarToHub() {
  const {user,token} = useAuth();
  const { hubId} = useParams();
  const navigate = useNavigate();
  const [hub, setHub] = useState({});
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [assignedCars, setAssignedCars] = useState([]);
  const [showCarList, setShowCarList] = useState(false);2

  const VITE_API = import.meta.env.VITE_API;

  useEffect(() => {
    if (!user || !user._id || !hubId) return; // guard clause

    const fetchHub = async () => {
      const res = await axios.get(`${VITE_API}view/hub/${hubId}`,{
      headers:{
        "Content-Type":"json/application",
        Authorization: `Bearer ${token}`,
      }
    });
    setHub(res.data);
    console.log("View Hub:",res.data);
    };

    const fetchCars = async () => {
      const res = await axios.get(`${VITE_API}view/car/status=unAssign`,{
      headers:{
        "Content-Type":"json/application",
        Authorization: `Bearer ${token}`,
      }
    });
    setCars(res.data);
    console.log("Fetch Cars",res.data);
    };

    // const fetchAssignedCars = async () => {
    //   const res = await axios.get(`${VITE_API}/assign/carHub/${hubId}`);
    //   // const res = await axios.get(`${VITE_API}/assign/carHub/${hubId}/${carId}`);
    //   setAssignedCars(res.data);
    //   console.log(res.data);
    // };

    fetchHub();
    fetchCars();
    // fetchAssignedCars();
  },[user], [hubId]);

  const handleCarSelection = (carId) => {
    setSelectedCars((prevSelected) =>
      prevSelected.includes(carId)
        ? prevSelected.filter((id) => id !== carId)
        : [...prevSelected, carId]
    );
  };

  const handleAssign = async () => {
    const newlyAssigned = cars.filter((car) => selectedCars.includes(car._id));
    const payload = newlyAssigned.map((car) => ({ ...car, hubId: hub._id }));

    try {
      await axios.post(`${VITE_API}assign/carHub`,{
      headers:{
        "Content-Type":"json/application",
        Authorization: `Bearer ${token}`,
      }
    }, { cars: payload });
      setAssignedCars((prev) => [...prev, ...newlyAssigned]);
      setCars((prev) => prev.filter((car) => !selectedCars.includes(car._id)));
      setSelectedCars([]);
      setShowCarList(false);
      alert("Cars successfully assigned!");
    } catch (error) {
      console.error("Error assigning cars:", error);
      alert("Failed to assign cars. Please try again.");
    }
  };

  const columns = [
    { name: "Car Number", selector: (row) => row.carNumber, sortable: true },
    { name: "Car Model", selector: (row) => row.carModel, sortable: true },
    { name: "Car Name", selector: (row) => row.carName, sortable: true },
  ];

  return (
    <div className="p-6">
  
      <BackButton/>

      <h1 className="text-2xl font-bold mb-4">Assign Cars to Hub</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">Hub Information</h2>
        <p><strong>Hub Name:</strong> {hub.hubName}</p>
        <p><strong>Location:</strong> {hub.hubLocation}</p>
        <p><strong>Capacity:</strong> {hub.hubCarCapacity}</p>
        <p><strong>Current Car:</strong> {hub.hubCurrentCar}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Assigned Cars</h2>
        <button
          onClick={() => setShowCarList(!showCarList)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Assign New Cars
        </button>
      </div>

      {showCarList && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className={`border p-4 rounded shadow cursor-pointer transition duration-200 ${
                selectedCars.includes(car._id)
                  ? "bg-blue-100 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleCarSelection(car._id)}
            >
              <p><strong>Car Number:</strong> {car.carNumber}</p>
              <p><strong>Model:</strong> {car.carModel}</p>
              <p><strong>Name:</strong> {car.carName}</p>
            </div>
          ))}

          {selectedCars.length > 0 && (
            <div className="col-span-full mt-4">
              <button
                onClick={handleAssign}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center"
              >
                <FaCheck className="mr-2" /> Assign Selected Cars
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        {assignedCars.length === 0 ? (
          <p className="text-gray-500">No cars assigned yet.</p>
        ) : (
          <DataTable
            columns={columns}
            data={assignedCars}
            pagination
            highlightOnHover
          />
        )}
      </div>
    </div>
  );
}


//--------------------------------------------------------Using the dummy data -----------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { FaPlus, FaCheck } from "react-icons/fa";
// import BackButton from "../../components/BackButton";
// const AssignCarToHub = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hub, setHub] = useState({});
//   const [cars, setCars] = useState([]);
//   const [assignedCars, setAssignedCars] = useState([]);
//   const [selectedCars, setSelectedCars] = useState([]);
//   const [showCarList, setShowCarList] = useState(false);

//   useEffect(() => {
//     // Mock hub data
//     setHub({
//       id: id,
//       name: "Green Field Hub",
//       location: "Sector 45, New Delhi",
//     });

//     // Mock available cars
//     setCars([
//       { _id: "car1", carName: "Honda City", registrationNumber: "DL10AB1234" },
//       { _id: "car2", carName: "Hyundai Creta", registrationNumber: "DL10CD5678" },
//       { _id: "car3", carName: "Maruti Swift", registrationNumber: "DL10EF9012" },
//     ]);
//   }, [id]);

//   const handleSelectCar = (carId) => {
//     setSelectedCars((prev) =>
//       prev.includes(carId)
//         ? prev.filter((id) => id !== carId)
//         : [...prev, carId]
//     );
//   };

//   const handleAssignCars = () => {
//     const newlyAssigned = cars.filter((car) => selectedCars.includes(car._id));
//     setAssignedCars((prev) => [...prev, ...newlyAssigned]);
//     setCars((prev) => prev.filter((car) => !selectedCars.includes(car._id)));
//     setSelectedCars([]);
//     setShowCarList(false);
//     alert("Cars assigned successfully");
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <BackButton onClick={() => navigate(-1)} />
//         <h1 className="text-2xl text-center font-bold">Assign Car to Hub</h1>
//       </div>
//       <div className="bg-white shadow-md rounded-lg p-6 mb-4">
//         <h2 className="text-xl font-semibold mb-2">Hub Details</h2>
//         <p><strong>Name:</strong> {hub.name}</p>
//         <p><strong>Location:</strong> {hub.location}</p>
//       </div>
//       <div className="flex justify-end mb-4">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
//           onClick={() => setShowCarList(!showCarList)}
//         >
//           <FaPlus className="mr-2" /> Assign Car
//         </button>
//       </div>

//       {showCarList && (
//         <div className="bg-white shadow-md rounded-lg p-4 mb-6">
//           <h2 className="text-lg font-semibold mb-2">Select Cars to Assign</h2>
//           <ul className="space-y-2">
//             {cars.map((car) => (
//               <li
//                 key={car._id}
//                 className={`border rounded px-4 py-2 cursor-pointer flex justify-between items-center ${
//                   selectedCars.includes(car._id)
//                     ? "bg-green-100 border-green-400"
//                     : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => handleSelectCar(car._id)}
//               >
//                 <div>
//                   <p className="font-medium">{car.carName}</p>
//                   <p className="text-sm text-gray-600">{car.registrationNumber}</p>
//                 </div>
//                 {selectedCars.includes(car._id) && <FaCheck className="text-green-600" />}
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-end mt-4">
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
//               onClick={handleAssignCars}
//               disabled={selectedCars.length === 0}
//             >
//               Assign Selected
//             </button>
//           </div>
//         </div>
//       )}

//       {assignedCars.length > 0 && (
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Assigned Cars</h2>
//           <table className="w-full text-left border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 border">Car Name</th>
//                 <th className="p-2 border">Registration Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignedCars.map((car) => (
//                 <tr key={car._id} className="hover:bg-gray-50">
//                   <td className="p-2 border">{car.carName}</td>
//                   <td className="p-2 border">{car.registrationNumber}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignCarToHub;
