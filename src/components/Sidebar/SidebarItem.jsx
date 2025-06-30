import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideDropdown from './SideDropdown';
import { iconMap } from '../../shared/icons';

export default function SidebarItem({ items, dropitem, user }) {
  console.log('User data:', user, typeof user);
  const [openDropdown, setOpenDropdown] = useState(null);

  const safeUser = {
    role: user?.role?.toLowerCase() || '',
    permissions: user?.permissions?.map((p) => p.toLowerCase()) || [],
  };
  console.log('Safe user:', safeUser);

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const hasAccess = (item) => {
    if (item.requiredRoles && !item.requiredRoles.includes(safeUser.role)) return false;
    if (item.requiredPermissions && !item.requiredPermissions.some((p) => safeUser.permissions.includes(p))) return false;
    return true;
  };
  console.log('Accessible items:', items.filter((item) => hasAccess(item)));

  // const filterDropdown = (list, parentItem) =>
  //   list.filter((item) => {
  //     if (parentItem.requiredRoles && !parentItem.requiredRoles.includes(safeUser.role)) return false;
  //     if (item.requiredPermissions && !item.requiredPermissions.some((p) => safeUser.permissions.includes(p))) return false;
  //     return true;
  //   });

  const filterDropdown = (list, parentItem) =>
    list.filter((item) => {
      if (parentItem.requiredRoles && !parentItem.requiredRoles.includes(safeUser.role)) return false;
      if (item.permission && !safeUser.permissions.includes(item.permission.toLowerCase())) return false;
      return true;
    });


  if (items.every((item) => !hasAccess(item))) {
    return <div className="p-4 text-gray-500">No accessible menu items</div>;
  }

  return (
    <ul className="space-y-2 p-4">
      {items.map((item, index) => {
        if (!hasAccess(item)) return null;

        const IconComponent = iconMap[item.icon];
        const isDropdownOpen = openDropdown === index;
        const relevantDropdownItems = filterDropdown(dropitem[index] || [], item);

        return (
          <li key={index} className="group relative">
            {item.link ? (
              <Link to={item.link}>
                <div
                  className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
                >
                  {IconComponent && <IconComponent className="text-blue-500 mr-3 text-lg" />}
                  <span className="text-gray-700 font-medium flex-1">{item.label}</span>
                </div>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
                >
                  {IconComponent && <IconComponent className="text-blue-500 mr-3 text-lg" />}
                  <span className="text-gray-700 font-medium flex-1">{item.label}</span>
                  {relevantDropdownItems.length > 0 &&
                    (isDropdownOpen ? (
                      <iconMap.FaChevronUp className="text-blue-500 text-sm" />
                    ) : (
                      <iconMap.FaChevronDown className="text-blue-500 text-sm" />
                    ))}
                </button>

                {/* ✅ Correct placement of dropdown rendering */}
                {isDropdownOpen && relevantDropdownItems.length > 0 && (
                  <SideDropdown dropitems={relevantDropdownItems} iconMap={iconMap} />
                )}
              </>
            )}

          </li>
        );
      })}
    </ul>);
}

//_------------------------------------ OLDER CODES----------------------------------------------------------


// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// // import { iconMap } from '../shared/icons';
// import SideDropdown from './SideDropdown';
// import {iconMap} from '../../shared/icons';

// export default function SidebarItem({ items, dropitem, user }) {
//   console.log('User data:', user);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const safeUser = {
//     role: user?.role || '',
//     permissions: user?.permissions || [],
//   };
//   console.log('Safe user:', safeUser);

//   const toggleDropdown = (index) => {
//     setOpenDropdown((prev) => (prev === index ? null : index));
//   };

//   const hasAccess = (item) => {
//     if (item.requiredRoles && !item.requiredRoles.includes(safeUser.role)) return false;
//     if (item.requiredPermissions && !item.requiredPermissions.some((p) => safeUser.permissions.includes(p))) return false;
//     return true;
//   };

