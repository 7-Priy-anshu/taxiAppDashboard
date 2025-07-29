// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { driver_list } from "../../assets/assets";

// const DriverId = () => {
//   const { driveId } = useParams();
//   const [driver, setDriver] = useState(null);

//   useEffect(() => {
//     const foundDriver = driver_list.find((d) => String(d.id) === String(driveId));
//     setDriver(foundDriver);
//   }, [driveId]);

//   if (!driver) {
//     return (
//       <div className="text-center text-red-600 mt-20">
//         Driver not found! (ID: {driveId})
//       </div>
//     );
//   }

//   const rideFare = Number(driver.rideFare) || 0;
//   const rideCount = Number(driver.rideCount) || 0;
//   const toolPlazaCount = Number(driver.toolPlazaCount) || 0;

//   const rideEarnings = rideFare * rideCount;
//   const tollCharge = toolPlazaCount * 100;
//   const totalEarnings = rideEarnings + tollCharge;

//   return (
//     <div className="grid-cols-12 p-8 justify-center items-center">
//       <div className="  bg-white sm:p-10  rounded-xl border-t border-t-gray-300 shadow-md  mt-8  p-6">
//         <div className="grid gap-10 lg:grid-cols-3">
          
//           {/* Image */}
//           <div className="flex justify-center md:justify-start">
//             <img
//               src={driver.image}
//               alt={driver.driverName}
//               className="w-44 h-44 rounded-xl object-cover border-t border-t-gray-300 shadow-sm"
//             />
//           </div>

//           {/* Info */}
//           <div className="space-y-2  text-gray-800">
//             <h2 className="text-2xl font-bold">{driver.driverName}</h2>
//             <p><span className="font-semibold">Age:</span> {driver.age} </p>
//             <p><span className="font-semibold">Phone:</span> {driver.phoneNumber}</p>
//             <p><span className="font-semibold">Email:</span> {driver.email}</p>
//             <p><span className="font-semibold text-center">Address:</span> {driver.address}</p> 
//           </div>

//           {/* Ride & Fare */}
//         <div className="space-y-2 text-sm md:text-base">
//   <div className="flex justify-between w-full">
//     <p className="font-semibold text-slate-900">Total Rides:</p>
//     <span>{rideCount}</span>
//   </div>
//   <div className="flex justify-between w-full">
//     <p className="font-semibold text-slate-900">Fare Per Ride:</p>
//     <span>₹{rideFare}</span>
//   </div>
//   <div className="flex justify-between w-full">
//     <p>Ride Earnings:</p>
//     <span>₹{rideEarnings}</span>
//   </div>
//   <div className="flex justify-between w-full">
//     <p>Toll Charges:</p>
//     <span>₹{tollCharge}</span>
//   </div>
  
//   <div className="flex justify-between w-full pt-1">
//     <p className="font-semibold text-gray-700">Toll Plaza:</p>
//     <span className={`font-medium ${driver.toolPlaza === "Included" ?  "text-green-600  ":  "text-red-600" }`}>
//       {driver.toolPlaza}
//     </span>
//   </div>
//   <div className="flex justify-between w-full font-semibold">
//     <p>Total Earnings:</p>
//     <span>₹{totalEarnings}</span>
//   </div>
// </div>


//         </div>
//       </div>
     
//   {/* Ride histry   */}

//     {/* <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
//   <h3 className="text-xl font-bold text-gray-800 mb-4">Ride History</h3>
  
//   <div className="space-y-4">
//     {driver.rideHistory && driver.rideHistory.length > 0 ? (
//       driver.rideHistory.map((ride, index) => (
//         <div
//           key={index}
//           className="border border-gray-200 p-4 rounded-md shadow-sm"
//         >
//           <div className="flex justify-between items-center text-sm md:text-base">
//             <p className="font-semibold text-slate-700">Date:</p>
//             <span className="text-gray-800">{ride.date}</span>
//           </div>

//           <div className="flex justify-between items-center text-sm md:text-base mt-1">
//             <p className="font-semibold text-slate-700">Pickup Location:</p>
//             <span className="text-gray-800">{ride.pickup}</span>
//           </div>

//           <div className="flex justify-between items-center text-sm md:text-base mt-1">
//             <p className="font-semibold text-slate-700">Drop Location:</p>
//             <span className="text-gray-800">{ride.drop}</span>
//           </div>

//           <div className="flex justify-between items-center text-sm md:text-base mt-1">
//             <p className="font-semibold text-slate-700">Fare:</p>
//             <span className="text-green-700 font-medium">₹{ride.fare}</span>
//           </div>

//           <div className="flex justify-between items-center text-sm md:text-base mt-1">
//             <p className="font-semibold text-slate-700">Toll Paid:</p>
//             <span
//               className={`font-medium ${
//                 ride.tollPaid ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {ride.tollPaid ? "Yes" : "No"}
//             </span>
//           </div>
//         </div>
//       ))
//     ) : (
//       <p className="text-gray-500 italic">No ride history available.</p>
//     )}
//   </div>
// </div> */}





{/* Ride History */}
{/* <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
  <h3 className="text-xl font-bold text-gray-800 mb-4">Ride History</h3>

  <div className="space-y-4">
    {driver.rideHistory && driver.rideHistory.length > 0 ? (
      driver.rideHistory.map((entry, index) => (
        <div
          key={index}
          className="border border-gray-200 p-4 rounded-md shadow-sm"
        >
          <div className="flex justify-between items-center text-sm md:text-base">
            <p className="font-semibold text-slate-700"> Date:</p>
            <span className="text-gray-800">{entry.date}</span>
          </div>

          <div className="flex justify-between items-center text-sm md:text-base mt-2">
            <p className="font-semibold text-slate-700"> Total Rides:</p>
            <span className="text-gray-800">{entry.rides.length}</span>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 italic">No ride history available.</p>
    )}
  </div>
</div> */}






//     </div>
//   );
// };

// export default DriverId;


// --------------------------------------------------Priyanshu Code-------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import { driver_list } from "../../assets/assets";

// export default function ViewDriverHistory (){
//   const { driveId } = useParams();
//   const [driver, setDriver] = useState(null);
//   const [expandedDate, setExpandedDate] = useState(null);

//   useEffect(() => {
//     const foundDriver = driver_list.find((d) => String(d.id) === String(driveId));
//     setDriver(foundDriver);
//   }, [driveId]);

//   if (!driver) {
//     return (
//       <div className="text-center text-red-600 mt-20">
//         Driver not found! (ID: {driveId})
//       </div>
//     );
//   }

//   const toggleDate = (date) => {
//     setExpandedDate((prev) => (prev === date ? null : date));
//   };

//   const rideFare = Number(driver.rideFare) || 0;
//   const rideCount = Number(driver.rideCount) || 0;
//   const toolPlazaCount = Number(driver.toolPlazaCount) || 0;

//   const rideEarnings = rideFare * rideCount;
//   const tollCharge = toolPlazaCount * 100;
//   const totalEarnings = rideEarnings + tollCharge;

//   return (
//     <div className="grid-cols-12 p-8 justify-center items-center">
//       <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
//         <div className="grid gap-10 lg:grid-cols-3">
//           {/* Image */}
//           <div className="flex justify-center md:justify-start">
//             <img
//               src={driver.image}
//               alt={driver.driverName}
//               className="w-44 h-44 rounded-xl object-cover border-t border-t-gray-300 shadow-sm"
//             />
//           </div>

//           {/* Info */}
//           <div className="space-y-2 text-gray-800">
//             <h2 className="text-2xl font-bold">{driver.driverName}</h2>
//             <p><span className="font-semibold">Age:</span> {driver.age}</p>
//             <p><span className="font-semibold">Phone:</span> {driver.phoneNumber}</p>
//             <p><span className="font-semibold">Email:</span> {driver.email}</p>
//             <p><span className="font-semibold">Address:</span> {driver.address}</p> 
//           </div>

