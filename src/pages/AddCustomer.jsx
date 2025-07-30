import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaPlus, FaPhone, FaIdCard, FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import BackButton from "../components/BackButton"
import { useAuth } from '../context/AuthContext';

const CustomerSchema = Yup.object().shape({
  customerName: Yup.string().required('Customer name is required'),
  customerEmail: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  customerMobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
    .required('Mobile number is required'),
  aadhar: Yup.string().required("Aadhar number is required"),
});

export default function AddCustomer() {
  const { id } = useParams(); // will be undefined in Add mode
  const {token} = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    contact: "",
    aadhar: ""
  });

  const VITE_API = import.meta.env.VITE_API;

  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      axios.get(`${VITE_API}add/customer/${id}`,{
        headers:{
          "Content-type":"application/json",
           Authorization:`Bearer ${token}`
        }
      })
        .then(res => {
          // const data = res.data.user || res.data
          setInitialValues(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching customer:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (values) => {
    if (id) {
      axios.put(`${VITE_API}update/customer/${id}`, values,{
        headers:{
          "Content-type":"application/json",
           Authorization:`Bearer ${token}`
        }
      })
        .then(() => {
          navigate("/superadmin/viewCustomer");
        }).catch(err => console.error("Update failed:", err));
    } else {
      axios.post(`${VITE_API}add/customer`, values,{
        headers:{
          "Content-type":"application/json",
           Authorization:`Bearer ${token}`
        }
      })
        .then(() => navigate("/superadmin/viewCustomer"))
        .catch(err => console.error("Add failed:", err));
    }
  };

  if (loading) return <div>Loading customer info...</div>;

  return (
    <div className='grid min-h-full' >
         <div className="flex flex-col items-center justify-center gap-2  bg-white p-4">
      <div className="w-full max-w-4xl flex gap-2">
        {/* Add Admin */}
        <Link to="/superadmin">
          <BackButton text="Back">
          </BackButton>
        </Link>
      </div>
      {/* <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md"> */}
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md">

        <h1 className="text-3xl font-bold mb-4">{id ? "Edit" : "Add"} Customer</h1>
        {submitError && (
          <div className="text-red-500 mb-4 flex justify-between items-center bg-red-100 p-2 rounded">
            {submitError}
            <button
              onClick={() => setSubmitError(null)}
              className="text-red-700"
            >
              ✕
            </button>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={CustomerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="relative">
                <Field
                  type="text"
                  name="customerName"
                  placeholder="Enter Name"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <ErrorMessage
                  name="customerName"
                  component="div"
                   className="text-red-500 absolute left-0 -bottom-4 text-xs mt-1"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Field
                  type="email"
                  name="customerEmail"
                  placeholder="Enter Email"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <MdEmail className="text-gray-500" />
                </div>
                <ErrorMessage
                  name="customerEmail"
                  component="div"
                   className="text-red-500 absolute left-0 -bottom-4 text-xs mt-1"
                />
              </div>

              {/* Contact */}
              <div className="relative">
                <Field
                  type="text"
                  name="customerMobile"
                  placeholder="Enter Contact Number"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                  <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaPhone className="text-gray-500" />
                </div>
                <ErrorMessage
                  name="customerMobile"
                  component="div"
                   className="text-red-500 absolute left-0 -bottom-4 text-xs mt-1"
                />
              </div>
              {/* Aadhar */}
              <div className="relative">
                <Field
                  type="text"
                  name="aadhar"
                  placeholder="Enter Aadhar Number"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaRegCreditCard className="text-gray-500" />
                </div>
                <ErrorMessage
                  name="aadhar"
                  component="div"
                   className="text-red-500 absolute left-0 -bottom-4 text-xs mt-1"
                />
              </div>
     {/* Submit Button */}
            <div className="sm:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {id ? "Update" : "Add"} Customer
              </button>
            </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
 
  );
}

{/* <Form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="customerName"
                  className="text-base font-medium"
                >
                  Customer Name
                </label>
                <Field
                  name="customerName"
                  type="text"
                  className="border rounded p-2"
                  placeholder="Enter customer name"
                />
                <ErrorMessage
                  name="customerName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="customerEmail"
                  className="text-base font-medium"
                >
                  Customer Email
                </label>
                <Field
                  name="customerEmail"
                  type="email"
                  className="border rounded p-2"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="customerEmail"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="customerMobile"
                  className="text-base font-medium"
                >
                  Customer Mobile Number
                </label>
                <Field
                  name="customerMobile"
                  type="text"
                  className="border rounded p-2"
                  placeholder="Enter 10-digit mobile number"
                />
                <ErrorMessage
                  name="customerMobile"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
              >
                {id ? "Update" : "Add"} Customer
                {/* {isSubmitting ? 'Adding...' : 'Add Customer'} */}
{/* </button> */ }
{/* </Form> */ }
