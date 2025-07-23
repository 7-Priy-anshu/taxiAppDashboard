import React from 'react';
import Button from "../../components/Button";
import AddButton from "../../components/AddButton";
import LineChart from "../../components/Charts/LineChart"; // Adjusted path
import BarChart from "../../components/Charts/BarChart";   // Adjusted path
import PieChart from "../../components/Charts/PieChart";   // Adjusted path
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function CompanyAdminDashboard() {
  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
      {/* Top-right Add Admin Button */}
      <div className="flex gap-2 justify-end">
        <Link to="/superAdmin/addAdmin">
          <AddButton text="Add Admin">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
        <Link to="/superAdmin/addClient">
          <AddButton text="Add Client">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
      </div>

      {/* Buttons + Pie Chart Section */}
      <div className="flex flex-row lg:flex-row gap-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
          <Link to="/company-admin/viewDriver">
            <Button text="All Drivers" />
          </Link>
          <Link to="/company-admin/viewCustomer">
            <Button text="All Customers" />
          </Link>
          <Link to="/company-admin/viewCar">
            <Button text="All Cars" />
          </Link>
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-xs md:max-w-sm">
            <PieChart />
          </div>
        </div>
      </div>

      {/* Line and Bar Charts Section */}
      <div className="flex flex-row md:flex-row">
        <div className="w-64 md:w-1/2">
          <LineChart />
        </div>
        <div className="w-64 md:w-1/2">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

// SuperAdminDashboard.jsx
// -------------------------------------------Dummy Companies Data DIsplyed----------------------------------------

// import React, { useState } from 'react';

// export default function SuperAdminDashboard() {
//   // sampleData.js
// //  const companies = [
// //   {
// //     companyId: 'cmp1',
// //     companyName: 'TechCorp',
// //     admin: {
// //       name: 'Alice Johnson',
// //       email: 'alice@techcorp.com',
// //       mobile: '9876543210',
// //     },
// //     hrs: [
// //       { name: 'Bob HR', email: 'bob@techcorp.com', permissions: ['add_driver', 'view_driver'] },
// //       { name: 'Carol HR', email: 'carol@techcorp.com', permissions: ['view_driver'] },
// //     ],
// //   },
// //   {
// //     companyId: 'cmp2',
// //     companyName: 'InnovaSoft',
// //     admin: {
// //       name: 'David Smith',
// //       email: 'david@innovasoft.com',
// //       mobile: '9123456789',
// //     },
// //     hrs: [
// //       { name: 'Eve HR', email: 'eve@innovasoft.com', permissions: ['add_car'] },
// //     ],
// //   },
// //   {
// //     companyId: 'cmp3',
// //     companyName: 'LogiWorld',
// //     admin: {
// //       name: 'Frank Lee',
// //       email: 'frank@logiworld.com',
// //       mobile: '9988776655',
// //     },
// //     hrs: [],
// //   },
// // ];

// //   const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0].companyId);

// //   const selectedCompany = companies.find(c => c.companyId === selectedCompanyId);

//   return (
//     <h2>Dashborad Superadmin</h2>
    // <div className="flex">
    //   {/* Sidebar */}
    //   <div className="w-64 bg-gray-100 min-h-screen p-4 border-r">
    //     <h2 className="text-xl font-semibold mb-4">Companies</h2>
    //     <ul>
    //       {companies.map((company) => (
    //         <li
    //           key={company.companyId}
    //           className={`cursor-pointer p-2 mb-2 rounded ${
    //             selectedCompanyId === company.companyId ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
    //           }`}
    //           onClick={() => setSelectedCompanyId(company.companyId)}
    //         >
    //           {company.companyName}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    //   {/* Main Content */}
    //   <div className="flex-1 p-6">
    //     <h2 className="text-2xl font-bold mb-4">{selectedCompany.companyName} Dashboard</h2>

    //     {/* Admin Info */}
    //     <div className="mb-6">
    //       <h3 className="text-lg font-semibold">Admin Details</h3>
    //       <p><strong>Name:</strong> {selectedCompany.admin.name}</p>
    //       <p><strong>Email:</strong> {selectedCompany.admin.email}</p>
    //       <p><strong>Mobile:</strong> {selectedCompany.admin.mobile}</p>
    //     </div>

    //     {/* HR List */}
    //     <div>
    //       <h3 className="text-lg font-semibold">HRs</h3>
    //       {selectedCompany.hrs.length === 0 ? (
    //         <p>No HRs added yet.</p>
    //       ) : (
    //         <table className="w-full text-left border">
    //           <thead>
    //             <tr className="bg-gray-200">
    //               <th className="p-2 border">Name</th>
    //               <th className="p-2 border">Email</th>
    //               <th className="p-2 border">Permissions</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {selectedCompany.hrs.map((hr, index) => (
    //               <tr key={index} className="border-b">
    //                 <td className="p-2 border">{hr.name}</td>
    //                 <td className="p-2 border">{hr.email}</td>
    //                 <td className="p-2 border">{hr.permissions.join(', ')}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       )}
    //     </div>
    //   </div>
    // </div>
//   );
// }

// -------------------------------------------Last Executing Code----------------------------------------
// import React from 'react';
// import Button from "../../components/Button";
// import AddButton from "../../components/AddButton";
// import LineChart from "../../components/Charts/LineChart"; // Adjusted path
// import BarChart from "../../components/Charts/BarChart";   // Adjusted path
// import PieChart from "../../components/Charts/PieChart";   // Adjusted path
// import { FaPlus } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// export default function SuperadminDashboard() {
//   return (
//     <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
//       {/* Top-right Add Admin Button */}
//       <div className="flex gap-2 justify-end">
//         <Link to="/company-admin/addAdmin">
//           <AddButton text="Add Admin">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//       </div>

//       {/* Buttons + Pie Chart Section */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
//           <Link to="/company-admin/viewDriver">
//             <Button text="All Drivers" />
//           </Link>
//           <Link to="/company-admin/viewCustomer">
//             <Button text="All Customers" />
//           </Link>
//           <Link to="/company-admin/viewCar">
//             <Button text="All Cars" />
//           </Link>
//         </div>

//         {/* Pie Chart */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center">
//           <div className="w-full max-w-xs md:max-w-sm">
//             <PieChart />
//           </div>
//         </div>
//       </div>

//       {/* Line and Bar Charts Section */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-1/2">
//           <LineChart />
//         </div>
//         <div className="w-full md:w-1/2">
//           <BarChart />
//         </div>
//       </div>
//     </div>
//   );
// }
// // import Button from './components/Button';
// // import AddButton from '../components/AddButton';
// import AddButton from '../../components/AddButton';
// import Button from '../../components/Button';
// import LineChart from '../components/Charts/LineChart';
// import BarChart from '../components/Charts/BarChart';
// import PieChart from '../components/Charts/PieChart';
// import { FaPlus } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// export default function MainContent() {
//   return (
//     <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
      
//       {/* Top-right Add Admin Button */}
//       <div className="flex gap-2 justify-end">
//         {/* Add Admin */}
//         <Link to="/superAdmin/addAdmin">
//           <AddButton text="Add Admin">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//         {/* Add HR */}
//         <Link to="/superAdmin/addHr">
//           <AddButton text="Add HR">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//       </div>

//       {/* Buttons + Pie Chart Section */}
//       <div className="flex flex-col lg:flex-row gap-6">
        
//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
//           <Link to="/superAdmin/viewDriver">
//             <Button text="All Drivers" />
//           </Link>
//           <Link to="/superAdmin/viewCustomer">
//             <Button text="All Customers" />
//           </Link>
//           <Link to="/superAdmin/viewCar">
//             <Button text="All Cars" />
//           </Link>
//           <Link to="/superAdmin/viewAdmin">
//             <Button text="All Admins" />
//           </Link>
//           <Link to="/superAdmin/viewRide">
//             <Button text="All Rides"/>
//           </Link>
//         </div>

//         {/* Pie Chart */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center">
//           <div className="w-full max-w-xs md:max-w-sm">
//             <PieChart />
//           </div>
//         </div>
//       </div>

//       {/* Line and Bar Charts Section */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-1/2">
//           <LineChart />
//         </div>
//         <div className="w-full md:w-1/2">
//           <BarChart />
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import AddButton from "../../components/AddButton";
// import Button from "../../components/Button";
// import BarChart from "../../components/Charts/BarChart";
// import LineChart from "../../components/Charts/LineChart";
// import PieChart from "../../components/Charts/PieChart";
// import { FaUser, FaPlus, FaPhone, FaIdCard, FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa";

// export default function SuperadminDashboard() {
//   return (
//     <div className="w-full bg-white rounded shadow p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Add Admin</h2>
//         <Link to="/superAdmin/addAdmin">
//           <AddButton text="Add Admin">
//             <FaPlus />
//           </AddButton>
//         </Link>
//       </div>

//       {/* Top buttons + PieChart */}
//       <div className="flex flex-col md:flex-row gap-6 mb-6">
//         <div className="flex flex-wrap gap-2">
//           <Button text="All Drivers" />
//           <Button text="All Customers" />
//           <Button text="All Car" />
//           <Button text="Book Ride" />
//         </div>

//         <div className="flex-1 flex justify-center items-center min-w-[200px]">
//           <PieChart />
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="w-full md:w-1/2">
//           <LineChart />
//         </div>
//         <div className="w-full md:w-1/2">
//           <BarChart />
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";

// export default function SuperadminDashboard() {
//   const user = {
//     role: "superadmin",
//     permissions: [],
//   };

//   return (
//     <div className="flex">
//       <Sidebar role={user.role} permissions={user.permissions} />
//       <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
//         <h1 className="text-2xl font-bold">Superadmin Dashboard</h1>
//         <p>Welcome, Superadmin!</p>
//       </main>
//     </div>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Dashboard() {
//   const { role } = useParams();
//   const { user } = useAuth();

//   // Validate role
//   if (role !== user.role) {
//     return <div>Access Denied</div>;
//   }

//   // dynamic render
//   switch (role) {
//     case "superadmin":
//       return <SuperAdminDashboard />;
//     case "admin":
//       return <AdminDashboard />;
//     case "hr":
//       return <HrDashboard />;
//     default:
//       return <div>Invalid role</div>;
//   }
// }
