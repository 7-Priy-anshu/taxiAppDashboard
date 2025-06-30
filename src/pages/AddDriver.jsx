import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email')
  .required('Email is required'),
  contact: Yup.string().matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
  .required('Mobile number is required'),
  aadhar: Yup.string().required('Aadhar number is required'),
});
export default function AddDriver() {
  const { id } = useParams(); // will be undefined in Add mode
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    contact: "",
    aadhar: ""
  });
  
  const [loading, setLoading] = useState(!!id);
  useEffect(() => {
  if (id) {
      axios.get(`http://183.18.18.71:4000/add/driver/${id}`)
        .then(res => {
          // const data = res.data.user || res.data
          // setInitialValues(data);
          // setLoading(false);
          setInitialValues(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching driver:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const deleteDrivers = (values) => {
  if (id) {
      axios.put(`http://183.18.18.71:4000/update/driver/${id}`, values)
        .then(() =>{ 
          navigate("/superadmin/viewDriver");
        }).catch(err => console.error("Update failed:", err));
  } else {
      axios.post(`http://183.18.18.71:4000/add/driver`, values)
        .then(() => navigate("/superadmin/viewDriver"))
        .catch(err => console.error("Add failed:", err));
    }
  };
 
  if (loading) return <div>Loading customer info...</div>;

  return (
    <div className="p-4 sm:p-16 m-2 sm:m-6 justify-content-center align-item-center">
     {/* <div className=''> */}
      <h1 className="text-3xl font-bold mb-4">{id ? "Edit" : "Add"} Driver</h1>
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
        validationSchema={validationSchema}
        onSubmit={deleteDrivers}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-md font-medium">Name</label>
              <Field name="name" type="text" className="border rounded p-2"/>
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-md font-medium">Email </label>
              <Field name="email" type="text" className="border rounded p-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact" className="text-md font-medium">Contact</label>
              <Field name="contact" type="text" className="border rounded p-2" />
              <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="aadhar" className="text-md font-medium">Aadhar Number</label>
              <Field name="aadhar" type="text" className="border rounded p-2" />
              <ErrorMessage name="aadhar" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-700 "
            >
                                {id? "Update" : "Add"} Driver
              {/* {isSubmitting ? 'Adding...' : 'Add Driver'} */}
            </button>
          </Form>
        )}
      </Formik>
     </div>
    // </div>
  );
}
