import { Formik, ErrorMessage, Form, Field } from 'formik';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { FaUser, FaPlus, FaPhone, FaIdCard, FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import BackButton from "../components/BackButton"
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";


const CarSchema = Yup.object().shape({
  carName: Yup.string().required('Car Name is required'),
  carModel: Yup.string().required('Car Model is required'),
  carNumber: Yup.string().required('Car Number is required'),
});

export default function AddCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    carName: '',
    carModel: '',
    carNumber: '',
  });
  const [loading, setLoading] = useState(!!id);

  const VITE_API = import.meta.env.VITE_API;

  useEffect(() => {
    if (id) {
      axios.get(`${VITE_API}add/car/${id}`)
        .then(res => {
          // console.log("Fetched car data:", res.data);
          setInitialValues(res.data); // or res.data.car
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching car:", err.response?.data || err.message);
          setSubmitError("Failed to load car details.");
          setLoading(false);
        });
    }
  }, [id]);


  const handleSubmit = (values) => {
    if (id) {
      axios.put(`${VITE_API}update/car/${id}`, values)
        .then(() => {
          navigate("/superadmin/viewCar");
        }).catch(err => console.error("Update failed:", err));
    } else {
      axios.post(`${VITE_API}add/car`, values)
        .then(() => navigate("/superadmin/viewCar"))
        .catch(err => console.error("Add failed:", err));
    }
  };

  if (loading) return <div>Loading car info...</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-white p-4">
      <div className="w-full max-w-4xl flex gap-2">
        {/* Add Admin */}
        {/* <Link to="/superadmin"> */}
          <BackButton text="Back">
          </BackButton>
        {/* </Link> */}
      </div>
      {/* <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md"> */}
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md">

        <h1 className="text-3xl font-bold mb-4">{id ? "Edit" : "Add"} Car</h1>

        {submitError && (
          <div className="text-red-500 mb-4 bg-red-100 p-2 rounded flex justify-between items-center">
            {submitError}
            <button onClick={() => setSubmitError(null)} className="text-red-700">✕</button>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={CarSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}

        >
          {({ isSubmitting }) => (
            <Form className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Name */}
              <div className="relative">
                <Field
                  type="text"
                  name="carName"
                  placeholder="Enter Car Name"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <ErrorMessage
                  name="carName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Field
                  type="email"
                  name="carModel"
                  placeholder="Enter Model Number"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                  <MdEmail className="text-gray-500" />
                </div>
                <ErrorMessage
                  name="carModel"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Contact */}
              <div className="relative">
                <Field
                  type="text"
                  name="carNumber"
                  placeholder="Enter Car Number"
                  className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none rotate-90">
                  <FaPhone className="text-gray-500" />
                </div>
                <ErrorMessage
                  name="carNumber"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              {/* Submit Button */}
              <div className="    md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {id ? "Update" : "Add"} Car
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}



          // <Form className="flex flex-col gap-4">
          //   <div className="flex flex-col">
          //     <label htmlFor="carName" className="text-base font-medium">Car Name</label>
          //     <Field name="carName" type="text" className="border rounded p-2" placeholder="Enter car name" />
          //     <ErrorMessage name="carName" component="div" className="text-red-500 text-sm" />
          //   </div>
          //   <div className="flex flex-col">
          //     <label htmlFor="carModel" className="text-base font-medium">Car Model</label>
          //     <Field name="carModel" type="text" className="border rounded p-2" placeholder="Enter car model" />
          //     <ErrorMessage name="carModel" component="div" className="text-red-500 text-sm" />
          //   </div>
          //   <div className="flex flex-col">
          //     <label htmlFor="carNumber" className="text-base font-medium">Car Number</label>
          //     <Field name="carNumber" type="text" className="border rounded p-2" placeholder="Enter Car Number" />
          //     <ErrorMessage name="carNumber" component="div" className="text-red-500 text-sm" />
          //   </div>

          //   <button
          //     type="submit"
          //     disabled={isSubmitting}
          //     className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
          //   >
          //     {isSubmitting ? "Saving..." : id ? "Update Car" : "Add Car"}
          //   </button>
          // </Form>