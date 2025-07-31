import React from "react";
import { FaBell } from "react-icons/fa";

export default function Badges({ count = 0 }) {
  return (
    <div className="flex items-center  gap-1 md:gap-2  bg-blue-600 px-3 max-sm:p-2 py-2 rounded-full text-white shadow hover:bg-blue-700 transition">
      <FaBell className="text-white    max-sm:text-sm  md:text-xl " />
      <span className="   max-sm:text-xs  text-sm   font-semibold">Pending</span>
      {count > 0 && (
        <span className="ml-1 bg-white text-blue-500 font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs !animate-pulse">
          {count}
        </span>
      )}
    </div>
  );
}


// import React, { useState } from "react";
// import { FaBell } from "react-icons/fa";

// export default function Badges() {
//   const [count, setCount] = useState(5);

//   return (
//     <div className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-full text-white shadow hover:bg-blue-700 transition">
//       <FaBell className="text-white text-xl" />
//       <span className="text-sm font-semibold">Pending</span>
//       {count > 0 && (
//         <span className="ml-1 bg-white text-blue-500 font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs !animate-pulse">
//           {count}
//         </span>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { FaCircle } from "react-icons/fa";

// export default function Badges(){
//   const [count, setCount] = useState(5);

//   return (
//     <div style={{ position: "relative", display: "inline-block" }}>
//       <button onClick={() => setCount(count + 1)}><FaCircle className="text-blue-600 "/></button>
//       {count > 0 && (
//         <span
//           style={{
//             position: "absolute",
//             top: "-3px",
//             right: "5px",
//             // background: "oklch(62.3% 0.214 259.815)",
//             color: "white",
//             borderRadius: "50%",
//             padding: "5px, 10px",
//             fontSize: "14px",
//           }}
//         >
//           {count}
//         </span>
//       )}
//     </div>
//   );
// };



// // import React from "react";

// // export default function Badges ({ count }){
// //   return (
// //     <div style={{ position: "relative", display: "inline-block" }}>
// //       <button>Messages</button>
// //       {count > 0 && (
// //         <span
// //           style={{
// //             position: "absolute",
// //             top: "-5px",
// //             right: "-5px",
// //             background: "blue",
// //             color: "white",
// //             borderRadius: "50%",
// //             padding: "5px 10px",
// //             fontSize: "12px",
// //           }}
// //         >
// //           {count}
// //         </span>
// //       )}
// //     </div>
// //   );
// // };

