import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import {Link, useNavigate,useParams} from 'react-router-dom';
import SearchBar from "../../components/SearchBar";
import { useAuth } from "../../context/AuthContext";
import BackButton from "../../components/BackButton";
import globalTableStyles from "../../styles/globalTableStyles";

export default function ViewClient() {
  const {user} = useAuth();
  const {role,id} = useParams();
  const navigate = useNavigate ();
  const VITE_API = import.meta.env.VITE_API;

  const deleteClient = async (id) =>{
     if (!window.confirm("Are you sure you want to delete this client?")) return;
     try{
       await axios.delete(`${VITE_API}delete/client/${id}`)
       setViewClient(prev => prev.filter((client)=> client._id !== id));  
       navigate('/superAdmin/viewClient');
     }catch(err){
       console.error("Error Deleting client",err);
       alert("Failed to delete client");
     }
  }

  const columns = [
    { name: "Id", selector: row => row._id, sortable: true },
    { name: "clientName", selector: row => row.clientName, sortable: true },
    { name: "clientEmail", selector: row => row.clientEmail, sortable: true },
    { name: "clientPhone", selector: row => row.clientPhone, sortable: true },
    { name: "clientPassword", selector: row => row.clientPassword, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
       <div className="flex gap-4">
        <Link to={`/superAdmin/addClient/${row._id}`}>
          <FaEdit className="text-blue-500 cursor-pointer" />
        </Link>
        <Link to={`/superAdmin/deleteClient/${row._id}`}>
          <FaTrash
          className="text-red-500 cursor-pointer"
          onClick={() => deleteClient(row._id)}
        />
        </Link>
       </div>
    ),
      // ignoreRowClick: true,
      // button: true,
      // allowOverflow: true,
    },
  ];

  const [viewClient, setViewClient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const getAllItems = () => {
    setIsLoading(true);
    setError(null);
    axios 
      // .get(`${VITE_API}view/client`)
      .get(`${VITE_API}view/client`)
      .then((res) => {
        console.log("Fetched  client on view:", res.data);
        // adjust if response format is: { data: [...] }
        setViewClient(res.data.clientData); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching client:", error);
        setError("Failed to load client. Please try again later.");
        setIsLoading(false);
      });
  };

  const filteredClient = viewClient.filter((client) =>
    `${client.clientName} ${client.clientModel} ${client.clientNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );   
    useEffect(() => {
  if (user && user._id) {
    getAllItems();
  }
}, [user]);

return (
 <div className="p-6 flex flex-col gap-2">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <div className=" max-w-4xl flex ">
                    {/* View Client */}
            <Link to="/superAdmin">
                <BackButton text="Back"></BackButton>
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
          <SearchBar title="Client" addLink="/superAdmin/addClient" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DataTable
            columns={columns}
            data={filteredClient}
            // data={Array.isArray(viewClient) ? viewClient : []} 
            fixedHeader
            pagination
            fixedHeaderScrollHeight="400px"
            noDataComponent="No client found."
            globalTableStyles={globalTableStyles}
          />
        </>
      )}
    </div>
  </div>
);
}
