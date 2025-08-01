  import { useEffect, useState } from "react";
  import DataTable from "react-data-table-component";
  import axios from "axios";
  import { FaTrash, FaEdit } from "react-icons/fa";
  import { Link, useNavigate, useParams } from 'react-router-dom';
  import SearchBar from "../../components/SearchBar";
  import { useAuth } from "../../context/AuthContext";
  import BackButton from "../../components/BackButton";
  import globalTableStyles from "../../styles/globalTableStyles";
import { getApiAuth } from "../../utils/apiServices";

  export default function ViewCar() {
    const { user,token } = useAuth();
    const { role, id } = useParams();
    const navigate = useNavigate();
    const VITE_API = import.meta.env.VITE_API;

    const deleteCar = async (id) => {
      if (!window.confirm("Are you sure you want to delete this car?")) return;
      try {
        await axios.delete(`${VITE_API}delete/car/${id}`,{
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      }
    })
        setViewCar(prev => prev.filter((car) => car._id !== id));
        navigate('/superadmin/viewCar');
      } catch (err) {
        console.error("Error Deleting car", err);
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

    // const getAllItems = () => {
    //   setIsLoading(true);
    //   setError(null);
    //   axios
    //     // .get(`${VITE_API}view/car`)
    //     .get(`${VITE_API}view/car`,{
    //     headers:{
    //       "Content-Type":"application/json",
    //       Authorization: `Bearer ${token}`,
    //     }
    //   }).then((res) => {
    //     // adjust if response format is: { data: [...] }
    //     setViewCar(res.data.carData);
    //     console.log("Fetched cars:", res.data.carData);
    //       setIsLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching cars:", error);
    //       setError("Failed to load cars. Please try again later.");
    //       setIsLoading(false);
    //     });
    // };

    const getAllItems = () => {
    setIsLoading(true);
    setError(null);
    // axios
    //   .get(`${VITE_API}view/car`, {
    //   headers:{
    //     "Content-Type":"application/json",
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
      getApiAuth(`view/car`)
      then((res) => {
        console.log("View Car Response:", res.data); // Log full response
        setViewCar(res.data.carData || []); // Updated to match API response
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error.response?.data || error.message);
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
    getAllItems();
  }, [user?.token]); // Re-fetch if token changes


    return (
      <div className="p-6 flex flex-col gap-2">
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
          <div className=" max-w-4xl flex ">
            {/* View Cars */}
            <Link to="/superadmin">
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
              <SearchBar title="Car" addLink="/superadmin/addCar" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
           {/* <DataTable
  columns={columns}
  data={Array.isArray(filteredCars) ? filteredCars : []}
  fixedHeader
  pagination
  fixedHeaderScrollHeight="400px"
  noDataComponent="No cars found."
/> */}

              <DataTable
                columns={columns}
                data={filteredCars}
                // data={Array.isArray(viewCar) ? viewCar : []} 
                fixedHeader
                pagination
                fixedHeaderScrollHeight="400px"
                noDataComponent="No cars found."
                globalTableStyles={globalTableStyles}
              />
            </>
          )}
        </div>
      </div>
    );
  }
