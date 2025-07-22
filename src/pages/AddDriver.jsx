import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaPlus, FaPhone, FaIdCard, FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton"


const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a 10-digit phone number")
    .required("Mobile number is required"),
  aadhar: Yup.string().required("Aadhar number is required"),
  licenceNo: Yup.string().required("Driving Licence number is required"),
  address: Yup.string().required("Address is required"),
});

export default function AddDriver() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    contact: "",
    aadhar: "",
    licenceNo: "",
    address: "",
  });

  const VITE_API = import.meta.env.VITE_API;

  
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      axios
        .get(`${VITE_API}/add/driver/${id}`)
        .then((res) => {
          setInitialValues(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching driver:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const submitDriver = (values) => {
    if (id) {
      axios
        .put(`${VITE_API}update/driver/${id}`, values)
        .then(() => navigate("/superadmin/viewDriver"))
        .catch((err) => console.error("Update failed:", err));
    } else {
      axios
        .post(`${VITE_API}add/driver/${user.id}`, values)
        .then(() => navigate("/superadmin/viewDriver"))
        .catch((err) => console.error("Add failed:", err));
    }
  };

  if (loading) return <div>Loading driver info...</div>;

  return (
  <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-white p-4">
  <div className="w-full max-w-4xl flex gap-2">
        {/* Add Admin */}
        <Link to="/superadmin">
          <BackButton text="Back">
          </BackButton>
        </Link>
  </div>
  {/* <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md"> */}
  <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md">

    {/* <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl shadow-md "> */}
    {/* <div className="w-full max-w-4xl bg-white-50 z-20 p-6 sm:p-10 rounded-xl relative shadow-md before:absolute before:size-full before:inset-0 before:bg-white before:z-0 before:shadow-md before:rotate-180 before:rounded-xl"> */}
      <h1 className="text-3xl font-bold mb-6 text-center realtive z-50">
        {id ? "Edit" : "Add"} Driver
      </h1>
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
        validationSchema={validationSchema}
        onSubmit={submitDriver}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="relative">
              <Field
                type="text"
                name="name"
                placeholder="Enter Name"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Field
                type="email"
                name="email"
                placeholder="Enter Email"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                <MdEmail className="text-gray-500" />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Contact */}
            <div className="relative">
              <Field
                type="text"
                name="contact"
                placeholder="Enter Contact Number"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none rotate-90 justify-center">
                <FaPhone className="text-gray-500" />
              </div>
              <ErrorMessage
                name="contact"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Licence No */}
            <div className="relative">
              <Field
                type="text"
                name="licenceNo"
                placeholder="Enter Driving Licence"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                <FaIdCard className="text-gray-500" />
              </div>
              <ErrorMessage
                name="licenceNo"
                component="div"
                className="text-red-500 text-xs mt-1"
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
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Address */}
            <div className="relative sm:col-span-2">
              <Field
                as="textarea"
                name="address"
                rows="3"
                placeholder="Enter Current Address"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute top-2.5 left-0 flex items-center ps-4 pointer-events-none">
                <FaMapMarkerAlt className="text-gray-500" />
              </div>
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {id ? "Update" : "Add"} Driver
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);


  // return (
  //   // <div className="p-4 sm:p-20 m-2 sm:m-6">
  //   //  <div className="p-4 m-2 bg-blue-100 rounded-lg" >
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //   <div className="p-4 sm:p-10 m-2 bg-white rounded-lg shadow w-full max-w-3xl">
  //     <h1 className="text-3xl font-bold mb-4">{id ? "Edit" : "Add"} Driver</h1>
  //     {submitError && (
  //       <div className="text-red-500 mb-4 flex justify-between items-center bg-red-100 p-2 rounded">
  //         {submitError}
  //         <button onClick={() => setSubmitError(null)} className="text-red-700">
  //           ✕
  //         </button>
  //       </div>
  //     )}
  //     <Formik
  //       initialValues={initialValues}
  //       validationSchema={validationSchema}
  //       onSubmit={submitDriver}
  //       enableReinitialize
  //     >
  //       {({ isSubmitting }) => (
  //         <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //           {/* Name */}
  //           <div className="relative">
  //             <Field
  //               type="text"
  //               name="name"
  //               placeholder="Enter Name"
  //               className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
  //             />
  //             <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
  //               <FaUser className="text-gray-500" />
  //             </div>
  //             <ErrorMessage
  //               name="name"
  //               component="div"
  //               className="text-red-500 text-sm"
  //             />
  //           </div>

  //           {/* Email */}
  //           <div className="relative">
  //             <Field
  //               type="email"
  //               name="email"
  //               placeholder="Enter Email"
  //               className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
  //             />
  //             <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
  //               <MdEmail className="text-gray-500" />
  //             </div>
  //             <ErrorMessage
  //               name="email"
  //               component="div"
  //               className="text-red-500 text-sm"
  //             />
  //           </div>

  //           {/* Contact */}
  //           <div className="relative">
  //             <Field
  //               type="text"
  //               name="contact"
  //               placeholder="Enter Contact Number"
  //               className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
  //             />
  //             <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
  //               <FaPhone className="text-gray-500" />
  //             </div>
  //             <ErrorMessage
  //               name="contact"
  //               component="div"
  //               className="text-red-500 text-sm"
  //             />
  //           </div>

  //           {/* Licence No */}
  //           <div className="relative">
  //             <Field
  //               type="text"
  //               name="licenceNo"
  //               placeholder="Enter Driving Licence"
  //               className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
  //             />
  //             <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
  //               <FaIdCard className="text-gray-500" />
  //             </div>
  //             <ErrorMessage
  //               name="licenceNo"
  //               component="div"
  //               className="text-red-500 text-sm"
  //             />
  //           </div>

  //           {/* Aadhar */}
  //           <div className="relative">
  //             <Field
  //               type="text"
  //               name="aadhar"
  //               placeholder="Enter Aadhar Number"
  //               className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
  //             />
  //             <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
  //               <FaRegCreditCard className="text-gray-500" />
  //             </div>
  //             <ErrorMessage
  //               name="aadhar"
  //               component="div"
  //               className="text-red-500 text-sm"
  //             />
  //           </div>

  //           {/* Address */}
  //           <div className="relative sm:col-span-2">
  //             <Field
  //               as="textarea"
  //               name="address"
  //               rows="3"
  //               placeholder="Enter Current Address"
  //               className="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
  //             />
  //             <div className="absolute top-2.5 left-0 flex items-center ps-4 pointer-events-none">
  //               <FaMapMarkerAlt className="text-gray-500" />
  //             </div>
  //             <ErrorMessage
  //               name="address"
  //               component="div"
  //               className="text-red-500 text-sm"
  //             />
  //           </div>

  //           {/* Submit Button */}
  //           <div className="sm:col-span-2 flex justify-end mt-4">
  //             <button
  //               type="submit"
  //               disabled={isSubmitting}
  //               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
  //             >
  //               {id ? "Update" : "Add"} Driver
  //             </button>
  //           </div>
  //         </Form>
  //       )}
  //     </Formik>
  //     </div>
  //  </div>
  // );
}


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useAuth } from '../context/AuthContext';
// // import { useNavigate } from 'react-router-dom';
// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email')
//     .required('Email is required'),
//   contact: Yup.string().matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
//     .required('Mobile number is required'),
//   aadhar: Yup.string().required('Aadhar number is required'),
//   licenceNo: Yup.string().required('Driving Licence number is required'),
//   address: Yup.string().required('Address is required'),
// });

