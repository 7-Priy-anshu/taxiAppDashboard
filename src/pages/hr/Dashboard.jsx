import React from 'react';

import AddButton from "../../components/AddButton";

import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';


import Button from '../../components/Button'
import DoughnutChart from '../../components/Charts/DoughnutChart';
import MultiAreaChart from '../../components/Charts/MultiAreaChart';
import SingleBarChart from '../../components/Charts/SingleBarChart';
import BubbleChart from '../../components/Charts/BubbleChart';
import MultipleBarChart from '../../components/Charts/MultipleBarChart';

export default function HRDashboard() {
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
// import React from 'react';
// import Button from "../../components/Button";
// import AddButton from "../../components/AddButton";
// import LineChart from "../../components/Charts/LineChart"; // Adjusted path
// import BarChart from "../../components/Charts/BarChart";   // Adjusted path
// import PieChart from "../../components/Charts/PieChart";   // Adjusted path
// import { FaPlus } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// export default function HRDashboard() {
//   return (
//     <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
//       {/* Top-right Add Admin Button */}
//       <div className="flex gap-2 justify-end">
//         <Link to="/main-admin/addCustomer">
//           <AddButton text="Add Employee">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//         <Link to="/main-admin/addHr">
//           <AddButton text="Add Hr">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//       </div>

//       {/* Buttons + Pie Chart Section */}
//       <div className="flex flex-row lg:flex-row gap-6">
//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
//           <Link to="/main-admin/viewDriver">
//             <Button text="All Drivers" />
//           </Link>
//           <Link to="/main-admin/viewCustomer">
//             <Button text="All Customers" />
//           </Link>
//           <Link to="/main-admin/viewCar">
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
//       <div className="flex flex-row md:flex-row">
//         <div className="w-64 md:w-1/2">
//           <LineChart />
//         </div>
//         <div className="w-64 md:w-1/2">
//           <BarChart />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import { Link } from "react-router-dom";
// import AddButton from "../../components/AddButton";
// import BackButton from "../../components/BackButton";
// import Button from "../../components/Button"
// import { FaPlus } from "react-icons/fa";
// import PieChart from "../../components/Charts/PieChart"
// import BarChart from "../../components/Charts/BarChart"
// import LineChart from "../../components/Charts/LineChart"
// export default function HRDashboard() {
//   const user = {
//     role: "person",
//     permissions: ['addDriver','addCustomer','addCar','viewDriver','viewCustomer','viewCar','bookRide'],
//   };

//   return (
//     <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
//       {/* Top-right Add Admin Button */}
//       {/* <div className="flex gap-2 justify-end">
//         <Link to="/company-admin/addAdmin">
//           <AddButton text="Add Admin">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//         <Link to="/company-admin/addHr">
//           <AddButton text="Add Hr">
//             <FaPlus className="ml-2" />
//           </AddButton>
//         </Link>
//       </div> */}

//       {/* Buttons + Pie Chart Section */}
//       <div className="flex flex-row lg:flex-row gap-6">
//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
//           <Link to="/main-admin/viewDriver">
//             <Button text="All Drivers" />
//           </Link>
//           <Link to="/main-admin/viewCustomer">
//             <Button text="All Customers" />
//           </Link>
//           <Link to="/main-admin/viewCar">
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
//       <div className="flex flex-row md:flex-row">
//         <div className="w-64 md:w-1/2">
//           <LineChart />
//         </div>
//         <div className="w-64 md:w-1/2">
//           <BarChart />
//         </div>
//       </div>
//     </div>
//   );
//     // <main className="w-full bg-white rounded shadow p-6">
//     //     {/* <h1 className="text-2xl font-bold">hr Dashboard</h1>
//     //     <p>Welcome, hr!</p> */}
//     //      <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
//     //    {/* Top-right Add Admin Button */}
//     //    <div className="flex gap-2 justify-end">
//     //      <Link to="/admin/addAdmin">
//     //        <AddButton text="Add Admin">
//     //          <FaPlus className="ml-2" />
//     //        </AddButton>
//     //      </Link>
//     //    </div>

//     //    {/* Buttons + Pie Chart Section */}
//     //    <div className="flex flex-col lg:flex-row gap-6">
//     //      {/* Action Buttons */}
//     //      <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
//     //        <Link to="/company-admin/viewDriver">
//     //          <Button text="All Drivers" />
//     //        </Link>
//     //        <Link to="/company-admin/viewCustomer">
//     //          <Button text="All Customers" />
//     //        </Link>
//     //        <Link to="/company-admin/viewCar">
//     //          <Button text="All Cars" />
//     //        </Link>
//     //      </div>

//     //      {/* Pie Chart */}
//     //      <div className="w-full lg:w-1/2 flex justify-center items-center">
//     //        <div className="w-full max-w-xs md:max-w-sm">
//     //          <PieChart />
//     //        </div>
//     //      </div>
//     //    </div>

//     //    {/* Line and Bar Charts Section */}
//     //    <div className="flex flex-col md:flex-row gap-6">
//     //      <div className="w-full md:w-1/2">
//     //        <LineChart />
//     //      </div>
//     //      <div className="w-full md:w-1/2">
//     //        <BarChart />
//     //      </div>
//     //    </div>
//     //  </div>
//     //   </main>
// }
