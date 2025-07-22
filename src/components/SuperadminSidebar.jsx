import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const dummyCompanies = [
  { id: '1', name: 'Alpha Tech' },
  { id: '2', name: 'Beta Corp' },
  { id: '3', name: 'Gamma Ltd' },
];

export default function SuperadminSidebar() {
  const [companies, setCompanies] = useState([]);
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState({}); // { companyId: 'admin' | 'hr' }

  useEffect(() => {
    // Simulate API fetch
    setCompanies(dummyCompanies);
  }, []);

  const toggleCompany = (id) => {
    setExpandedCompany(prev => (prev === id ? null : id));
    setExpandedMenu({}); // collapse nested menus
  };

  const toggleSubMenu = (companyId, type) => {
    setExpandedMenu(prev => ({
      ...prev,
      [companyId]: prev[companyId] === type ? null : type,
    }));
  };

  return (
    <div className="w-64 bg-gray-100 h-screen p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Companies</h2>

      {companies.map((company) => (
        <div key={company.id} className="mb-2">
          <div
            className="flex justify-between items-center cursor-pointer p-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => toggleCompany(company.id)}
          >
            <span>{company.name}</span>
            {expandedCompany === company.id ? <FaChevronDown /> : <FaChevronRight />}
          </div>

          {expandedCompany === company.id && (
            <div className="ml-4 mt-2 space-y-1">
              {/* Manage Admin */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
                  onClick={() => toggleSubMenu(company.id, 'admin')}
                >
                  <span className="text-sm font-semibold">Manage Admin</span>
                  {expandedMenu[company.id] === 'admin' ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {expandedMenu[company.id] === 'admin' && (
                  <div className="ml-4 mt-1 text-sm space-y-1">
                    <Link to={`/company/${company.id}/add-admin`} className="block hover:underline">Add Admin</Link>
                    <Link to={`/company/${company.id}/view-admin`} className="block hover:underline">View Admin</Link>
                    <Link to={`/company/${company.id}/book-ride`} className="block hover:underline">Book Ride</Link>
                  </div>
                )}
              </div>

              {/* Manage HR */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
                  onClick={() => toggleSubMenu(company.id, 'hr')}
                >
                  <span className="text-sm font-semibold">Manage HR</span>
                  {expandedMenu[company.id] === 'hr' ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {expandedMenu[company.id] === 'hr' && (
                  <div className="ml-4 mt-1 text-sm space-y-1">
                    <Link to={`/company/${company.id}/add-driver`} className="block hover:underline">Add Driver</Link>
                    <Link to={`/company/${company.id}/add-customer`} className="block hover:underline">Add Customer</Link>
                    <Link to={`/company/${company.id}/add-car`} className="block hover:underline">Add Car</Link>
                    <Link to={`/company/${company.id}/view-drivers`} className="block hover:underline">View Drivers</Link>
                    <Link to={`/company/${company.id}/view-customers`} className="block hover:underline">View Customers</Link>
                    <Link to={`/company/${company.id}/view-cars`} className="block hover:underline">View Cars</Link>
                    <Link to={`/company/${company.id}/book-ride`} className="block hover:underline">Book Ride</Link>
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
