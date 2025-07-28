// import React from "react";
// import { driver_list } from "../../assets/assets";
// // import { useNavigate } from "react-router-dom";

// const DriverList = () => {
//   // const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-center mb-10">Driver Chart</h1>

//       <div className="space-y-4 max-w-5xl mx-auto">
//         {driver_list.map((driver) => (
//           <div
//             key={driver.id}
//             className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
//           >
//             {/* Image Left */}
//             <img
//               src={driver.image}
//               alt={driver.driverName}
//               className="w-22 h-22 object-cover rounded-l-xl"
//             />

//             {/* Info Right */}
//             <div className="flex justify-between items-center w-full px-6">
//               <h2 className="text-lg font-semibold">{driver.driverName}</h2>
//               <button
//                 // onClick={() => navigate(`/driver/${driver.id}`)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full"
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DriverList;




import React from "react";
// import { driver_list } from "../../assets/assets";
import { useNavigate } from "react-router-dom"; // ✅ IMPORT

const DriverList = () => {
  const navigate = useNavigate(); // ✅ INITIALIZE

  return (

 <>

   <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-white p-4">
  <div className="w-full max-w-4xl bg-white   p-6    max-md:p-2.5 rounded-xl border-t border-t-gray-300 shadow-md">
    {/* <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Driver List</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {driver_list.map((driver) => (
          <div
            key={driver.id}
            onClick={() => navigate(`/superAdmin/driver/${driver.id}`)}
            className="cursor-pointer p-4 border rounded-lg shadow hover:bg-gray-100"
          >   
          <div
           className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">

        
             <img
              src={driver.image}
              alt={driver.driverName}
              className="w-22 h-22 object-cover rounded-l-xl"
            />

            <h2 className="text-xl font-semibold">{driver.driverName}</h2>
          <button onClick={() => navigate(`/superAdmin/driver/${driver.id}`)}
                className="bg-black text-white text-sm px-4 py-2 mt-2 rounded-full"
              >
                View Details
              </button>   </div>
          </div>
        ))}
      </div>
    </div>
   */}


    <div className=" rounded-xl bg-gray-100  max-sm:p-3  p-3  lg:p-8 ">
      <h1 className="text-3xl font-bold text-center mb-10">Driver Chart</h1>

      <div className="space-y-4 max-w-5xl mx-auto">
        {driver_list.map((driver) => (
          <div
            key={driver.id}
            className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <img
              src={driver.image}
              alt={driver.driverName}
              className="w-22 h-22 object-cover rounded-l-xl"
            />

            {/* Info Right */}
            <div className="flex justify-between items-center w-full px-6">
              <h2 className="text-lg font-semibold">{driver.driverName}</h2>
              <button
                           onClick={() => navigate(`/superAdmin/driver/${driver.id}`)}

                className="  max-sm:text-[8px]    max-md:text-[10px]   bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div> 
    </>
  );
};

export default DriverList;