//           {/* Ride & Fare */}
//           <div className="space-y-2 text-sm md:text-base">
//             <div className="flex justify-between w-full">
//               <p className="font-semibold text-slate-900">Total Rides:</p>
//               <span>{rideCount}</span>
//             </div>
//             <div className="flex justify-between w-full">
//               <p className="font-semibold text-slate-900">Fare Per Ride:</p>
//               <span>₹{rideFare}</span>
//             </div>
//             <div className="flex justify-between w-full">
//               <p>Ride Earnings:</p>
//               <span>₹{rideEarnings}</span>
//             </div>
//             <div className="flex justify-between w-full">
//               <p>Toll Charges:</p>
//               <span>₹{tollCharge}</span>
//             </div>
//             <div className="flex justify-between w-full pt-1">
//               <p className="font-semibold text-gray-700">Toll Plaza:</p>
//               <span className={`font-medium ${driver.toolPlaza === "Included" ? "text-green-600" : "text-red-600"}`}>
//                 {driver.toolPlaza}
//               </span>
//             </div>
//             <div className="flex justify-between w-full font-semibold">
//               <p>Total Earnings:</p>
//               <span>₹{totalEarnings}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Ride History */}
//       <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Ride History</h2>

//         {driver.rideHistory?.map((entry, index) => {
//           const totalKm = entry.rides.reduce((sum, ride) => sum + (ride.km || 0), 0);

//           return (
//             <div key={index} className="mb-4">
//               <button
//                 onClick={() => toggleDate(entry.date)}
//                 className="w-full text-left  hover:bg-slate-200 px-4 py-2 rounded-md font-semibold text-black shadow-sm transition"
//               >
//                  {entry.date} — {entry.rides.length} rides — {totalKm} km
//               </button>

//               {expandedDate === entry.date && (
//                 <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {entry.rides.map((ride) => (
//                     <div
//                       key={`${entry.date}-${ride.time}`}
//                       className="bg-gray-50 border border-purple-200 rounded-lg p-4 shadow-sm"
//                     >
//                       <p className="text-sm text-gray-700">
//                         <span className="font-semibold text-black"> Time:</span> {ride.time}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-semibold text-black"> Fare:</span> ₹{ride.fare}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-semibold text-black">📏 KM:</span> {ride.km ?? 'N/A'} km
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

//---------------------------------MOck Data Displayed----------------------------------------
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// // ✅ MOCK DATA
// const driver_list = [
//   {
//     id: "1",
//     driverName: "Rajesh Sharma",
//     age: 35,
//     phoneNumber: "9876543210",
//     email: "rajesh.sharma@example.com",
//     address: "Delhi, India",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     rideFare: 150,
//     rideCount: 20,
//     toolPlaza: "Included",
//     toolPlazaCount: 5,
//     rideHistory: [
//       {
//         date: "2025-07-20",
//         rides: [
//           { time: "10:00 AM", fare: 150, km: 12 },
//           { time: "12:30 PM", fare: 150, km: 9 },
//         ],
//       },
//       {
//         date: "2025-07-19",
//         rides: [
//           { time: "09:00 AM", fare: 150, km: 15 },
//           { time: "03:15 PM", fare: 150, km: 20 },
//           { time: "07:00 PM", fare: 150, km: 10 },
//         ],
//       },
//     ],
//   },
//   {
//     id: "2",
//     driverName: "Ayesha Khan",
//     age: 29,
//     phoneNumber: "9876512345",
//     email: "ayesha.khan@example.com",
//     address: "Mumbai, India",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     rideFare: 120,
//     rideCount: 15,
//     toolPlaza: "Not Included",
//     toolPlazaCount: 2,
//     rideHistory: [
//       {
//         date: "2025-07-21",
//         rides: [
//           { time: "11:30 AM", fare: 120, km: 8 },
//           { time: "01:45 PM", fare: 120, km: 11 },
//         ],
//       },
//       {
//         date: "2025-07-18",
//         rides: [
//           { time: "10:15 AM", fare: 120, km: 14 },
//           { time: "05:00 PM", fare: 120, km: 16 },
//         ],
//       },
//     ],
//   },
// ];

// export default function ViewDriverHistory() {
//   const { driveId } = useParams();
//   const [driver, setDriver] = useState(null);
//   const [expandedDate, setExpandedDate] = useState(null);

// useEffect(() => {
//   let resolvedId = null;

//   // Dummy ID to mock data mapping
//   if (driveId === "6874cbfba415dbc9dea6dae2") {
//     resolvedId = "1";
//   } else if (driveId === "6881dc5882182195c52a375d") {
//     resolvedId = "2";
//   } else {
//     resolvedId = driveId;
//   }

//   const foundDriver = driver_list.find((d) => String(d.id) === String(resolvedId));
//   setDriver(foundDriver);
// }, [driveId]);

