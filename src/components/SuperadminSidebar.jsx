import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import DriverHistory from '../pages/superadmin/DriverHistory';

export default function SuperadminSidebar() {
  const { user, token } = useAuth();
  const { clientId } = useParams();
  const [expandedMenuStatic, setExpandedMenuStatic] = useState({});
  const [clients, setClients] = useState([]);
  const [expandedClient, setExpandedClient] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState({});
  const [adminsByClient, setAdminsByClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const VITE_API = import.meta.env.VITE_API;

  const fetchAdminsForClient = async (clientId) => {
    try {
      const authToken = token || localStorage.getItem("token");
      const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
      setAdminsByClient((prev) => ({
        ...prev,
        [clientId]: response.data.user || [],
      }));
    } catch (error) {
      console.error(`Error fetching admins for client ${clientId}:`, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data || "No data available",
        headers: error.response?.headers || "No headers",
        config: error.config || "No config",
      });
    }
  };

  useEffect(() => {
    if (!user || !token) {
      console.error("No user or token available for authentication", { user, token });
      setIsLoading(false);
      return;
    }

    const fetchClients = async () => {
      try {
        const authToken = token || localStorage.getItem("token");
        console.log("Fetching clients with token:", authToken, "User role:", user.role, "VITE_API:", VITE_API);
        const response = await axios.get(`${VITE_API}view/client`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        console.log("Response from /view/client:", response.data);
        setClients(response.data.clientData || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data || "No data available",
          headers: error.response?.headers || "No headers",
          config: error.config || "No config",
        });
        setIsLoading(false);
      }
    };

    fetchClients();
    if (clientId) fetchAdminsForClient(clientId);
  }, [user, token, VITE_API, clientId]);

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading sidebar...</div>;
  }

  if (!user || !token || user.role !== "superAdmin") {
    return <div className="p-4 text-red-500">Access denied. Please log in as superAdmin.</div>;
  }

  const toggleSubMenuStatic = (key) => {
    setExpandedMenuStatic((prev) => ({
      ...prev,
      [key]: prev[key] ? null : true,
    }));
  };

  const toggleCompany = (_id) => {
    setExpandedClient(prev => (prev === _id ? null : _id));
    if (_id && !adminsByClient[_id]) {
      fetchAdminsForClient(_id);
    }
    setExpandedMenu({});
  };

  const toggleSubMenu = (companyId, type) => {
    setExpandedMenu(prev => ({
      ...prev,
      [companyId]: prev[companyId] === type ? null : type,
    }));
  };

  const isAdminCreatedBySuperAdminOrMainAdmin = (admin) => {
    // Filter by clientId since createdBy is not available
    return admin.client === clientId;
  };

  return (
    <div className="w-64 bg-blue-50 h-screen p-4 overflow-auto">
      <div className="mb-2">
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
            <Link to="/superAdmin/addClient" className="block hover:underline">Add Client</Link>
            <Link to="/superAdmin/viewClient" className="block hover:underline">View Clients</Link>
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
            <Link to="/superAdmin/addCar" className="block hover:underline">Add Car</Link>
            <Link to="/superAdmin/viewCar" className="block hover:underline">View Cars</Link>
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
          </div>
        )}
      </div>
      <h2 className="text-xl font-bold mb-4">Companies</h2>
      {clients.map((client) => (
        <div key={client._id} className="mb-2">
          <div className="flex justify-between items-center p-2 rounded hover:bg-blue-200">
            <Link
              to={`/superadmin/client/${client._id}/clientDetails`}
              className="flex-grow text-black-800 font-medium"
            >
              {client.clientName}
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompany(client._id);
              }}
              className="ml-2 text-gray-600 hover:text-black"
            >
              {expandedClient === client._id ? <FaChevronDown className="opacity-70" /> : <FaChevronRight className="opacity-60" />}
            </button>
          </div>
          {expandedClient === client._id && (
            <div className="ml-4 mt-2 space-y-1">
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
                  onClick={() => toggleSubMenu(client._id, 'main-admin')}
                >
                  <span className="text-sm font-semibold">Manage Admin</span>
                  {expandedMenu[client._id] === 'main-admin' ? <FaChevronDown /> : <FaChevronRight />}
                </div>
                {expandedMenu[client._id] === 'main-admin' && (
                  <div className="ml-4 mt-1 text-sm space-y-1">
                    <Link to={`/superadmin/client/${client._id}/addAdmin`} className="block hover:underline">Add Admin</Link>
                    <Link to={`/superadmin/client/${client._id}/addHr`} className="block hover:underline">Add Hr</Link>
                    <Link to={`/superadmin/client/${client._id}/viewAdminTable`} className="block hover:underline">View Admin</Link>
                    {adminsByClient[client._id]?.length > 0 ? (
                      adminsByClient[client._id]
                        .filter(isAdminCreatedBySuperAdminOrMainAdmin)
                        .map((admin) => (
                          <Link
                            key={admin._id}
                            to={`/superadmin/client/${client._id}/viewAdminTable/${admin._id}`}
                            className="block hover:underline"
                          >
                            {/* {admin.name || admin.email} (Client: {admin.client}) */}
                          </Link>
                        ))
                    ) : (
                      <span>No admins found</span>
                    )}
                    <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>
                  </div>
                )}
              </div>
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
                    <Link to={`/superadmin/client/${client._id}/viewDriver`} className="block hover:underline">View Drivers</Link>
                    <Link to={`/superadmin/client/${client._id}/viewCustomer`} className="block hover:underline">View Customers</Link>
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

// import React, { useState, useEffect } from 'react';
// import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';
// import DriverHistory from '../pages/superadmin/DriverHistory';

// export default function SuperadminSidebar() {
//   const { user, token } = useAuth();
//   const { clientId } = useParams();
//   const [expandedMenuStatic, setExpandedMenuStatic] = useState({});
//   const [clients, setClients] = useState([]);
//   const [expandedClient, setExpandedClient] = useState(null);
//   const [expandedMenu, setExpandedMenu] = useState({});
//   const [adminsByClient, setAdminsByClient] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const VITE_API = import.meta.env.VITE_API;

//   const fetchAdminsForClient = async (clientId) => {
//     try {
//       const authToken = token || localStorage.getItem("token");
//       const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });
//       console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
//       setAdminsByClient((prev) => ({
//         ...prev,
//         [clientId]: response.data.user || [],
//       }));
//     } catch (error) {
//       console.error(`Error fetching admins for client ${clientId}:`, {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data || "No data available",
//         headers: error.response?.headers || "No headers",
//         config: error.config || "No config",
//       });
//     }
//   };

//   useEffect(() => {
//     if (!user || !token) {
//       console.error("No user or token available for authentication", { user, token });
//       setIsLoading(false);
//       return;
//     }

//     const fetchClients = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         console.log("Fetching clients with token:", authToken, "User role:", user.role, "VITE_API:", VITE_API);
//         const response = await axios.get(`${VITE_API}view/client`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log("Response from /view/client:", response.data);
//         setClients(response.data.clientData || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching companies:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//           headers: error.response?.headers || "No headers",
//           config: error.config || "No config",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchClients();
//     if (clientId) fetchAdminsForClient(clientId);
//   }, [user, token, VITE_API, clientId]);

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading sidebar...</div>;
//   }

//   if (!user || !token || user.role !== "superAdmin") {
//     return <div className="p-4 text-red-500">Access denied. Please log in as superAdmin.</div>;
//   }

//   const toggleSubMenuStatic = (key) => {
//     setExpandedMenuStatic((prev) => ({
//       ...prev,
//       [key]: prev[key] ? null : true,
//     }));
//   };

//   const toggleCompany = (_id) => {
//     setExpandedClient(prev => (prev === _id ? null : _id));
//     if (_id && !adminsByClient[_id]) {
//       fetchAdminsForClient(_id);
//     }
//     setExpandedMenu({});
//   };

//   const toggleSubMenu = (companyId, type) => {
//     setExpandedMenu(prev => ({
//       ...prev,
//       [companyId]: prev[companyId] === type ? null : type,
//     }));
//   };

//   const isAdminCreatedBySuperAdminOrMainAdmin = (admin) => {
//     // Filter by clientId since createdBy is not available
//     return admin.client === clientId;
//   };

//   return (
//     <div className="w-64 bg-blue-50 h-screen p-4 overflow-auto">
//       <div className="mb-2">
//         <div className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200">
//           <Link to="/superAdmin/driverHistory"><span>Driver History</span></Link>
//         </div>
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('client')}
//         >
//           <span>Manage Client</span>
//           {expandedMenuStatic['client'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['client'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addClient" className="block hover:underline">Add Client</Link>
//             <Link to="/superAdmin/viewClient" className="block hover:underline">View Clients</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('car')}
//         >
//           <span>Manage Car</span>
//           {expandedMenuStatic['car'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['car'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addCar" className="block hover:underline">Add Car</Link>
//             <Link to="/superAdmin/viewCar" className="block hover:underline">View Cars</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('hub')}
//         >
//           <span>Hub</span>
//           {expandedMenuStatic['hub'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['hub'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superadmin/addHub" className="block hover:underline">Add Hub</Link>
//             <Link to="/superadmin/viewHub" className="block hover:underline">View Hub</Link>
//           </div>
//         )}
//       </div>
//       <h2 className="text-xl font-bold mb-4">Companies</h2>
//       {clients.map((client) => (
//         <div key={client._id} className="mb-2">
//           <div className="flex justify-between items-center p-2 rounded hover:bg-blue-200">
//             <Link
//               to={`/superadmin/client/${client._id}/clientDetails`}
//               className="flex-grow text-black-800 font-medium"
//             >
//               {client.clientName}
//             </Link>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleCompany(client._id);
//               }}
//               className="ml-2 text-gray-600 hover:text-black"
//             >
//               {expandedClient === client._id ? <FaChevronDown className="opacity-70" /> : <FaChevronRight className="opacity-60" />}
//             </button>
//           </div>
//           {expandedClient === client._id && (
//             <div className="ml-4 mt-2 space-y-1">
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'main-admin')}
//                 >
//                   <span className="text-sm font-semibold">Manage Admin</span>
//                   {expandedMenu[client._id] === 'main-admin' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'main-admin' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addAdmin`} className="block hover:underline">Add Admin</Link>
//                     <Link to={`/superadmin/client/${client._id}/addHr`} className="block hover:underline">Add Hr</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewAdminTable`} className="block hover:underline">View Admin</Link>
//                     {adminsByClient[client._id]?.length > 0 ? (
//                       adminsByClient[client._id]
//                         .filter(isAdminCreatedBySuperAdminOrMainAdmin)
//                         .map((admin) => (
//                           <Link
//                             key={admin._id}
//                             to={`/superadmin/client/${client._id}/viewAdmin/${admin._id}`}
//                             className="block hover:underline"
//                           >
//                             {admin.name || admin.email} (Client: {admin.client})
//                           </Link>
//                         ))
//                     ) : (
//                       <span>No admins found</span>
//                     )}
//                     <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'hr')}
//                 >
//                   <span className="text-sm font-semibold">Manage HR</span>
//                   {expandedMenu[client._id] === 'hr' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'hr' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addDriver`} className="block hover:underline">Add Driver</Link>
//                     <Link to={`/superadmin/client/${client._id}/addCustomer`} className="block hover:underline">Add Customer</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewDriver`} className="block hover:underline">View Drivers</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewCustomer`} className="block hover:underline">View Customers</Link>
//                     <Link to={`/client/${client._id}/driver-history`} className="block hover:underline">Driver History</Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

