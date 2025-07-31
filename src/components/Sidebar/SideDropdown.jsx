import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SideDropdown({ dropitems, iconMap }) {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  if (!Array.isArray(dropitems) || dropitems.length === 0) {
    console.log('SideDropdown: No dropitems provided', dropitems);
    return null;
  }

  return (
    <div className="flex   flex-col">
      <ul className="flex flex-col space-y-1    p-2   max-h-40 overflow-y-auto">
        {dropitems.map((dropitem, index) => {
          const DropComponent = iconMap[dropitem.icon];
          return (
            <li key={index}>
              {dropitem.link ? (
                <Link to={dropitem.link}>
                  <button className="flex items-center  w-full px-4 py-1 text-left 
                  max-sm:text-xs md:text-sm rounded
                   text-gray-600
                   hover:bg-blue-200 transition-colors">
                    {DropComponent && (
                      <DropComponent className="text-blue-600  mr-2 text-xs md:text-sm" />
                    )}
                    <span className="text-gray-700 max-sm:text-[10px]  md:text-sm font-medium">
                      {dropitem.label || 'No Label'}
                    </span>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={dropitem.onClick || (() => {})}
                  className="flex items-center w-full px-4 py-1 text-left rounded text-gray-600 hover:bg-blue-100 transition-colors"
                >
                  {DropComponent && (
                    <DropComponent className="text-blue-600 text-xs md:text-sm mr-2 " />
                  )}
                  <span className="text-gray-700    max-sm:text-[10px]  md:text-sm font-medium">
                    {dropitem.label || 'No Label'}
                  </span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// export default function SideDropdown({ dropitems, iconMap }) {
//   const { user } = useAuth();

//   if (!user) return <div>Loading...</div>;

//   if (!Array.isArray(dropitems) || dropitems.length === 0) {
//     console.log('SideDropdown: No dropitems provided', dropitems);
//     return null;
//   }

//   return (
//     <div className="flex flex-col">
//       <ul className="flex flex-col space-y-1 p-2 max-h-40 overflow-y-auto">
//         {dropitems.map((dropitem, index) => {
//           const DropComponent = iconMap[dropitem.icon];
//           return (
//             <li key={index}>
//               {dropitem.link ? (
//                 <Link to={dropitem.link}>
//                   <button className="flex items-center w-full px-4 py-1 text-left text-sm rounded text-gray-600 hover:bg-blue-200 transition-colors">
//                     {DropComponent && (
//                       <DropComponent className="text-blue-600 mr-2 text-sm" />
//                     )}
//                     <span className="text-gray-700 font-medium">
//                       {dropitem.label || 'No Label'}
//                     </span>
//                   </button>
//                 </Link>
//               ) : (
//                 <button
//                   onClick={dropitem.onClick || (() => {})}
//                   className="flex items-center w-full px-4 py-1 text-left text-sm text-gray-600 hover:bg-blue-100 transition-colors"
//                 >
//                   {DropComponent && (
//                     <DropComponent className="text-blue-600 mr-2 text-sm" />
//                   )}
//                   <span className="text-gray-700 font-medium">
//                     {dropitem.label || 'No Label'}
//                   </span>
//                 </button>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// import { Link } from 'react-router-dom';

// export default function SideDropdown({ dropitems, iconMap }) {

// // fetch driver by id
//   if (!Array.isArray(dropitems) || dropitems.length === 0) {
//     console.log('SideDropdown: No dropitems provided', dropitems);
//     return null;
//   }

//   return (
//     <div className="flex flex-col">
//       <ul className="flex flex-col space-y-1 p-2 max-h-40 overflow-y-auto">
//         {dropitems.map((dropitem, index) => {
//           const DropComponent = iconMap[dropitem.icon];
//           return (
//             <li key={index}>
//               {dropitem.link ? (
//                 <Link to={dropitem.link}>
//                   <button className="flex items-center w-full px-4 py-1 text-left text-sm rounded text-gray-600 hover:bg-blue-200 transition-colors">
//                     {DropComponent && (
//                       <DropComponent className="text-blue-600 mr-2 text-sm" />
//                     )}
//                     <span className="text-gray-700 font-medium">
//                       {dropitem.label || 'No Label'}
//                     </span>
//                   </button>
//                 </Link>
//               ) : (
//                 <button
//                   onClick={dropitem.onClick || (() => {})}
//                   className="flex items-center w-full px-4 py-1 text-left text-sm text-gray-600 hover:bg-blue-100 transition-colors"
//                 >
//                   {DropComponent && (
//                     <DropComponent className="text-blue-600 mr-2 text-sm" />
//                   )}
//                   <span className="text-gray-700 font-medium">
//                     {dropitem.label || 'No Label'}
//                   </span>
//                 </button>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
// import { FaUserPlus, FaTable } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const dropdownIcon = {
//   FaUserPlus: FaUserPlus,
//   FaTable: FaTable,
// };

// export default function SideDropdown ({ dropitems }) {
//   if (!Array.isArray(dropitems) || dropitems.length === 0) {
//     console.log('SideDropdown: No dropitems provided', dropitems);
//     return null;
//   }

//   return (
//     <div className="flex flex-col">
//       <ul className="flex flex-col space-y-1 p-2 max-h-40 overflow-y-auto">
//         {dropitems.map((dropitem, index) => {
//           const DropComponent = dropdownIcon[dropitem.icon];
//           return (
//             <li key={index}>
//               {dropitem.link ? (
//                 <Link to={dropitem.link}>
//                   <button className="flex items-center w-full px-4 py-1 text-left text-sm rounded text-gray-600 hover:bg-blue-200 transition-colors">
//                     {DropComponent && (
//                       <DropComponent className="text-blue-600 mr-2 text-sm" />
//                     )}
//                     <span className="text-gray-700 font-medium">
//                       {dropitem.label || 'No Label'}
//                     </span>
//                   </button>
//                 </Link>
//               ) : (
//                 <button
//                   onClick={dropitem.onClick || (() => {})}
//                   className="flex items-center w-full px-4 py-1 text-left text-sm text-gray-600 hover:bg-blue-100 transition-colors"
//                 >
//                   {DropComponent && (
//                     <DropComponent className="text-blue-600 mr-2 text-sm" />
//                   )}
//                   <span className="text-gray-700 font-medium">
//                     {dropitem.label || 'No Label'}
//                   </span>
//                 </button>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

