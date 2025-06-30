import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import SearchBar from './SearchBar'

export default function ViewCar() {
  const navigate = useNavigate ();
  const deleteCar = async (id) =>{
     if (!window.confirm("Are you sure you want to delete this car?")) return;
     try{
       await axios.delete(`http://183.18.18.71:4000/delete/car/${id}`)
       setViewCar(prev => prev.filter((car)=> car._id !== id));  
       navigate('/superadmin/viewCar');
     }catch(err){
       console.error("Error Deleting car",err);
       alert("Failed to delete car");
     }
  }

  const columns = [
    { name: "Id", selector: row => row._id, sortable: true },
    { name: "carName", selector: row => row.carName, sortable: true },
    { name: "carModel", selector: row => row.carModel, sortable: true },
    { name: "carNumber", selector: row => row.carNumber, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
       <div className="flex gap-4">
        <Link to={`/superadmin/addCar/${row._id}`}>
          <FaEdit className="text-blue-500 cursor-pointer" />
        </Link>
        <Link to={`/superadmin/deleteCar/${row._id}`}>
          <FaTrash
          className="text-red-500 cursor-pointer"
          onClick={() => deleteCar(row._id)}
        />
        </Link>
       </div>
    ),
      // ignoreRowClick: true,
      // button: true,
      // allowOverflow: true,
    },
  ];

  const [viewCar, setViewCar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const getAllItems = () => {
    setIsLoading(true);
    setError(null);
    axios
      .get("http://183.18.18.71:4000/view/car")
      .then((res) => {
        // console.log("Fetched cars:", res.data);
        // adjust if response format is: { data: [...] }
        setViewCar(res.data.carData); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again later.");
        setIsLoading(false);
      });
  };

  const filteredCars = viewCar.filter((car) =>
    `${car.carName} ${car.carModel} ${car.carNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );   

  useEffect(() => {
    getAllItems(); // Used for fetching the API 
      // setViewCar(dummycars); 
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
          <SearchBar title="Car" addLink="/superadmin/addCar" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DataTable
            columns={columns}
            // data={Array.isArray(viewCar) ? viewCar : []} 
            data={filteredCars}
            fixedHeader
            pagination
            fixedHeaderScrollHeight="400px"
            noDataComponent="No cars found."
          />
        </>
      )}
    </div>
  </div>
);
}
