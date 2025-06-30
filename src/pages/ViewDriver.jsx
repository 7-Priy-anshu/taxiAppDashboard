import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import SearchBar from './SearchBar'


export default function ViewDriver() {
  const navigate = useNavigate ();
  const deleteDriver = async (id) =>{
     if (!window.confirm("Are you sure you want to delete this driver?")) return;
     try{
       await axios.delete(`http://183.18.18.71:4000/delete/driver/${id}`)
       setViewDriver(prev => prev.filter((driver)=> driver._id !== id));  
       navigate('/superadmin/viewDriver');
     }catch(err){
       console.error("Error Deleting driver",err);
       alert("Failed to delete driver")
     }
  }

  const columns = [
    { name: "Id", selector: row => row._id, sortable: true },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Contact", selector: row => row.contact, sortable: true },
    { name: "Aadhar", selector: row => row.aadhar, sortable: true },
   {
  name: "Actions",
  cell: (row) => (
    <div className="flex gap-4">
      <Link to={`/superadmin/addDriver/${row._id}`}>
        <FaEdit className="text-blue-500 cursor-pointer" />
      </Link>
      {/* <Link to={`/superadmin/deleteDriver/${row._id}`}> */}
         <FaTrash
           className="text-red-500 cursor-pointer"
           onClick={() =>{
             deleteDriver(row._id);
           }}
         />
      {/* </Link> */}
      
    </div>
  ),
}
  ];

  const [viewDriver, setViewDriver] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  
  const getAllItems = () => {
    const token = localStorage.getItem('authToken');
    console.log(`MYTOKEN ${token}`);
    setIsLoading(true);
    setError(null);
    axios
      .get("http://183.18.18.71:4000/view/driver",{
           withCredentials: true
      })
      .then((res) => {
        // console.log("Fetched Drivers:", res.data);
        // adjust if response format is: { data: [...] }
        console.log('CAME HERE')
        setViewDriver(res.data.driverData); 
        console.log('CAME HERE2')
        setIsLoading(false);
        console.log('CAME HERE3')
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
        setError("Failed to load drivers. Please try again later.");
        setIsLoading(false);
      });
  };
const filteredDrivers = viewDriver.filter((driver) =>
  `${driver.name},${driver.email}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

  useEffect(() => {
    getAllItems(); // Used for fetching the API 
      // setViewDriver(dummyDrivers); 
  }, []);

  return (
    <div className="pt-4 m-6">
      <div className="container bg-gray-100 h-full">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
        <> 
          <SearchBar title="Driver" addLink="/superadmin/addDriver" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DataTable
            columns={columns}
            data={filteredDrivers}
            // data={Array.isArray(viewDriver) ? viewDriver : []}
            fixedHeader
            pagination
            fixedHeaderScrollHeight="400px"
            noDataComponent="No drivers found."
          />
          </>
        )}
      </div>
    </div>
  );
}
