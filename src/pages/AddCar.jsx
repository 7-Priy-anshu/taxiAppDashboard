import { Formik, ErrorMessage, Form, Field } from 'formik';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

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

useEffect(() => {
  if (id) {
    axios.get(`http://183.18.18.71:4000/add/car/${id}`)
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
      axios.put(`http://183.18.18.71:4000/update/car/${id}`, values)
        .then(() =>{ 
          navigate("/superadmin/viewCar");
        }).catch(err => console.error("Update failed:", err));
    } else {
      axios.post(`http://183.18.18.71:4000/add/car`, values)
        .then(() => navigate("/superadmin/viewCar"))
        .catch(err => console.error("Add failed:", err));
    }
  };

  if (loading) return <div>Loading car info...</div>;

  return (
    <div className="p-4 sm:p-16 m-2 sm:m-6">
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
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="carName" className="text-base font-medium">Car Name</label>
              <Field name="carName" type="text" className="border rounded p-2" placeholder="Enter car name" />
              <ErrorMessage name="carName" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="carModel" className="text-base font-medium">Car Model</label>
              <Field name="carModel" type="text" className="border rounded p-2" placeholder="Enter car model" />
              <ErrorMessage name="carModel" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="carNumber" className="text-base font-medium">Car Number</label>
              <Field name="carNumber" type="text" className="border rounded p-2" placeholder="Enter Car Number" />
              <ErrorMessage name="carNumber" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? "Saving..." : id ? "Update Car" : "Add Car"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