//----------------------------------------Client Data display in sidebar-------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';
// import DriverHistory from '../pages/superadmin/DriverHistory';

// export default function SuperadminSidebar() {
//   const { user, token } = useAuth();
//   const { clientId } = useParams();
//   const [expandedMenuStatic, setExpandedMenuStatic] = useState({});
//   const [clients, setClients] = useState([]);
//   const [expandedClient, setExpandedClient] = useState(null);
//   const [expandedMenu, setExpandedMenu] = useState({});
//   const [adminsByClient, setAdminsByClient] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const VITE_API = import.meta.env.VITE_API;

//   const fetchAdminsForClient = async (clientId) => {
//     try {
//       const authToken = token || localStorage.getItem("token");
//       const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });
//       console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
//       // Use response.data.user instead of response.data.authorizedPersons
//       setAdminsByClient((prev) => ({
//         ...prev,
//         [clientId]: response.data.user || [],
//       }));
//     } catch (error) {
//       console.error(`Error fetching admins for client ${clientId}:`, {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data || "No data available",
//         headers: error.response?.headers || "No headers",
//         config: error.config || "No config",
//       });
//     }
//   };

//   useEffect(() => {
//     if (!user || !token) {
//       console.error("No user or token available for authentication", { user, token });
//       setIsLoading(false);
//       return;
//     }

