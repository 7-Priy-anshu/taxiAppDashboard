import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import {Link, useNavigate, useParams} from 'react-router-dom';
import SearchBar from '../components/SearchBar'
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";
import globalTableStyles from '../styles/globalTableStyles';
import { getApiAuth } from "../utils/apiServices";
export default function ViewCustomer() {
  const {user,token} = useAuth();
  const {role,id} = useParams();

  // if (role !== user.role) return <div>Access denied</div>;

  const navigate = useNavigate ();
  const handleDelete = async (id) =>{
     if (!window.confirm("Are you sure you want to delete this driver?")) return;
     try{
       await axios.delete(`${VITE_API}delete/customer/${id}`)
       setViewCustomer(prev => prev.filter((customer)=> customer._id !== id));  
       navigate('/superadmin/viewCustomer');
     }catch(err){
       console.error("Error Deleting Customer",err);
       alert("Failed to delete customer")
     }
  }

  const columns = [
    { name: "Id", selector: row => row._id, sortable: true },
    { name: "Customer Name", selector: row => row.customerName, sortable: true },
    { name: "Customer Email", selector: row => row.customerEmail, sortable: true },
    { name: "Customer Mobile", selector: row => row.customerMobile, sortable: true },
    // { name: "Customer Aadhar", selector: row => row.aadhar, sortable: true },
    {
    name: "Actions",
    cell: (row) => (
      <div className="flex gap-4">
        <Link to={`/superadmin/addCustomer/${row._id}`}>
          <FaEdit className="text-blue-500 cursor-pointer" />
        </Link>
        <Link to={`/superadmin/handleDelete/${row._id}`}>
         <FaTrash
          className="text-red-500 cursor-pointer"
          onClick={() => {
            handleDelete(row._id);
          }}
         />
        </Link>
      </div>
    ),
    // ignoreRowClick: true,
    // allowOverflow: true,
    // button: true
   }
  ];

  const [viewCustomer, setViewCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const VITE_API = import.meta.env.VITE_API;

  const getAllCustomer = async () => {
    setIsLoading(true);
    setError(null);
    const response = await getApiAuth(`view/customer`)
    // axios
    //   .get(`${VITE_API}view/customer`,{
    //     headers:{
    //       "Content-type":"application/json",
    //       Authorization:`Bearer ${token}`
    //     }
    //   })
      .then((res) => {
        // console.log("Fetched Customers:", res.data);
        // adjust if response format is: { data: [...] }
        setViewCustomer(res.data.customerData); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Customers:", error);
        setError("Failed to load Customers. Please try again later.");
        setIsLoading(false);
      });
  };

  const filteredCustomers = viewCustomer.filter((customer)=>
    `${customer.customerName},${customer.customerEmail}`
     .toLowerCase()
     .includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   getAllCustomer(); // Used for fetching the API 
  //     // setViewCustomer(dummyCustomers); 
  // }, []);


  useEffect(() => {
    getAllCustomer();
  }, []);


  return (
    <div className="p-6 flex flex-col gap-2">

      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <div className=" max-w-4xl flex ">
                    {/* View Customers */}
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
          <SearchBar title="Customer" addLink="/superadmin/addCustomer" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DataTable
            columns={columns}
            data={filteredCustomers}
            // data={Array.isArray(viewCustomer) ? viewCustomer : []}
            fixedHeader
            pagination
            fixedHeaderScrollHeight="400px"
            noDataComponent="No Customers found."
            globalTableStyles={globalTableStyles}
          />
        </>
        )}
      </div>
    </div>
  );
}
