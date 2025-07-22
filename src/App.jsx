import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import './App.css';

import Login from "./pages/Login";
import NotAuthorized from "./pages/NotAuthorized";

import SuperadminLayout from "./layouts/SuperadminLayout";
import CompanyAdminLayout from "./layouts/CompanyAdminLayout";
import HRLayout from "./layouts/HRLayout";

import SuperadminDashboard from "./pages/superadmin/Dashboard";
import AddDriver from "./pages/AddDriver";
import AddCar from "./pages/AddCar";
import AddCustomer from "./pages/AddCustomer";
import ViewAdmin from "./pages/ViewAdmin";
import ViewDriver from "./pages/ViewDriver";
import ViewCar from "./pages/ViewCar";
import ViewCustomer from "./pages/ViewCustomer";
import BookRide from "./pages/BookRide";
import AddAdmin from "./pages/AddAdmin";

import CompanyAdminDashboard from "./pages/company-admin/Dashboard";
import HR from "./pages/AddHR";
import HRDashboard from "./pages/hr/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* Superadmin */}
      <Route
        path="/superAdmin/*"
        element={
          <ProtectedRoute allowedRoles={["superAdmin"]}>
            <SuperadminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<SuperadminDashboard />} />

        {/* Company-specific admin routes */}
        <Route path="company/:companyId/admin/viewAdmin" element={<ViewAdmin />} />
        <Route path="company/:companyId/admin/addAdmin" element={<AddAdmin />} />
        <Route path="company/:companyId/admin/bookRide" element={<BookRide />} />

        {/* Company-specific HR routes */}
        <Route path="company/:companyId/hr" element={<HRDashboard />} />
        <Route path="company/:companyId/hr/addDriver" element={<AddDriver />} />
        <Route path="company/:companyId/hr/addCustomer" element={<AddCustomer />} />
        <Route path="company/:companyId/hr/addCar" element={<AddCar />} />
        <Route path="company/:companyId/hr/viewDriver" element={<ViewDriver />} />
        <Route path="company/:companyId/hr/viewCustomer" element={<ViewCustomer />} />
        <Route path="company/:companyId/hr/viewCar" element={<ViewCar />} />
        <Route path="company/:companyId/hr/bookRide" element={<BookRide />} />
      </Route>

      {/* Company Admin */}
      <Route
        path="/company-admin/*"
        element={
          <ProtectedRoute allowedRoles={["company_admin"]}>
            <CompanyAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CompanyAdminDashboard />} />
        <Route path="addHr" element={<HR />} />
        <Route path="addAdmin" element={<AddAdmin />} />
      </Route>

      {/* HR */}
      <Route
        path="/hr/*"
        element={
          <ProtectedRoute allowedRoles={["hr"]}>
            <HRLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<HRDashboard />} />
      </Route>
    </Routes>
  );
}

//-----------------------------------Before Adding Dummy Data ------------------------------------

// import { Routes, Route } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// // import './App.css'; // Added CSS import
// import './App.css'

// import Login from "./pages/Login";
// import NotAuthorized from "./pages/NotAuthorized";

// import SuperadminLayout from "./layouts/SuperadminLayout";
// import CompanyAdminLayout from "./layouts/CompanyAdminLayout";
// import HRLayout from "./layouts/HRLayout";

// import SuperadminDashboard from "./pages/superadmin/Dashboard";
// import AddDriver from "./pages/AddDriver";
// import AddCar from "./pages/AddCar";
// import AddCustomer from "./pages/AddCustomer";
// import AddAdmin from "./pages/superadmin/AddAdmin";

// import CompanyAdminDashboard from "./pages/company-admin/Dashboard";
// import HRDashboard from "./pages/hr/Dashboard";


// export default function App() {
//   return (
//     //  <div className="min-h-screen bg-green-300 flex items-center justify-center">

//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/not-authorized" element={<NotAuthorized />} />

//       {/* Superadmin */}
//       <Route
//         path="/superAdmin/*"
//         element={
//           <ProtectedRoute allowedRoles={["superAdmin"]}>
//             <SuperadminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<SuperadminDashboard />}>
//           <Route path="addDriver" element={<AddDriver />} />
//           <Route path="addCar" element={<AddCar />} />
//           <Route path="addCustomer" element={<AddCustomer/>}/>
//           <Route path="addAdmin" element={<AddAdmin />} />
//         </Route>
//       </Route>

//       {/* Company Admin */}
//       <Route
//         path="/company-admin/*"
//         element={
//           <ProtectedRoute allowedRoles={["company_admin"]}>
//             <CompanyAdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<CompanyAdminDashboard />} />
//       </Route>

//       {/* HR */}
//       <Route
//         path="/hr/*"
//         element={
//           <ProtectedRoute allowedRoles={["hr"]}>
//             <HRLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<HRDashboard />} />
//       </Route>
//     </Routes>

//     //  </div>

//   );
// }

// import { Routes, Route } from "react-router-dom";
// import {useAuth} from "./context/AuthContext"
// import ProtectedRoute from "./components/ProtectedRoute";