//     const fetchClients = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         console.log("Fetching clients with token:", authToken, "User role:", user.role, "VITE_API:", VITE_API);
//         const response = await axios.get(`${VITE_API}view/client`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log("Response from /view/client:", response.data);
//         setClients(response.data.clientData || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching companies:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//           headers: error.response?.headers || "No headers",
//           config: error.config || "No config",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchClients();
//     if (clientId) fetchAdminsForClient(clientId);
//   }, [user, token, VITE_API, clientId]);

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading sidebar...</div>;
//   }

//   if (!user || !token || user.role !== "superAdmin") {
//     return <div className="p-4 text-red-500">Access denied. Please log in as superAdmin.</div>;
//   }

//   const toggleSubMenuStatic = (key) => {
//     setExpandedMenuStatic((prev) => ({
//       ...prev,
//       [key]: prev[key] ? null : true,
//     }));
//   };

//   const toggleCompany = (_id) => {
//     setExpandedClient(prev => (prev === _id ? null : _id));
//     if (_id && !adminsByClient[_id]) {
//       fetchAdminsForClient(_id);
//     }
//     setExpandedMenu({});
//   };

//   const toggleSubMenu = (companyId, type) => {
//     setExpandedMenu(prev => ({
//       ...prev,
//       [companyId]: prev[companyId] === type ? null : type,
//     }));
//   };

