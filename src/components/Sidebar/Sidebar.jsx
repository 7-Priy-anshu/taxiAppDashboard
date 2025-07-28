import React from 'react';
import SidebarItem from './SidebarItem';
import { FaUser, FaBook, FaCar, FaUserPlus, FaTable } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // if using Vite with default resolution

const sidebarItems = [
  {
    icon: 'FaUser',
    label: 'Manage Driver',
    requiredPermissions: ['add_driver', 'view_driver'],
  },
  {
    icon: 'FaBook',
    label: 'Manage Customer',
    requiredPermissions: ['add_customer', 'view_customer'],
  },
  {
    icon: 'FaCar',
    label: 'Manage Car',
    requiredPermissions: ['add_car', 'view_car'],
  },
  {
    icon: 'FaCar',
    label: 'Manage HR',
    requiredPermissions: ['add_hr', 'view_hr'],
  },
  {
    icon: 'FaCar',
    label:'Book Ride',
    link: '/admin/bookRide',
    requiredPermissions: ['book_ride','book_ride'],
  }
  // {
  //   icon: 'FaUser',
  //   label: 'Superadmin',
  //   requiredRoles: ['superadmin'],
  // },
  // {
  //   icon: 'FaUser',
  //   label: 'Admin',
  //   requiredRoles: ['admin'],
  // },
  // {
  //   icon: 'FaUser',
  //   label: 'User',
  //   requiredRoles: ['user'],
  // },
];

