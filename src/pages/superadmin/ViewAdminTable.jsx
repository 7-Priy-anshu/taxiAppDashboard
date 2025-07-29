import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ViewAdminTable = () => {
  const { clientId } = useParams();
  const { token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const VITE_API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchAdmins = async () => {
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
        // Filter for client10 (assuming clientId matches "client10" or a specific ID)
        const filteredAdmins = (response.data.user || []).filter(admin => admin.client === clientId);
        setAdmins(filteredAdmins);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching admins for client ${clientId}:`, {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data || "No data available",
        });
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, [clientId, token, VITE_API]);

  // Mock function to map createdBy ID to name (replace with actual API call if available)
  const getCreatorName = (createdById) => {
    // Placeholder: Replace with API call or context to map createdById to name
    // For now, return the ID as a fallback
    return `User_${createdById}`; // Example: Map ID to a name format
  };

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading admins...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin List for Client {clientId}</h2>
      {admins.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Created By</th>
              <th className="border p-2">Created On</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="hover:bg-gray-50">
                <td className="border p-2">{admin.name || 'N/A'}</td>
                <td className="border p-2">{admin.email || 'N/A'}</td>
                <td className="border p-2">{admin.role || 'N/A'}</td> {/* Assume role if available */}
                <td className="border p-2">{getCreatorName(admin.createdBy) || 'N/A'}</td>
                <td className="border p-2">{admin.createdOn ? new Date(admin.createdOn).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No admins found for this client.</p>
      )}
    </div>
  );
};

export default ViewAdminTable;
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