// import Login from "./pages/Login";
// import NotAuthorized from "./pages/NotAuthorized";

// import SuperadminLayout from "./layouts/SuperadminLayout";
// import CompanyAdminLayout from "./layouts/CompanyAdminLayout";
// import HRLayout from "./layouts/HRLayout";

// import SuperadminDashboard from "./pages/superadmin/Dashboard";
// import CompanyAdminDashboard from "./pages/company-admin/Dashboard";
// import HRDashboard from "./pages/hr/Dashboard";

// import AddAdmin from "./pages/superadmin/AddAdmin";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/not-authorized" element={<NotAuthorized />} />

//       {/* Superadmin */}
//       <Route
//         path="/superAdmin/*"
//         element={
//           <ProtectedRoute allowedRoles={["superAdmin"]}>
//             <SuperadminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<SuperadminDashboard />}>
//         <Route path="addAdmin" element={<AddAdmin />} />
//         </Route>
//       </Route>

//       {/* Company Admin */}
//       <Route
//         path="/company-admin/*"
//         element={
//           <ProtectedRoute allowedRoles={["company_admin"]}>
//             <CompanyAdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<CompanyAdminDashboard />} />
//       </Route>

//       {/* HR */}
//       <Route
//         path="/hr/*"
//         element={
//           <ProtectedRoute allowedRoles={["hr"]}>
//             <HRLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<HRDashboard />} />
//       </Route>
//     </Routes>
//   );
// }



// import { Routes, Route } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// import Login from "./pages/Login";
// // import NotFound from "./pages/NotFound";

// // Layouts
// import SuperadminLayout from "./layouts/SuperadminLayout";
// import CompanyAdminLayout from "./layouts/CompanyAdminLayout";
// import HRLayout from "./layouts/HRLayout";

// // Pages
// import SuperadminDashboard from "./pages/superadmin/Dashboard";
// import CompanyAdminDashboard from "./pages/company-admin/Dashboard";
// import HRDashboard from "./pages/hr/Dashboard";

// // import SuperadminDashboard from "./pages/superadmin/Dashboard";
// // import CompanyAdminDashboard from "./pages/company-admin/Dashboard";
// // import HRDashboard from "./pages/hr/Dashboard";

// export default function App() {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />

//       {/* Superadmin Routes */}
//       {user?.role === "superadmin" && (
//         <Route path="/superadmin/" element={<SuperadminLayout />}>
//           <Route path="dashboard" element={<SuperadminDashboard />} />
//           {/* Add more superadmin routes */}
//         </Route>
//       )}

//       {/* Company Admin Routes */}
//       {user?.role === "company_admin" && (
//         <Route path="/company-admin/" element={<CompanyAdminLayout />}>
//           <Route path="dashboard" element={<CompanyAdminDashboard />} />
//           {/* Add more company admin routes */}
//         </Route>
//       )}

//       {/* HR Routes */}
//       {user?.role === "hr" && (
//         <Route path="/hr/" element={<HRLayout />}>
//           <Route path="dashboard" element={<HRDashboard />} />
//           {/* Add more HR routes */}
//         </Route>
//       )}

//       {/* <Route path="*" element={<NotFound />} /> */}
//     </Routes>
//   );
// }


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Superadmin from './pages/Superadmin';
// import MainContent from './pages/MainContent';
// import AddDriver from './pages/AddDriver';
// import AddCustomer from './pages/AddCustomer';
// import AddCar from './pages/AddCar';
// import ViewDriver from './pages/ViewDriver';
// import ViewCustomer from './pages/ViewCustomer';
// import ViewCar from './pages/ViewCar';
// import AddAdmin from './pages/AddAdmin';
// import ViewAdmin from './pages/ViewAdmin';
// import Login from './Login';
// import BookRide from './pages/BookRide';
// import AddHR from './pages/AddHR';



// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         {/* Superadmin Routes */}
//         <Route path="/superadmin/" element={<Superadmin />}>
//           <Route index element={<MainContent />} />
//           {/* Adding Routes */}
//           <Route path="addDriver" element={<AddDriver />} />
//           <Route path="addCustomer" element={<AddCustomer />} />
//           <Route path="addCar" element={<AddCar />} />
//           <Route path="addAdmin" element={<AddAdmin />} />
//           <Route path="addHr" element={<AddHR />} />
//           {/* Viewing Routes */}
//           <Route path="bookRide" element={<BookRide />} />
//           <Route path="viewDriver" element={<ViewDriver />} />
//           <Route path="viewCustomer" element={<ViewCustomer />} />
//           <Route path="viewCar" element={<ViewCar />} />
//           <Route path="viewAdmin" element={<ViewAdmin />} />
//           {/* Edit Routes */}
//           <Route path="addDriver/:id" element={<AddDriver />} />
//           <Route path="addCustomer/:id" element={<AddCustomer />} />
//           <Route path="addCar/:id" element={<AddCar />} />
//           <Route path="addAdmin/:id" element={<AddAdmin />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
