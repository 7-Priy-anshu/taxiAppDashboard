import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Superadmin from './pages/Superadmin';
import MainContent from './pages/MainContent';
import AddDriver from './pages/AddDriver';
import AddCustomer from './pages/AddCustomer';
import AddCar from './pages/AddCar';
import ViewDriver from './pages/ViewDriver';
import ViewCustomer from './pages/ViewCustomer';
import ViewCar from './pages/ViewCar';
import AddAdmin from './pages/AddAdmin';
import ViewAdmin from './pages/ViewAdmin';
import Login from './Login';
import BookRide from './pages/BookRide';
import AddHR from './pages/AddHR';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Superadmin Routes */}
        <Route path="/superadmin/" element={<Superadmin />}>
          <Route index element={<MainContent />} />
          {/* Adding Routes */}
          <Route path="addDriver" element={<AddDriver />} />
          <Route path="addCustomer" element={<AddCustomer />} />
          <Route path="addCar" element={<AddCar />} />
          <Route path="addAdmin" element={<AddAdmin />} />
          <Route path="addHr" element={<AddHR />} />
          {/* Viewing Routes */}
          <Route path="bookRide" element={<BookRide />} />
          <Route path="viewDriver" element={<ViewDriver />} />
          <Route path="viewCustomer" element={<ViewCustomer />} />
          <Route path="viewCar" element={<ViewCar />} />
          <Route path="viewAdmin" element={<ViewAdmin />} />
          {/* Edit Routes */}
          <Route path="addDriver/:id" element={<AddDriver />} />
          <Route path="addCustomer/:id" element={<AddCustomer />} />
          <Route path="addCar/:id" element={<AddCar />} />
          <Route path="addAdmin/:id" element={<AddAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
