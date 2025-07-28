import { Formik, ErrorMessage, Form, Field } from 'formik';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { FaUser, FaPlus, FaPhone, FaIdCard, FaRegCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import BackButton from "../../components/BackButton"
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";

export default function AddClient() {

  const ClientSchema = Yup.object().shape({
    clientName: Yup.string().required("Client Name is required"),
    clientEmail: Yup.string().required("Client Email is required"),
    clientPhone: Yup.string().required("Client Phone is required")
  })
  const { id } = useParams();
  const [submitError, setSubmitError] = useState(null);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(!!id);

  const VITE_API = import.meta.env.VITE_API;
  const [initialValues, setInitialValues] = useState({
    clientName: '',
    clientEmail: '',
    clientPassword: '',
    clientPhone: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`${VITE_API}add/client/${id}`)
      // axios.get(`${VITE_API}view/client/${id}`)
        .then(res => {
          // console.log("Fetched car data:", res.data);
          setInitialValues(res.data); // or res.data.car
          // console.log(setInitialValues(res.data));
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
    if (!id) {
      axios.post(`${VITE_API}add/client`, values).then(() => {
        navigation('/superAdmin/viewClient');
      }).catch(err => console.error());
    } else {
      axios.put(`${VITE_API}update/client`, values).then(() => {
        navigation('/superAdmin/viewClient');
      }).catch(err => console.error());
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-white p-4">
      <div className="w-full max-w-4xl flex gap-2">
        {/* Add Admin */}
        <Link to="/superAdmin">
          <BackButton text="Back">
          </BackButton>
        </Link>
      </div>
      {/* <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md"> */}
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-xl border-t border-t-gray-300 shadow-md">

        <h1 className="text-3xl font-bold mb-4">{id ? "Edit" : "Add"} Client</h1>

        {submitError && (
          <div className="text-red-500 mb-4 bg-red-100 p-2 rounded flex justify-between items-center">
            {submitError}
            <button onClick={() => setSubmitError(null)} className="text-red-700">✕</button>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={ClientSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
          <Form className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Name */}
            <div className="relative">
              <Field
                type="text"
                name="clientName"
                placeholder="Enter Client Name"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
              <ErrorMessage
                name="clientName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Field
                type="email"
                name="clientEmail"
                placeholder="Enter Client Email"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none">
                <MdEmail className="text-gray-500" />
              </div>
              <ErrorMessage
                name="clientEmail"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Contact */}
            <div className="relative">
              <Field
                type="text"
                name="clientPhone"
                placeholder="Enter Client Number"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none rotate-90">
                <FaPhone className="text-gray-500" />
              </div>
              <ErrorMessage
                name="clientPhone"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Contact */}
            <div className="relative">
              <Field
                type="password"
                name="clientPassword"
                placeholder="Enter Client Password"
                className="peer py-2.5 px-4 ps-11 block w-full bg-gray-100 rounded-lg sm:text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center ps-4 pointer-events-none rotate-90">
                <FaPhone className="text-gray-500" />
              </div>
              <ErrorMessage
                name="clientPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {id ? "Update" : "Add"} Client
              </button>
            </div>
          </Form>
            )}
        </Formik>
      </div>
    </div>
  )
}


