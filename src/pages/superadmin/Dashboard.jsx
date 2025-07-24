
import React, { useState } from 'react';




import AddButton from '../../components/AddButton';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import BarChart from '../../components/Charts/BarChart';
// import Button from '../../components/Button';
import Button from '../HorizontalBarChart/Button';
// import PieChart from '../../components/Charts/PieChart';
// import HorizontalBarChart from '../HorizontalBarChart/HorizontalBarChart';
import DoughnutChart from '../HorizontalBarChart/DoughnutChart';
import MultiAreaChart from '../HorizontalBarChart/MultiAreaChart';
import SingleBarChart from '../HorizontalBarChart/SingleBarChart ';
import BubbleChart from '../HorizontalBarChart/BubbleChart';
import MultipleBarChart from '../HorizontalBarChart/MultipleBarChart';


export default function SuperAdminDashboard() {
  

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-2">
      {/* Top-right Add Admin Button */}
      <div className="flex gap-2 justify-end">
        <Link to="/company-admin/addAdmin">
          <AddButton text="Add Admin">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
        <Link to="/company-admin/addHr">
          <AddButton text="Add Hr">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
      </div>

      {/* Buttons + Pie Chart Section */}
      <div className="   lg:flex-row gap-8">
        {/* Action Buttons */}
<div className=" flex flex-wrap  sm:space-y-2   space-x-3.5  ">
  <Link to="/superAdmin/client/:clientId/addDriver">
    <Button text="All Drivers" />
  </Link>

  <Link to="/superAdmin/client/:clientId/addCustomer">
    <Button text="All Customers" />
  </Link>

  <Link to="/superAdmin/client/:clientId/addCar">
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
    <div className= "  max-sm:col-span-12 sm:col-span-12   xl:col-span-4   sm:mt-9  lg:mt-4  justify-center items-center ">
  <div className="w-full  h-full rounded-xl px-2 bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 shadow-lg p-4   flex items-center justify-center">
    <DoughnutChart />
  </div>
</div>


     
      {/* Line and Bar Charts Section */}
<div className="max-sm:col-span-12 sm:col-span-12   xl:col-span-8 flex justify-center items-center sm:mt-0 lg:mt-4 ">
  <div className="w-full rounded-xl h-full  bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 shadow-lg  sm:pt-1 lg:pt-7 flex items-center justify-center">
     < MultiAreaChart/>
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
      <div className="w-full rounded-xl    sm:py-2  h-full  lg:py-3.5 xl:py-4.5   bg-gradient-to-br from-sky-100 via-blue-50 to-slate-100 shadow-lg   flex items-center justify-center">
 
       <BubbleChart/>
        </div>
      </div>

        <div className=" max-sm:col-span-12 sm:col-span-12  xl:col-span-5 flex justify-center items-center  mt-3">
      <div className=" w-full   h-full rounded-xl bg-gradient-to-br py-2 from-sky-100 via-blue-50 to-slate-100 shadow-lg  flex items-center justify-center">
 
       <MultipleBarChart/>
        </div>
      </div>

      {/* </div> */}

      </div>
      
    </div>
    </div>
  )}