//   if (!driver) {
//     return (
//       <div className="text-center text-red-600 mt-20">
//         Driver not found! (ID: {driveId})
//       </div>
//     );
//   }
// //   useEffect(() => {
// //     const foundDriver = driver_list.find((d) => String(d.id) === String(driveId));
// //     setDriver(foundDriver);
// //   }, [driveId]);

// //   if (!driver) {
// //     return (
// //       <div className="text-center text-red-600 mt-20">
// //         Driver not found! (ID: {driveId})
// //       </div>
// //     );
// //   }

//   const toggleDate = (date) => {
//     setExpandedDate((prev) => (prev === date ? null : date));
//   };

//   const rideFare = Number(driver.rideFare) || 0;
//   const rideCount = Number(driver.rideCount) || 0;
//   const toolPlazaCount = Number(driver.toolPlazaCount) || 0;

//   const rideEarnings = rideFare * rideCount;
//   const tollCharge = toolPlazaCount * 100;
//   const totalEarnings = rideEarnings + tollCharge;

//   return (
//     <div className="grid-cols-12 p-8 justify-center items-center">
//       <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
//         <div className="grid gap-10 lg:grid-cols-3">
//           {/* Image */}
//           <div className="flex justify-center md:justify-start">
//             <img
//               src={driver.image}
//               alt={driver.driverName}
//               className="w-44 h-44 rounded-xl object-cover border-t border-t-gray-300 shadow-sm"
//             />
//           </div>

//           {/* Info */}
//           <div className="space-y-2 text-gray-800">
//             <h2 className="text-2xl font-bold">{driver.driverName}</h2>
//             <p><span className="font-semibold">Age:</span> {driver.age}</p>
//             <p><span className="font-semibold">Phone:</span> {driver.phoneNumber}</p>
//             <p><span className="font-semibold">Email:</span> {driver.email}</p>
//             <p><span className="font-semibold">Address:</span> {driver.address}</p>
//           </div>

//           {/* Ride & Fare */}
//           <div className="space-y-2 text-sm md:text-base">
//             <div className="flex justify-between w-full">
//               <p className="font-semibold text-slate-900">Total Rides:</p>
//               <span>{rideCount}</span>
//             </div>
//             <div className="flex justify-between w-full">
//               <p className="font-semibold text-slate-900">Fare Per Ride:</p>
//               <span>₹{rideFare}</span>
//             </div>
//             <div className="flex justify-between w-full">
//               <p>Ride Earnings:</p>
//               <span>₹{rideEarnings}</span>
//             </div>
//             <div className="flex justify-between w-full">
//               <p>Toll Charges:</p>
//               <span>₹{tollCharge}</span>
//             </div>
//             <div className="flex justify-between w-full pt-1">
//               <p className="font-semibold text-gray-700">Toll Plaza:</p>
//               <span className={`font-medium ${driver.toolPlaza === "Included" ? "text-green-600" : "text-red-600"}`}>
//                 {driver.toolPlaza}
//               </span>
//             </div>
//             <div className="flex justify-between w-full font-semibold">
//               <p>Total Earnings:</p>
//               <span>₹{totalEarnings}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Ride History */}
//       <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Ride History</h2>

//         {driver.rideHistory?.map((entry, index) => {
//           const totalKm = entry.rides.reduce((sum, ride) => sum + (ride.km || 0), 0);

//           return (
//             <div key={index} className="mb-4">
//               <button
//                 onClick={() => toggleDate(entry.date)}
//                 className="w-full text-left hover:bg-slate-200 px-4 py-2 rounded-md font-semibold text-black shadow-sm transition"
//               >
//                 {entry.date} — {entry.rides.length} rides — {totalKm} km
//               </button>

//               {expandedDate === entry.date && (
//                 <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {entry.rides.map((ride) => (
//                     <div
//                       key={`${entry.date}-${ride.time}`}
//                       className="bg-gray-50 border border-purple-200 rounded-lg p-4 shadow-sm"
//                     >
//                       <p className="text-sm text-gray-700">
//                         <span className="font-semibold text-black">Time:</span> {ride.time}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-semibold text-black">Fare:</span> ₹{ride.fare}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-semibold text-black">📏 KM:</span> {ride.km ?? 'N/A'} km
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

