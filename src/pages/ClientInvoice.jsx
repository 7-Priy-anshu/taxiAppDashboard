import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function ClientInvoice() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const { clientId } = useParams(); // Ensure your route includes :clientId
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [rideData, setRideData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const taxPercent = 10;
  const {user, token} = useAuth();

  const dummyInvoice = {
    invoiceNumber: `INV-${selectedYear}-${String(selectedMonth).padStart(2, '0')}-001`,
    generatedDate: new Date().toLocaleDateString(),
    client: {
      name: "ABC Logistics Pvt Ltd",
      address: "Plot 27, Transport Nagar, Jaipur, RJ - 302017",
      email: "billing@abclogistics.in",
      phone: "+91 98765 43210"
    }
  };

  const fetchInvoiceData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const formattedMonth = String(selectedMonth).padStart(2, "0");
      const response = await axios.get(
        `${import.meta.env.VITE_API}company/${clientId}/invoice/${selectedYear}-${formattedMonth}?tax=${taxPercent}%`
      ,{
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${token}`
        }
      });

      // Expected format: array of ride objects
      setRideData(response.data?.rides || []);
    } catch (err) {
      console.error("Failed to fetch invoice data", err);
      setError("Could not load invoice data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) fetchInvoiceData();
  }, [selectedMonth, selectedYear, clientId, token]);

  const rideDataWithGST = rideData.map((ride) => {
    const gst = parseFloat((ride.rideAmount * taxPercent / 100).toFixed(2));
    return {
      ...ride,
      gst,
      total: parseFloat((ride.rideAmount + gst).toFixed(2))
    };
  });

  const totalAmount = rideDataWithGST.reduce((sum, ride) => sum + ride.total, 0);

  const handleDownload = () => {
    const exportData = rideDataWithGST.map((ride, index) => ({
      "S.No": index + 1,
      "Date": ride.date,
      "Driver Name": ride.driverName,
      "Pickup": ride.pickup,
      "Destination": ride.destination,
      "Base Fare": ride.rideAmount,
      "GST": ride.gst,
      "Total (with GST)": ride.total
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ride Invoice");
    XLSX.writeFile(workbook, `RideInvoice_${months[selectedMonth - 1]}_${selectedYear}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl flex justify-between items-center shadow border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <img src="/images/taxiLogo.png" alt="Company Logo" className="h-12 w-auto" />
          <h2 className="text-3xl font-bold">Company Invoice</h2>
        </div>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-3 py-1"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={i + 1} value={i + 1}>{m}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {[2023, 2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            Download Excel
          </button>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mt-6">
        <div className="border-b pb-4 mb-4">
          <p className="text-gray-600">Invoice No: {dummyInvoice.invoiceNumber}</p>
          <p className="text-gray-600">Billing Month: {months[selectedMonth - 1]} {selectedYear}</p>
          <p className="text-gray-600">Generated Date: {dummyInvoice.generatedDate}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Billed To:</h3>
          <p>{dummyInvoice.client.name}</p>
          <p>{dummyInvoice.client.address}</p>
          <p>Email: {dummyInvoice.client.email}</p>
          <p>Phone: {dummyInvoice.client.phone}</p>
        </div>
      </div>

      {/* Ride Table */}
      <div className="bg-white mt-6 rounded-xl shadow overflow-x-auto">
        {isLoading ? (
          <div className="text-center p-6">Loading invoice data...</div>
        ) : error ? (
          <div className="text-center p-6 text-red-600">{error}</div>
        ) : (
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Driver</th>
                <th className="px-4 py-2">Pickup</th>
                <th className="px-4 py-2">Destination</th>
                <th className="px-4 py-2">Base Fare (₹)</th>
                <th className="px-4 py-2">GST (₹)</th>
                <th className="px-4 py-2">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {rideDataWithGST.map((ride, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{ride.date}</td>
                  <td className="px-4 py-2">{ride.driverName}</td>
                  <td className="px-4 py-2">{ride.pickup}</td>
                  <td className="px-4 py-2">{ride.destination}</td>
                  <td className="px-4 py-2">₹{ride.rideAmount}</td>
                  <td className="px-4 py-2">₹{ride.gst}</td>
                  <td className="px-4 py-2 font-semibold">₹{ride.total}</td>
                </tr>
              ))}
              {rideDataWithGST.length > 0 && (
                <tr className="bg-gray-100 font-semibold">
                  <td colSpan="7" className="px-4 py-2 text-right">Total Amount</td>
                  <td className="px-4 py-2">₹{totalAmount.toFixed(2)}</td>
                </tr>
              )}
              {rideDataWithGST.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No rides found for {months[selectedMonth - 1]} {selectedYear}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


//---------------------------Using The mock data---------------------------

// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// export default function ClientInvoice() {
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const dummyInvoice = {
//     invoiceNumber: "INV-2025-07-001",
//     generatedDate: new Date().toLocaleDateString(),
//     client: {
//       name: "ABC Logistics Pvt Ltd",
//       address: "Plot 27, Transport Nagar, Jaipur, RJ - 302017",
//       email: "billing@abclogistics.in",
//       phone: "+91 98765 43210"
//     }
//   };

//   const rideData = [
//     { date: "2025-06-01", driverName: "Shree", rideAmount: 200, pickup: "Central Park", destination: "Airport" },
//     { date: "2025-06-02", driverName: "Smith", rideAmount: 180, pickup: "Railway Station", destination: "SMS Hospital" },
//     { date: "2025-07-01", driverName: "John Doe", rideAmount: 200, pickup: "Central Park", destination: "Airport" },
//     { date: "2025-07-02", driverName: "Jane Smith", rideAmount: 180, pickup: "Railway Station", destination: "SMS Hospital" },
//     { date: "2025-07-03", driverName: "Rahul Kumar", rideAmount: 240, pickup: "Ajmer Road", destination: "MI Road" },
//     { date: "2025-07-04", driverName: "Neha Sharma", rideAmount: 150, pickup: "Vaishali Nagar", destination: "Malviya Nagar" },
//     { date: "2025-07-05", driverName: "Amit Joshi", rideAmount: 220, pickup: "Mansarovar", destination: "C-Scheme" },
//     { date: "2025-07-06", driverName: "Priya Mehta", rideAmount: 175, pickup: "Bani Park", destination: "Tonk Road" },
//     { date: "2025-07-07", driverName: "Deepak Singh", rideAmount: 190, pickup: "Adarsh Nagar", destination: "Jawahar Circle" },
//     { date: "2025-07-08", driverName: "Sneha Verma", rideAmount: 210, pickup: "Civil Lines", destination: "Durgapura" },
//     { date: "2025-07-09", driverName: "Karan Kapoor", rideAmount: 260, pickup: "Shyam Nagar", destination: "Bapu Nagar" },
//     { date: "2025-07-10", driverName: "Ritu Malhotra", rideAmount: 230, pickup: "Gopalpura", destination: "Johari Bazaar" }
//   ];

//   // Filter rides by selected month and year
//   const filteredRides = rideData.filter((ride) => {
//     const rideDate = new Date(ride.date);
//     return (
//       rideDate.getMonth() + 1 === selectedMonth &&
//       rideDate.getFullYear() === selectedYear
//     );
//   });

//   // Add GST and total
//   const rideDataWithGST = filteredRides.map((ride) => {
//     const gst = parseFloat((ride.rideAmount * 0.18).toFixed(2));
//     return {
//       ...ride,
//       gst,
//       total: parseFloat((ride.rideAmount + gst).toFixed(2))
//     };
//   });

//   const totalAmount = rideDataWithGST.reduce((sum, ride) => sum + ride.total, 0);

//   const handleDownload = () => {
//     const exportData = rideDataWithGST.map((ride, index) => ({
//       "S.No": index + 1,
//       "Date": ride.date,
//       "Driver Name": ride.driverName,
//       "Pickup": ride.pickup,
//       "Destination": ride.destination,
//       "Base Fare": ride.rideAmount,
//       "GST (18%)": ride.gst,
//       "Total (with GST)": ride.total
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Ride Invoice");
//     XLSX.writeFile(workbook, `RideInvoice_${months[selectedMonth - 1]}_${selectedYear}.xlsx`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl flex justify-between items-center shadow border border-gray-200 p-4">
//         <div className="flex items-center gap-4">
//           <img src="/images/taxiLogo.png" alt="Company Logo" className="h-12 w-auto" />
//           <h2 className="text-3xl font-bold">Company Invoice</h2>
//         </div>
//         <div className="flex gap-2 items-center">
//           <select
//             className="border rounded px-3 py-1"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//           >
//             {months.map((m, i) => (
//               <option key={i + 1} value={i + 1}>{m}</option>
//             ))}
//           </select>
//           <select
//             className="border rounded px-3 py-1"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//           >
//             {[2023, 2024, 2025, 2026].map((year) => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//           <button
//             onClick={handleDownload}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
//           >
//             Download Excel
//           </button>
//         </div>
//       </div>

//       {/* Invoice Info */}
//       <div className="bg-white rounded-xl shadow border border-gray-200 p-4 mt-6">
//         <div className="border-b pb-4 mb-4">
//           <p className="text-gray-600">Invoice No: {dummyInvoice.invoiceNumber}</p>
//           <p className="text-gray-600">Billing Month: {months[selectedMonth - 1]} {selectedYear}</p>
//           <p className="text-gray-600">Generated Date: {dummyInvoice.generatedDate}</p>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold">Billed To:</h3>
//           <p>{dummyInvoice.client.name}</p>
//           <p>{dummyInvoice.client.address}</p>
//           <p>Email: {dummyInvoice.client.email}</p>
//           <p>Phone: {dummyInvoice.client.phone}</p>
//         </div>
//       </div>

//       {/* Ride Table */}
//       <div className="bg-white mt-6 rounded-xl shadow overflow-x-auto">
//         <table className="min-w-full table-auto text-sm">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="px-4 py-2">S.No</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Driver</th>
//               <th className="px-4 py-2">Pickup</th>
//               <th className="px-4 py-2">Destination</th>
//               <th className="px-4 py-2">Base Fare (₹)</th>
//               <th className="px-4 py-2">GST (₹)</th>
//               <th className="px-4 py-2">Total (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rideDataWithGST.map((ride, i) => (
//               <tr key={i} className="border-b">
//                 <td className="px-4 py-2">{i + 1}</td>
//                 <td className="px-4 py-2">{ride.date}</td>
//                 <td className="px-4 py-2">{ride.driverName}</td>
//                 <td className="px-4 py-2">{ride.pickup}</td>
//                 <td className="px-4 py-2">{ride.destination}</td>
//                 <td className="px-4 py-2">₹{ride.rideAmount}</td>
//                 <td className="px-4 py-2">₹{ride.gst}</td>
//                 <td className="px-4 py-2 font-semibold">₹{ride.total}</td>
//               </tr>
//             ))}
//             {rideDataWithGST.length > 0 ? (
//               <tr className="bg-gray-100 font-semibold">
//                 <td colSpan="7" className="px-4 py-2 text-right">Total Amount</td>
//                 <td className="px-4 py-2">₹{totalAmount.toFixed(2)}</td>
//               </tr>
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center py-6 text-gray-500">
//                   No rides found for {months[selectedMonth - 1]} {selectedYear}.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


//--------------------------------------Before adding GST -----------------------------------
// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// const dummyInvoice = {
//   invoiceNumber: 'INV-20250725-001',
//   client: {
//     name: 'ABC Pvt. Ltd.',
//     email: 'client@abc.com',
//     phone: '+91-9876543210',
//     address: '123 Business Park, Jaipur, Rajasthan'
//   },
//   generatedDate: '25 July 2025',
//   rides: [
//     { date: '01/07/2025', time: '09:30 AM', driverName: 'Rajesh Sharma', pickup: 'Rambagh Palace, Jaipur', destination: 'Central Park, Jaipur', rideAmount: 320 },
//     { date: '02/07/2025', time: '10:00 AM', driverName: 'Ayesha Khan', pickup: 'Civil Lines, Jaipur', destination: 'MI Road, Jaipur', rideAmount: 250 },
//     { date: '15/06/2025', time: '10:30 AM', driverName: 'Karan Verma', pickup: 'C-Scheme', destination: 'Airport', rideAmount: 300 },
//     { date: '03/07/2025', time: '08:45 AM', driverName: 'Deepak Meena', pickup: 'Vaishali Nagar', destination: 'Jawahar Circle', rideAmount: 270 },
//     { date: '10/05/2025', time: '09:00 AM', driverName: 'Vijay Joshi', pickup: 'Adarsh Nagar', destination: 'Sanganer', rideAmount: 310 },
//   ]
// };

// const getMonthYear = (dateStr) => {
//   const [day, month, year] = dateStr.split('/');
//   return { month: parseInt(month), year: parseInt(year) };
// };

// const months = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'
// ];

// export default function ClientInvoice() {
//   const [selectedMonth, setSelectedMonth] = useState(7); // Default: July
//   const [selectedYear, setSelectedYear] = useState(2025); // Default: 2025

//   const filteredRides = dummyInvoice.rides.filter((ride) => {
//     const { month, year } = getMonthYear(ride.date);
//     return month === selectedMonth && year === selectedYear;
//   });

//   const totalAmount = filteredRides.reduce((sum, ride) => sum + ride.rideAmount, 0);

//   const handleDownload = () => {
//     const data = filteredRides.map((ride, index) => ({
//       'S. No': index + 1,
//       Date: ride.date,
//       Time: ride.time,
//       'Driver Name': ride.driverName,
//       Pickup: ride.pickup,
//       Destination: ride.destination,
//       'Ride Amount (₹)': ride.rideAmount
//     }));

//     data.push({
//       'S. No': '',
//       Date: '',
//       Time: '',
//       'Driver Name': '',
//       Pickup: '',
//       Destination: 'Total',
//       'Ride Amount (₹)': totalAmount
//     });

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');

//     XLSX.writeFile(workbook, `ClientInvoice_${months[selectedMonth - 1]}_${selectedYear}.xlsx`);
//   };

//   return (
//     <div className="p-6 flex flex-col gap-4">
// <div className="bg-white rounded-xl flex justify-between items-center shadow border border-gray-200 p-4">
// <div className="flex items-center gap-4">
//   <img src="/images/taxiLogo.png" alt="Company Logo" className="h-12 w-auto" />
//   <h2 className="text-2xl font-bold">Client Ride Invoice</h2>
// </div>
//         <div className="flex gap-2  items-center">
//           <select
//             className="border rounded px-3 py-1"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//           >
//             {months.map((m, i) => (
//               <option key={i + 1} value={i + 1}>{m}</option>
//             ))}
//           </select>
//           <select
//             className="border rounded px-3 py-1"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(Number(e.target.value))}
//           >
//             {[2023, 2024, 2025, 2026].map((year) => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//           <button
//             onClick={handleDownload}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
//           >
//             Download Excel
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
//         <div className="border-b pb-4 mb-4">
//           <p className="text-gray-600">Invoice No: {dummyInvoice.invoiceNumber}</p>
//           <p className="text-gray-600">Billing Month: {months[selectedMonth - 1]} {selectedYear}</p>
//           <p className="text-gray-600">Generated Date: {dummyInvoice.generatedDate}</p>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Billed To:</h3>
//           <p>{dummyInvoice.client.name}</p>
//           <p>{dummyInvoice.client.address}</p>
//           <p>Email: {dummyInvoice.client.email}</p>
//           <p>Phone: {dummyInvoice.client.phone}</p>
//         </div>

//         <table className="w-full border text-left mb-6">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Date</th>
//               <th className="p-2 border">Time</th>
//               <th className="p-2 border">Driver Name</th>
//               <th className="p-2 border">Pickup</th>
//               <th className="p-2 border">Destination</th>
//               <th className="p-2 border text-right">Amount (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRides.map((ride, index) => (
//               <tr key={index}>
//                 <td className="p-2 border">{ride.date}</td>
//                 <td className="p-2 border">{ride.time}</td>
//                 <td className="p-2 border">{ride.driverName}</td>
//                 <td className="p-2 border">{ride.pickup}</td>
//                 <td className="p-2 border">{ride.destination}</td>
//                 <td className="p-2 border text-right">₹{ride.rideAmount}</td>
//               </tr>
//             ))}
//             <tr className="font-semibold bg-gray-50">
//               <td colSpan={5} className="p-2 border text-right">Total</td>
//               <td className="p-2 border text-right text-green-700">₹{totalAmount}</td>
//             </tr>
//           </tbody>
//         </table>

//         <p className="text-xs text-gray-500">* This is a system-generated invoice and does not require a signature.</p>
//       </div>
//     </div>
//   );
// }

//--------------------------------------Before Adding Logo---------------------------------------------
// import React from 'react';

// const dummyInvoice = {
//   invoiceNumber: 'INV-20250725-001',
//   client: {
//     name: 'ABC Pvt. Ltd.',
//     email: 'client@abc.com',
//     phone: '+91-9876543210',
//     address: '123 Business Park, Jaipur, Rajasthan'
//   },
//   billingMonth: 'July 2025',
//   generatedDate: '25 July 2025',
//   rides: [
//     {
//       date: '01/07/2025',
//       time: '09:30 AM',
//       driverName: 'Rajesh Sharma',
//       pickup: 'Rambagh Palace, Jaipur',
//       destination: 'Central Park, Jaipur',
//       rideAmount: 320
//     },
//     {
//       date: '02/07/2025',
//       time: '10:00 AM',
//       driverName: 'Ayesha Khan',
//       pickup: 'Civil Lines, Jaipur',
//       destination: 'MI Road, Jaipur',
//       rideAmount: 250
//     },
//     {
//       date: '03/07/2025',
//       time: '08:45 AM',
//       driverName: 'Deepak Meena',
//       pickup: 'Vaishali Nagar',
//       destination: 'Jawahar Circle',
//       rideAmount: 270
//     },
//     {
//       date: '04/07/2025',
//       time: '10:15 AM',
//       driverName: 'Suresh Yadav',
//       pickup: 'Malviya Nagar',
//       destination: 'Sitapura Industrial Area',
//       rideAmount: 310
//     },
//     {
//       date: '05/07/2025',
//       time: '11:30 AM',
//       driverName: 'Meena Kumari',
//       pickup: 'Bani Park',
//       destination: 'C-Scheme',
//       rideAmount: 240
//     },
//     {
//       date: '06/07/2025',
//       time: '07:45 AM',
//       driverName: 'Anil Jain',
//       pickup: 'Ajmer Road',
//       destination: 'Tonk Road',
//       rideAmount: 280
//     },
//     {
//       date: '07/07/2025',
//       time: '12:15 PM',
//       driverName: 'Pooja Verma',
//       pickup: 'Gopalpura Bypass',
//       destination: 'Triveni Nagar',
//       rideAmount: 260
//     },
//     {
//       date: '08/07/2025',
//       time: '09:00 AM',
//       driverName: 'Karan Singh',
//       pickup: 'Jhotwara',
//       destination: 'Amer Fort',
//       rideAmount: 350
//     },
//     {
//       date: '09/07/2025',
//       time: '10:45 AM',
//       driverName: 'Sunita Meena',
//       pickup: 'Mansarovar',
//       destination: 'Durgapura',
//       rideAmount: 230
//     },
//     {
//       date: '10/07/2025',
//       time: '08:00 AM',
//       driverName: 'Vijay Joshi',
//       pickup: 'Adarsh Nagar',
//       destination: 'Sanganer',
//       rideAmount: 310
//     }
//   ]
// };

// export default function ClientInvoice() {
//   const totalAmount = dummyInvoice.rides.reduce((sum, ride) => sum + ride.rideAmount, 0);

//   return (

//       <div className="p-6 flex flex-col gap-2">

//     <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
//     {/* <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-md text-sm text-gray-800 font-sans"> */}
//       <div className="border-b pb-4 mb-4">  
//         <h2 className="text-2xl font-bold mb-1">Client Ride Invoice</h2>
//         <p className="text-gray-600">Invoice No: {dummyInvoice.invoiceNumber}</p>
//         <p className="text-gray-600">Billing Month: {dummyInvoice.billingMonth}</p>
//         <p className="text-gray-600">Generated Date: {dummyInvoice.generatedDate}</p>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-semibold">Billed To:</h3>
//         <p>{dummyInvoice.client.name}</p>
//         <p>{dummyInvoice.client.address}</p>
//         <p>Email: {dummyInvoice.client.email}</p>
//         <p>Phone: {dummyInvoice.client.phone}</p>
//       </div>

//       <table className="w-full border text-left mb-6">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Date</th>
//             <th className="p-2 border">Time</th>
//             <th className="p-2 border">Driver Name</th>
//             <th className="p-2 border">Pickup</th>
//             <th className="p-2 border">Destination</th>
//             <th className="p-2 border text-right">Amount (₹)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dummyInvoice.rides.map((ride, index) => (
//             <tr key={index}>
//               <td className="p-2 border">{ride.date}</td>
//               <td className="p-2 border">{ride.time}</td>
//               <td className="p-2 border">{ride.driverName}</td>
//               <td className="p-2 border">{ride.pickup}</td>
//               <td className="p-2 border">{ride.destination}</td>
//               <td className="p-2 border text-right">₹{ride.rideAmount}</td>
//             </tr>
//           ))}
//           <tr className="font-semibold bg-gray-50">
//             <td colSpan={5} className="p-2 border text-right">Total</td>
//             <td className="p-2 border text-right text-green-700">₹{totalAmount}</td>
//           </tr>
//         </tbody>
//       </table>

//       <p className="text-xs text-gray-500">* This is a system-generated invoice and does not require a signature.</p>
//     </div>
//     </div>
//   );
// }


// import React from "react";

// const ClientInvoice = ({ client, rides, month, year }) => {
//   const totalAmount = rides.reduce((acc, ride) => acc + ride.rideAmount, 0);

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 my-8 border border-gray-300">
//       <h1 className="text-3xl font-bold text-center mb-4">Monthly Ride Invoice</h1>

//       {/* Client Info */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold">Client Information</h2>
//         <p><strong>Name:</strong> {client.name}</p>
//         <p><strong>Email:</strong> {client.email}</p>
//         <p><strong>Phone:</strong> {client.phone}</p>
//         <p><strong>Billing Month:</strong> {month}/{year}</p>
//       </div>

//       {/* Ride Table */}
//       <div className="overflow-x-auto mb-6">
//         <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Driver</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Pickup</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Drop</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount (₹)</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {rides.map((ride, index) => (
//               <tr key={ride._id || index}>
//                 <td className="px-4 py-2 text-sm">{index + 1}</td>
//                 <td className="px-4 py-2 text-sm">{new Date(ride.date).toLocaleDateString()}</td>
//                 <td className="px-4 py-2 text-sm">{ride.driverName}</td>
//                 <td className="px-4 py-2 text-sm">{ride.pickup}</td>
//                 <td className="px-4 py-2 text-sm">{ride.drop}</td>
//                 <td className="px-4 py-2 text-sm font-semibold">₹{ride.rideAmount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Total */}
//       <div className="text-right">
//         <p className="text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default ClientInvoice;
