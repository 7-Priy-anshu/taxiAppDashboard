import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import BackButton from "../../components/BackButton";
// import SearchBar from "../../components/SearchBar";
// import BackButton from "../../components/BackButton";


export default function ViewAdmin() {
  const navigate = useNavigate();
  const VITE_API = import.meta.env.VITE_API;
  const [viewAdmin, setViewAdmin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllItems = () => {
    setIsLoading(true);
    setError(null);
    axios
      .get(`${VITE_API}view/admin`)
      .then((res) => {
        console.log("View Admin:",res.data.adminData)
        setViewAdmin(res.data.adminData || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
        setError("Failed to load admins. Please try again later.");
        setIsLoading(false);
      });
  };

  const deleteAdmin = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this admin?");
    if (!confirm) return;

    try {
      await axios.delete(`${VITE_API}delete/admin/${id}`);
      setViewAdmin((prev) => prev.filter((admin) => admin._id !== id));
    } catch (err) {
      console.error("Error deleting admin", err);
      alert("Failed to delete admin");
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const filteredAdmins = viewAdmin.filter((admin) =>
    `${admin.name} ${admin.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: "ID", selector: (row) => row._id, sortable: true, wrap: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phoneNumber, sortable: true },
    { name: "Role", selector: (row) => row.role || row.role, sortable: true },
    { name: "ClientEmail", selector: (row) => row.clientEmail || row.clientEmail, sortable: true },
    {
      name: "Created On",
      selector: (row) =>
        row.createdOn ? new Date(row.createdOn).toLocaleDateString() : "N/A",
      sortable: true,
    },
    {
      name: "Permissions",
      selector: (row) =>
        Array.isArray(row.permissions) ? row.permissions.join(", ") : "None",
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-4 items-center">
          <Link to={`/superadmin/addAdmin/${row._id}`}>
            <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
          </Link>
          <FaTrash
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => deleteAdmin(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-2">
            <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
              <div className=" max-w-4xl flex ">
                          {/* Add Admin */}
                  <Link to="/superadmin">
                      <BackButton text="Back"></BackButton>
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
              title="Admin"
              addLink="/superadmin/addadmin"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <DataTable
              columns={columns}
              data={filteredAdmins}
              fixedHeader
              pagination
              highlightOnHover
              fixedHeaderScrollHeight="400px"
              noDataComponent="No admins found."
              responsive
            />
          </>
        )}
      </div>
    </div>
  );
}

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
