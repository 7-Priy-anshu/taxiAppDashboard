import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerSchema = Yup.object().shape({
  customerName: Yup.string().required('Customer name is required'),
  customerEmail: Yup.string()
  .email('Invalid email')
  .required('Email is required'),
  customerMobile: Yup.string()
  .matches(/^[0-9]{10}$/, 'Must be a 10-digit phone number')
  .required('Mobile number is required'),
}); 

export default function AddCustomer() {
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
      axios.get(`http://183.18.18.71:4000/add/customer/${id}`)
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
      axios.put(`http://183.18.18.71:4000/update/customer/${id}`, values)
        .then(() =>{ 
          navigate("/superadmin/viewCustomer");
        }).catch(err => console.error("Update failed:", err));
    } else {
      axios.post(`http://183.18.18.71:4000/add/customer`, values)
        .then(() => navigate("/superadmin/viewCustomer"))
        .catch(err => console.error("Add failed:", err));
    }
  };

  if (loading) return <div>Loading customer info...</div>;

  return (
    <div className="p-4 sm:p-16 m-2 sm:m-6 justify-content-center align-item-center">
      {/* <div className="flex justify-center items-center"> */}
        {/* <div className="w-full max-w-md"> */}
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
              <Form className="flex flex-col gap-4">
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
                  {id? "Update" : "Add"} Customer
                  {/* {isSubmitting ? 'Adding...' : 'Add Customer'} */}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      // </div>
    // </div>
  );
}