const dropdownItem = [
  [
    { icon: 'FaUserPlus', label: 'Add Driver', link: '/admin/addDriver', permission: 'add_driver' },
    { icon: 'FaTable', label: 'View Drivers', link: '/admin/viewDriver', permission: 'view_driver' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Add Customer', link: '/admin/addCustomer', permission: 'add_customer' },
    { icon: 'FaTable', label: 'View Customer', link: '/admin/viewCustomer', permission: 'view_customer' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Add Car', link: '/admin/addCar', permission: 'add_car' },
    { icon: 'FaTable', label: 'View Car', link: '/admin/viewCar', permission: 'view_car' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Create Admin', link: '/admin/addAdmin', permission: 'add_admin' },
    { icon: 'FaTable', label: 'View Admin', link: '/admin/viewAdmin', permission: 'view_admin' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Create HR', link: '/admin/addHr', permission: 'add_hr' },
    { icon: 'FaTable', label: 'View HR', link: '/admin/viewHr', permission: 'view_hr' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Book Rides', link: '/admin/bookRide', permission: 'book_ride' },
    { icon: 'FaUserPlus', label: 'Book Rides', link: '/admin/bookRide', permission: 'book_ride' },
  ],
  [], // Empty array for "User" to avoid undefined issues
];

export default function Sidebar() {
  const { user } = useAuth(); // user.permissions
  console.log('Sidebar user:', user); // Debug log

    if (!user) {
    return <div className="p-4 text-gray-500">Loading sidebar...</div>;
  }
  return (
    <aside className="w-64 h-full bg-gray-100 shadow-lg overflow-y-auto">
      <SidebarItem items={sidebarItems} dropitem={dropdownItem} user={user} />
    </aside>
  );
}

// import React from 'react';
// import SidebarItem from './SidebarItem';
// import { FaUser, FaBook, FaCar, FaUserPlus, FaTable } from 'react-icons/fa';
// import { useAuth } from '../../context/AuthContext';

// const sidebarItems = [
//   {
//     icon: 'FaUser',
//     label: 'Manage Driver',
//     requiredPermissions: ['add_driver', 'view_driver'],
//   },
//   {
//     icon: 'FaBook',
//     label: 'Manage Customer',
//     requiredPermissions: ['add_customer', 'view_customer'],
//   },
//   {
//     icon: 'FaCar',
//     label: 'Manage Car',
//     requiredPermissions: ['add_car', 'view_car'],
//   },
//   {
//     icon: 'FaCar',
//     label: 'Manage HR',
//     requiredPermissions: ['add_hr', 'view_hr'],
//   },
//   {
//     icon: 'FaCar',
//     label: 'Book Ride',
//     link: '/superAdmin/bookRide',
//     requiredPermissions: ['book_ride', 'book_ride'],
//   },
// ];

// const dropdownItem = [
//   [
//     { icon: 'FaUserPlus', label: 'Add Driver', link: '/superAdmin/addDriver', permission: 'add_driver' },
//     { icon: 'FaTable', label: 'View Drivers', link: '/superAdmin/viewDriver', permission: 'view_driver' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Add Customer', link: '/superAdmin/addCustomer', permission: 'add_customer' },
//     { icon: 'FaTable', label: 'View Customer', link: '/superAdmin/viewCustomer', permission: 'view_customer' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Add Car', link: '/superAdmin/addCar', permission: 'add_car' },
//     { icon: 'FaTable', label: 'View Car', link: '/superAdmin/viewCar', permission: 'view_car' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Create Admin', link: '/superAdmin/addAdmin', permission: 'add_admin' },
//     { icon: 'FaTable', label: 'View Admin', link: '/superAdmin/viewAdmin', permission: 'view_admin' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Create HR', link: '/superAdmin/addHr', permission: 'add_hr' },
//     { icon: 'FaTable', label: 'View HR', link: '/superAdmin/viewHr', permission: 'view_hr' },
//   ],
//   [],
// ];

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const { user } = useAuth();
//   console.log('Sidebar user:', user);

//   if (!user) {
//     return <div className="p-4 text-gray-500 text-sm">Loading sidebar...</div>;
//   }

//   return (
//     <aside
//       className={`fixed inset-y-0 left-0 z-20 bg-gray-100 shadow-md overflow-y-auto transition-transform duration-300 ease-in-out transform ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } w-56 sm:w-64 lg:w-72 md:static md:translate-x-0 md:h-screen`}
//     >
//       <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
//         <div className="text-lg font-bold text-gray-700">Menu</div>
//         <button
//           onClick={toggleSidebar}
//           className="text-gray-600 hover:text-gray-800 focus:outline-none"
//           aria-label="Close sidebar"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//       <SidebarItem items={sidebarItems} dropitem={dropdownItem} user={user} />
//     </aside>
//   );
// }

// import React from 'react';
// import SidebarItem from './SidebarItem';
// import { FaUser, FaBook, FaCar, FaUserPlus, FaTable } from 'react-icons/fa';
// import { useAuth } from '../../context/AuthContext'; // if using Vite with default resolution

// const sidebarItems = [
//   {
//     icon: 'FaUser',
//     label: 'Manage Driver',
//     requiredPermissions: ['add_driver', 'view_driver'],
//   },
//   {
//     icon: 'FaBook',
//     label: 'Manage Customer',
//     requiredPermissions: ['add_customer', 'view_customer'],
//   },
//   {
//     icon: 'FaCar',
//     label: 'Manage Car',
//     requiredPermissions: ['add_car', 'view_car'],
//   },
//   {
//     icon: 'FaCar',
//     label: 'Manage HR',
//     requiredPermissions: ['add_hr', 'view_hr'],
//   },
//   {
//     icon: 'FaCar',
//     label:'Book Ride',
//     link: '/superAdmin/bookRide',
//     requiredPermissions: ['book_ride','book_ride'],
//   }
//   // {
//   //   icon: 'FaUser',
//   //   label: 'Superadmin',
//   //   requiredRoles: ['superadmin'],
//   // },
//   // {
//   //   icon: 'FaUser',
//   //   label: 'Admin',
//   //   requiredRoles: ['admin'],
//   // },
//   // {
//   //   icon: 'FaUser',
//   //   label: 'User',
//   //   requiredRoles: ['user'],
//   // },
// ];

// const dropdownItem = [
//   [
//     { icon: 'FaUserPlus', label: 'Add Driver', link: '/superadmin/addDriver', permission: 'add_driver' },
//     { icon: 'FaTable', label: 'View Drivers', link: '/superadmin/viewDriver', permission: 'view_driver' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Add Customer', link: '/superadmin/addCustomer', permission: 'add_customer' },
//     { icon: 'FaTable', label: 'View Customer', link: '/superadmin/viewCustomer', permission: 'view_customer' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Add Car', link: '/superadmin/addCar', permission: 'add_car' },
//     { icon: 'FaTable', label: 'View Car', link: '/superadmin/viewCar', permission: 'view_car' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Create Admin', link: '/superadmin/addAdmin', permission: 'add_admin' },
//     { icon: 'FaTable', label: 'View Admin', link: '/superadmin/viewAdmin', permission: 'view_admin' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Create HR', link: '/superadmin/addHr', permission: 'add_hr' },
//     { icon: 'FaTable', label: 'View HR', link: '/superadmin/viewHr', permission: 'view_hr' },
//   ],
//   // [
//   //   { icon: 'FaUserPlus', label: 'Book Rides', link: '/superadmin/bookRide', permission: 'book_ride' },
//   //   { icon: 'FaUserPlus', label: 'Book Rides', link: '/superadmin/bookRide', permission: 'book_ride' },
//   // ],
//   [], // Empty array for "User" to avoid undefined issues
// ];

// export default function Sidebar() {
//   const { user } = useAuth(); // user.permissions
//   console.log('Sidebar user:', user); // Debug log

//     if (!user) {
//     return <div className="p-4 text-gray-500">Loading sidebar...</div>;
//   }
//   return (
//     <aside className="w-64 h-screen bg-gray-100 shadow-md overflow-y-auto">
//       <SidebarItem items={sidebarItems} dropitem={dropdownItem} user={user} />
//     </aside>
//   );
// }

// import SidebarItem from './SidebarItem';
// import { FaUser, FaBook, FaCar, FaUserPlus, FaTable } from 'react-icons/fa';

// const sidebarItems = [
//   {
//     icon: 'FaUser',
//     label: 'Manage Driver',
//     link: '#',
//     requiredPermissions: ['add_driver', 'view_driver'],
//   },
//   {
//     icon: 'FaBook',
//     label: 'Manage Customer',
//     link: '#',
//     requiredPermissions: ['add_customer', 'view_customer'],
//   },
//   {
//     icon: 'FaCar',
//     label: 'Manage Car',
//     link: '#',
//     requiredPermissions: ['add_car', 'view_car'],
//   },
//   {
//     icon: 'FaUser',
//     label: 'Superadmin',
//     link: '#',
//     requiredRoles: ['superadmin'],
//   },
//   {
//     icon: 'FaUser',
//     label: 'Admin',
//     link: '#',
//     requiredRoles: ['admin'],
//   },
//   {
//     icon: 'FaUser',
//     label: 'User',
//     link: '#',
//     requiredRoles: ['user'],
//   },
// ];

// const dropdownItem = [
//   [
//     { icon: 'FaUserPlus', label: 'Add Driver', link: '/superadmin/addDriver', permission: 'add_driver' },
//     { icon: 'FaTable', label: 'View Drivers', link: '/superadmin/viewDriver', permission: 'view_driver' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Add Customer', link: '/superadmin/addCustomer', permission: 'add_customer' },
//     { icon: 'FaTable', label: 'View Customer', link: '/superadmin/viewCustomer', permission: 'view_customer' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Add Car', link: '/superadmin/addCar', permission: 'add_car' },
//     { icon: 'FaTable', label: 'View Car', link: '/superadmin/viewCar', permission: 'view_car' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Create Admin', link: '/superadmin/addAdmin', permission: 'add_admin' },
//     { icon: 'FaTable', label: 'View Admin', link: '/superadmin/viewAdmin', permission: 'view_admin' },
//   ],
//   [
//     { icon: 'FaUserPlus', label: 'Create User', link: '/superadmin/addUser', permission: 'add_user' },
//     { icon: 'FaTable', label: 'View User', link: '/superadmin/viewUser', permission: 'view_user' },
//   ],
//   [], // Empty array for "User" to avoid undefined issues
// ];
// // const sidebarItems = [
// //   {
// //     icon: 'FaUser',
// //     label: 'Manage Driver ',
// //     link: '#',
// //     requiredPermissions: ['add_driver', 'view_driver'],
// //   },
// //   {
// //     icon: 'FaBook',
// //     label: 'Manage Customer ',
// //     link: '#',
// //     requiredPermissions: ['add_customer', 'view_customer'],
// //   },
// //   {
// //     icon: 'FaCar',
// //     label: 'Manage Car ',
// //     link: '#',
// //     requiredPermissions: ['add_car', 'view_car'],
// //   },
// //   {
// //     icon: 'FaUser',
// //     label: 'Superadmin',
// //     link: '#',
// //     requiredRoles: ['superadmin'],
// //   },
// //   {
// //     icon: 'FaUser',
// //     label: 'Admin',
// //     link: '#',
// //     requiredRoles: ['admin'],
// //   },
// //   {
// //     icon: 'FaUser',
// //     label: 'User',
// //     link: '#',
// //     requiredRoles: ['user'],
// //   },
// // ];

// // const dropdownItem = [
// //   [
// //     { icon: 'FaUserPlus', label: 'Add Driver', link: '/superadmin/addDriver', permission: 'add_driver' },
// //     { icon: 'FaTable', label: 'View Drivers', link: '/superadmin/viewDriver', permission: 'view_driver' },
// //   ],
// //   [
// //     { icon: 'FaUserPlus', label: 'Add Customer', link: '/superadmin/addCustomer', permission: 'add_customer' },
// //     { icon: 'FaTable', label: 'View Customer', link: '/superadmin/viewCustomer', permission: 'view_customer' },
// //   ],
// //   [
// //     { icon: 'FaUserPlus', label: 'Add Car', link: '/superadmin/addCar', permission: 'add_car' },
// //     { icon: 'FaTable', label: 'View Car', link: '/superadmin/viewCar', permission: 'view_car' },
// //   ],
// //   [
// //     { icon: 'FaUserPlus', label: 'Create Admin', link: '/superadmin/addAdmin' },
// //     { icon: 'FaTable', label: 'View Admin', link: '/superadmin/viewAdmin' },
// //   ],
// //   [
// //     { icon: 'FaUserPlus', label: 'Create User', link: '/superadmin/addUser' },
// //     { icon: 'FaTable', label: 'View User', link: '/superadmin/viewUser' },
// //   ],
// // ];

// export default function Sidebar({ user }) {
//   return (
//     <aside className="w-64 h-screen bg-gray-100 shadow-lg overflow-y-auto">
//       {/* <h2 className="text-xl font-bold py-4 px-4">Taxi App</h2> */}
//       <SidebarItem items={sidebarItems} dropitem={dropdownItem} user={user} />
//     </aside>
//   );
// }


// import SidebarItem from './SidebarItem';
// const sidebarItems = [
//   { icon: 'FaUser', label: 'Driver Manage', link: '#' },
//   { icon: 'FaBook', label: 'Customer Manage', link: '#' },
//   { icon: 'FaCar', label: 'Car Manage', link: '#' },
//   { icon: 'FaUser', label: 'Admin', link: '#' },
//   { icon: 'FaUser', label: 'HR', link: '#' },
// ];

// const dropdownItem= [
//   [ 
//    {icon: 'FaUserPlus', label: 'Add Driver', link: '/superadmin/addDriver'},
//    {icon: 'FaTable', label: 'View Drivers', link: '/superadmin/viewDriver'}
//   ],
//   [
//    {icon: 'FaUserPlus', label: 'Add Customer', link: '/superadmin/addCustomer'},
//    {icon: 'FaTable', label: 'View Customer', link: '/superadmin/viewCustomer'}
//   ],
//   [
//    {icon: 'FaUserPlus', label: 'Add Car', link: '/superadmin/addCar'},
//    {icon: 'FaTable', label: 'View Car', link: '/superadmin/viewCar'}
//   ],
//   [
//    {icon: 'FaUserPlus', label: 'Create Admin', link: '/superadmin/addAdmin'},
//    {icon: 'FaTable', label: 'View Admin', link: '/superadmin/viewAdmin'}
//   ],
//   [
//    {icon: 'FaUserPlus', label: 'Create HR', link: '/superadmin/addHR'},
//    {icon: 'FaTable', label: 'View HR', link: '/superadmin/viewHR'}
//   ],
// ]

// export default function Sidebar() {
//   return(
//      <aside className="w-64 h-screen bg-gray-100 shadow-lg overflow-visible scrollable">
//         {/* <h2 className="text-xl font-bold py-4 px-4">Taxi App</h2> */}
//       <SidebarItem items={sidebarItems} dropitem={dropdownItem} />
//      </aside>
//   );
// };

