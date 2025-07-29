
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
// import SearchBar from '../../components/SearchBar';
import SearchBar from "../../components/SearchBar";
import { useAuth } from "../../context/AuthContext";
// import BackButton from "./BackButton";
import BackButton from "../../components/BackButton";
import globalTableStyles from '../../styles/globalTableStyles';

export default function ViewDriver() {
  const { role, id } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();
  const VITE_API = import.meta.env.VITE_API;

  const deleteDriver = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await axios.delete(`${VITE_API}delete/driver/${id}`);
      setViewDriver((prev) => prev.filter((driver) => driver._id !== id));
      navigate('/superadmin/viewDriver');
    } catch (err) {
      console.error("Error Deleting driver", err);
      alert("Failed to delete driver");
    }
  };

  const columns = [
    { name: "Id", selector: row => row._id, sortable: true },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Contact", selector: row => row.contact, sortable: true },
    { name: "Licence", selector: row => row.licenceNo, sortable: true },
    { name: "Aadhar", selector: row => row.aadhar, sortable: true },
    { name: "Address", selector: row => row.address, sortable: true },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`
            text-xs px-2 py-1 rounded-full
            ${row.status === "active"
              ? "bg-green-100 text-green-700"
              : row.status === "cancel"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : "Pending"}
        </span>
      )
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/superadmin/addDriver/${row._id}`}>
            <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
          </Link>
          <FaTrash
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => deleteDriver(row._id)}
          />
        </div>
      ),
    },
  ];

  const [viewDriver, setViewDriver] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllItems = () => {
    setIsLoading(true);
    setError(null);
    axios
      .get(`${VITE_API}view/driver`,{
      headers:{
        "Content-Type":"json/application",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        setViewDriver(res.data.driverData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
        setError("Failed to load drivers. Please try again later.");
        setIsLoading(false);
      });
  };

  const filteredDrivers = viewDriver.filter((driver) =>
    `${driver.name},${driver.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllItems();
  }, []);

  const customStyles = {
    table: {
      style: {
        borderRadius: '0.75rem',
        overflow: 'hidden',
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f9fafb', // gray-50
        fontWeight: '600',
        fontSize: '14px',
        borderBottom: '1px solid #e5e7eb', // gray-200
      },
    },
    rows: {
      style: {
        minHeight: '60px',
        borderBottom: '1px solid #e5e7eb',
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  };

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
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <>
            <SearchBar  
              title="Driver"
              addLink="/superadmin/addDriver"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <DataTable
              columns={columns}
              data={filteredDrivers}
              pagination
              selectableRows
              highlightOnHover
              pointerOnHover
              striped
              // customStyles={customStyles}
              globalTableStyles={globalTableStyles}
              noDataComponent="No drivers found."
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
// import { FaTrash, FaEdit } from "react-icons/fa";
// import {Link, useNavigate} from 'react-router-dom';
// import SearchBar from './SearchBar'
// import { useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ViewDriver() {
// const { role, id } = useParams();
// const { user } = useAuth();

// // if (role !== user.role) return <div>Access denied</div>;

// // fetch driver by id
//   const navigate = useNavigate ();
//   const deleteDriver = async (id) =>{
//      if (!window.confirm("Are you sure you want to delete this driver?")) return;
//      try{
//        await axios.delete(`${VITE_API}/delete/driver/${id}`)
//        setViewDriver(prev => prev.filter((driver)=> driver._id !== id));  
//        navigate('/superadmin/viewDriver');
//      }catch(err){
//        console.error("Error Deleting driver",err);
//        alert("Failed to delete driver")
//      }
//   }

//   const columns = [
//     { name: "Id", selector: row => row._id, sortable: true },
//     { name: "Name", selector: row => row.name, sortable: true },
//     { name: "Email", selector: row => row.email, sortable: true },
//     { name: "Contact", selector: row => row.contact, sortable: true },
//     { name: "Licence", selector: row => row.licenceNo, sortable: true },
//     { name: "Aadhar", selector: row => row.aadhar, sortable: true },
//     { name: "Address", selector: row => row.address, sortable: true },
//    {
//   name: "Actions",
//   cell: (row) => (
//     <div className="flex gap-4">
//       <Link to={`/superadmin/addDriver/${row._id}`}>
//         <FaEdit className="text-blue-500 cursor-pointer" />
//       </Link>
//       {/* <Link to={`/superadmin/deleteDriver/${row._id}`}> */}
//          <FaTrash
//            className="text-red-500 cursor-pointer"
//            onClick={() =>{
//              deleteDriver(row._id);
//            }}
//          />
//       {/* </Link> */}
      
//     </div>
//   ),
// }
//   ];

//   const [viewDriver, setViewDriver] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

  
//   const getAllItems = () => {
//     const token = localStorage.getItem('authToken');
//     const values = setIsLoading(true);    setError(null);
//     axios.get(`http://183.18.18.71:4000/view/driver/${user.id}`)
//       .then((res) => {
//         // console.log("Fetched Drivers:", res.data);
//         // adjust if response format is: { data: [...] }
//         setViewDriver(res.data.driverData); 
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching drivers:", error);
//         setError("Failed to load drivers. Please try again later.");
//         setIsLoading(false);
//       });
//   };
// const filteredDrivers = viewDriver.filter((driver) =>
//   `${driver.name},${driver.email}`
//     .toLowerCase()
//     .includes(searchTerm.toLowerCase())
// );

//   useEffect(() => {
//     getAllItems(); // Used for fetching the API 
//       // setViewDriver(dummyDrivers); 
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
//           <SearchBar title="Driver" addLink="/superadmin/addDriver" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <DataTable
//             columns={columns}
//             data={filteredDrivers}
//             // data={Array.isArray(viewDriver) ? viewDriver : []}
//             fixedHeader
//             pagination
//             fixedHeaderScrollHeight="400px"
//             noDataComponent="No drivers found."
//           />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
