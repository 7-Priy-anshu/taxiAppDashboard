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
        <Link to="/main-admin/addCustomer">
          <AddButton text="Add Employee">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
        <Link to="/main-admin/addHr">
          <AddButton text="Add Hr">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
      </div>

      {/* Buttons + Pie Chart Section */}
      <div className="flex flex-row lg:flex-row gap-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
          <Link to="/main-admin/viewDriver">
            <Button text="All Drivers" />
          </Link>
          <Link to="/main-admin/viewCustomer">
            <Button text="All Customers" />
          </Link>
          <Link to="/main-admin/viewCar">
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

// // import Button from './Button';
// // import AddButton from './AddButton';
// import Button from '../../components/Button';
// import AddButton from '../../components/AddButton';
// import LineChart from '../components/Charts/LineChart';
// import BarChart from '../components/Charts/BarChart';
// import PieChart from '../components/Charts/PieChart';
// import { FaPlus } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// export default function MainContent() {
//   return (
//     <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
      
//       {/* Top-right Add main-admin Button */}
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

// import React from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import { Link } from "react-router-dom";


// export default function CompanyAdminDashboard() {
//   const user = {
//     role: "admin",
//     permissions: [],
//   };

//   return (
//     <div className="flex">
//       <Sidebar role={user.role} permissions={user.permissions} />
//       <main className="ml-64 p-6 w-full min-h-screen bg-gray-100">
//         <h1 className="text-2xl font-bold">admin Dashboard</h1>
//         <p>Welcome, admin!</p>
//       </main>
//     </div>
//   );
// }
