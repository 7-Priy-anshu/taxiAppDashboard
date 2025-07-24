// import { useAuth } from '../../context/AuthContext'; // Adjusted from '../context/AuthContext'
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar/Sidebar'; // Adjusted from '../components/Sidebar/Sidebar'
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import SuperadminSidebar from '../components/SuperadminSidebar';

export default function SuperadminLayout() {
  const { user } = useAuth();
  return (
    <div className="flex w-full h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* <aside className="w-64 bg-gray-100">  */}
          <SuperadminSidebar/>
         {/* </aside> */}
        <main className="flex-1 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
// // import { useAuth } from '../../context/AuthContext'; // Adjusted from '../context/AuthContext'
// import { useAuth } from '../context/AuthContext';
// import Sidebar from '../components/Sidebar/Sidebar'; // Adjusted from '../components/Sidebar/Sidebar'
// import NavbarHR from '../components/Navbar/NavbarHR'; // Adjusted path
// import { Outlet } from 'react-router-dom';

// export default function SuperadminLayout() {
//   const { user } = useAuth();
//   return (
//     <div className="flex w-full h-screen flex-col">
//       <NavbarHR />
//       <div className="flex flex-1 overflow-hidden">
//         {/* <aside className="w-64 bg-gray-100"> */}
//           {/* <Sidebar user={user} /> */}
//         {/* </aside> */}
//         <main className="flex-1 bg-white overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// import { useAuth } from '../context/AuthContext';
// import Sidebar from '../components/Sidebar/Sidebar';
// import NavbarHR from '../components/Navbar/NavbarHR';
// import { Outlet } from 'react-router-dom';

// export default function SuperadminLayout() {
//   const { user } = useAuth();
//   return (
//       <div className="flex w-full h-screen flex-col">
//              <NavbarHR />
//             <div className="flex flex-1 overflow-hidden">
//                  {/* Sidebar content */}
//                  <aside className="w-64 bg-gray-100">
//                      <Sidebar user={user} />
//                  </aside>
//                  {/* Main content */}
//                  <main className="flex-1 bg-white overflow-y-auto">
//                  {/* <main className="flex-1 bg-gray-50 overflow-y-auto"> */}
//                      <Outlet />
//                  </main>
//              </div>
//          </div> 
//     // <div>
//     //   <Sidebar user={user} />
//     //   {/* other components */}
//     // </div>
//   );
// }


// import { Outlet } from "react-router-dom";
// import Sidebar from "@components/Sidebar/Sidebar";
// import NavbarHR from "@components/Navbar/NavbarHR";
// import { useState } from "react";

// export default function SuperadminLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex min-h-screen bg-white">
//         <NavbarHR onMenuClick={toggleSidebar} />
//       <div className="flex-1 flex flex-col w-full">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar/Sidebar";
// import NavbarHR from "../components/Navbar/NavbarHR";
// import { useState } from "react";

// export default function SuperadminLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     // <div className="flex h-screen overflow-hidden">
//     <div className="flex flex-col min-h-screen">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       <div className="flex flex-col flex-1">
//         <NavbarHR onMenuClick={toggleSidebar} />

//         {/* <main className="flex-1 overflow-y-auto bg-gray-100 p-4"> */}
//         <main className="flex-1 overflow-y-auto bg-gray-100 p-4 min-h-0">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar/Sidebar";
// import NavbarHR from "../pages/NavbarHR";

// export default function SuperadminLayout() {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 overflow-y-auto bg-gray-100">
//         {/* Navbar */}
//         <NavbarHR />

//         {/* Page Content */}
//         <main className="flex-1 p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// import { Outlet} from "react-router-dom";
// import Sidebar from "../components/Sidebar/Sidebar";
// import NavbarHR from "../pages/NavbarHR";

// export default function SuperadminLayout() {
//   return (
//   <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         {/* Navbar */}
//         <NavbarHR />

//         {/* Page content */}
//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>

//   );
// }


// import { Outlet } from "react-router-dom";
// export default function SuperadminLayout() {
//   return (
//     <div>
//       <h1>Superadmin Layout</h1>
//       <Outlet />
//     </div>
//   );
// }

// import Button from '../pages/Button';
// import AddButton from '../pages/AddButton';
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