import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
// import Badges from "./Badges";
import Badges from '../Badges';
import ProfileDropdown from "../ProfileDropdown";

export default function NavbarHR({ onMenuClick }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

useEffect(() => {
  const handleCountUpdate = (e) => {
    setPendingCount(e.detail.pending);
  };

  window.addEventListener("update_pending_count", handleCountUpdate);

  return () => {
    window.removeEventListener("update_pending_count", handleCountUpdate);
  };
}, []);


  return (
    <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-8 shadow-md">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-2xl text-gray-600" onClick={onMenuClick}>
          <FaBars />
        </button>
        <img
          src="../images/taxiLogo.png"
          alt="Logo"
          className="rounded-full w-10 h-10 object-cover logo"
        />
        <div className="text-2xl font-bold text-gray-700">Taxi App</div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Badges count={pendingCount} />
        <img
          src="../images/userIcon.png"
          alt="User"
          onClick={toggleDropdown}
          className="rounded-full w-10 h-10 object-cover cursor-pointer logo"
        />
        {isDropdownVisible && <ProfileDropdown />}
      </div>
    </header>
  );
}



// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import Badges from "../Badges";
// import ProfileDropdown from "../ProfileDropdown";


// export default function NavbarHR({ onMenuClick }) {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);

//   const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

//   useEffect(() => {
//     const handleCountUpdate = (e) => {
//       setPendingCount(e.detail.pending);
//     };

//     window.addEventListener("update_pending_count", handleCountUpdate);

//     return () => {
//       window.removeEventListener("update_pending_count", handleCountUpdate);
//     };
//   }, []);

//   return (
//     <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-8 shadow-md">
//       <div className="flex items-center gap-4">
//         <button className="md:hidden text-2xl text-gray-600" onClick={onMenuClick}>
//           <FaBars />
//         </button>
//         <img
//           src="/images/taxiLogo.png" // Changed to absolute path from public
//           alt="Logo"
//           className="rounded-full w-10 h-10 object-cover"
//         />
//         <div className="text-2xl font-bold text-gray-700">Taxi App</div>
//       </div>

//       <div className="flex items-center justify-center gap-4">
//         <Badges count={pendingCount} />
//         <img
//           src="/images/userIcon.png" // Changed to absolute path from public
//           alt="User"
//           onClick={toggleDropdown}
//           className="rounded-full w-10 h-10 object-cover cursor-pointer"
//         />
//         {isDropdownVisible && <ProfileDropdown />}
//       </div>
//     </header>
//   );
// }
// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// // import Badges from "./Badges";
// import Badges from "./Badges"
// import ProfileDropdown from "./ProfileDropdown";

// export default function NavbarHR({ onMenuClick }) {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);

//   const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

// useEffect(() => {
//   const handleCountUpdate = (e) => {
//     setPendingCount(e.detail.pending);
//   };

//   window.addEventListener("update_pending_count", handleCountUpdate);

//   return () => {
//     window.removeEventListener("update_pending_count", handleCountUpdate);
//   };
// }, []);


//   return (
//     <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-8 shadow-md">
//       <div className="flex items-center gap-4">
//         <button className="md:hidden text-2xl text-gray-600" onClick={onMenuClick}>
//           <FaBars />
//         </button>
//         <img
//           src="../../public/images/taxiLogo.png"
//           alt="Logo"
//           className="rounded-full w-10 h-10 object-cover"
//         />
//         <div className="text-2xl font-bold text-gray-700">Taxi App</div>
//       </div>

//       <div className="flex items-center justify-center gap-4">
//         <Badges count={pendingCount} />
//         <img
//           src="../images/userIcon.png"
//           alt="User"
//           onClick={toggleDropdown}
//           className="rounded-full w-10 h-10 object-cover cursor-pointer"
//         />
//         {isDropdownVisible && <ProfileDropdown />}
//       </div>
//     </header>
//   );
// }



// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import Badges from "../../pages/Badges";

// export default function NavbarHR({ onMenuClick }) {
//   const [pendingCount, setPendingCount] = useState(0);

//   useEffect(() => {
//     const handleCountUpdate = (e) => {
//       setPendingCount(e.detail.pending);
//     };

//     window.addEventListener("update_pending_count", handleCountUpdate);
//     return () => window.removeEventListener("update_pending_count", handleCountUpdate);
//   }, []);

//   return (
//     <header className="w-full h-24 bg-white flex items-center justify-center shadow-md z-10 sticky top-0">
//       <div className="flex items-center gap-4">
//         <button 
//           className="lg:hidden text-2xl text-gray-600 focus:outline-none"
//           onClick={onMenuClick}
//           aria-label="Toggle menu"
//         >
//           <FaBars />
//         </button>
//         <img
//           src="/images/taxilogo.png" // Direct path from public
//           alt="UR Logo"
//           className="w-20 h-20 object-contain"
//         />
//         <div className="text-2xl font-bold text-primary">UR Taxi App</div>
//         <Badges count={pendingCount} className="ml-auto" /> {/* Push to right */}
//       </div>
//     </header>
//   );
// }

// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import Badges from "../../pages/Badges";
// import ProfileDropdown from "../../pages/ProfileDropdown";

// export default function NavbarHR({ onMenuClick }) {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);

//   const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

