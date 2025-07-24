import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchBar from "../../components/SearchBar";
import {useAuth} from "../../context/AuthContext"
import BackButton from "../../components/BackButton";
import globalTableStyles from "../../styles/globalTableStyles";


export default function ViewHub() {

  const { user } = useAuth();
  const { role, id } = useParams();
  const navigate = useNavigate();
  const VITE_API = import.meta.env.VITE_API

  const deleteHub = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hub?")) return;
    try {
      await axios.delete(`${VITE_API}delete/hub/${id}`)
      setViewHub(prev => prev.filter((hub) => hub._id !== id));
      navigate('/superAdmin/viewHub');
    } catch (err) {
      console.error("Error Deleting hub", err);
      alert("Failed to delete hub");
    }
  }

  const columns = [
    { name: "Id", selector: row => row._id, sortable: true },
    { name: "hubName", selector: row => row.hubName, sortable: true },
    { name: "hubLocation", selector: row => row.hubLocation, sortable: true },
    { name: "hubCarCapacity", selector: row => row.hubCarCapacity, sortable: true },
    { name: "longitude", selector: row => row.coordinates.coordinates[0], sortable: true },
    { name: "latitude", selector: row => row.coordinates.coordinates[1], sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-4">
          <Link to={`/superAdmin/addHub/${row._id}`}>
            <FaEdit className="text-blue-500 cursor-pointer" />
          </Link>
          <Link to={`/superAdmin/deleteHub/${row._id}`}>
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteHub(row._id)}
            />
          </Link>
        </div>
      ),
    }
  ]

  const [viewHub, setViewHub] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllItems = () => {
    setIsLoading(true);
    setError(null);
    axios.get(`${VITE_API}view/hub`)
      .then((res) => {
        console.log("Fetched Hub:", res.data);
        setViewHub(res.data);
        setIsLoading(false);
      }).catch((error) => {
        console.error("Error fetching hub:", error);
        setError("Failed to load hub. Please try again later.");
        setIsLoading(false);
      });
  }

  const filteredHub = viewHub.filter((hub) =>
    `${hub.hubName} ${hub.hubLocation} ${hub.hubCarCapacity}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
useEffect(() => {
  console.log("Auth status - user:", user);
  if ( user && user._id) {
    getAllItems();
  }
}, [user]);

  return (
    <div className="p-6 flex flex-col gap-2">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <div className="max-w-4xl flex">
          <Link to="/superadmin">
            <BackButton text="Back"></BackButton>
          </Link>
        </div>
      </div>
      <div className="container bg-gray-100 h-full">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className=""> </div>
        ) : (
          <>
          <SearchBar title="Hub" addLink="/superAdmin/addHub" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <DataTable
              columns={columns}
              data={filteredHub}
              fixedHeader
              pagination
              noDataComponent="No hub found"
customStyles={globalTableStyles}
            />
          </>
        )}
      </div>
    </div>
  )
}


