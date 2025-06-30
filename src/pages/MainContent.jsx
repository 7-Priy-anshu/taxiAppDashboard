import Button from './Button';
import AddButton from './AddButton';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function MainContent() {
  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden px-4 py-6 space-y-6">
      
      {/* Top-right Add Admin Button */}
      <div className="flex gap-2 justify-end">
        {/* Add Admin */}
        <Link to="/superadmin/addAdmin">
          <AddButton text="Add Admin">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
        {/* Add HR */}
        <Link to="/superadmin/addHr">
          <AddButton text="Add HR">
            <FaPlus className="ml-2" />
          </AddButton>
        </Link>
      </div>

      {/* Buttons + Pie Chart Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 w-full lg:w-1/2">
          <Link to="/superadmin/viewDriver">
            <Button text="All Drivers" />
          </Link>
          <Link to="/superadmin/viewCustomer">
            <Button text="All Customers" />
          </Link>
          <Link to="/superadmin/viewCar">
            <Button text="All Cars" />
          </Link>
          <Link to="/superadmin/viewAdmin">
            <Button text="All Admins" />
          </Link>
          <Link to="/superadmin/viewRide">
            <Button text="All Rides"/>
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
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <LineChart />
        </div>
        <div className="w-full md:w-1/2">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

// import Button from './Button';
// import AddButton from './AddButton';
// import LineChart from '../components/LineChart';
// import BarChart from '../components/BarChart';
// import PieChart from '../components/PieChart';
// import { FaPlus } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// export default function MainContent(){
//   return (
//     <div className="bg-white flex flex-col min-h-screen w-full overflow-x-hidden">
//       {/* Add Admin */}
//       {/* <div className="p-4 flex flex-end md:flex-row gap-4 w-full"> */}
//       <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
//         <Link to="/superadmin/addAdmin">
//           <AddButton text="Add Admin"><FaPlus /></AddButton>
//         </Link>
//       </div>
//       {/* Top section: Buttons + PieChart */}
//       <div className="p-4 flex flex-col md:flex-row gap-4 w-full">
//         {/* Buttons Section - row on mobile, column on md+ */}
//         <div className="flex flex-col md:flex-row flex-wrap gap-2 w-full md:w-auto">
//           <Button text="All Drivers" />
//           <Button text="All Customers" />
//           <Button text="All Car" />
//           <Button text="Book Ride" />
//         </div>

//         {/* Pie Chart */}
//         <div className="flex-1 flex justify-center items-center min-w-[200px]">
//           <PieChart />
//         </div>
//       </div>

//       {/* Bottom section: Line and Bar charts */}
//       <div className="p-4 flex flex-col md:flex-row gap-4 w-full">
//         <div className="w-full md:w-1/2">
//           <LineChart />
//         </div>
//         <div className="w-full md:w-1/2">
//           <BarChart />
//         </div>
//       </div>
//     </div>
//   );
// };
