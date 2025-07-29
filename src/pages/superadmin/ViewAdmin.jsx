import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiAuth } from '../../utils/apiServices';

const ViewAdminTable = () => {
  const { clientId } = useParams();
  const { token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const VITE_API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        // const authToken = token || localStorage.getItem("token");
        const response =  await getApiAuth(`view/authorizedPerson?clientId=${clientId}`)
        //  await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
        //   headers: {
        //     Authorization: `Bearer ${authToken}`,
        //     'Content-Type': 'application/json',
        //   },
        //   withCredentials: true,
        // });
        console.log(`Response from /view/authorizedPerson for client ${clientId}:`, response.data);
        setAdmins(response.data.user || []);
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
              <th className="border p-2">Client ID</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="hover:bg-gray-50">
                <td className="border p-2">{admin.name || 'N/A'}</td>
                <td className="border p-2">{admin.email || 'N/A'}</td>
                <td className="border p-2">{admin.client || 'N/A'}</td>
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

// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import SearchBar from "../../components/SearchBar";
// import BackButton from "../../components/BackButton";
// import { Link } from "react-router-dom";

// export default function ViewClientAdmins() {
//   const { clientId } = useParams();
//   const { token } = useAuth();
//   const VITE_API = import.meta.env.VITE_API;

//   const [admins, setAdmins] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getAllAdmins = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const authToken = token || localStorage.getItem("token");
//       const response = await axios.get(`${VITE_API}view/authorizedPerson?clientId=${clientId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       const filteredAdmins = (response.data.user || []).filter(
//         (admin) => admin.client === clientId
//       );
//       console.log("View Admin Data:",response.data.user )
//       setAdmins(filteredAdmins);
//     } catch (err) {
//       console.error("Error fetching admins:", err.response?.data || err.message);
//       setError("Failed to load admins. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (clientId) getAllAdmins();
//   }, [clientId, token]);

//   const filteredAdmins = admins.filter((admin) =>
//     `${admin.name} ${admin.email}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const columns = [
//     { name: "Name", selector: (row) => row.name || "N/A", sortable: true },
//     { name: "Email", selector: (row) => row.email || "N/A", sortable: true },
//     { name: "Role", selector: (row) => row.role || "N/A", sortable: true },
//     {
//       name: "Created By",
//       selector: (row) => row.createdBy || "N/A",
//       sortable: true,
//     },
//     {
//       name: "Created On",
//       selector: (row) =>
//         row.createdOn ? new Date(row.createdOn).toLocaleDateString() : "N/A",
//       sortable: true,
//     },
//   ];

//   return (
//     <div className="p-6 flex flex-col gap-2">
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
//         <div className="max-w-4xl flex">
//           <Link to="/client">
//             <BackButton text="Back" />
//           </Link>
//         </div>
//       </div>
//       <div className="container mx-auto bg-white rounded shadow-sm p-4">
//         {isLoading ? (
//           <div className="text-center">Loading...</div>
//         ) : error ? (
//           <div className="text-red-600 text-center">{error}</div>
//         ) : (
//           <>
//             <SearchBar
//               title={`Admins for Client: ${clientId}`}
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//             />
//             <DataTable
//               columns={columns}
//               data={filteredAdmins}
//               fixedHeader
//               pagination
//               highlightOnHover
//               fixedHeaderScrollHeight="400px"
//               noDataComponent="No admins found."
//               responsive
//             />
//             <div className="text-center text-gray-500 mt-4">
//               Total Admins: {filteredAdmins.length}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



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




// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import SearchBar from "../../components/SearchBar";
// import BackButton from "../../components/BackButton";
// import { useAuth } from "../../context/AuthContext";

// export default function ViewAdmin() {
//   const navigate = useNavigate();
//   const { user,token } = useAuth(); // Destructure user for potential token
//   const VITE_API = import.meta.env.VITE_API;
//   const [viewAdmin, setViewAdmin] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getAllItems = () => {
//     setIsLoading(true);
//     setError(null);
//     axios
//       .get(`${VITE_API}view/admin`, {
//       headers:{
//         "Content-Type":"json/application",
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then((res) => {
//         console.log("View Admin Response:", res.data); // Log full response
//         setViewAdmin(res.data.user || []); // Updated to match API response
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching admins:", error.response?.data || error.message);
//         setError("Failed to load admins. Please try again later.");
//         setIsLoading(false);
//       });
//   };

//   const deleteAdmin = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this admin?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`${VITE_API}delete/admin/${id}`, {
//         headers: {
//           Authorization: `Bearer ${user?.token}`, // Add token if required
//         },
//       });
//       setViewAdmin((prev) => prev.filter((admin) => admin._id !== id));
//     } catch (err) {
//       console.error("Error deleting admin", err.response?.data || err.message);
//       alert("Failed to delete admin");
//     }
//   };

//   useEffect(() => {
//     getAllItems();
//   }, [user?.token]); // Re-fetch if token changes

//   const filteredAdmins = viewAdmin.filter((admin) =>
//     `${admin.name} ${admin.email}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const columns = [
//     { name: "ID", selector: (row) => row._id, sortable: true, wrap: true },
//     { name: "Name", selector: (row) => row.name, sortable: true },
//     { name: "Email", selector: (row) => row.email, sortable: true },
//     { name: "Phone", selector: (row) => row.phoneNumber || "N/A", sortable: true },
//     { name: "Role", selector: (row) => row.role || "N/A", sortable: true },
//     { name: "CreatedBy", selector: (row) => row.createdBy || "N/A", sortable: true },
//     // { name: "ClientEmail", selector: (row) => row.clientEmail || "N/A", sortable: true },
//     {
//       name: "Created On",
//       selector: (row) =>
//         row.createdOn ? new Date(row.createdOn).toLocaleDateString() : "N/A",
//       sortable: true,
//     },
//     {
//       name: "Permissions",
//       selector: (row) =>
//         Array.isArray(row.permissions) ? row.permissions.join(", ") : "None",
//       wrap: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-4 items-center">
//           <Link to={`/superadmin/addAdmin/${row._id}`}>
//             <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
//           </Link>
//           <FaTrash
//             className="text-red-500 hover:text-red-700 cursor-pointer"
//             onClick={() => deleteAdmin(row._id)}
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 flex flex-col gap-2">
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
//         <div className="max-w-4xl flex">
//           <Link to="/superadmin">
//             <BackButton text="Back" />
//           </Link>
//         </div>
//       </div>
//       <div className="container mx-auto bg-white rounded shadow-sm p-4">
//         {isLoading ? (
//           <div className="text-center">Loading...</div>
//         ) : error ? (
//           <div className="text-red-600 text-center">{error}</div>
//         ) : (
//           <>
//             <SearchBar
//               title="Admin"
//               addLink="/superadmin/addAdmin" // Updated to correct route
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//             />
//             <DataTable
//               columns={columns}
//               data={filteredAdmins}
//               fixedHeader
//               pagination
//               highlightOnHover
//               fixedHeaderScrollHeight="400px"
//               noDataComponent="No admins found."
//               responsive
//             />
//             {/* Debug output */}
//             <div className="text-center text-gray-500 mt-4">
//               Total Admins: {filteredAdmins.length}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import SearchBar from "../../components/SearchBar";
// import BackButton from "../../components/BackButton";
// // import SearchBar from "../../components/SearchBar";
// // import BackButton from "../../components/BackButton";


// export default function ViewAdmin() {
//   const navigate = useNavigate();
//   const VITE_API = import.meta.env.VITE_API;
//   const [viewAdmin, setViewAdmin] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getAllItems = () => {
//     setIsLoading(true);
//     setError(null);
//     axios
//       .get(`${VITE_API}view/admin`)
//       .then((res) => {
//         console.log("View Admin:",res.data.adminData)
//         setViewAdmin(res.data.adminData || []);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching admins:", error);
//         setError("Failed to load admins. Please try again later.");
//         setIsLoading(false);
//       });
//   };

//   const deleteAdmin = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this admin?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`${VITE_API}delete/admin/${id}`);
//       setViewAdmin((prev) => prev.filter((admin) => admin._id !== id));
//     } catch (err) {
//       console.error("Error deleting admin", err);
//       alert("Failed to delete admin");
//     }
//   };

//   useEffect(() => {
//     getAllItems();
//   }, []);

//   const filteredAdmins = viewAdmin.filter((admin) =>
//     `${admin.name} ${admin.email}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const columns = [
//     { name: "ID", selector: (row) => row._id, sortable: true, wrap: true },
//     { name: "Name", selector: (row) => row.name, sortable: true },
//     { name: "Email", selector: (row) => row.email, sortable: true },
//     { name: "Phone", selector: (row) => row.phoneNumber, sortable: true },
//     { name: "Role", selector: (row) => row.role || row.role, sortable: true },
//     { name: "ClientEmail", selector: (row) => row.clientEmail || row.clientEmail, sortable: true },
//     {
//       name: "Created On",
//       selector: (row) =>
//         row.createdOn ? new Date(row.createdOn).toLocaleDateString() : "N/A",
//       sortable: true,
//     },
//     {
//       name: "Permissions",
//       selector: (row) =>
//         Array.isArray(row.permissions) ? row.permissions.join(", ") : "None",
//       wrap: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-4 items-center">
//           <Link to={`/superadmin/addAdmin/${row._id}`}>
//             <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
//           </Link>
//           <FaTrash
//             className="text-red-500 hover:text-red-700 cursor-pointer"
//             onClick={() => deleteAdmin(row._id)}
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 flex flex-col gap-2">
//             <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
//               <div className=" max-w-4xl flex ">
//                           {/* Add Admin */}
//                   <Link to="/superadmin">
//                       <BackButton text="Back"></BackButton>
//                   </Link>
//               </div>
//             </div>
//       <div className="container mx-auto bg-white rounded shadow-sm p-4">
//         {isLoading ? (
//           <div className="text-center">Loading...</div>
//         ) : error ? (
//           <div className="text-red-600 text-center">{error}</div>
//         ) : (
//           <>
//             <SearchBar
//               title="Admin"
//               addLink="/superadmin/addadmin"
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//             />
//             <DataTable
//               columns={columns}
//               data={filteredAdmins}
//               fixedHeader
//               pagination
//               highlightOnHover
//               fixedHeaderScrollHeight="400px"
//               noDataComponent="No admins found."
//               responsive
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//----------------------------------------------2nd Code --------------------------------------------------- 

// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import {Link, useNavigate} from 'react-router-dom';
// import SearchBar from './SearchBar'


// export default function ViewAdmin() {
//   const navigate = useNavigate ();
//   const deleteAdmin = async (id) =>{
//      if (!window.confirm("Are you sure you want to delete this admin?")) return;
//      try{
//        await axios.delete(`${VITE_API}delete/admin/${id}`)
//        setViewAdmin(prev => prev.filter((admin)=> admin._id !== id));  
//        navigate('/superadmin/viewadmin');
//      }catch(err){
//        console.error("Error Deleting admin",err);
//        alert("Failed to delete admin")
//      }
//   }

//   const columns = [
//     { name: "Id", selector: row => row._id, sortable: true },
//     { name: "Name", selector: row => row.name, sortable: true },
//     { name: "Email", selector: row => row.email, sortable: true },
//     { name: "Password", selector: row => row.password, sortable: true },
//     { name: "Phone", selector: row => row.phoneNumber, sortable: true },
//     { name: "CreateDate", selector: row => row.createdOn, sortable: true },
//    {
//   name: "Actions",
//   cell: (row) => (
//     <div className="flex gap-4">
//       <Link to={`/superadmin/addAdmin/${row._id}`}>
//         <FaEdit className="text-blue-500 cursor-pointer" />
//       </Link>
//       {/* <Link to={`/superadmin/deleteadmin/${row._id}`}> */}
//          <FaTrash
//            className="text-red-500 cursor-pointer"
//            onClick={() =>{
//              deleteAdmin(row._id);
//            }}
//          />
//       {/* </Link> */}
      
//     </div>
//   ),
// }
//   ];

//   const [viewAdmin, setViewAdmin] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getAllItems = () => {
//     setIsLoading(true);
//     setError(null);
//     axios
//       .get("${VITE_API}view/admin")
//       .then((res) => {
//         console.log("Fetched admins:", res.data);
//         // adjust if response format is: { data: [...] }
//         setViewAdmin(res.data.adminData); 
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching admins:", error);
//         setError("Failed to load admins. Please try again later.");
//         setIsLoading(false);
//       });
//   };

// const filteredadmins = viewAdmin.filter((admin) =>
//   `${admin.name},${admin.email}`
//     .toLowerCase()
//     .includes(searchTerm.toLowerCase())
// );

//   useEffect(() => {
//     getAllItems(); // Used for fetching the API 
//       // setViewAdmin(dummyadmins); 
//   }, []);

//   return (
//     <div className="pt-4 m-6">
//       <div className="container bg-gray-100 h-full">
//         {isLoading ? (
//           <div className="text-center">Loading...</div>
//         ) : error ? (
//           <div className="text-red-600 text-center">{error}</div>
//         ) : (
//         <> 
//           <SearchBar title="admin" addLink="/superadmin/addadmin" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <DataTable
//             columns={columns}
//             data={filteredadmins}
//             // data={Array.isArray(viewadmin) ? viewadmin : []}
//             fixedHeader
//             pagination
//             fixedHeaderScrollHeight="400px"
//             noDataComponent="No admins found."
//           />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//--------------------------------------------1st Code------------------------------------------------ 

// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import {Link, useNavigate} from 'react-router-dom';
// import SearchBar from './SearchBar'


// export default function ViewAdmin() {
//   const navigate = useNavigate ();
//   const deleteAdmin = async (id) =>{
//      if (!window.confirm("Are you sure you want to delete this admin?")) return;
//      try{
//        await axios.delete(`${VITE_API}delete/admin/${id}`)
//        setViewAdmin(prev => prev.filter((admin)=> admin._id !== id));  
//        navigate('/superadmin/viewAdmin');
//      }catch(err){
//        console.error("Error Deleting admin",err);
//        alert("Failed to delete admin")
//      }
//   }

//   const columns = [
//     { name: "Id", selector: row => row._id, sortable: true },
//     { name: "Name", selector: row => row.name, sortable: true },
//     { name: "Email", selector: row => row.email, sortable: true },
//     { name: "Password", selector: row => row.password, sortable: true },
//     { name: "Phone", selector: row => row.phoneNumber, sortable: true },
//    {
//   name: "Actions",
//   cell: (row) => (
//     <div className="flex gap-4">
//       <Link to={`/superadmin/addAdmin/${row._id}`}>
//         <FaEdit className="text-blue-500 cursor-pointer" />
//       </Link>
//       {/* <Link to={`/superadmin/deleteadmin/${row._id}`}> */}
//          <FaTrash
//            className="text-red-500 cursor-pointer"
//            onClick={() =>{
//              deleteAdmin(row._id);
//            }}
//          />
//       {/* </Link> */}
      
//     </div>
//   ),
// }
//   ];

//   const [viewadmin, setViewAdmin] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const getAllItems = () => {
//     setIsLoading(true);
//     setError(null);
//     axios
//       .get("${VITE_API}view/admin")
//       .then((res) => {
//         console.log("Fetched admins:", res.data);
//         // adjust if response format is: { data: [...] }
//         setViewAdmin(res.data.adminData); 
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching admins:", error);
//         setError("Failed to load admins. Please try again later.");
//         setIsLoading(false);
//       });
//   };

// const filteredAdmins = viewadmin.filter((admin) =>
//   `${admin.name},${admin.email}`
//     .toLowerCase()
//     .includes(searchTerm.toLowerCase())
// );

//   useEffect(() => {
//     getAllItems(); // Used for fetching the API 
//       // setViewadmin(dummyadmins); 
//   }, []);

//   return (
//     <div className="pt-4 m-6">
//       <div className="container bg-gray-100 h-full">
//         {isLoading ? (
//           <div className="text-center">Loading...</div>
//         ) : error ? (
//           <div className="text-red-600 text-center">{error}</div>
//         ) : (
//         <> 
//           <SearchBar title="admin" addLink="/superadmin/addadmin" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <DataTable
//             columns={columns}
//             data={filteredAdmins}
//             // data={Array.isArray(viewadmin) ? viewadmin : []}
//             fixedHeader
//             pagination
//             fixedHeaderScrollHeight="400px"
//             noDataComponent="No admins found."
//           />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