//   useEffect(() => {
//     const handleCountUpdate = (e) => {
//       setPendingCount(e.detail.pending);
//     };

//     window.addEventListener("update_pending_count", handleCountUpdate);

//     return () => {
//       window.removeEventListener("update_pending_count", handleCountUpdate);
//     };
//   }, []);

//   return (
//     // <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md z-10 sticky top-0">
//    <header className="w-full h-16 bg-white flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow z-10 sticky top-0">
//     {/* <div className="flex items-center gap-3 sm:gap-4">
//         <button 
//           className="lg:hidden text-2xl text-gray-600 focus:outline-none" 
//           onClick={onMenuClick}
//           aria-label="Toggle menu"
//         >
//           <FaBars />
//         </button>
//         <img
//           src="../images/taxiLogo.png"
//           alt="Taxi App Logo"
//           className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover"
//           width="50px"
//         />
//         <div className="text-xl sm:text-2xl font-bold text-gray-700 whitespace-nowrap">
//           Taxi App
//         </div>
//     </div> */}
//   <div className="flex items-center gap-2 sm:gap-4">
//   <button 
//     className="lg:hidden text-2xl text-gray-600 focus:outline-none" 
//     onClick={onMenuClick}
//     aria-label="Toggle menu"
//   >
//     <FaBars />
//   </button>
//   <img
//     src="../images/taxiLogo.png"
//     alt="Taxi App Logo"
//     className="w-8 h-8 sm:w-10 sm:h-10 object-cover"
//   />
//   <div className="text-lg sm:text-xl font-bold text-gray-700 whitespace-nowrap overflow-hidden">
//     Taxi App
//   </div>
// </div>
//       <div className="flex items-center justify-end gap-3 sm:gap-4">
//         <Badges count={pendingCount} />
//         <div className="relative">
//           <img
//             src="../images/userIcon.png"
//             alt="User Profile"
//             onClick={toggleDropdown}
//             className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover cursor-pointer hover:opacity-80 transition-opacity"
//             width="50px"
//           />
//           {isDropdownVisible && (
//             // <div className="absolute right-0 mt-2 w-48 sm:w-56">
//             <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white shadow-lg rounded-md z-20">
//               <ProfileDropdown />
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import Badges from "./Badges";
// import ProfileDropdown from "./ProfileDropdown";

// export default function NavbarHR({ onMenuClick }) {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);

//   const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

// useEffect(() => {
//   const handleCountUpdate = (e) => {
//     setPendingCount(e.detail.pending);
//   };

//   window.addEventListener("update_pending_count", handleCountUpdate);

//   return () => {
//     window.removeEventListener("update_pending_count", handleCountUpdate);
//   };
// }, []);


//   return (
//     <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-8 shadow-md z-10">
//       <div className="flex items-center gap-4">
//         <button className="md:hidden text-2xl text-gray-600" onClick={onMenuClick}>
//           <FaBars />
//         </button>
//         <img
//           src="../images/taxiLogo.png"
//           alt="Logo"
//           className="rounded-full w-10 h-10 object-cover"
//         />
//         <div className="text-2xl font-bold text-gray-700">Taxi App</div>
//       </div>

//       <div className="flex items-center justify-center gap-4">
//         <Badges count={pendingCount} />
//         <img
//           src="../images/userIcon.png"
//           alt="User"
//           onClick={toggleDropdown}
//           className="rounded-full w-10 h-10 object-cover cursor-pointer"
//         />
//         {isDropdownVisible && <ProfileDropdown />}
//       </div>
//     </header>
//   );
// }


// import ProfileDropdown from "./ProfileDropdown";
// import { useState } from "react";
// import { FaBars,FaBell } from "react-icons/fa";
// import Badges from "./Badges";


// export default function NavbarHR({ onMenuClick }){
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

//   return (
//     <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-4 sm:shrink-0 md:shrink-0 px-8 shadow-md">
//       <div className="flex items-center gap-4">
//         {/* Hamburger menu (only mobile) */}
//         <button className="md:hidden text-2xl text-gray-600" onClick={onMenuClick}>
//           <FaBars />
//         </button>

//         {/* Logo */}
//         <img
//           src="../images/taxiLogo.png"
//           alt="Logo"
//           className="rounded-full w-10 h-10 object-cover"
//         />
//         <div className="text-2xl font-bold text-gray-700">Taxi App</div>
//       </div>

//       {/* Notification icon */}
//       {/* <div className="flex justify-end">
//          <h2 className="border rounded-2xl flex flex-row p-2"> <FaBell className="m-1 justify-center"/> Pending</h2>
//       </div> */}

//       {/* Profile icon */}
//       <div className="flex items-center justify-center gap-4">
//         <h2> <Badges badgeContent={4} color="primary"></Badges></h2>
//         {/* <h2 className="bg-red-800 opacity-100 text-white rounded-2xl flex flex-row p-2 ">    <Badges badgeContent={4} color="primary"> */}
//     {/* </Badges> Pending</h2> */}
       
//         <img
//           src="../images/userIcon.png"
//           alt="User"
//           onClick={toggleDropdown}
//           className="rounded-full w-10 h-10 object-cover cursor-pointer"
//         />
//         {isDropdownVisible && <ProfileDropdown />}
//       </div>
//     </header>
//   );
// };