//   const filterDropdown = (list, parentItem) =>
//     list.filter((item) => {
//       if (parentItem.requiredRoles && !parentItem.requiredRoles.includes(safeUser.role)) return false;
//       return !item.permission || safeUser.permissions.includes(item.permission);
//     });

//   if (items.every((item) => !hasAccess(item))) {
//     return <div className="p-4 text-gray-500">No accessible menu items</div>;
//   }

//   return (
//     <ul className="space-y-2 p-4">
//       {items.map((item, index) => {
//         if (!hasAccess(item)) return null;

//         const IconComponent = iconMap[item.icon];
//         const isDropdownOpen = openDropdown === index;
//         const relevantDropdownItems = filterDropdown(dropitem[index] || [], item);

//         return (
//           <li key={index} className="group relative">
//             <Link to={item.link}>
//               <button
//                 onClick={() => toggleDropdown(index)}
//                 className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
//               >
//                 {IconComponent && <IconComponent className="text-blue-500 mr-3 text-lg" />}
//                 <span className="text-gray-700 font-medium flex-1">{item.label}</span>
//                 {relevantDropdownItems.length > 0 &&
//                   (isDropdownOpen ? (
//                     <iconMap.FaChevronUp className="text-blue-500 text-sm" />
//                   ) : (
//                     <iconMap.FaChevronDown className="text-blue-500 text-sm" />
//                   ))}
//               </button>
//             </Link>
//             {relevantDropdownItems.length > 0 && (
//               <div
//                 className={`transition-all duration-200 ${isDropdownOpen ? 'block' : 'hidden'}`}
//               >
//                 <SideDropdown dropitems={relevantDropdownItems} iconMap={iconMap} />
//               </div>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaChevronUp, FaChevronDown, FaUser, FaBook, FaCar, FaUserPlus, FaTable } from 'react-icons/fa';
// import SideDropdown from './SideDropdown'; // Adjust the import path as needed

// // Map icon strings to actual icon components
// const iconMap = {
//   FaUser,
//   FaBook,
//   FaCar,
//   FaUserPlus,
//   FaTable,
// };

// export default function SidebarItem({ items, dropitem, user }) {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Fallback if user is not defined
//   const safeUser = {
//     role: user?.role || '',
//     permissions: user?.permissions || [],
//   };

//   const toggleDropdown = (index) => {
//     setOpenDropdown((prev) => (prev === index ? null : index));
//   };

//   const hasAccess = (item) => {
//     if (item.requiredRoles && !item.requiredRoles.includes(safeUser.role)) return false;
//     if (item.requiredPermissions && !item.requiredPermissions.some((p) => safeUser.permissions.includes(p))) return false;
//     return true;
//   };

//   const filterDropdown = (list) =>
//     list.filter((item) => !item.permission || safeUser.permissions.includes(item.permission));

//   return (
//     <ul className="space-y-2 p-4">
//       {items.map((item, index) => {
//         if (!hasAccess(item)) return null;

//         const IconComponent = iconMap[item.icon];
//         const isDropdownOpen = openDropdown === index;
//         const relevantDropdownItems = filterDropdown(dropitem[index] || []);

//         return (
//           <li key={index} className="group relative">
//             <Link to={item.link}>
//               <button
//                 onClick={() => toggleDropdown(index)}
//                 className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
//               >
//                 {IconComponent && <IconComponent className="text-blue-500 mr-3 text-lg" />}
//                 <span className="text-gray-700 font-medium flex-1">{item.label}</span>
//                 {relevantDropdownItems.length > 0 &&
//                   (isDropdownOpen ? (
//                     <FaChevronUp className="text-blue-500 text-sm" />
//                   ) : (
//                     <FaChevronDown className="text-blue-500 text-sm" />
//                   ))}
//               </button>
//             </Link>
//             {relevantDropdownItems.length > 0 && (
//               <div
//                 className={`transition-all duration-200 ${isDropdownOpen ? 'block' : 'hidden group-hover:block'}`}
//               >
//                 <SideDropdown dropitems={relevantDropdownItems} />
//               </div>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// import { useState } from "react";

// const sidebarItems = [
//   { icon: 'FaUser', label: 'Driver Manage', link: '#', requiredPermissions: ['ADD_DRIVER', 'VIEW_DRIVER'] },
//   { icon: 'FaBook', label: 'Customer Manage', link: '#', requiredPermissions: ['ADD_CUSTOMER', 'VIEW_CUSTOMER'] },
//   { icon: 'FaCar', label: 'Car Manage', link: '#', requiredPermissions: ['ADD_CAR', 'VIEW_CAR'] },
//   { icon: 'FaUser', label: 'Admin', link: '#', requiredRoles: ['superadmin'] },
//   { icon: 'FaUser', label: 'User', link: '#', requiredRoles: ['superadmin'] }
// ];

// export default function SidebarItem ({ sidebarItems, dropitem, user }) {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Fallback if user is not defined
//   const safeUser = {
//     role: user?.role || '',
//     permissions: user?.permissions || []
//   };

//   const toggleDropdown = (index) => {
//     setOpenDropdown((prev) => (prev === index ? null : index));
//   };

//   const hasAccess = (item) => {
//     if (item.requiredRoles && !item.requiredRoles.includes(safeUser.role)) return false;
//     if (item.requiredPermissions && !item.requiredPermissions.some(p => safeUser.permissions.includes(p))) return false;
//     return true;
//   };

//   const filterDropdown = (list) =>
//     list.filter((item) => !item.permission || safeUser.permissions.includes(item.permission));

//   return (
//     <ul className="space-y-2 p-4">
//       {items.map((item, index) => {
//         if (!hasAccess(item)) return null;

//         const IconComponent = iconMap[item.icon];
//         const isDropdownOpen = openDropdown === index;
//         const relevantDropdownItems = filterDropdown(dropitem[index] || []);

//         return (
//           <li key={index} className="group relative">
//             <Link to={item.link}>
//               <button
//                 onClick={() => toggleDropdown(index)}
//                 className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
//               >
//                 {IconComponent && <IconComponent className="text-blue-500 mr-3 text-lg" />}
//                 <span className="text-gray-700 font-medium flex-1">{item.label}</span>
//                 {relevantDropdownItems.length > 0 &&
//                   (isDropdownOpen ? (
//                     <FaChevronUp className="text-blue-500 text-sm" />
//                   ) : (
//                     <FaChevronDown className="text-blue-500 text-sm" />
//                   ))}
//               </button>
//             </Link>
//             {relevantDropdownItems.length > 0 && (
//               <div
//                 className={`transition-all duration-200 ${
//                   isDropdownOpen ? 'block' : 'hidden group-hover:block'
//                 }`}
//               >
//                 <SideDropdown dropitems={relevantDropdownItems} />
//               </div>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };




// import { useState } from 'react';
// import { FaUser, FaCar, FaBook, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import SideDropdown from './SideDropdown';

// // Map icon names to actual icon components
// const iconMap = {
//   FaUser: FaUser,
//   FaCar: FaCar,
//   FaBook: FaBook,
// };

// const SidebarItem = ({ items, dropitem }) => {
//   // State for click-based fallback (accessibility)
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Toggle dropdown on click for accessibility
//   const toggleDropdown = (index) => {
//     setOpenDropdown((prev) => (prev === index ? null : index));
//   };

//   // Get relevant dropdown items based on the main item's index
//   const getRelevantDropdownItems = (index) => {
//     if (!dropitem || !Array.isArray(dropitem) || index >= dropitem.length) {
//       return [];
//     }
//     return dropitem[index] || [];
//   };

//   return (
//     <ul className="space-y-2 p-4">
//       {items.map((item, index) => {
//         const IconComponent = iconMap[item.icon];
//         const isDropdownOpen = openDropdown === index;
//         const relevantDropdownItems = getRelevantDropdownItems(index);

//         return (
//           <li key={index} className="group relative">
//             <Link to={item.link}>
//               <button
//                 onClick={() => toggleDropdown(index)} // Fallback for accessibility
                
//                 className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
//                 aria-expanded={isDropdownOpen}
//               >
//                 {IconComponent && (
//                   <IconComponent className="text-blue-500 mr-3 text-lg" />
//                 )}
//                 <span className="text-gray-700 font-medium flex-1">
//                   {item.label}
//                 </span>
//                 {relevantDropdownItems.length > 0 && (
//                   <>
//                     {isDropdownOpen ? (
//                       <FaChevronUp className="text-blue-500 text-sm" />
//                     ) : (
//                       <FaChevronDown className="text-blue-500 text-sm" />
//                     )}
//                   </>
//                 )}
//               </button>
//             </Link>
//             {relevantDropdownItems.length > 0 && (
//               <div
//                 className={`transition-all duration-200 ${
//                   isDropdownOpen ? 'block' : 'hidden group-hover:block'
//                 }`}
//               >
//                 <SideDropdown dropitems={relevantDropdownItems} />
//               </div>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default SidebarItem;


// import { useState } from 'react';
// import { FaUser, FaCar, FaBook, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import SideDropdown from './SideDropdown';

// // Map icon names to actual icon components
// const iconMap = {
//   FaUser: FaUser,
//   FaCar: FaCar,
//   FaBook: FaBook,
// };

// export default function SidebarItem ({ items, dropitem }){
//   // State for click-based fallback (accessibility)
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Toggle dropdown on click for accessibility
//   const toggleDropdown = (index) => {
//     setOpenDropdown((prev) => (prev === index ? null : index));
//   };

//   // Get relevant dropdown items based on the main item's index
//   const getRelevantDropdownItems = (index) => {
//     if (!dropitem || !Array.isArray(dropitem) || index >= dropitem.length) {
//       return [];
//     }
//     return dropitem[index] || [];
//   };

//   return (
//     <ul className="space-y-2 p-4">
//       {items.map((item, index) => {
//         const IconComponent = iconMap[item.icon];
//         const isDropdownOpen = openDropdown === index;
//         const relevantDropdownItems = getRelevantDropdownItems(index);
// // console.log("Sidebar items received:", items);

//         return (
//         <li key={index} className="group relative">
//   {/* <Link
//     to={item.link}
//     onClick={() => toggleDropdown(index)} // Still supports dropdown toggling
//     className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
//     aria-expanded={isDropdownOpen}
//   > */}
//    <Link
//   to={item.link}
//   onClick={() => {
//     if (relevantDropdownItems.length > 0) {
//       toggleDropdown(index);
//     }
//   }}
//   className="flex items-center w-full text-white px-4 py-2 text-left rounded-lg hover:bg-blue-200 text-grey-100 transition-colors"
//   aria-expanded={isDropdownOpen}
// >
//     {IconComponent && (
//       <IconComponent className="text-blue-500 mr-3 text-lg" />
//     )}
//     <span className="text-gray-700 font-medium flex-1">
//       {item.label}
//     </span>
    
//     {relevantDropdownItems.length > 0 && (
//       <>
//         {isDropdownOpen ? (
//           <FaChevronUp className="text-blue-500 text-sm" />
//         ) : (
//           <FaChevronDown className="text-blue-500 text-sm" />
//         )}
//       </>
//     )}
//   </Link>

//   {relevantDropdownItems.length > 0 && (
//     <div
//       className={`transition-all duration-200 ${
//         isDropdownOpen ? 'block' : 'hidden group-hover:block'
//       }`}
//     >
//       <SideDropdown dropitems={relevantDropdownItems} />
//     </div>
//   )}
// </li>
//         );
//       })}
//     </ul>
//   );
// };

