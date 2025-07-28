import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import * as Yup from "yup";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const VITE_API = import.meta.env.VITE_API;


  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     console.log("Login attempt with:", values); // Debug input values
  //     let res;
  //     let userData;

  //     // Determine endpoint based on email domain or prefix (customize this logic)
  //     if (values.email.includes("superadmin@gmail.com")) {
  //       res = await axios.post(`${VITE_API}superAdmin/login`, values, {
  //         withCredentials: true,
  //       });
  //       userData = res.data.superAdminData; // Adjust based on actual response structure
  //     } else {
  //       res = await axios.post(`${VITE_API}login`, values, {
  //         withCredentials: true,
  //       });
  //       userData = res.data.user; // Adjust based on actual response structure
  //     }

  //     console.log("Full login response:", res.data);

  //     if (!userData || !userData.role) {
  //       throw new Error("Invalid login response: Missing user info");
  //     }

  //     // Merge form email with API response
  //     userData = { ...userData, email: values.email };

  //     // Save to localStorage and update context
  //     localStorage.setItem("user", JSON.stringify(userData));
  //     setUser(userData);

  //     // Redirect based on role
  //     switch (userData.role) {
  //       case "superAdmin":
  //         navigate("/superAdmin/dashboard");
  //         break;
  //       case "admin":
  //         navigate("/admin/dashboard"); // Changed to match previous context
  //         break;
  //       case "hr":
  //         navigate("/hr/dashboard");
  //         break;
  //       default:
  //         navigate("/not-authorized");
  //     }
  //   } catch (err) {
  //     console.error("Login failed", err.response?.data || err.message);
  //     alert(
  //       err.response?.data?.message ||
  //       err.message ||
  //       "Login failed. Check credentials or server response."
  //     );
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
  try {
    console.log("Login attempt with:", values);
    let res;
    let userData;
    let token;

    if (values.email.includes("superadmin@gmail.com")) {
      res = await axios.post(`${VITE_API}superAdmin/login`, values, {
        withCredentials: true,
      });
      userData = res.data.superAdmin;
      token = res.data.token;
    } else {
      res = await axios.post(`${VITE_API}login`, values, {
        withCredentials: true,
      });
      userData = res.data.user;
      token = res.data.token;
    }

    console.log("Full login response:", res.data);

    if (!userData || !userData.role || !token) {
      throw new Error("Invalid login response: Missing user or token info");
    }

    // Attach token and email to userData
    const fullUserData = {
      ...userData,
      email: values.email,
      token,
    };

    // Save in localStorage
    localStorage.setItem("user", JSON.stringify(fullUserData));

    // Set auth context (optional if you're using a global state)
    setUser(fullUserData);

    // Redirect based on role
    switch (userData.role) {
      case "superAdmin":
        navigate("/superAdmin/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "hr":
        navigate("/hr/dashboard");
        break;
      default:
        navigate("/not-authorized");
    }
  } catch (err) {
    console.error("Login failed", err.response?.data || err.message);
    alert(
      err.response?.data?.message ||
        err.message ||
        "Login failed. Check credentials or server response."
    );
  } finally {
    setSubmitting(false);
  }
};



  return (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
        <div className="flex-1">
          <img
            src="/taxi.jpg"
            alt="Taxi"
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="flex items-center border border-gray-300 rounded-md p-3">
                  <FaUser className="text-gray-600 text-lg mr-3" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full outline-none"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <div className="flex items-center border border-gray-300 rounded-md p-3">
                  <FaLock className="text-gray-600 text-lg mr-3" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full outline-none"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
  }
//---------------------------------Lst Executable Logic---------------------------------------------
// import { FaUser, FaLock } from "react-icons/fa";
// import axios from "axios";
// import * as Yup from "yup";
// import { Formik, ErrorMessage, Field, Form } from "formik";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// export default function Login() {
//   const initialValues = { email: "", password: "" };
//   const navigate = useNavigate();
//   const { setUser } = useAuth();
//   const VITE_API = import.meta.env.VITE_API;
// //--------------------------------------------hardCoded-------------------------------
// // const handleSubmit = async (values, { setSubmitting }) => {
// //   try {
// //     const { email, password } = values;

