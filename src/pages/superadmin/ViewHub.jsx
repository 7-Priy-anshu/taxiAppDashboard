import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchBar from "../../components/SearchBar";
import { useAuth } from "../../context/AuthContext";
import BackButton from "../../components/BackButton";
import globalTableStyles from "../../styles/globalTableStyles";
import { getApiAuth } from "../../utils/apiServices";

export default function ViewHub() {
  const { user, token } = useAuth();
  const { role, id } = useParams();
  const navigate = useNavigate();
  const VITE_API = import.meta.env.VITE_API;

  const deleteHub = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hub?")) return;
    try {
      const authToken = token || JSON.parse(localStorage.getItem("user") || "{}")?.token;
      await getApiAuth(`delete/hub/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setViewHub((prev) => prev.filter((hub) => hub._id !== id));
      navigate('/superAdmin/viewHub');
    } catch (err) {
      console.error("Error Deleting hub:", err.response?.data || err.message);
      alert("Failed to delete hub");
    }
  };

  const columns = [
    { name: "Id", selector: (row) => row._id || 'N/A', sortable: true },
    { name: "HubName", selector: (row) => row.hubName || 'N/A', sortable: true },
    { name: "HubLocation", selector: (row) => row.hubLocation || 'N/A', sortable: true },
    { name: "HubCarCapacity", selector: (row) => row.hubCarCapacity || 'N/A', sortable: true },
    { name: "Longitude", selector: (row) => row.coordinates?.coordinates[0] || 'N/A', sortable: true },
    { name: "Latitude", selector: (row) => row.coordinates?.coordinates[1] || 'N/A', sortable: true },
    {
      name: "AssignCars",
      cell: (row) => (
        <div className="justify-center ms-5">
          <Link to={`/superAdmin/assignCarHub/${row._id}`}>
            <FaPlus className="text-blue-500 cursor-pointer" />
          </Link>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-4">
          <Link to={`/superAdmin/addHub/${row._id}`}>
            <FaEdit className="text-blue-500 cursor-pointer" />
          </Link>
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => deleteHub(row._id)}
          />
          <Link to={`/superAdmin/viewCarHub/${row._id}`}>
            <FaEye className="text-blue-500 cursor-pointer" />
          </Link>
        </div>
      ),
    },
  ];

  const [viewHub, setViewHub] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getApiAuth(`view/hub`);
      console.log("API Response for view/hub:", res.data); // Log the response
      if (Array.isArray(res.data)) {
        setViewHub(res.data);
      } else {
        setViewHub([]);
        setError("Unexpected data format from API");
      }
    } catch (error) {
      console.error("Error fetching hub:", error.response?.data || error.message);
      setError("Failed to load hubs. Please check your network or authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredHub = viewHub.filter((hub) =>
    `${hub.hubName || ''} ${hub.hubLocation || ''} ${hub.hubCarCapacity || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log("Auth status - user:", user, "token:", token);
    if (user?.id && token) { // Changed user._id to user.id (adjust based on your context)
      getAllItems();
    } else {
      setError("Authentication failed. Please log in.");
    }
  }, [user, token]);

  return (
    <div className="p-6 flex flex-col gap-2">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <div className="max-w-4xl flex">
          <Link to="/superadmin">
            <BackButton text="Back" />
          </Link>
        </div>
      </div>
      <div className="container bg-gray-100 h-full">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            <SearchBar
              title="Hub"
              addLink="/superAdmin/addHub"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <DataTable
              columns={columns}
              data={filteredHub}
              fixedHeader
              pagination
              noDataComponent="No hub found"
              customStyles={globalTableStyles} // Fixed to customStyles
            />
          </>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import SearchBar from "../../components/SearchBar";
// import {useAuth} from "../../context/AuthContext"
// import BackButton from "../../components/BackButton";
// import globalTableStyles from "../../styles/globalTableStyles";
// import { getApiAuth } from "../../utils/apiServices";


// export default function ViewHub() {

//   const { user, token } = useAuth();
//   const { role, id } = useParams();
//   const navigate = useNavigate();
//   const VITE_API = import.meta.env.VITE_API

//   const deleteHub = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this hub?")) return;
//     try {
//       await axios.delete(`${VITE_API}delete/hub/${id}`)
//       setViewHub(prev => prev.filter((hub) => hub._id !== id));
//       navigate('/superAdmin/viewHub');
//     } catch (err) {
//       console.error("Error Deleting hub", err);
//       alert("Failed to delete hub");
//     }
//   }

//   const columns = [
//     { name: "Id", selector: row => row._id, sortable: true },
//     { name: "HubName", selector: row => row.hubName, sortable: true },
//     { name: "HubLocation", selector: row => row.hubLocation, sortable: true },
//     { name: "HubCarCapacity", selector: row => row.hubCarCapacity, sortable: true },
//     { name: "Longitude", selector: row => row.coordinates.coordinates[0], sortable: true },
//     { name: "Latitude", selector: row => row.coordinates.coordinates[1], sortable: true },
//     { name: "AssignCars", cell: (row) =>(  
//               <div className="justify-center ms-5">
//           <Link to={`/superAdmin/assignCarHub/${row._id}`}>
//             <FaPlus className="text-blue-500 cursor-pointer" />
//           </Link>
//           </div> ) },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-4">
//           <Link to={`/superAdmin/addHub/${row._id}`}>
//             <FaEdit className="text-blue-500 cursor-pointer" />
//           </Link>
//           <Link to={`/superAdmin/deleteHub/${row._id}`}>
//             <FaTrash
//               className="text-red-500 cursor-pointer"
//               onClick={() => deleteHub(row._id)}
//             />
//           </Link>
//           <Link to={`/superAdmin/viewCarHub/${row._id}`}>
//             <FaEye className="text-blue-500 cursor-pointer" />
//           </Link>
//         </div>
//       ),
//     }
//   ]

//   const [viewHub, setViewHub] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//  const getAllItems = async () => {
//   setIsLoading(true);
//   setError(null);
//   try {
//     const res = await getApiAuth(`view/hub`);
//     setViewHub(res.data); // ✅ now data will render
//   } catch (error) {
//     console.error("Error fetching hub:", error);
//     setError("Failed to load hub. Please try again later.");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const filteredHub = viewHub.filter((hub) =>
//     `${hub.hubName} ${hub.hubLocation} ${hub.hubCarCapacity}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );
// useEffect(() => {
//   // console.log("Auth status - user:", user);
//   if ( user && user._id) {
//     getAllItems();
//   }
// }, [user]);

//   return (
//     <div className="p-6 flex flex-col gap-2">
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
//         <div className="max-w-4xl flex">
//           <Link to="/superadmin">
//             <BackButton text="Back"></BackButton>
//           </Link>
//         </div>
//       </div>
//       <div className="container bg-gray-100 h-full">
//         {isLoading ? (
//           <div className="text-center">Loading...</div>
//         ) : error ? (
//           <div className=""> </div>
//         ) : (
//           <>
//           <SearchBar title="Hub" addLink="/superAdmin/addHub" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//             <DataTable
//               columns={columns}
//               data={filteredHub}
//               fixedHeader
//               pagination
//               noDataComponent="No hub found"
//               globalTableStyles={globalTableStyles}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   )
// }