// export default function AddDriver() {
//   const { id } = useParams(); // will be undefined in Add mode

//   // const {role, id} = useParams();
//   const { user } = useAuth();

//   const navigate = useNavigate();
//   const [submitError, setSubmitError] = useState(null);
//   const [initialValues, setInitialValues] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     aadhar: "",
//     licence: "",
//     address: "",

//   });

//   const [loading, setLoading] = useState(!!id);
//   useEffect(() => {
//     if (id) {
//       axios.get(`${VITE_API}/add/driver/${id}`)
//         .then(res => {
//           // const data = res.data.user || res.data
//           // setInitialValues(data);
//           // setLoading(false);
//           setInitialValues(res.data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error("Error fetching driver:", err);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   const deleteDrivers = (values) => {
//     if (id) {
//       axios.put(`http://183.18.18.71:4000/update/driver/${id}`, values)
//         .then(() => {
//           navigate("/superadmin/viewDriver");
//         }).catch(err => console.error("Update failed:", err));
//     } else {
//       axios.post(`http://183.18.18.71:4000/add/driver/${user.id}`, values)
//         .then(() => navigate("/superadmin/viewDriver"))
//         .catch(err => console.error("Add failed:", err));
//     }
//   };

//   if (loading) return <div>Loading customer info...</div>;

