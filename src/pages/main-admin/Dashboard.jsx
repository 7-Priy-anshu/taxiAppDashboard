import React from 'react';
// import Button from "../../components/Button";
import AddButton from "../../components/AddButton";

import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

import Button from '../../components/Button'
import DoughnutChart from '../../components/Charts/DoughnutChart';
import MultiAreaChart from '../../components/Charts/MultiAreaChart';
import SingleBarChart from '../../components/Charts/SingleBarChart';
import BubbleChart from '../../components/Charts/BubbleChart';
import MultipleBarChart from '../../components/Charts/MultipleBarChart';


export default function CompanyAdminDashboard() {
  return (
     <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-2">
      {/* Top-right Add Admin Button */}
      <div className="flex gap-2 justify-end">
        <Link to="/superAdmin/addClient">
          <AddButton text="Add Client">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
        <Link to="/superAdmin/main-admin">
          <AddButton text="Add Admin">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
      </div>

      {/* Buttons + Pie Chart Section */}
      <div className="lg:flex-row gap-8">
        {/* Action Buttons */}
        <div className=" flex flex-wrap  sm:space-y-2   space-x-3.5  ">
          <Link to="/superAdmin/client/:clientId/viewDriver">
            <Button text="All Drivers" />
          </Link>

          <Link to="/superAdmin/client/:clientId/viewCustomer">
            <Button text="All Customers" />
          </Link>

          <Link to="/superAdmin/client/:clientId/viewCar">
            <Button text="All Cars" />
          </Link>

          <Link to="/superAdmin/client/:clientId/viewAdmin">
            <Button text="View Admin " />
          </Link>

          <Link to="/superAdmin/client/:clientId/bookRide" >
            <Button text="Book ride" />
          </Link>
        </div>




        <div className='grid grid-cols-12  lg:gap-5 gap-5   '>
          {/* <div className='w-full gap-6  flex '> */}
          <div className="  max-sm:col-span-12 sm:col-span-12   xl:col-span-4   sm:mt-9  lg:mt-4  justify-center items-center ">
            <div className="w-full  h-full rounded-xl px-2 bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 shadow-lg p-4   flex items-center justify-center">
              <DoughnutChart />
            </div>
          </div>



          {/* Line and Bar Charts Section */}
          <div className="max-sm:col-span-12 sm:col-span-12   xl:col-span-8 flex justify-center items-center sm:mt-0 lg:mt-4 ">
            <div className="w-full rounded-xl h-full  bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 shadow-lg  sm:pt-1 lg:pt-7 flex items-center justify-center">
              < MultiAreaChart />
            </div>
          </div>

          {/* </div> */}

          {/* <div className='flex flex-col-3 lg:flex-col-2  gap-6 w-full'> */}
          <div className="max-sm:col-span-12 sm:col-span-12    xl:col-span-5  flex justify-center items-center  mt-3">
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 shadow-lg p-1 pt-2 flex items-center justify-center">
              <SingleBarChart />
            </div>
          </div>

          <div className="max-sm:col-span-12  sm:col-span-12   xl:col-span-2 flex justify-center items-center  mt-3">
            <div className="w-full rounded-xl  sm:py-2  h-full  lg:py-3.5 xl:py-4.5   bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 shadow-lg   flex items-center justify-center">
              <BubbleChart />
            </div>
          </div>

          <div className=" max-sm:col-span-12 sm:col-span-12 xl:col-span-5 flex justify-center items-center  mt-3">
            <div className=" w-full   h-full rounded-xl bg-gradient-to-br cursor-pointer py-2 from-sky-100 via-blue-50 to-slate-100 shadow-lg  flex items-center justify-center">
              <MultipleBarChart />
            </div>
          </div>

          {/* </div> */}

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
