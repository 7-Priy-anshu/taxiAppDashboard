import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
  ];
  

export default function HR() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        await axios.put(`http://183.18.18.71:4000/update/admin/${id}`, values);
      } else {
        await axios.post(`http://183.18.18.71:4000/add/admin`, values);
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
     <div className="max-w-4xl mx-auto p-4 sm:p-8">
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
             <div className="flex flex-col">
               <label className="font-medium text-sm mb-1">Name</label>
               <Field name="name" className="border rounded p-2" />
               <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
             </div>
 
             <div className="flex flex-col">
               <label className="font-medium text-sm mb-1">Email</label>
               <Field name="email" type="email" className="border rounded p-2" />
               <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
             </div>
 
             <div className="flex flex-col">
               <label className="font-medium text-sm mb-1">Password</label>
               <Field name="password" type="password" className="border rounded p-2" />
               <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
             </div>
 
             <div className="flex flex-col">
               <label className="font-medium text-sm mb-1">Phone</label>
               <Field name="phoneNumber" className="border rounded p-2" />
               <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs" />
             </div>
 
             <div className="flex flex-col">
               <label className="font-medium text-sm mb-1">Role</label>
               <Field name="role" className="border rounded p-2" />
               <ErrorMessage name="role" component="div" className="text-red-500 text-xs" />
             </div>
 
             <div className="col-span-full mt-4">
               <label className="block font-medium mb-2 text-sm">Assign Permissions</label>
               <div className="space-y-6">
                 {groupPermissions.map((group) => {
                   const groupIds = group.items.map(item => item._id);
                   const allChecked = groupIds.every(pid => values.permissions.includes(pid));
                   const handleToggle = () => {
                     if (allChecked) {
                       const newPerms = values.permissions.filter(pid => !groupIds.includes(pid));
                       setFieldValue("permissions", newPerms);
                     } else {
                       const newPerms = Array.from(new Set([...values.permissions, ...groupIds]));
                       setFieldValue("permissions", newPerms);
                     }
                   };
 
                   return (
                     <div key={group.group}>
                       <div className="flex justify-between items-center mb-2">
                         <h3 className="font-semibold text-sm">{group.group}</h3>
                         <button
                           type="button"
                           onClick={handleToggle}
                           className="text-blue-600 text-sm hover:underline"
                         >
                           {allChecked ? "Unselect All" : "Select All"}
                         </button>
                       </div>
 
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                         {group.items.map((perm) => (
                           <label key={perm._id} className="flex items-center gap-2 text-sm">
                             <Field
                               type="checkbox"
                               name="permissions"
                               value={perm._id}
                               className="w-4 h-4"
                             />
                             {perm.label}
                           </label>
                         ))}
                       </div>
                     </div>
                   );
                 })}
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
   );
}
