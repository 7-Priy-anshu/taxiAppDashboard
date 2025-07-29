import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaUser, FaPhone, FaIdCard, FaRegCreditCard, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
// import BackButton from '../components/BackButton';
import BackButton from '../../components/BackButton';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
    .required('Phone is required'),
  password: Yup.string().required('Password is required'),
  permissions: Yup.array().min(1, 'Select at least one permission'),
});

export default function SAddAdmin() {
  const { id, clientId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const VITE_API = import.meta.env.VITE_API;

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
    clientEmail: '',
    permissions: [],
  });

  const groupPermissions = [
    {
      group: "Driver",
      items: [
        { _id: "view_driver", label: "View Driver" },
        { _id: "add_driver", label: "Add Driver" }
      ],
    },
    {
      group: "Customer",
      items: [
        { _id: 'view_customer', label: 'View Customers' },
        { _id: 'add_customer', label: 'Add Customer' }
      ],
    },
    {
      group: "HR",
      items: [
        { _id: 'view_hr', label: 'View HR' },
        { _id: 'add_hr', label: 'Create HR' }
      ],
    },
    {
      group: "BookRide",
      items: [
        { _id: "bookRide", label: "Book Ride" },
      ],
    },
  ];

  const [loading, setLoading] = useState(!!id);
  const [submitError, setSubmitError] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    console.log("ClientId:", clientId); // Debug the payload
    console.log("Token:", token); // Debug the payload

    if (id) {
      // Fetch existing admin data if editing
      axios.get(`${VITE_API}view/client/clientId/main-admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const adminData = response.data; // Adjust based on actual response structure
          setInitialValues({
            name: adminData.name || '',
            email: adminData.email || '',
            phoneNumber: adminData.phoneNumber || '',
            role: adminData.role || '',
            clientEmail: adminData.clientEmail || '',
            permissions: adminData.permissions || [],
            password: '', // Password might not be returned for security
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch admin:", error.response?.data || error.message);
          setLoading(false);
          setSubmitError("Failed to load admin data.");
        });
    } else {
      setLoading(false);
    }

    // Fetch clients
    axios.get(`${VITE_API}view/client`,{
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        setClients(response.data.clientData || []);
      })
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  }, [id, clientId, token]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log("Submitting values:", values); // Debug the payload
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      if (!clientId) {
        throw new Error("Client ID is missing. Please ensure a valid client is selected.");
      }

      if (id) {
        // Update existing admin
        await axios.put(`${VITE_API}update/client/${clientId}/main-admin/${id}`, values, {
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      }
    });
      } else {
        // Create new admin
        await axios.post(`${VITE_API}add/client/${clientId}/main-admin`, values, {
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      }
    });
      }

      navigate('/superadmin/viewAdmin');
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      setSubmitError(`Failed to submit admin data. ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading admin info...</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-white p-4">
      <div className="w-full max-w-4xl flex gap-2">
        <Link to="/superadmin">
          <BackButton text="Back" />
        </Link>
      </div>
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">{id ? 'Edit' : 'Add'} Admin</h1>
        {submitError && (
          <div className="text-red-500 bg-red-100 p-3 rounded mb-4 flex justify-between items-center">
            {submitError}
            <button onClick={() => setSubmitError(null)} className="text-lg">✕</button>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>

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
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="relative">
                <Field
                  type="text"
                  name="password"
                  placeholder="Enter Password"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="relative">
                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter Contact Number"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaPhone className="text-gray-500" />
                </div>
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="relative">
                <Field
                  type="text"
                  name="role"
                  placeholder="Enter Role"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <ErrorMessage name="role" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="relative">
                <Field
                  as="select"
                  name="clientEmail"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Client Name</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client.clientEmail}>
                      {client.clientEmail}
                    </option>
                  ))}
                </Field>
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <ErrorMessage name="clientEmail" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="col-span-full mt-4">
                <label className="block font-medium mb-2 text-sm">Assign Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {groupPermissions.map((group) => (
                    <div key={group.group} className="rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-sm">{group.group}</h3>
                        <button
                          type="button"
                          onClick={() => {
                            const groupIds = group.items.map(item => item._id);
                            const allChecked = groupIds.every(pid => values.permissions.includes(pid));
                            if (allChecked) {
                              setFieldValue(
                                "permissions",
                                values.permissions.filter(pid => !groupIds.includes(pid))
                              );
                            } else {
                              setFieldValue(
                                "permissions",
                                Array.from(new Set([...values.permissions, ...groupIds]))
                              );
                            }
                          }}
                          className="text-blue-600 text-xs hover:underline"
                        >
                          {group.items.every(pid => values.permissions.includes(pid._id))
                            ? "Unselect All"
                            : "Select All"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((perm) => (
                          <label
                            key={perm._id}
                            className={`
                flex items-center gap-2 px-3 py-2 border rounded cursor-pointer
                ${values.permissions.includes(perm._id)
                                ? "bg-blue-50 border-blue-500"
                                : "bg-white border-gray-300"
                              }
              `}
                          >
                            <Field
                              type="checkbox"
                              name="permissions"
                              value={perm._id}
                              className="accent-blue-600"
                            />
                            <span className="text-xs">{perm.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <ErrorMessage name="permissions" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="col-span-full flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/superadmin/viewAdmin')}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {id ? 'Update' : 'Add'} Admin
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { FaUser, FaPhone, FaIdCard, FaRegCreditCard, FaMapMarkerAlt, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { Link } from 'react-router-dom';
// import BackButton from '../../components/BackButton';
// import { useAuth } from '../../context/AuthContext';
// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   phoneNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
//     .required('Phone is required'),
//   password: Yup.string().required('Password is required'),
//   permissions: Yup.array().min(1, 'Select at least one permission'),
// });

// export default function AddAdmin() {
//   const { id, clientId } = useParams();
//   const navigate = useNavigate();
//   const VITE_API = import.meta.env.VITE_API;
//   const {token} = useAuth();

//   const [initialValues, setInitialValues] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     role: '',
//     clientName: '',
//     permissions: [],
//   });


//   const groupPermissions = [
//     {
//       group: "Driver",
//       items: [
//         { _id: "view_driver", label: "View Driver" },
//         { _id: "add_driver", label: "Add Driver" }
//       ],
//     },
//     {
//       group: "Customer",
//       items: [
//         { _id: 'view_customer', label: 'View Customers' },
//         { _id: 'add_customer', label: 'Add Customer' }
//       ],
//     },
//     {
//       group: "Car",
//       items: [
//         { _id: 'view_car', label: 'View Cars' },
//         { _id: 'add_car', label: 'Add Car' }
//       ],
//     },
//     {
//       group: "HR",
//       items: [
//         { _id: 'view_hr', label: 'View HR' },
//         { _id: 'add_hr', label: 'Create HR' }
//       ],
//     },
//     {
//       group: "BookRide",
//       items: [
//         { _id: "bookRide", label: "Book Ride" },
//       ],
//     },
//   ];

//   const [loading, setLoading] = useState(!!id);
//   const [submitError, setSubmitError] = useState(null);
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       if (!id) {
//         // Update existing admin (PUT or PATCH)
//         await axios.post(`${VITE_API}add/client/clientId/main-admin`, values, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization:`Bearer ${token}`,
//           },
//         });
//         //  await axios.post("http://183.18.18.71:4000/add/admin", values, {
//         //    headers: {
//         //      'Content-Type': 'application/json',
//         //    },
//         //  });
//         //  await axios.put(`http://183.18.18.71:4000/update/admin/${id}`, values, {
//         //    headers: {
//         //      'Content-Type': 'application/json',
//         //    },
//         //  });
//       }
//       else {
//         await axios.put(`${VITE_API}update/admin/${id}`, values, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         // Create new admin (POST)
//         //  await axios.post("http://183.18.18.71:4000/add/admin", values, {
//         //    headers: {
//         //      'Content-Type': 'application/json',
//         //    },
//         //  });
//       }
//       //  if (id) {
//       //    // Update existing admin (PUT or PATCH)
//       //    await axios.put(`http://183.18.18.71:4000/update/admin/${id}`, values, {
//       //      headers: {
//       //        'Content-Type': 'application/json',
//       //      },
//       //    });
//       //   }
//       //   else {
//       //    // Create new admin (POST)
//       //    await axios.post("http://183.18.18.71:4000/add/admin", values, {
//       //      headers: {
//       //        'Content-Type': 'application/json',
//       //      },
//       //    });
//       //  }

//       navigate('/superadmin/viewAdmin');
//     } catch (error) {
//       console.error("Submission error:", error.response?.data || error.message);
//       setSubmitError("Failed to submit admin data. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading admin info...</div>;

//   const [clients, setclients] = useState([]);

//   useEffect(() => {
//     // Replace with your real API endpoint
//     axios.get(`${VITE_API}view/client`)
//       .then((response) => {
//         setclients(response.data.clients || []);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch clients:", error);
//       });
//   }, []);

//   return (
//     // <div className="max-w-4xl mx-auto p-4 sm:p-8">
//     // <div className="flex items-center justify-center min-h-screen bg-white  p-4">
//     <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-white p-4">
//       <div className="w-full max-w-4xl flex gap-2">
//         {/* Add Admin */}
//         <Link to="/superadmin">
//           <BackButton text="Back">
//           </BackButton>
//         </Link>
//       </div>
//       <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md">
//         <h1 className="text-3xl font-bold mb-6 text-center realtive z-50">{id ? 'Edit' : 'Add'} Admin</h1>
//         {/* <h1 className="text-2xl sm:text-3xl font-bold mb-6">{id ? 'Edit' : 'Add'} Admin</h1> */}
//         {submitError && (
//           <div className="text-red-500 bg-red-100 p-3 rounded mb-4 flex justify-between items-center">
//             {submitError}
//             <button onClick={() => setSubmitError(null)} className="text-lg">✕</button>
//           </div>
//         )}

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//           enableReinitialize
//         >
//           {({ isSubmitting, values, setFieldValue }) => (
//             <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4" action="/formData" method="POST">
//               <div className="relative">
//                 <Field
//                   type="text"
//                   name="name"
//                   placeholder="Enter Name"
//                   className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
//                   <FaUser className="text-gray-500" />
//                 </div>
//                 <ErrorMessage
//                   name="name"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>


//               {/* Email */}
//               <div className="relative">
//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Enter Email"
//                   className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
//                   <MdEmail className="text-gray-500" />
//                 </div>
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>

//               <div className="relative">
//                 <Field
//                   type="text"
//                   name="password"
//                   placeholder="Enter Password"
//                   className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
//                   <FaLock className="text-gray-500" />
//                 </div>
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>
//               <div className="relative">
//                 <Field
//                   type="text"
//                   name="phoneNumber"
//                   placeholder="Enter Contact Number"
//                   className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
//                   <FaPhone className="text-gray-500" />
//                 </div>
//                 <ErrorMessage
//                   name="phoneNumber"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>
//               <div className="relative">
//                 <Field
//                   type="text"
//                   name="role"
//                   placeholder="Enter Role"
//                   className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
//                   <FaUser className="text-gray-500" />
//                 </div>
//                 <ErrorMessage
//                   name="role"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>
//               <div className="relative">
//                 <Field
//                   as="select"
//                   name="clientName"
//                   className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
//                 >
//                 <option value="">Select Client Name</option>
//                   {clients.map((client) => (
//                     <option key={client._id} value={client.clientName}>
//                       {client.clientName}
//                     </option>
//                   ))}
//                 </Field>

//                 <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
//                   <FaUser className="text-gray-500" />
//                 </div>
//                 <ErrorMessage
//                   name="clientName"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>

//               <div className="relative">
//                 <Field
//                   type="text"
//                   name="password"
//                   placeholder="Enter the Password"
//                   className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
//                   <FaUser className="text-gray-500" />
//                 </div>
//                 <ErrorMessage
//                   name="role"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>

//               <div className="col-span-full mt-4">
//                 <label className="block font-medium mb-2 text-sm">Assign Permissions</label>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {groupPermissions.map((group) => (
//                     <div key={group.group} className="rounded-lg p-4 shadow-sm">
//                       <div className="flex justify-between items-center mb-2">
//                         <h3 className="font-semibold text-sm">{group.group}</h3>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             const groupIds = group.items.map(item => item._id);
//                             const allChecked = groupIds.every(pid => values.permissions.includes(pid));
//                             if (allChecked) {
//                               setFieldValue(
//                                 "permissions",
//                                 values.permissions.filter(pid => !groupIds.includes(pid))
//                               );
//                             } else {
//                               setFieldValue(
//                                 "permissions",
//                                 Array.from(new Set([...values.permissions, ...groupIds]))
//                               );
//                             }
//                           }}
//                           className="text-blue-600 text-xs hover:underline"
//                         >
//                           {
//                             group.items.every(pid => values.permissions.includes(pid._id))
//                               ? "Unselect All"
//                               : "Select All"
//                           }
//                         </button>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {group.items.map((perm) => (
//                           <label
//                             key={perm._id}
//                             className={`
//                 flex items-center gap-2 px-3 py-2 border rounded cursor-pointer
//                 ${values.permissions.includes(perm._id)
//                                 ? "bg-blue-50 border-blue-500"
//                                 : "bg-white border-gray-300"
//                               }
//               `}
//                           >
//                             <Field
//                               type="checkbox"
//                               name="permissions"
//                               value={perm._id}
//                               className="accent-blue-600"
//                             />
//                             <span className="text-xs">{perm.label}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <ErrorMessage name="permissions" component="div" className="text-red-500 text-xs mt-1" />
//               </div>


//               <div className="col-span-full flex justify-end gap-4 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/superadmin/viewAdmin')}
//                   className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
//                 >
//                   {id ? 'Update' : 'Add'} Admin
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }


// -----------------------------------------------------Fetching Data from API ---------------------------------------------------------
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   phone: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
//     .required('Phone is required'),
//   password: Yup.string().required('Password is required'),
//   permissions: Yup.array().min(1, 'Select at least one permission'),
// });

// export default function AddAdmin() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [initialValues, setInitialValues] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     permissions: [],
//   });

//   const [loading, setLoading] = useState(!!id);
//   const [submitError, setSubmitError] = useState(null);
//   const [availablePermissions, setAvailablePermissions] = useState([]);
//   const [groupedPermissions, setGroupedPermissions] = useState([]);


//   const groupPermissions = [
// {
//   group: "Driver",
//   items: [
//     { _id: "view_driver", label: "View Driver" },
//     { _id: "add_driver", label: "Add Driver" },
//     { _id: "edit_driver", label: "Edit Driver" },
//     { _id: "delete_driver", label: "Delete Driver" },
//   ],
// },
// {
//   group: "Customer",
//   items: [
//       { _id: 'view_customers', label: 'View Customers' },
//       { _id: 'add_customer', label: 'Add Customer' },
//       { _id: 'edit_customer', label: 'Edit Customer' },
//       { _id: 'delete_customer', label: 'Delete Customer' },
//   ],
// },
// {
//   group: "Car",
//   items: [
//         { _id: 'view_cars', label: 'View Cars' },
//       { _id: 'add_car', label: 'Add Car' },
//       { _id: 'edit_car', label: 'Edit Car' },
//       { _id: 'delete_car', label: 'Delete Car' },
//   ],
// },
// {
//   group: "Analytics",
//   items: [
//     { _id: "view_analytics", label: "View Analytics" },
//   ],
// },
// ];
//   // Dummy permissions for testing
//   useEffect(() => {

//     setAvailablePermissions([
//       { _id: 'view_drivers', label: 'View Drivers' },
//       { _id: 'add_driver', label: 'Add Driver' },
//       { _id: 'edit_driver', label: 'Edit Driver' },
//       { _id: 'delete_driver', label: 'Delete Driver' },
//       { _id: 'view_customers', label: 'View Customers' },
//       { _id: 'add_customer', label: 'Add Customer' },
//       { _id: 'edit_customer', label: 'Edit Customer' },
//       { _id: 'delete_customer', label: 'Delete Customer' },
//       { _id: 'view_cars', label: 'View Cars' },
//       { _id: 'add_car', label: 'Add Car' },
//       { _id: 'edit_car', label: 'Edit Car' },
//       { _id: 'delete_car', label: 'Delete Car' },
//       { _id: 'view_analytics', label: 'View Analytics' },
//       { _id: 'book_ride', label: 'Book Ride' },
//       { _id: 'assign_permissions', label: 'Assign Permissions' },
//     ]);
//   }, []);

//   // Edit mode: load admin details
//   useEffect(() => {
//     if (id) {
//       // simulate fetch
//       setTimeout(() => {
//         setInitialValues({
//           name: 'John Doe',
//           email: 'john@example.com',
//           password: '',
//           phone: '9876543210',
//           permissions: ['view_drivers', 'add_car'],
//         });
//         setLoading(false);
//       }, 500);
//     }
//   }, [id]);

//   const handleSubmit = (values) => {
//     console.log('Submitted admin data:', values);
//     navigate('/superadmin/viewAdmin');
//   };

//   if (loading) return <div className="text-center mt-10">Loading admin info...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-8">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6">{id ? 'Edit' : 'Add'} Admin</h1>

//       {submitError && (
//         <div className="text-red-500 bg-red-100 p-3 rounded mb-4 flex justify-between items-center">
//           {submitError}
//           <button onClick={() => setSubmitError(null)} className="text-lg">✕</button>
//         </div>
//       )}

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ isSubmitting }) => //
//         ({({ isSubmitting, values, setFieldValue }) => (

//           <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="flex flex-col">
//               <label className="font-medium text-sm mb-1">Name</label>
//               <Field name="name" className="border rounded p-2" />
//               <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-sm mb-1">Email</label>
//               <Field name="email" type="email" className="border rounded p-2" />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-sm mb-1">Password</label>
//               <Field name="password" type="password" className="border rounded p-2" />
//               <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
//             </div>

//             <div className="flex flex-col">
//               <label className="font-medium text-sm mb-1">Phone</label>
//               <Field name="phone" className="border rounded p-2" />
//               <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
//             </div>
//     {/* Without Groupwise Permissions  */}
//             {/* <div className="col-span-full mt-4">
//               <label className="block font-medium mb-2 text-sm">Assign Permissions</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//                 {availablePermissions.map((perm) => (
//                   <label key={perm._id} className="flex items-center gap-2 text-sm">
//                     <Field
//                       type="checkbox"
//                       name="permissions"
//                       value={perm._id}
//                       className="w-4 h-4"
//                     />
//                     {perm.label}
//                   </label>
//                 ))}
//               </div>
//               <ErrorMessage name="permissions" component="div" className="text-red-500 text-xs mt-1" />
//             </div> */}

//             {/* <div className="col-span-full mt-4">
//               <label className="block font-medium mb-2 text-sm">Assign Permissions</label>
//               <div className="space-y-4">
//                 {groupedPermissions.map((group) => (
//                   <div key={group.group}>
//                     <h3 className="font-semibold text-sm mb-2">{group.group}</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
//                       {group.items.map((perm) => (
//                         <label key={perm._id} className="flex items-center gap-2 text-sm">
//                           <Field
//                             type="checkbox"
//                             name="permissions"
//                             value={perm._id}
//                             className="w-4 h-4"
//                           />
//                           {perm.label}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <ErrorMessage name="permissions" component="div" className="text-red-500 text-xs mt-1" />
//             </div> */}

//           <div className="col-span-full mt-4">
//   <label className="block font-medium mb-2 text-sm">Assign Permissions</label>
//   <div className="space-y-6">
//     {groupPermissions.map((group) => {
//       const allValuesInGroup = group.items.map(item => item._id);
//       const areAllChecked = allValuesInGroup.every(pid => values.permissions.includes(pid));

//       const handleGroupToggle = () => {
//         if (areAllChecked) {
//           // Uncheck all from this group
//           const newPermissions = values.permissions.filter(pid => !allValuesInGroup.includes(pid));
//           setFieldValue("permissions", newPermissions);
//         } else {
//           // Add missing ones
//           const newPermissions = Array.from(new Set([...values.permissions, ...allValuesInGroup]));
//           setFieldValue("permissions", newPermissions);
//         }
//       };

//       return (
//         <div key={group.group}>
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold text-sm">{group.group}</h3>
//             <button
//               type="button"
//               onClick={handleGroupToggle}
//               className="text-blue-600 text-sm hover:underline"
//             >
//               {areAllChecked ? "Unselect All" : "Select All"}
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//             {group.items.map((perm) => (
//               <label key={perm._id} className="flex items-center gap-2 text-sm">
//                 <Field
//                   type="checkbox"
//                   name="permissions"
//                   value={perm._id}
//                   className="w-4 h-4"
//                 />
//                 {perm.label}
//               </label>
//             ))}
//           </div>
//         </div>
//       );
//     })}
//   </div>
//   <ErrorMessage name="permissions" component="div" className="text-red-500 text-xs mt-1" />
// </div>


//             <div className="col-span-full flex justify-end gap-4 mt-6">
//               <button
//                 type="button"
//                 onClick={() => navigate('/superadmin/viewAdmin')}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 {id ? 'Update' : 'Add'} Admin
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }


// --------------------------------------------------------------------------------------------------------------
// import { useParams, useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useState, useEffect } from 'react';
// import axios from "axios";


// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   phoneNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
//     .required('Mobile number is required'),
//   password: Yup.string().required('Password is required'),
// });

// export default function AddAdmin() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [submitError, setSubmitError] = useState(null);
//   const [initialValues, setInitialValues] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//   });
//   const [loading, setLoading] = useState(!!id);

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`http://183.18.18.71:4000/add/admin/${id}`)
//         .then((res) => {
//           setInitialValues(res.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error('Error fetching admin:', err);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   const handleSubmit = (values) => {
//     if (id) {
//       axios
//         .put(`http://183.18.18.71:4000/update/admin/${id}`, values)
//         .then(() => navigate('/superadmin/viewAdmin'))
//         .catch((err) => {
//           console.error('Update failed:', err);
//           setSubmitError('Failed to update admin.');
//         });
//     } else {
//       axios
//         .post(`http://183.18.18.71:4000/add/admin`, values)
//         .then(() => navigate('/superadmin/viewAdmin'))
//         .catch((err) => {
//           console.error('Add failed:', err);
//           setSubmitError('Failed to add admin.');
//         });
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading admin info...</div>;

//   return (
//     <div className="p-4 sm:p-8 md:p-12 max-w-3xl mx-auto">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6">{id ? 'Edit' : 'Add'} Admin</h1>

//       {submitError && (
//         <div className="text-red-500 mb-4 flex justify-between items-center bg-red-100 p-3 rounded">
//           {submitError}
//           <button
//             onClick={() => setSubmitError(null)}
//             className="text-red-700 font-bold text-lg"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize={true}
//       >
//         {({ isSubmitting }) => (
//           <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div className="flex flex-col">
//               <label htmlFor="name" className="font-medium text-sm mb-1">
//                 Admin Name
//               </label>
//               <Field name="name" type="text" className="border rounded p-2" />
//               <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="email" className="font-medium text-sm mb-1">
//                 Email
//               </label>
//               <Field name="email" type="email" className="border rounded p-2" />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="password" className="font-medium text-sm mb-1">
//                 Password
//               </label>
//               <Field name="password" type="password" className="border rounded p-2" />
//               <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="phoneNumber" className="font-medium text-sm mb-1">
//                 Phone
//               </label>
//               <Field name="phone" type="text" className="border rounded p-2" />
//               <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
//             </div>

//             <div className="col-span-full flex flex-col sm:flex-row justify-end gap-4 mt-4">
//               <button
//                 type="button"
//                 onClick={() => navigate('/superadmin/viewAdmin')}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
//               >
//                 {id ? 'Update' : 'Add'} Admin
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }


