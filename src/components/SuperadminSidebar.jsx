import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";

import { useAuth } from '../context/AuthContext';
import DriverHistory from '../pages/superadmin/DriverHistory';

export default function SuperadminSidebar() {
  const { user } = useAuth(); // ✅ if you’re using context
  const { clientId } = useParams();
  const [expandedMenuStatic, setExpandedMenuStatic] = useState({});
  const [clients, setClients] = useState([]);
  const [expandedClient, setExpandedClient] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState({}); // { companyId: 'admin' | 'hr' }

  const VITE_API = import.meta.env.VITE_API;

  // Toggle Sub-menu for companies  
  const toggleSubMenuStatic = (key) => {
    setExpandedMenuStatic((prev) => ({
      ...prev,
      [key]: prev[key] ? null : true,
    }));
  };


  // Toggle Sub-menu for companies  
  const toggleCompany = (_id) => {
    setExpandedClient(prev => (prev === _id ? null : _id));
    setExpandedMenu({}); // collapse nested menus
  };

  const toggleSubMenu = (companyId, type) => {
    setExpandedMenu(prev => ({
      ...prev,
      [companyId]: prev[companyId] === type ? null : type,
    }));
  };

  useEffect(() => {
    // Replace this URL with your actual backend endpoint
    axios.get(`${VITE_API}view/client`)
      .then((response) => {
        console.log("Response from /view/client:", response.data);
        setClients(response.data.clientData || []);
      })

      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  return (
    <div className="w-64 bg-blue-50 h-screen p-4 overflow-auto">
      <div className="mb-2 ">
        <div className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200">
          <Link to="/superAdmin/driverHistory"><span>Driver History</span></Link>
        </div>
      </div>
      <div className="mb-2">
        <div
          className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
          onClick={() => toggleSubMenuStatic('client')}
        >
          <span>Manage Client</span>
          {expandedMenuStatic['client'] ? <FaChevronDown /> : <FaChevronRight />}
        </div>

        {expandedMenuStatic['client'] && (
          <div className="ml-4 mt-2 space-y-1 text-sm">
            <Link to="/superAdmin/addClient" className="block hover:underline">
              Add Client
            </Link>
            <Link to="/superAdmin/viewClient" className="block hover:underline">
              View Clients
            </Link>
          </div>
        )}
      </div>
      <div className="mb-2">
        <div
          className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
          onClick={() => toggleSubMenuStatic('car')}
        >
          <span>Manage Car</span>
          {expandedMenuStatic['car'] ? <FaChevronDown /> : <FaChevronRight />}
        </div>

        {expandedMenuStatic['car'] && (
          <div className="ml-4 mt-2 space-y-1 text-sm">
            <Link to="/superAdmin/addCar" className="block hover:underline">
              Add Car
            </Link>
            <Link to="/superAdmin/viewCar" className="block hover:underline">
              View Cars
            </Link>
          </div>
        )}
      </div>

      <div className="mb-2">
        <div
          className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
          onClick={() => toggleSubMenuStatic('hub')}
        >
          <span>Hub</span>
          {expandedMenuStatic['hub'] ? <FaChevronDown /> : <FaChevronRight />}
        </div>

        {expandedMenuStatic['hub'] && (
          <div className="ml-4 mt-2 space-y-1 text-sm">
            <Link to="/superadmin/addHub" className="block hover:underline">Add Hub</Link>
            <Link to="/superadmin/viewHub" className="block hover:underline">View Hub</Link>
            {/* <Link to="/superadmin/assignCarHub" className="block hover:underline">AssignCar Hub</Link>
      <Link to="/superadmin/viewCarHub" className="block hover:underline">ViewCar Hub</Link> */}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">Companies</h2>
      {/* <DriverHistory/> */}
      {clients.map((client) => (
        <div key={client._id} className="mb-2">
          {/* <div
            className="*:object-contain flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
            onClick={() => toggleCompany(client._id)}
          >
            <span>{client.clientName}</span>
            {expandedClient === client._id ? <FaChevronDown className='opacity-70' /> : <FaChevronRight className='opacity-60' />}
          </div> */}
          <div className="flex justify-between items-center p-2 rounded hover:bg-blue-200">
            {/* Clicking on client name navigates to ClientDetails */}
            <Link
              to={`/superadmin/client/${client._id}/clientDetails`}
              className="flex-grow text-black-800 font-medium "
            >
              {client.clientName}
            </Link>

            {/* Chevron icon only toggles submenus */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompany(client._id);
              }}
              className="ml-2 text-gray-600 hover:text-black"
            >
              {expandedClient === client._id ? (
                <FaChevronDown className="opacity-70" />
              ) : (
                <FaChevronRight className="opacity-60" />
              )}
            </button>
          </div>

          {expandedClient === client._id && (
            <div className="ml-4 mt-2 space-y-1">
              {/* Manage Admin */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
                  onClick={() => toggleSubMenu(client._id, 'admin')}
                >
                  <span className="text-sm font-semibold">Manage Admin</span>
                  {expandedMenu[client._id] === 'admin' ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {expandedMenu[client._id] === 'admin' && (
                  <div className="ml-4 mt-1 text-sm space-y-1">
                    <Link to={`/superadmin/client/${client._id}/addAdmin`} className="block hover:underline">Add Admin</Link>
                    <Link to={`/superadmin/client/${client._id}/addHr`} className="block hover:underline">Add Hr</Link>
                    <Link to={`/superadmin/client/${client._id}/viewAdmin`} className="block hover:underline">View Admin</Link>
                    <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>
                  </div>
                )}
              </div>

              {/* Manage HR */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
                  onClick={() => toggleSubMenu(client._id, 'hr')}
                >
                  <span className="text-sm font-semibold">Manage HR</span>
                  {expandedMenu[client._id] === 'hr' ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {expandedMenu[client._id] === 'hr' && (
                  <div className="ml-4 mt-1 text-sm space-y-1">
                    <Link to={`/superadmin/client/${client._id}/addDriver`} className="block hover:underline">Add Driver</Link>
                    <Link to={`/superadmin/client/${client._id}/addCustomer`} className="block hover:underline">Add Customer</Link>
                    {/* <Link to={`/superadmin/client/${client._id}/addCar`} className="block hover:underline">Add Car</Link> */}
                    <Link to={`/superadmin/client/${client._id}/viewDriver`} className="block hover:underline">View Drivers</Link>
                    <Link to={`/superadmin/client/${client._id}/viewCustomer`} className="block hover:underline">View Customers</Link>
                    {/* <Link to={`/superadmin/client/${client._id}/viewCar`} className="block hover:underline">View Cars</Link> */}
                    <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>

                    {/* ✅ Add this line for Driver History */}
                    <Link to={`/client/${client._id}/driver-history`} className="block hover:underline">Driver History</Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


// // components/SuperadminSidebar.jsx
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// // import { companies } from "../data/companies";

// export default function SuperadminSidebar() {
// // data/companies.js
//   const companies = [
//   {
//     id: "c1",
//     name: "Tech Solutions",
//   },
//   {
//     id: "c2",
//     name: "NextGen Innovators",
//   },
//   {
//     id: "c3",
//     name: "FutureSoft Pvt Ltd",
//   },
// ];

//   const [expanded, setExpanded] = useState(null);
//   const toggleCompany = (id) => {
//     setExpanded(expanded === id ? null : id);
//   };
//   const location = useLocation();

//   return (
//     <div className="w-64 bg-gray-100 p-4 h-full">
//       <h2 className="text-xl font-bold mb-4">Companies</h2>
//       {companies.map((company) => (
//         <div key={company.id} className="mb-2">
//           <button
//             onClick={() => toggleCompany(company.id)}
//             className="w-full text-left font-semibold"
//           >
//             {company.name}
//           </button>

//           {expanded === company.id && (
//             <div className="pl-4 mt-2 space-y-1">
//               <Link
//                 to={`/superAdmin/company/${company.id}/admin`}
//                 className={`block hover:underline ${
//                   location.pathname.includes(`/company/${company.id}/admin`) && "font-bold"
//                 }`}
//               >
//                 Manage Admin
//               </Link>
//               <Link
//                 to={`/superAdmin/company/${company.id}/hr`}
//                 className={`block hover:underline ${
//                   location.pathname.includes(`/company/${company.id}/hr`) && "font-bold"
//                 }`}
//               >
//                 Manage HR
//               </Link>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