//   return (
//     <div className="p-4 sm:p-16 m-2 sm:m-6 justify-content-center align-item-center">
//       {/* <div className=''> */}
//       <h1 className="text-3xl font-bold mb-4">{id ? "Edit" : "Add"} Driver</h1>
//       {submitError && (
//         <div className="text-red-500 mb-4 flex justify-between items-center bg-red-100 p-2 rounded">
//           {submitError}
//           <button
//             onClick={() => setSubmitError(null)}
//             className="text-red-700"
//           >
//             ✕
//           </button>
//         </div>
//       )}
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={deleteDrivers}
//         enableReinitialize={true}
//       >
//         {({ isSubmitting }) => (
//           // <Form className="flex flex-col gap-4">
//           <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4" method='post'>
//             {/* <div class="max-w-sm space-y-3"> */}
//               {/* <div class="relative">
//                 <Field type="email" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter name" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                   </div>
//               </div> */}

//               {/* <div class="relative">
//                 <Field type="password" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter password" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
//                       <circle cx="16.5" cy="7.5" r=".5"></circle>
//                     </svg>
//                   </div>
//               </div> */}
//             {/* </div> */}
//             {/* <div className="flex flex-col">
//                <Field type="email" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter name" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                   </div>
//             </div> */}
//             <div className="flex flex-col">
//               <div class="relative">
//                 <Field type="text" name="name" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter name" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                   </div>
//               <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
//               </div>
//               {/* <label htmlFor="name" className="text-md font-medium">Name</label> */}
//               {/* <Field name="name" type="text" className="border rounded p-2" /> */}
//             </div>
//             <div className="flex flex-col">
//                <div class="relative">
//                 <Field type="email" name="email" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter Email" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                   </div>
//                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//               </div>
//               {/* <label htmlFor="email" className="text-md font-medium">Email </label> */}
//               {/* <Field name="email" type="text" className="border rounded p-2" /> */}
//             </div>
//             <div className="flex flex-col">
//                <div class="relative">
//                 <Field type="text" name="contact" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter Contact Number" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                   </div>
//               <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
//               </div>
//               {/* <label htmlFor="contact" className="text-md font-medium">Contact</label>
//               <Field name="contact" type="text" className="border rounded p-2" /> */}
//             </div>
//             <div className="flex flex-col">
//                <div class="relative">
//                 <Field type="text" name="licenceNo" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter Driving Licence" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="12" cy="7" r="4"></circle>
//                     </svg>
//                   </div>
//                 <ErrorMessage name="licenceNo" component="div" className="text-red-500 text-sm" />
//               </div>
//               {/* <label htmlFor="licenceNo" className="text-md font-medium">Driving Licence</label>
//               <Field name="licenceNo" type="text" className="border rounded p-2" /> */}
//             </div>
//             <div className="flex flex-col">
//               <div class="relative">
//                 <Field type="text" name="aadhar" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter Aadhar Number" />
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
//                       <circle cx="16.5" cy="7.5" r=".5"></circle>
//                     </svg>
//                   </div>
//                 <ErrorMessage name="aadhar" component="div" className="text-red-500 text-sm" />
//               </div>
//               {/* <label htmlFor="aadhar" className="text-md font-medium">Aadhar Number</label>
//               <Field name="aadhar" type="text" className="border rounded p-2" /> */}
//             </div>
//             <div className="flex flex-col">
//               <div class="relative">
//                    <Field
//                 as="textarea"
//                 name="address"
//                 rows="3"
//                 placeholder="Enter current address"
//                 className="py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//                 {/* <Field type="text" name="address" class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter Address" /> */}
//                   <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
//                     <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                       <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
//                       <circle cx="16.5" cy="7.5" r=".5"></circle>
//                     </svg>
//                   </div>
//                 <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
//               </div>
//               {/* <label htmlFor="address" className="text-md font-medium">Current Address</label>
//               <Field name="address" type="text" className="border rounded p-2" /> */}
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-700 "
//             >
//               {id ? "Update" : "Add"} Driver
//               {/* {isSubmitting ? 'Adding...' : 'Add Driver'} */}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//     // </div>
//   );
// }
