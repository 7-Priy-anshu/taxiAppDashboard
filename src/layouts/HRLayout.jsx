import { useAuth } from '../context/AuthContext';
import NavbarHR from '../components/Navbar/NavbarHR'; // Adjusted path
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

export default function HRLayout() {
  const { user } = useAuth();
  return (
    <div className="flex w-full h-screen flex-col">
      <NavbarHR />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-100">
          <Sidebar user={user} />
          {/* <Sidebar role={user.role} permissions={user.permissions}  /> */}
          
        </aside>
        <main className="flex-1 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// import Button from '../components/Button';
// import AddButton from '../components/AddButton';
// import LineChart from '../components/Charts/LineChart';
// import BarChart from '../components/Charts/BarChart';
// import PieChart from '../components/Charts/PieChart';
// import { FaPlus } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// export default function HRLayout() {
//   return (
//     <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6 ">
      
//       {/* Top-right Add Admin Button */}
//       <div className="flex gap-2 justify-end">
//         {/* Add Admin */}
//         <Link to="/superadmin/addAdmin">
//           <AddButton text="Add Admin">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//         {/* Add HR */}
//         <Link to="/superadmin/addHr">
//           <AddButton text="Add HR">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//       </div>

//       {/* Buttons + Pie Chart Section */}
//       <div className="flex flex-col lg:flex-row gap-6">
        
//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
//           <Link to="/superadmin/viewDriver">
//             <Button text="All Drivers" />
//           </Link>
//           <Link to="/superadmin/viewCustomer">
//             <Button text="All Customers" />
//           </Link>
//           <Link to="/superadmin/viewCar">
//             <Button text="All Cars" />
//           </Link>
//           <Link to="/superadmin/viewAdmin">
//             <Button text="All Admins" />
//           </Link>
//           <Link to="/superadmin/viewRide">
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