//   const isAdminCreatedBySuperAdminOrMainAdmin = (admin) => {
//     // Since `createdBy` is not in the response, filter by clientId for now
//     // Update this logic if `createdBy` is added later (e.g., admin.createdBy === "superadmin" || admin.createdBy === "main-admin")
//     return admin.client === clientId; // Match admins to the current clientId
//   };

//   return (
//     <div className="w-64 bg-blue-50 h-screen p-4 overflow-auto">
//       <div className="mb-2">
//         <div className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200">
//           <Link to="/superAdmin/driverHistory"><span>Driver History</span></Link>
//         </div>
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('client')}
//         >
//           <span>Manage Client</span>
//           {expandedMenuStatic['client'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['client'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addClient" className="block hover:underline">Add Client</Link>
//             <Link to="/superAdmin/viewClient" className="block hover:underline">View Clients</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('car')}
//         >
//           <span>Manage Car</span>
//           {expandedMenuStatic['car'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['car'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addCar" className="block hover:underline">Add Car</Link>
//             <Link to="/superAdmin/viewCar" className="block hover:underline">View Cars</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('hub')}
//         >
//           <span>Hub</span>
//           {expandedMenuStatic['hub'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['hub'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superadmin/addHub" className="block hover:underline">Add Hub</Link>
//             <Link to="/superadmin/viewHub" className="block hover:underline">View Hub</Link>
//           </div>
//         )}
//       </div>
//       <h2 className="text-xl font-bold mb-4">Companies</h2>
//       {clients.map((client) => (
//         <div key={client._id} className="mb-2">
//           <div className="flex justify-between items-center p-2 rounded hover:bg-blue-200">
//             <Link
//               to={`/superadmin/client/${client._id}/clientDetails`}
//               className="flex-grow text-black-800 font-medium"
//             >
//               {client.clientName}
//             </Link>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleCompany(client._id);
//               }}
//               className="ml-2 text-gray-600 hover:text-black"
//             >
//               {expandedClient === client._id ? <FaChevronDown className="opacity-70" /> : <FaChevronRight className="opacity-60" />}
//             </button>
//           </div>
//           {expandedClient === client._id && (
//             <div className="ml-4 mt-2 space-y-1">
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'main-admin')}
//                 >
//                   <span className="text-sm font-semibold">Manage Admin</span>
//                   {expandedMenu[client._id] === 'main-admin' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'main-admin' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addAdmin`} className="block hover:underline">Add Admin</Link>
//                     <Link to={`/superadmin/client/${client._id}/addHr`} className="block hover:underline">Add Hr</Link>
//                     {adminsByClient[client._id]?.length > 0 ? (
//                       adminsByClient[client._id]
//                         .filter(isAdminCreatedBySuperAdminOrMainAdmin)
//                         .map((admin) => (
//                           <Link
//                             key={admin._id}
//                             to={`/superadmin/client/${client._id}/viewAdmin/${admin._id}`}
//                             className="block hover:underline"
//                           >
//                             {admin.name || admin.email} (Client: {admin.client})
//                           </Link>
//                         ))
//                     ) : (
//                       <span>No admins found</span>
//                     )}
//                     <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'hr')}
//                 >
//                   <span className="text-sm font-semibold">Manage HR</span>
//                   {expandedMenu[client._id] === 'hr' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'hr' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addDriver`} className="block hover:underline">Add Driver</Link>
//                     <Link to={`/superadmin/client/${client._id}/addCustomer`} className="block hover:underline">Add Customer</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewDriver`} className="block hover:underline">View Drivers</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewCustomer`} className="block hover:underline">View Customers</Link>
//                     <Link to={`/client/${client._id}/driver-history`} className="block hover:underline">Driver History</Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';
// import DriverHistory from '../pages/superadmin/DriverHistory';