// //     // Hardcoded credentials (you can add more if needed)
// //     const credentials = [
// //       {
// //         email: "superadmin@example.com",
// //         password: "super123",
// //         role: "superAdmin",
// //         permissions: ["add_admin", "view_admin"],
// //       },
// //       {
// //         email: "admin@company.com",
// //         password: "admin123",
// //         role: "company_admin",
// //         permissions: ["addHr", "viewHr", "addAdmin", "viewAdmin","bookRide"],
// //       },
// //       {
// //         email: "hr@company.com",
// //         password: "hr123",
// //         role: "hr",
// //         permissions: ["bookRide, addDriver, addCustomer, addCar, viewDriver, viewCustomer,viewCar"],
// //       },
// //     ];

// //     const user = credentials.find(
// //       (u) => u.email === email && u.password === password
// //     );

// //     if (!user) {
// //       throw new Error("Invalid credentials");
// //     }

// //     localStorage.setItem("user", JSON.stringify(user));
// //     setUser(user);

// //     // Redirect based on role
// //     switch (user.role) {
// //       case "superAdmin":
// //         navigate("/superAdmin/dashboard");
// //         break;
// //       case "company_admin":
// //         navigate("/company-admin/dashboard");
// //         break;
// //       case "hr":
// //         navigate("/hr/dashboard");
// //         break;
// //       default:
// //         navigate("/not-authorized");
// //     }
// //   } catch (err) {
// //     console.error("Login failed", err);
// //     alert(err.message || "Login failed. Check credentials.");
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };

// //-----------------------------------Superadmin Login----------------------------------
// const handleSubmit = async (values, { setSubmitting }) => {
//   try {
//     const res = await axios.post(`${VITE_API}superAdmin/login`, values, {
//       withCredentials: true,
//     });

//     console.log("Full login response:", res.data);

//     // Extract superAdminData
//     const user = res.data.superAdminData;

//     if (!user || !user.email || !user.role) {
//       throw new Error("Invalid login response: Missing user info");
//     }

//     // Save to localStorage and update context
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);

//     // Redirect based on role
//     switch (user.role) {
//       case "superAdmin":
//         navigate("/superAdmin/dashboard");
//         break;
//       case "admin":
//         navigate("/admin/dashboard");
//         break;
//       case "hr":
//         navigate("/hr/dashboard");
//         break;
//       default:
//         navigate("/not-authorized");
//     }
//   } catch (err) {
//     console.error("Login failed", err);
//     alert(err.message || "Login failed. Check credentials or server response.");
//   } finally {
//     setSubmitting(false);
//   }
// };

// //---------------------------------Admin Login----------------------------------------
// // const handleSubmit = async (values, { setSubmitting }) => {
// //   try {
// //     const res = await axios.post(`${VITE_API}login`, values, {
// //       withCredentials: true,
// //     });

// //     console.log("Full login response:", res.data);

// //     const user = res.data.user;

// //     if (!user || !user.role) {
// //       throw new Error("Invalid login response: Missing role");
// //     }

// //     localStorage.setItem("user", JSON.stringify(user));
// //     setUser(user);

// //     switch (user.role) {
// //       case "superAdmin":
// //         navigate("/superAdmin/dashboard");
// //         break;
// //       case "admin":
// //         navigate("/company-admin/dashboard");
// //         break;
// //       case "hr":
// //         navigate("/hr/dashboard");
// //         break;
// //       default:
// //         navigate("/not-authorized");
// //     }
// //   } catch (err) {
// //     console.error("Login failed", err);
// //     alert(err.message || "Login failed. Check credentials or server response.");
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };

//   return (
//     <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
//         <div className="flex-1">
//           <img
//             src="/taxi.jpg"
//             alt="Taxi"
//             className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
//           />
//         </div>

//         <div className="flex-1 p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={LoginSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <div className="flex items-center border border-gray-300 rounded-md p-3">
//                   <FaUser className="text-gray-600 text-lg mr-3" />
//                   <Field
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="w-full outline-none"
//                   />
//                 </div>
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />

//                 <div className="flex items-center border border-gray-300 rounded-md p-3">
//                   <FaLock className="text-gray-600 text-lg mr-3" />
//                   <Field
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="w-full outline-none"
//                   />
//                 </div>
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   {isSubmitting ? "Logging in..." : "Login"}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const res = await axios.post(`${VITE_API}superAdmin/login`, values, {
  //       withCredentials: true,
  //     });

  //     const { user } = res.data;

  //     localStorage.setItem("user", JSON.stringify(user));
  //     setUser(user);

  //     switch (user.role) {
  //       case "superadmin":
  //         navigate("/superadmin/dashboard");
  //         break;
  //       case "company_admin":
  //         navigate("/company-admin/dashboard");
  //         break;
  //       case "hr":
  //         navigate("/hr/dashboard");
  //         break;
  //       default:
  //         navigate("/not-authorized");
  //     }
  //   } catch (err) {
  //     console.error("Login failed", err);
  //     alert("Login failed. Check credentials.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

// const handleSubmit = async (values, { setSubmitting }) => {
//   try {
//     const res = await axios.post(`${VITE_API}superAdmin/login`, values, {
//       withCredentials: true,
//     });

//     const { user } = res.data;

//     if (!user || !user.role) {
//       console.error("Invalid login response:", res.data);
//       alert("Login failed: User info missing from response");
//       return;
//     }

//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);

//     switch (user.role) {
//       case "superadmin":
//         navigate("/superadmin/dashboard");
//         break;
//       case "company_admin":
//         navigate("/company-admin/dashboard");
//         break;
//       case "hr":
//         navigate("/hr/dashboard");
//         break;
//       default:
//         navigate("/not-authorized");
//     }
//   } catch (err) {
//     console.error("Login failed", err);
//     alert("Login failed. Check credentials.");
//   } finally {
//     setSubmitting(false);
//   }
// };

// const handleSubmit = async (values, { setSubmitting }) => {
//   try {
//     const res = await axios.post(`${VITE_API}superAdmin/login`, values, {
//       withCredentials: true,
//     });

//     // Extract role and email directly
//     const { email, role, message } = res.data;

//     if (!email || !role) {
//       throw new Error("Invalid login response: Missing email or role");
//     }

//     const user = { email, role };

//     // Save and set
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);

//     // Navigate based on role
//     switch (role) {
//       case "superadmin":
//         navigate("/superadmin/dashboard");
//         break;
//       case "company_admin":
//         navigate("/company-admin/dashboard");
//         break;
//       case "hr":
//         navigate("/hr/dashboard");
//         break;
//       default:
//         navigate("/not-authorized");
//     }
//   } catch (err) {
//     console.error("Login failed", err);
//     alert("Login failed. Check credentials or server response.");
//   } finally {
//     setSubmitting(false);
//   }
// };


//   import { FaUser, FaLock } from 'react-icons/fa';
//   import axios from 'axios';
//   import * as Yup from 'yup';
//   import { Formik, ErrorMessage, Field, Form } from 'formik';
//   import { useNavigate } from 'react-router-dom';

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   export default function Login(){
//     const initialValues = {
//       email: '',
//       password: '',
//     };
//   const VITE_API = import.meta.env.VITE_API;
//   console.log(`HERE IS MY VITE API 2 ${VITE_API}`)
    
//   const navigate = useNavigate();
//   const handleSubmit = async (values, { setSubmitting }) => {
//     console.log("values of formdata -> ",values)
//     try {
//       const response = await axios.post(`${VITE_API}superAdmin/login`,values,{
//         withCredentials: true,
//     });
    
//     console.log(`respose object:`,response)
//     console.log('Login successful', response.data);
    
//     const { user } = response.data;
//     // const { token, user } = response.data;
//     // ✅ store token manually
//     // localStorage.setItem('token', token);
    
//     // (optional) store user info
//     localStorage.setItem('user', JSON.stringify(user));
//     localStorage.setItem('isAuthenticated', 'true');
    
//     navigate('/superadmin');
//   } catch (err) {
//     console.error('Login failed', err);
//     alert("Login failed, please check your credentials");
//   } finally {
//     setSubmitting(false);
//   }
// };

// // const handleSubmit = async (values) => {
// //   const res = await axios.post('http://183.18.18.71:4000/login', values,{
// //         withCredentials: true
// //     });
// //   const { role } = res.data;

// //   switch (role) {
// //     case "superadmin":
// //       navigate("/superadmin/dashboard");
// //       break;
// //     case "admin":
// //       navigate("/admin/dashboard");
// //       break;
// //     case "hr":
// //       navigate("/hr/dashboard");
// //       break;
// //     default:
// //       navigate("/not-authorized");
// //   }
// // };

// return (
//   <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
//           {/* Image Section */}
//           <div className="flex-1">
//             <img
//               src="/taxi.jpg"
//               alt="Taxi"
//               className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
//               />
//           </div>

//           {/* Form Section */}
//           <div className="flex-1 p-8">
//             <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
//             <Formik
//               initialValues={initialValues}
//               validationSchema={LoginSchema}
//               onSubmit={handleSubmit}
//               >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   <div className="flex items-center border border-gray-300 rounded-md p-3">
//                     <FaUser className="text-gray-600 text-lg mr-3" />
//                     <Field
//                       type="email"
//                       name="email"
//                       placeholder="Enter your email"
//                       className="w-full outline-none text-gray-700 bg-transparent"
//                       />
//                   </div>
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

//                   <div className="flex items-center border border-gray-300 rounded-md p-3">
//                     <FaLock className="text-gray-600 text-lg mr-3" />
//                     <Field
//                       type="password"
//                       name="password"
//                       placeholder="Enter your password"
//                       className="w-full outline-none text-gray-700 bg-transparent"
//                       />
//                   </div>
//                   <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                     >
//                   {isSubmitting ? 'Logging in...' : 'Login'}
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     );

//   };





  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const response = await axios.post('http://183.18.18.71:4000/admin/login', values);
  //     console.log('Login successful', response.data);
  //     navigate('/superadmin'); 
  //   } catch (err) {
  //     console.error('User not login', err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  ///----------------------------------Last Successfull Submit function-------------------------------------
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const response = await axios.post("http://183.18.18.71:4000/login", values, { withCredentials: true });
  //     // const response = await axios.post(
  //     //   'http://183.18.18.71:4000/login',
  //     //   // 'http://183.18.18.71:4000/admin/login',
  //     //   values,
  //     //   { withCredentials: true } // ✅ ensure cookie is saved
  //     // );
  
  //     console.log('Login successful', response.data);
  
  //     // ✅ Extract and store user info
  //     // const { role, permissions } = response.data;
  //     const user = response.data;
  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('isAuthenticated', 'true');
  
  //     // (Optional) Auth flag
  //     localStorage.setItem('isAuthenticated', 'true');
  
  //     // ✅ Redirect after login
  //     navigate('/superadmin');
  //   } catch (err) {
  //     console.error('Login failed', err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };


  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const res = await axios.post(`${VITE_API}superAdmin/login`, values, {
  //       withCredentials: true,
  //     });

  //     const { user } = res.data;

  //     localStorage.setItem("user", JSON.stringify(user));
  //     setUser(user);

  //     switch (user.role) {
  //       case "superadmin":
  //         navigate("/superadmin/dashboard");
  //         break;
  //       case "company_admin":
  //         navigate("/company-admin/dashboard");
  //         break;
  //       case "hr":
  //         navigate("/hr/dashboard");
  //         break;
  //       default:
  //         navigate("/not-authorized");
  //     }
  //   } catch (err) {
  //     console.error("Login failed", err);
  //     alert("Login failed. Check credentials.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

// const handleSubmit = async (values, { setSubmitting }) => {
//   try {
//     const res = await axios.post(`${VITE_API}superAdmin/login`, values, {
//       withCredentials: true,
//     });

//     const { user } = res.data;

//     if (!user || !user.role) {
//       console.error("Invalid login response:", res.data);
//       alert("Login failed: User info missing from response");
//       return;
//     }

//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);

//     switch (user.role) {
//       case "superadmin":
//         navigate("/superadmin/dashboard");
//         break;
//       case "company_admin":
//         navigate("/company-admin/dashboard");
//         break;
//       case "hr":
//         navigate("/hr/dashboard");
//         break;
//       default:
//         navigate("/not-authorized");
//     }
//   } catch (err) {
//     console.error("Login failed", err);
//     alert("Login failed. Check credentials.");
//   } finally {
//     setSubmitting(false);
//   }
// };

// const handleSubmit = async (values, { setSubmitting }) => {
//   try {
//     const res = await axios.post(`${VITE_API}superAdmin/login`, values, {
//       withCredentials: true,
//     });

//     // Extract role and email directly
//     const { email, role, message } = res.data;

//     if (!email || !role) {
//       throw new Error("Invalid login response: Missing email or role");
//     }

//     const user = { email, role };

//     // Save and set
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);

//     // Navigate based on role
//     switch (role) {
//       case "superadmin":
//         navigate("/superadmin/dashboard");
//         break;
//       case "company_admin":
//         navigate("/company-admin/dashboard");
//         break;
//       case "hr":
//         navigate("/hr/dashboard");
//         break;
//       default:
//         navigate("/not-authorized");
//     }
//   } catch (err) {
//     console.error("Login failed", err);
//     alert("Login failed. Check credentials or server response.");
//   } finally {
//     setSubmitting(false);
//   }
// };


//   import { FaUser, FaLock } from 'react-icons/fa';
//   import axios from 'axios';
//   import * as Yup from 'yup';
//   import { Formik, ErrorMessage, Field, Form } from 'formik';
//   import { useNavigate } from 'react-router-dom';

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   export default function Login(){
//     const initialValues = {
//       email: '',
//       password: '',
//     };
//   const VITE_API = import.meta.env.VITE_API;
//   console.log(`HERE IS MY VITE API 2 ${VITE_API}`)
    
//   const navigate = useNavigate();
//   const handleSubmit = async (values, { setSubmitting }) => {
//     console.log("values of formdata -> ",values)
//     try {
//       const response = await axios.post(`${VITE_API}superAdmin/login`,values,{
//         withCredentials: true,
//     });
    
//     console.log(`respose object:`,response)
//     console.log('Login successful', response.data);
    
//     const { user } = response.data;
//     // const { token, user } = response.data;
//     // ✅ store token manually
//     // localStorage.setItem('token', token);
    
//     // (optional) store user info
//     localStorage.setItem('user', JSON.stringify(user));
//     localStorage.setItem('isAuthenticated', 'true');
    
//     navigate('/superadmin');
//   } catch (err) {
//     console.error('Login failed', err);
//     alert("Login failed, please check your credentials");
//   } finally {
//     setSubmitting(false);
//   }
// };

// // const handleSubmit = async (values) => {
// //   const res = await axios.post('http://183.18.18.71:4000/login', values,{
// //         withCredentials: true
// //     });
// //   const { role } = res.data;

// //   switch (role) {
// //     case "superadmin":
// //       navigate("/superadmin/dashboard");
// //       break;
// //     case "admin":
// //       navigate("/admin/dashboard");
// //       break;
// //     case "hr":
// //       navigate("/hr/dashboard");
// //       break;
// //     default:
// //       navigate("/not-authorized");
// //   }
// // };

// return (
//   <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
//           {/* Image Section */}
//           <div className="flex-1">
//             <img
//               src="/taxi.jpg"
//               alt="Taxi"
//               className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
//               />
//           </div>

//           {/* Form Section */}
//           <div className="flex-1 p-8">
//             <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
//             <Formik
//               initialValues={initialValues}
//               validationSchema={LoginSchema}
//               onSubmit={handleSubmit}
//               >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   <div className="flex items-center border border-gray-300 rounded-md p-3">
//                     <FaUser className="text-gray-600 text-lg mr-3" />
//                     <Field
//                       type="email"
//                       name="email"
//                       placeholder="Enter your email"
//                       className="w-full outline-none text-gray-700 bg-transparent"
//                       />
//                   </div>
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

//                   <div className="flex items-center border border-gray-300 rounded-md p-3">
//                     <FaLock className="text-gray-600 text-lg mr-3" />
//                     <Field
//                       type="password"
//                       name="password"
//                       placeholder="Enter your password"
//                       className="w-full outline-none text-gray-700 bg-transparent"
//                       />
//                   </div>
//                   <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
//                     >
//                   {isSubmitting ? 'Logging in...' : 'Login'}
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     );

//   };





  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const response = await axios.post('http://183.18.18.71:4000/admin/login', values);
  //     console.log('Login successful', response.data);
  //     navigate('/superadmin'); 
  //   } catch (err) {
  //     console.error('User not login', err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  ///----------------------------------Last Successfull Submit function-------------------------------------
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const response = await axios.post("http://183.18.18.71:4000/login", values, { withCredentials: true });
  //     // const response = await axios.post(
  //     //   'http://183.18.18.71:4000/login',
  //     //   // 'http://183.18.18.71:4000/admin/login',
  //     //   values,
  //     //   { withCredentials: true } // ✅ ensure cookie is saved
  //     // );
  
  //     console.log('Login successful', response.data);
  
  //     // ✅ Extract and store user info
  //     // const { role, permissions } = response.data;
  //     const user = response.data;
  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('isAuthenticated', 'true');
  
  //     // (Optional) Auth flag
  //     localStorage.setItem('isAuthenticated', 'true');
  
  //     // ✅ Redirect after login
  //     navigate('/superadmin');
  //   } catch (err) {
  //     console.error('Login failed', err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