//----------------------------------------------Dynamic Data Display---------------------------------------------- 

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function ViewDriverHistory() {
  const { driverId } = useParams();
  const { user, token } = useAuth();
  const [driver, setDriver] = useState(null);
  const [expandedDate, setExpandedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const VITE_API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchDriverHistory = async () => {
      if (!user || !user._id || !driverId) {
        setError("Invalid user or driver ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `${VITE_API}driverRideHistory/?driverId=${driverId}`,{
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      }
    }
);
const driverData = Array.isArray(res.data.driverData)
  ? res.data.driverData[0]  // Take the first driver
  : res.data;
setDriver(driverData);

console.log("Driver history response:", driverData);
      } catch (err) {
        console.error("Error fetching driver history:", err);
        setError("Failed to load driver history");
      } finally {
        setLoading(false);
      }
    };

    fetchDriverHistory();
  }, [driverId, user, token]);

  if (loading) {
    return <div className="text-center text-gray-600 mt-20">Loading...</div>;
  }

  if (error || !driver) {
    return (
      <div className="text-center text-red-600 mt-20">
        {error || `Driver not found! (ID: ${driverId})`}
      </div>
    );
  }

  const toggleDate = (date) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  const rideFare = Number(driver.rideFare) || 0;
  const rideCount = Number(driver.rideCount) || 0;
  const toolPlazaCount = Number(driver.toolPlazaCount) || 0;

  const rideEarnings = rideFare * rideCount;
  const tollCharge = toolPlazaCount * 100;
  const totalEarnings = rideEarnings + tollCharge;

  return (
    <div className="grid-cols-12 p-8 justify-center items-center">
      <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={driver.image || "/default-image.png"} // Fallback image
              alt={driver.name}
              className="w-44 h-44 rounded-xl object-cover border-t border-t-gray-300 shadow-sm"
            />
          </div>

          {/* Info */}
          <div className="space-y-2 text-gray-800">
            <h2 className="text-2xl font-bold">{driver.name || "N/A"}</h2>
            <p>
              <span className="font-semibold">Age:</span> {driver.age || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {driver.contact || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {driver.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {driver.address || "N/A"}
            </p>
          </div>

          {/* Ride & Fare */}
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex justify-between w-full">
              <p className="font-semibold text-slate-900">Total Rides:</p>
              <span>{rideCount}</span>
            </div>
            <div className="flex justify-between w-full">
              <p className="font-semibold text-slate-900">Fare Per Ride:</p>
              <span>₹{rideFare}</span>
            </div>
            <div className="flex justify-between w-full">
              <p>Ride Earnings:</p>
              <span>₹{rideEarnings}</span>
            </div>
            <div className="flex justify-between w-full">
              <p>Toll Charges:</p>
              <span>₹{tollCharge}</span>
            </div>
            <div className="flex justify-between w-full pt-1">
              <p className="font-semibold text-gray-700">Toll Plaza:</p>
              <span
                className={`font-medium ${
                  driver.toolPlaza === "Included" ? "text-green-600" : "text-red-600"
                }`}
              >
                {driver.toolPlaza || "N/A"}
              </span>
            </div>
            <div className="flex justify-between w-full font-semibold">
              <p>Total Earnings:</p>
              <span>₹{totalEarnings}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ride History */}
      <div className="bg-white sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md mt-8 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ride History</h2>

        {driver.rideHistory?.length === 0 ? (
          <p className="text-center text-gray-500">No ride history available.</p>
        ) : (
          driver.rideHistory?.map((entry, index) => {
            const totalKm = entry.rides.reduce(
              (sum, ride) => sum + (ride.km || 0),
              0
            );

            return (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleDate(entry.date)}
                  className="w-full text-left hover:bg-slate-200 px-4 py-2 rounded-md font-semibold text-black shadow-sm transition"
                >
                  {entry.date} — {entry.rides.length} rides — {totalKm} km
                </button>

                {expandedDate === entry.date && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {entry.rides.map((ride) => (
                      <div
                        key={`${entry.date}-${ride.time}`}
                        className="bg-gray-50 border border-purple-200 rounded-lg p-4 shadow-sm"
                      >
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-black">Time:</span>{" "}
                          {ride.time}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-black">Fare:</span>{" "}
                          ₹{ride.fare}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-black">📏 KM:</span>{" "}
                          {ride.km ?? "N/A"} km
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}