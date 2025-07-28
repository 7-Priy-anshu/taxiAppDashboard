import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import AddButton from "../../components/AddButton";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button"
import { FaPlus } from "react-icons/fa";
import PieChart from "../../components/Charts/PieChart"
import BarChart from "../../components/Charts/BarChart"
import LineChart from "../../components/Charts/LineChart"
export default function HRDashboard() {
  const user = {
    role: "hr",
    permissions: ['addDriver','addCustomer','addCar','viewDriver','viewCustomer','viewCar','bookRide'],
  };

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
      {/* Top-right Add Admin Button */}
      {/* <div className="flex gap-2 justify-end">
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
      </div> */}

      {/* Buttons + Pie Chart Section */}
      <div className="flex flex-row lg:flex-row gap-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
          <Link to="/admin/viewDriver">
            <Button text="All Drivers" />
          </Link>
          <Link to="/admin/viewCustomer">
            <Button text="All Customers" />
          </Link>
          <Link to="/admin/viewCar">
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
    // <main className="w-full bg-white rounded shadow p-6">
    //     {/* <h1 className="text-2xl font-bold">hr Dashboard</h1>
    //     <p>Welcome, hr!</p> */}
    //      <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
    //    {/* Top-right Add Admin Button */}
    //    <div className="flex gap-2 justify-end">
    //      <Link to="/admin/addAdmin">
    //        <AddButton text="Add Admin">
    //          <FaPlus className="ml-2" />
    //        </AddButton>
    //      </Link>
    //    </div>

    //    {/* Buttons + Pie Chart Section */}
    //    <div className="flex flex-col lg:flex-row gap-6">
    //      {/* Action Buttons */}
    //      <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
    //        <Link to="/company-admin/viewDriver">
    //          <Button text="All Drivers" />
    //        </Link>
    //        <Link to="/company-admin/viewCustomer">
    //          <Button text="All Customers" />
    //        </Link>
    //        <Link to="/company-admin/viewCar">
    //          <Button text="All Cars" />
    //        </Link>
    //      </div>

    //      {/* Pie Chart */}
    //      <div className="w-full lg:w-1/2 flex justify-center items-center">
    //        <div className="w-full max-w-xs md:max-w-sm">
    //          <PieChart />
    //        </div>
    //      </div>
    //    </div>

    //    {/* Line and Bar Charts Section */}
    //    <div className="flex flex-col md:flex-row gap-6">
    //      <div className="w-full md:w-1/2">
    //        <LineChart />
    //      </div>
    //      <div className="w-full md:w-1/2">
    //        <BarChart />
    //      </div>
    //    </div>
    //  </div>
    //   </main>
}