// export default function SuperadminSidebar() {
//   const { user, token } = useAuth();
//   const { clientId } = useParams();
//   const [expandedMenuStatic, setExpandedMenuStatic] = useState({});
//   const [clients, setClients] = useState([]);
//   const [expandedClient, setExpandedClient] = useState(null);
//   const [expandedMenu, setExpandedMenu] = useState({});
//   const [adminsByClient, setAdminsByClient] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const VITE_API = import.meta.env.VITE_API;

//   // Move fetchAdminsForClient outside useEffect
//   const fetchAdminsForClient = async (clientId) => {
//     try {
//       const authToken = token || localStorage.getItem("token");
//       const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });
//       console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
//       setAdminsByClient((prev) => ({
//         ...prev,
//         [clientId]: response.data.authorizedPersons || [],
//       }));
//     } catch (error) {
//       console.error(`Error fetching admins for client ${clientId}:`, {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data || "No data available",
//         headers: error.response?.headers || "No headers",
//         config: error.config || "No config",
//       });
//     }
//   };

//   useEffect(() => {
//     if (!user || !token) {
//       console.error("No user or token available for authentication", { user, token });
//       setIsLoading(false);
//       return;
//     }

//     const fetchClients = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         console.log("Fetching clients with token:", authToken, "User role:", user.role, "VITE_API:", VITE_API);
//         const response = await axios.get(`${VITE_API}view/client`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log("Response from /view/client:", response.data);
//         setClients(response.data.clientData || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching companies:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//           headers: error.response?.headers || "No headers",
//           config: error.config || "No config",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchClients();
//     if (clientId) fetchAdminsForClient(clientId); // Fetch admins for the specific clientId from params
//   }, [user, token, VITE_API, clientId]);

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading sidebar...</div>;
//   }

//   if (!user || !token || user.role !== "superAdmin") {
//     return <div className="p-4 text-red-500">Access denied. Please log in as superAdmin.</div>;
//   }

//   const toggleSubMenuStatic = (key) => {
//     setExpandedMenuStatic((prev) => ({
//       ...prev,
//       [key]: prev[key] ? null : true,
//     }));
//   };

//   const toggleCompany = (_id) => {
//     setExpandedClient(prev => (prev === _id ? null : _id));
//     if (_id && !adminsByClient[_id]) {
//       fetchAdminsForClient(_id); // Now accessible
//     }
//     setExpandedMenu({});
//   };

//   const toggleSubMenu = (companyId, type) => {
//     setExpandedMenu(prev => ({
//       ...prev,
//       [companyId]: prev[companyId] === type ? null : type,
//     }));
//   };

//   const isAdminCreatedBySuperAdminOrMainAdmin = (admin) => {
//     // Assume `createdBy` is the field indicating who created the admin (e.g., "superadmin" or "main-admin")
//     return admin.createdBy === "superadmin" || admin.createdBy === "main-admin";
//   };

//   return (
//     <div className="w-64 bg-blue-50 h-screen p-4 overflow-auto">
//       <div className="mb-2">
//         <div className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200">
//           <Link to="/superAdmin/driverHistory"><span>Driver History</span></Link>
//         </div>
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('client')}
//         >
//           <span>Manage Client</span>
//           {expandedMenuStatic['client'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['client'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addClient" className="block hover:underline">Add Client</Link>
//             <Link to="/superAdmin/viewClient" className="block hover:underline">View Clients</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('car')}
//         >
//           <span>Manage Car</span>
//           {expandedMenuStatic['car'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['car'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addCar" className="block hover:underline">Add Car</Link>
//             <Link to="/superAdmin/viewCar" className="block hover:underline">View Cars</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('hub')}
//         >
//           <span>Hub</span>
//           {expandedMenuStatic['hub'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['hub'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superadmin/addHub" className="block hover:underline">Add Hub</Link>
//             <Link to="/superadmin/viewHub" className="block hover:underline">View Hub</Link>
//           </div>
//         )}
//       </div>
//       <h2 className="text-xl font-bold mb-4">Companies</h2>
//       {clients.map((client) => (
//         <div key={client._id} className="mb-2">
//           <div className="flex justify-between items-center p-2 rounded hover:bg-blue-200">
//             <Link
//               to={`/superadmin/client/${client._id}/clientDetails`}
//               className="flex-grow text-black-800 font-medium"
//             >
//               {client.clientName}
//             </Link>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleCompany(client._id);
//               }}
//               className="ml-2 text-gray-600 hover:text-black"
//             >
//               {expandedClient === client._id ? <FaChevronDown className="opacity-70" /> : <FaChevronRight className="opacity-60" />}
//             </button>
//           </div>
//           {expandedClient === client._id && (
//             <div className="ml-4 mt-2 space-y-1">
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'main-admin')}
//                 >
//                   <span className="text-sm font-semibold">Manage Admin</span>
//                   {expandedMenu[client._id] === 'main-admin' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'main-admin' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addAdmin`} className="block hover:underline">Add Admin</Link>
//                     <Link to={`/superadmin/client/${client._id}/addHr`} className="block hover:underline">Add Hr</Link>
//                     {adminsByClient[client._id]?.length > 0 ? (
//                       adminsByClient[client._id]
//                         .filter(isAdminCreatedBySuperAdminOrMainAdmin)
//                         .map((admin) => (
//                           <Link
//                             key={admin._id}
//                             to={`/superadmin/client/${client._id}/viewAdmin/${admin._id}`}
//                             className="block hover:underline"
//                           >
//                             {admin.name || admin.email} (Created by: {admin.createdBy})
//                           </Link>
//                         ))
//                     ) : (
//                       <span>No admins found</span>
//                     )}
//                     <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'hr')}
//                 >
//                   <span className="text-sm font-semibold">Manage HR</span>
//                   {expandedMenu[client._id] === 'hr' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'hr' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addDriver`} className="block hover:underline">Add Driver</Link>
//                     <Link to={`/superadmin/client/${client._id}/addCustomer`} className="block hover:underline">Add Customer</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewDriver`} className="block hover:underline">View Drivers</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewCustomer`} className="block hover:underline">View Customers</Link>
//                     <Link to={`/client/${client._id}/driver-history`} className="block hover:underline">Driver History</Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';
// import DriverHistory from '../pages/superadmin/DriverHistory';

// export default function SuperadminSidebar() {
//   const { user, token } = useAuth();
//   const { clientId } = useParams();
//   const [expandedMenuStatic, setExpandedMenuStatic] = useState({});
//   const [clients, setClients] = useState([]);
//   const [expandedClient, setExpandedClient] = useState(null);
//   const [expandedMenu, setExpandedMenu] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     // if (!user || !token) {
//     //   console.error("No user or token available for authentication", { user, token });
//     //   setIsLoading(false);
//     //   return;
//     // }

//     const fetchClients = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         // if (!authToken) {
//         //   console.error("No valid token found");
//         //   setIsLoading(false);
//         //   return;
//         // }
//         console.log("Fetching clients with token:", authToken, "User role:", user.role, "VITE_API:", VITE_API);
//         const response = await axios.get(`${VITE_API}view/client`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log("Response from /view/client:", response.data);
//         setClients(response.data.clientData || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching companies:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//           headers: error.response?.headers || "No headers",
//           config: error.config || "No config",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchClients();
//   }, [user, token, VITE_API]);

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading sidebar...</div>;
//   }

//   if (!user || !token || user.role !== "superAdmin") {
//     return <div className="p-4 text-red-500">Access denied. Please log in as superAdmin.</div>;
//   }

//   const toggleSubMenuStatic = (key) => {
//     setExpandedMenuStatic((prev) => ({
//       ...prev,
//       [key]: prev[key] ? null : true,
//     }));
//   };

//   const toggleCompany = (_id) => {
//     setExpandedClient(prev => (prev === _id ? null : _id));
//     setExpandedMenu({});
//   };

//   const toggleSubMenu = (companyId, type) => {
//     setExpandedMenu(prev => ({
//       ...prev,
//       [companyId]: prev[companyId] === type ? null : type,
//     }));
//   };

