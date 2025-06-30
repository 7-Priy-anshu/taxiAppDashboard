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
    { icon: 'FaUserPlus', label: 'Add Driver', link: '/superadmin/addDriver', permission: 'add_driver' },
    { icon: 'FaTable', label: 'View Drivers', link: '/superadmin/viewDriver', permission: 'view_driver' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Add Customer', link: '/superadmin/addCustomer', permission: 'add_customer' },
    { icon: 'FaTable', label: 'View Customer', link: '/superadmin/viewCustomer', permission: 'view_customer' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Add Car', link: '/superadmin/addCar', permission: 'add_car' },
    { icon: 'FaTable', label: 'View Car', link: '/superadmin/viewCar', permission: 'view_car' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Create Admin', link: '/superadmin/addAdmin', permission: 'add_admin' },
    { icon: 'FaTable', label: 'View Admin', link: '/superadmin/viewAdmin', permission: 'view_admin' },
  ],
  [
    { icon: 'FaUserPlus', label: 'Create HR', link: '/superadmin/addHr', permission: 'add_hr' },
    { icon: 'FaTable', label: 'View HR', link: '/superadmin/viewHr', permission: 'view_hr' },
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
    <aside className="w-64 h-screen bg-gray-100 shadow-lg overflow-y-auto">
      <SidebarItem items={sidebarItems} dropitem={dropdownItem} user={user.user} />
    </aside>
  );
}
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

