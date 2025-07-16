import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaUser, FaPhone, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
        .required('Phone is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
    permissions: Yup.array().min(1, 'Select at least one permission'),
})

  const groupPermissions = [
    {
      group: "Driver",
      items: [
        { _id: "view_driver", label: "View Driver" },
        { _id: "add_driver", label: "Add Driver" },
        { _id: "edit_driver", label: "Edit Driver" },
        { _id: "delete_driver", label: "Delete Driver" },
      ],
    },
    {
      group: "Customer",
      items: [
        { _id: 'view_customer', label: 'View Customers' },
        { _id: 'add_customer', label: 'Add Customer' },
        { _id: 'edit_customer', label: 'Edit Customer' },
        { _id: 'delete_customer', label: 'Delete Customer' },
      ],
    },
    {
      group: "Car",
      items: [
        { _id: 'view_car', label: 'View Cars' },
        { _id: 'add_car', label: 'Add Car' },
        { _id: 'edit_car', label: 'Edit Car' },
        { _id: 'delete_car', label: 'Delete Car' },
      ],
    },
    {
      group: "Approve Rides",
      items: [
        { _id: 'book_ride', label: 'Book Rides' }
      ],
    },

  ];
  

export default function HR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const VITE_API = import.meta.env.VITE_API;


  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
    permissions: [],
  });

  const [loading, setLoading] = useState(!!id);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id) {
        await axios.put(`${VITE_API}update/admin/${id}`, values);
      } else {
        await axios.post(`${VITE_API}add/admin`, values);
      }
      navigate('/superadmin/viewAdmin');
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading hr info...</div>;
   return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-white p-4">
       <div className="w-full max-w-4xl flex gap-2">
        {/* Add Admin */}
        <Link to="/superadmin">
          <BackButton text="Back">
          </BackButton>
        </Link>
      </div>
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md">
       <h1 className="text-2xl sm:text-3xl font-bold mb-6">{id ? 'Edit' : 'Add'} HR</h1>
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
           <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4" action="/formData" method="POST">
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
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
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
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
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
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
                          {
                            group.items.every(pid => values.permissions.includes(pid._id))
                              ? "Unselect All"
                              : "Select All"
                          }
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
                  {id ? 'Update' : 'Add'} HR
                </button>
              </div>
            </Form>
          )}
        </Formik>
     </div>
    </div>
   );
}
