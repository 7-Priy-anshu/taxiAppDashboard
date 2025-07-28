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



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Added for API call
// import { useAuth } from "../../context/AuthContext"; // Added assuming auth is needed
import { useAuth } from "../context/AuthContext";
const DriverId = () => {
  const { driveId } = useParams();
  const [driver, setDriver] = useState(null);
  const [expandedDate, setExpandedDate] = useState(null);
  const { user } = useAuth(); // Assuming auth context provides user info
  const VITE_API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await axios.get(`${VITE_API}view/driver/${driveId}`, {
          headers: { Authorization: `Bearer ${user?.token}` }, // Add token if required
        });
        setDriver(res.data); // Adjust based on actual response structure
      } catch (err) {
        console.error("Error fetching driver:", err.response?.data || err.message);
      }
    };

    fetchDriver();
  }, [driveId, user?.token]);

  if (!driver) {
    return (
      <div className="text-center text-red-600 mt-20">
        Driver not found! (ID: {driveId})
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
              src={driver.image}
              alt={driver.driverName}
              className="w-44 h-44 rounded-xl object-cover border-t border-t-gray-300 shadow-sm"
            />
          </div>

          {/* Info */}
          <div className="space-y-2 text-gray-800">
            <h2 className="text-2xl font-bold">{driver.driverName}</h2>
            <p><span className="font-semibold">Age:</span> {driver.age}</p>
            <p><span className="font-semibold">Phone:</span> {driver.phoneNumber}</p>
            <p><span className="font-semibold">Email:</span> {driver.email}</p>
            <p><span className="font-semibold">Address:</span> {driver.address}</p>
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
              <span className={`font-medium ${driver.toolPlaza === "Included" ? "text-green-600" : "text-red-600"}`}>
                {driver.toolPlaza}
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

        {driver.rideHistory?.map((entry, index) => {
          const totalKm = entry.rides.reduce((sum, ride) => sum + (ride.km || 0), 0);

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
                        <span className="font-semibold text-black">Time:</span> {ride.time}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-black">Fare:</span> ₹{ride.fare}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-black">📏 KM:</span> {ride.km ?? "N/A"} km
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriverId;