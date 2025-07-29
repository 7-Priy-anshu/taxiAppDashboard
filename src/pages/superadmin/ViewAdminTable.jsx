import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import BackButton from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { getApiAuth } from '../../utils/apiServices';


export default function ViewAdminTable() {
  const { clientId } = useParams();
  const { token } = useAuth();
  const VITE_API = import.meta.env.VITE_API;
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAdmins = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const authToken = token || localStorage.getItem("token");
      const response = await getApiAuth(`view/authorizedPerson?clientId=${clientId}`)
      // await axios.get(
      //   `${VITE_API}view/authorizedPerson?clientId=${clientId}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${authToken}`,
      //       "Content-Type": "application/json",
      //     },
      //     withCredentials: true,
      //   }
      // );
      const filteredAdmins = (response.data.user || []).filter(
        (admin) => admin.client === clientId
      );
      setAdmins(filteredAdmins);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError("Failed to load client admins.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) getAdmins();
  }, [clientId, token]);

  const filteredAdmins = admins.filter((admin) =>
    `${admin.name} ${admin.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCreatorName = (createdById) => `User_${createdById}`;

  const columns = [
    { name: "Name", selector: (row) => row.name || "N/A", sortable: true },
    { name: "Email", selector: (row) => row.email || "N/A", sortable: true },
    { name: "Role", selector: (row) => row.role || "N/A", sortable: true },
    {
      name: "Created By",
      selector: (row) => getCreatorName(row.createdBy) || "N/A",
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) =>
        row.createdOn ? new Date(row.createdOn).toLocaleDateString() : "N/A",
      sortable: true,
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-2">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <div className="max-w-4xl flex">
          <Link to="/superadmin">
            <BackButton text="Back" />
          </Link>
        </div>
      </div>
      <div className="container mx-auto bg-white rounded shadow-sm p-4">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            <SearchBar
              title={`Client Admins for ${clientId}`}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              disableAdd={true} // disables add button since no add route given
            />
            <DataTable
              columns={columns}
              data={filteredAdmins}
              fixedHeader
              pagination
              highlightOnHover
              fixedHeaderScrollHeight="400px"
              noDataComponent="No client admins found."
              responsive
            />
            <div className="text-center text-gray-500 mt-4">
              Total Admins: {filteredAdmins.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

//--------------------------Table Design not updated---------------------------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ViewAdminTable = () => {
//   const { clientId } = useParams();
//   const { token } = useAuth();
//   const [admins, setAdmins] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
//         // Filter for client10 (assuming clientId matches "client10" or a specific ID)
//         const filteredAdmins = (response.data.user || []).filter(admin => admin.client === clientId);
//         setAdmins(filteredAdmins);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(`Error fetching admins for client ${clientId}:`, {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, [clientId, token, VITE_API]);

//   // Mock function to map createdBy ID to name (replace with actual API call if available)
//   const getCreatorName = (createdById) => {
//     // Placeholder: Replace with API call or context to map createdById to name
//     // For now, return the ID as a fallback
//     return `User_${createdById}`; // Example: Map ID to a name format
//   };

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading admins...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Admin List for Client {clientId}</h2>
//       {admins.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Role</th>
//               <th className="border p-2">Created By</th>
//               <th className="border p-2">Created On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin) => (
//               <tr key={admin._id} className="hover:bg-gray-50">
//                 <td className="border p-2">{admin.name || 'N/A'}</td>
//                 <td className="border p-2">{admin.email || 'N/A'}</td>
//                 <td className="border p-2">{admin.role || 'N/A'}</td> {/* Assume role if available */}
//                 <td className="border p-2">{getCreatorName(admin.createdBy) || 'N/A'}</td>
//                 <td className="border p-2">{admin.createdOn ? new Date(admin.createdOn).toLocaleDateString() : 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No admins found for this client.</p>
//       )}
//     </div>
//   );
// };

// export default ViewAdminTable;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ViewAdminTable = () => {
//   const { clientId } = useParams();
//   const { token } = useAuth();
//   const [admins, setAdmins] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
//         setAdmins(response.data.user || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(`Error fetching admins for client ${clientId}:`, {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, [clientId, token, VITE_API]);

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading admins...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Admin List for Client {clientId}</h2>
//       {admins.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Client ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin) => (
//               <tr key={admin._id} className="hover:bg-gray-50">
//                 <td className="border p-2">{admin.name || 'N/A'}</td>
//                 <td className="border p-2">{admin.email || 'N/A'}</td>
//                 <td className="border p-2">{admin.client || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No admins found for this client.</p>
//       )}
//     </div>
//   );
// };

// export default ViewAdminTable;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ViewAdminTable = () => {
//   const { clientId } = useParams();
//   const { token } = useAuth();
//   const [admins, setAdmins] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
//         // Filter for client10 (assuming clientId matches "client10" or a specific ID)
//         const filteredAdmins = (response.data.user || []).filter(admin => admin.client === clientId);
//         setAdmins(filteredAdmins);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(`Error fetching admins for client ${clientId}:`, {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, [clientId, token, VITE_API]);

//   // Mock function to map createdBy ID to name (replace with actual API call if available)
//   const getCreatorName = (createdById) => {
//     // Placeholder: Replace with API call or context to map createdById to name
//     // For now, return the ID as a fallback
//     return `User_${createdById}`; // Example: Map ID to a name format
//   };

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading admins...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Admin List for Client {clientId}</h2>
//       {admins.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Role</th>
//               <th className="border p-2">Created By</th>
//               <th className="border p-2">Created On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin) => (
//               <tr key={admin._id} className="hover:bg-gray-50">
//                 <td className="border p-2">{admin.name || 'N/A'}</td>
//                 <td className="border p-2">{admin.email || 'N/A'}</td>
//                 <td className="border p-2">{admin.role || 'N/A'}</td> {/* Assume role if available */}
//                 <td className="border p-2">{getCreatorName(admin.createdBy) || 'N/A'}</td>
//                 <td className="border p-2">{admin.createdOn ? new Date(admin.createdOn).toLocaleDateString() : 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No admins found for this client.</p>
//       )}
//     </div>
//   );
// };

// export default ViewAdminTable;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ViewAdminTable = () => {
//   const { clientId } = useParams();
//   const { token } = useAuth();
//   const [admins, setAdmins] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const authToken = token || localStorage.getItem("token");
//         const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         });
//         console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
//         setAdmins(response.data.user || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(`Error fetching admins for client ${clientId}:`, {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data || "No data available",
//         });
//         setIsLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, [clientId, token, VITE_API]);

//   if (isLoading) {
//     return <div className="p-4 text-gray-500">Loading admins...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Admin List for Client {clientId}</h2>
//       {admins.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Client ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin) => (
//               <tr key={admin._id} className="hover:bg-gray-50">
//                 <td className="border p-2">{admin.name || 'N/A'}</td>
//                 <td className="border p-2">{admin.email || 'N/A'}</td>
//                 <td className="border p-2">{admin.client || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No admins found for this client.</p>
//       )}
//     </div>
//   );
// };

// export default ViewAdminTable;