//   return (
//     <div className="w-64 bg-blue-50 h-screen p-4 overflow-auto">
//       <div className="mb-2">
//         <div className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200">
//           <Link to="/superAdmin/driverHistory"><span>Driver History</span></Link>
//         </div>
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('client')}
//         >
//           <span>Manage Client</span>
//           {expandedMenuStatic['client'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['client'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addClient" className="block hover:underline">Add Client</Link>
//             <Link to="/superAdmin/viewClient" className="block hover:underline">View Clients</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('car')}
//         >
//           <span>Manage Car</span>
//           {expandedMenuStatic['car'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['car'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addCar" className="block hover:underline">Add Car</Link>
//             <Link to="/superAdmin/viewCar" className="block hover:underline">View Cars</Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('hub')}
//         >
//           <span>Hub</span>
//           {expandedMenuStatic['hub'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>
//         {expandedMenuStatic['hub'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superadmin/addHub" className="block hover:underline">Add Hub</Link>
//             <Link to="/superadmin/viewHub" className="block hover:underline">View Hub</Link>
//           </div>
//         )}
//       </div>
//       <h2 className="text-xl font-bold mb-4">Companies</h2>
//       {clients.map((client) => (
//         <div key={client._id} className="mb-2">
//           <div className="flex justify-between items-center p-2 rounded hover:bg-blue-200">
//             <Link
//               to={`/superadmin/client/${client._id}/clientDetails`}
//               className="flex-grow text-black-800 font-medium"
//             >
//               {client.clientName}
//             </Link>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleCompany(client._id);
//               }}
//               className="ml-2 text-gray-600 hover:text-black"
//             >
//               {expandedClient === client._id ? <FaChevronDown className="opacity-70" /> : <FaChevronRight className="opacity-60" />}
//             </button>
//           </div>
//           {expandedClient === client._id && (
//             <div className="ml-4 mt-2 space-y-1">
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'main-admin')}
//                 >
//                   <span className="text-sm font-semibold">Manage Admin</span>
//                   {expandedMenu[client._id] === 'main-admin' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'main-admin' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addAdmin`} className="block hover:underline">Add Admin</Link>
//                     <Link to={`/superadmin/client/${client._id}/addHr`} className="block hover:underline">Add Hr</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewAdmin`} className="block hover:underline">View Admin</Link>
//                     <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'hr')}
//                 >
//                   <span className="text-sm font-semibold">Manage HR</span>
//                   {expandedMenu[client._id] === 'hr' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>
//                 {expandedMenu[client._id] === 'hr' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addDriver`} className="block hover:underline">Add Driver</Link>
//                     <Link to={`/superadmin/client/${client._id}/addCustomer`} className="block hover:underline">Add Customer</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewDriver`} className="block hover:underline">View Drivers</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewCustomer`} className="block hover:underline">View Customers</Link>
//                     <Link to={`/client/${client._id}/driver-history`} className="block hover:underline">Driver History</Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { FaChevronDown, FaChevronRight, FaUser, FaUsers, FaCar, FaBook } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useParams } from "react-router-dom";

// import { useAuth } from '../context/AuthContext';
// import DriverHistory from '../pages/superadmin/DriverHistory';

// export default function SuperadminSidebar() {
//   const { user, token } = useAuth(); // ✅ if you’re using context
//   const { clientId } = useParams();
//   const [expandedMenuStatic, setExpandedMenuStatic] = useState({});
//   const [clients, setClients] = useState([]);
//   const [expandedClient, setExpandedClient] = useState(null);
//   const [expandedMenu, setExpandedMenu] = useState({}); // { companyId: 'admin' | 'hr' }

//   const VITE_API = import.meta.env.VITE_API;

//   // Toggle Sub-menu for companies  
//   const toggleSubMenuStatic = (key) => {
//     setExpandedMenuStatic((prev) => ({
//       ...prev,
//       [key]: prev[key] ? null : true,
//     }));
//   };


//   // Toggle Sub-menu for companies  
//   const toggleCompany = (_id) => {
//     setExpandedClient(prev => (prev === _id ? null : _id));
//     setExpandedMenu({}); // collapse nested menus
//   };

//   const toggleSubMenu = (companyId, type) => {
//     setExpandedMenu(prev => ({
//       ...prev,
//       [companyId]: prev[companyId] === type ? null : type,
//     }));
//   };

//   useEffect(() => {
//     // Replace this URL with your actual backend endpoint
//     axios.get(`${VITE_API}view/client`,{
//       headers:{
//         Authorization:`Bearear ${token}`
//       }
//     })
//       .then((response) => {
//         console.log("Response from /view/client:", response.data);
//         setClients(response.data.clientData || []);
//       })

//       .catch((error) => {
//         console.error("Error fetching companies:", error);
//       });
//   }, []);

//   return (
//     <div className="w-64 bg-blue-50 h-screen p-4 overflow-auto">
//       <div className="mb-2 ">
//         <div className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200">
//           <Link to="/superAdmin/driverHistory"><span>Driver History</span></Link>
//         </div>
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('client')}
//         >
//           <span>Manage Client</span>
//           {expandedMenuStatic['client'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>

//         {expandedMenuStatic['client'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addClient" className="block hover:underline">
//               Add Client
//             </Link>
//             <Link to="/superAdmin/viewClient" className="block hover:underline">
//               View Clients
//             </Link>
//           </div>
//         )}
//       </div>
//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('car')}
//         >
//           <span>Manage Car</span>
//           {expandedMenuStatic['car'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>

//         {expandedMenuStatic['car'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superAdmin/addCar" className="block hover:underline">
//               Add Car
//             </Link>
//             <Link to="/superAdmin/viewCar" className="block hover:underline">
//               View Cars
//             </Link>
//           </div>
//         )}
//       </div>

//       <div className="mb-2">
//         <div
//           className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//           onClick={() => toggleSubMenuStatic('hub')}
//         >
//           <span>Hub</span>
//           {expandedMenuStatic['hub'] ? <FaChevronDown /> : <FaChevronRight />}
//         </div>

//         {expandedMenuStatic['hub'] && (
//           <div className="ml-4 mt-2 space-y-1 text-sm">
//             <Link to="/superadmin/addHub" className="block hover:underline">Add Hub</Link>
//             <Link to="/superadmin/viewHub" className="block hover:underline">View Hub</Link>
//             {/* <Link to="/superadmin/assignCarHub" className="block hover:underline">AssignCar Hub</Link>
//       <Link to="/superadmin/viewCarHub" className="block hover:underline">ViewCar Hub</Link> */}
//           </div>
//         )}
//       </div>

//       <h2 className="text-xl font-bold mb-4">Companies</h2>
//       {/* <DriverHistory/> */}
//       {clients.map((client) => (
//         <div key={client._id} className="mb-2">
//           {/* <div
//             className="*:object-contain flex justify-between items-center cursor-pointer p-2 rounded hover:bg-blue-200"
//             onClick={() => toggleCompany(client._id)}
//           >
//             <span>{client.clientName}</span>
//             {expandedClient === client._id ? <FaChevronDown className='opacity-70' /> : <FaChevronRight className='opacity-60' />}
//           </div> */}
//           <div className="flex justify-between items-center p-2 rounded hover:bg-blue-200">
//             {/* Clicking on client name navigates to ClientDetails */}
//             <Link
//               to={`/superadmin/client/${client._id}/clientDetails`}
//               className="flex-grow text-black-800 font-medium "
//             >
//               {client.clientName}
//             </Link>

//             {/* Chevron icon only toggles submenus */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleCompany(client._id);
//               }}
//               className="ml-2 text-gray-600 hover:text-black"
//             >
//               {expandedClient === client._id ? (
//                 <FaChevronDown className="opacity-70" />
//               ) : (
//                 <FaChevronRight className="opacity-60" />
//               )}
//             </button>
//           </div>

//           {expandedClient === client._id && (
//             <div className="ml-4 mt-2 space-y-1">
//               {/* Manage Admin */}
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'main-admin')}
//                 >
//                   <span className="text-sm font-semibold">Manage Admin</span>
//                   {expandedMenu[client._id] === 'main-admin' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>

//                 {expandedMenu[client._id] === 'main-admin' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addAdmin`} className="block hover:underline">Add Admin</Link>
//                     <Link to={`/superadmin/client/${client._id}/addHr`} className="block hover:underline">Add Hr</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewAdmin`} className="block hover:underline">View Admin</Link>
//                     <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>
//                   </div>
//                 )}
//               </div>

//               {/* Manage HR */}
//               <div>
//                 <div
//                   className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-300 rounded"
//                   onClick={() => toggleSubMenu(client._id, 'hr')}
//                 >
//                   <span className="text-sm font-semibold">Manage HR</span>
//                   {expandedMenu[client._id] === 'hr' ? <FaChevronDown /> : <FaChevronRight />}
//                 </div>

//                 {expandedMenu[client._id] === 'hr' && (
//                   <div className="ml-4 mt-1 text-sm space-y-1">
//                     <Link to={`/superadmin/client/${client._id}/addDriver`} className="block hover:underline">Add Driver</Link>
//                     <Link to={`/superadmin/client/${client._id}/addCustomer`} className="block hover:underline">Add Customer</Link>
//                     {/* <Link to={`/superadmin/client/${client._id}/addCar`} className="block hover:underline">Add Car</Link> */}
//                     <Link to={`/superadmin/client/${client._id}/viewDriver`} className="block hover:underline">View Drivers</Link>
//                     <Link to={`/superadmin/client/${client._id}/viewCustomer`} className="block hover:underline">View Customers</Link>
//                     {/* <Link to={`/superadmin/client/${client._id}/viewCar`} className="block hover:underline">View Cars</Link> */}
//                     <Link to={`/superadmin/client/${client._id}/bookRide`} className="block hover:underline">Book Ride</Link>

//                     {/* ✅ Add this line for Driver History */}
//                     <Link to={`/client/${client._id}/driver-history`} className="block hover:underline">Driver History</Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


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
