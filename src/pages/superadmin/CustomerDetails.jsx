import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const mockCustomer = {
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerAadhar: "1234-5678-9012",
  customerMobile: "9876543210",
};

const mockRides = [
  {
    id: 1,
    car: "Hyundai i20",
    status: "Approved",
    approvedBy: "admin1@example.com",
    date: "2024-07-01",
    amount: 1200,
    hub: "Hub A",
  },
  {
    id: 2,
    car: "Maruti Swift",
    status: "Rejected",
    approvedBy: "hr1@example.com",
    date: "2024-07-05",
    amount: 0,
    hub: "Hub B",
  },
  {
    id: 3,
    car: "Hyundai i20",
    status: "Approved",
    approvedBy: "admin1@example.com",
    date: "2024-08-10",
    amount: 1500,
    hub: "Hub A",
  },
  {
    id: 4,
    car: "Tata Tiago",
    status: "Pending",
    approvedBy: "hr2@example.com",
    date: "2024-08-15",
    amount: 0,
    hub: "Hub C",
  },
  {
    id: 5,
    car: "Tata Tiago",
    status: "Approved",
    approvedBy: "hr2@example.com",
    date: "2024-08-20",
    amount: 1000,
    hub: "Hub C",
  },
];

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer] = useState(mockCustomer);
  const [rides] = useState(mockRides);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from(new Set(rides.map(r => new Date(r.date).getFullYear().toString())));

  const filteredRides = rides.filter((ride) => {
    const rideDate = new Date(ride.date);
    const matchesMonth = month ? rideDate.getMonth() === parseInt(month) : true;
    const matchesYear = year ? rideDate.getFullYear().toString() === year : true;
    return matchesMonth && matchesYear;
  });

  const rideStats = filteredRides.reduce((acc, ride) => {
    acc[ride.status] = (acc[ride.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(rideStats).map((status) => ({
    status,
    count: rideStats[status],
  }));

  const amountPerMonth = rides.reduce((acc, ride) => {
    if (ride.status === "Approved") {
      const date = new Date(ride.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      acc[key] = (acc[key] || 0) + ride.amount;
    }
    return acc;
  }, {});

  const amountChartData = Object.entries(amountPerMonth).map(([key, value]) => ({
    monthYear: key,
    totalAmount: value,
  }));

  const totalFilteredAmount = filteredRides.reduce((sum, ride) => {
    return ride.status === "Approved" ? sum + ride.amount : sum;
  }, 0);

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#f4f4f4]">
      <h2 className="text-3xl font-bold text-gray-800">Customer Details</h2>

      <div className="bg-white shadow-md rounded-lg p-6 ">
        <p className="text-lg mb-2"><strong>Name:</strong> {customer.customerName}</p>
        <p className="text-lg mb-2"><strong>Email:</strong> {customer.customerEmail}</p>
        <p className="text-lg mb-2"><strong>Aadhar:</strong> {customer.customerAadhar}</p>
        <p className="text-lg mb-2"><strong>Mobile:</strong> {customer.customerMobile}</p>
      </div>

      <div className="flex gap-4 items-center">
        <select
          className="border p-2 rounded"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {months.map((m, index) => (
            <option key={index} value={index}>{m}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <span className="ml-auto font-medium text-gray-700">
          Total Amount: ₹{totalFilteredAmount}
        </span>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 ">
        <h3 className="text-xl font-semibold mb-4">Ride History</h3>
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Car</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Approved/Rejected By</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Hub</th>
            </tr>
          </thead>
          <tbody>
            {filteredRides.map((ride) => (
              <tr key={ride.id} className="hover:bg-gray-50">
                <td className="p-2 border">{ride.car}</td>
                <td className="p-2 border">{ride.status}</td>
                <td className="p-2 border">{ride.approvedBy}</td>
                <td className="p-2 border">{ride.date}</td>
                <td className="p-2 border">₹{ride.amount}</td>
                <td className="p-2 border">{ride.hub}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 ">
          <h3 className="text-xl font-semibold mb-4">Ride Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 ">
          <h3 className="text-xl font-semibold mb-4">Monthly Ride Amount</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amountChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalAmount" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


//----------------Before Adding Particular Month total amount of rides-----------------
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   CartesianGrid,
// } from "recharts";

// const mockCustomer = {
//   customerName: "John Doe",
//   customerEmail: "john@example.com",
//   customerAadhar: "1234-5678-9012",
//   customerMobile: "9876543210",
// };

// const mockRides = [
//   {
//     id: 1,
//     car: "Hyundai i20",
//     status: "Approved",
//     approvedBy: "admin1@example.com",
//     date: "2024-07-01",
//     hub: "Central Hub",
//   },
//   {
//     id: 2,
//     car: "Maruti Swift",
//     status: "Rejected",
//     approvedBy: "hr1@example.com",
//     date: "2024-07-05",
//     hub: "East Hub",
//   },
//   {
//     id: 3,
//     car: "Hyundai i20",
//     status: "Approved",
//     approvedBy: "admin1@example.com",
//     date: "2024-07-10",
//     hub: "Central Hub",
//   },
//   {
//     id: 4,
//     car: "Tata Tiago",
//     status: "Pending",
//     approvedBy: "hr2@example.com",
//     date: "2024-07-15",
//     hub: "North Hub",
//   },
// ];

// export default function CustomerDetails() {
//   const { id } = useParams();
//   const [customer] = useState(mockCustomer);
//   const [rides] = useState(mockRides);

//   const rideStats = rides.reduce((acc, ride) => {
//     acc[ride.status] = (acc[ride.status] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = Object.keys(rideStats).map((status) => ({
//     status,
//     count: rideStats[status],
//   }));

//   return (
//     <div className="p-6 flex flex-col gap-2">
      
// <h2 className="text-3xl font-bold mb-4 text-gray-800">Customer Details</h2>
// <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
//   <p className="text-lg mb-2"><strong>Name:</strong> {customer.customerName}</p>
//   <p className="text-lg mb-2"><strong>Email:</strong> {customer.customerEmail}</p>
//   <p className="text-lg mb-2"><strong>Aadhar:</strong> {customer.customerAadhar}</p>
//   <p className="text-lg mb-2"><strong>Mobile:</strong> {customer.customerMobile}</p>
// </div>


//       <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
//         <h3 className="text-xl font-semibold mb-4 text-gray-700">Ride History</h3>
//         <table className="w-full table-auto border-collapse">
//         <thead>
//   <tr className="bg-gray-100 text-left">
//     <th className="p-2 border">Car</th>
//     <th className="p-2 border">Status</th>
//     <th className="p-2 border">Approved/Rejected By</th>
//     <th className="p-2 border">Date</th>
//     <th className="p-2 border">Hub</th> {/* New column */}
//   </tr>
// </thead>
// <tbody>
//   {rides.map((ride) => (
//     <tr key={ride.id} className="hover:bg-gray-50">
//       <td className="p-2 border">{ride.car}</td>
//       <td className="p-2 border">{ride.status}</td>
//       <td className="p-2 border">{ride.approvedBy}</td>
//       <td className="p-2 border">{ride.date}</td>
//       <td className="p-2 border">{ride.hub}</td> {/* New cell */}
//     </tr>
//   ))}
// </tbody>

//         </table>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
//         <h3 className="text-xl font-semibold mb-4 text-gray-700">Ride Statistics</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="status" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


//------------------------------------------USing the dynamic routing --------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// // import { Card, CardContent } from '../components/ui/card';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// export default function EmployeeDetails() {
//   const { clientId, employeeId } = useParams();
//   const [employee, setEmployee] = useState(null);
//   const [rideHistory, setRideHistory] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const empRes = await axios.get(`http://183.18.18.71:4000/employee/${employeeId}`);
//         setEmployee(empRes.data);

//         const historyRes = await axios.get(`http://183.18.18.71:4000/ride/history/${employeeId}`);
//         setRideHistory(historyRes.data);
//       } catch (error) {
//         console.error('Error fetching employee details:', error);
//       }
//     };

//     fetchData();
//   }, [employeeId]);

//   const chartData = rideHistory.reduce((acc, ride) => {
//     const month = new Date(ride.date).toLocaleString('default', { month: 'short', year: 'numeric' });
//     const existing = acc.find(item => item.month === month);
//     if (existing) {
//       existing.rides += 1;
//     } else {
//       acc.push({ month, rides: 1 });
//     }
//     return acc;
//   }, []);

//   return (
//     <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center">Employee Details</h1>

//       {employee && (
//         <Card>
//           <CardContent className="space-y-2">
//             <h2 className="text-xl font-semibold">{employee.name}</h2>
//             <p>Email: {employee.email}</p>
//             <p>Mobile: {employee.mobile}</p>
//             <p>Department: {employee.department}</p>
//           </CardContent>
//         </Card>
//       )}

//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Monthly Ride Stats</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="month" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="rides" fill="#4F46E5" name="Rides" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Pickup</th>
//                 <th className="px-4 py-2">Destination</th>
//                 <th className="px-4 py-2">Car</th>
//                 <th className="px-4 py-2">Approved By</th>
//                 <th className="px-4 py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rideHistory.map((ride, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-2">{new Date(ride.date).toLocaleDateString()}</td>
//                   <td className="px-4 py-2">{ride.pickup?.address}</td>
//                   <td className="px-4 py-2">{ride.destination?.address}</td>
//                   <td className="px-4 py-2">{ride.car?.model || 'N/A'}</td>
//                   <td className="px-4 py-2">{ride.approvedBy || 'N/A'}</td>
//                   <td className="px-4 py-2">{ride.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// const mockClients = [
//   {
//     id: "client1",
//     name: "Client A",
//     employees: [
//       {
//         id: "emp1",
//         name: "John Doe",
//         email: "john@example.com",
//         phone: "+91-9999999991",
//         role: "Admin",
//         rides: [
//           { month: "Jan", count: 4, car: "Toyota Innova", approvedBy: "Admin A", status: "Approved" },
//           { month: "Feb", count: 7, car: "Hyundai i20", approvedBy: "HR X", status: "Approved" },
//           { month: "Mar", count: 3, car: "Maruti Swift", approvedBy: "HR Y", status: "Rejected" },
//         ],
//       },
//       {
//         id: "emp2",
//         name: "Jane Smith",
//         email: "jane@example.com",
//         phone: "+91-9999999992",
//         role: "HR",
//         rides: [
//           { month: "Jan", count: 6, car: "Honda Amaze", approvedBy: "Admin B", status: "Approved" },
//           { month: "Feb", count: 2, car: "Tata Nexon", approvedBy: "HR X", status: "Rejected" },
//           { month: "Mar", count: 5, car: "Hyundai Venue", approvedBy: "HR Z", status: "Approved" },
//         ],
//       },
//     ],
//   },
// ];

// export default function EmployeeDetails() {
//   const { clientId, id } = useParams();
//   const [employee, setEmployee] = useState(null);
//   const [rideData, setRideData] = useState([]);

//   useEffect(() => {
//     const client = mockClients.find((c) => c.id === clientId);
//     if (!client) return;

//     const emp = client.employees.find((e) => e.id === id);
//     if (emp) {
//       setEmployee(emp);
//       setRideData(emp.rides);
//     }
//   }, [clientId, id]);

//   if (!employee) {
//     return <div className="p-6">Employee not found</div>;
//   }

//   const chartData = {
//     labels: rideData.map((ride) => ride.month),
//     datasets: [
//       {
//         label: "Rides Taken",
//         data: rideData.map((ride) => ride.count),
//         backgroundColor: "#3b82f6",
//         borderRadius: 4,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: `Monthly Ride History for ${employee.name}`,
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Employee Details - {employee.name}
//         </h1>
//         <Link to={`/superadmin/client/${clientId}`} className="text-blue-600 underline">
//           ← Back to Client
//         </Link>
//       </div>

//       {/* Basic Info */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
//           <p><strong className="text-gray-900">Employee ID:</strong> {id}</p>
//           <p><strong className="text-gray-900">Role:</strong> {employee.role}</p>
//           <p><strong className="text-gray-900">Email:</strong> {employee.email}</p>
//           <p><strong className="text-gray-900">Phone:</strong> {employee.phone}</p>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <Bar data={chartData} options={chartOptions} />
//       </div>

//       {/* Ride Table */}
//       <div className="bg-white shadow p-4 rounded-lg">
//         <h4 className="text-lg font-medium mb-2">Detailed Ride Info</h4>
//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b">
//               <th className="py-2">Month</th>
//               <th className="py-2">Car Used</th>
//               <th className="py-2">Approved/Rejected By</th>
//               <th className="py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rideData.map((ride, index) => (
//               <tr key={index} className="border-b">
//                 <td className="py-2">{ride.month}</td>
//                 <td className="py-2">{ride.car}</td>
//                 <td className="py-2">{ride.approvedBy}</td>
//                 <td className={`py-2 font-medium ${ride.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
//                   {ride.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// export default function EmployeeDetails() {
//   const { employeeId } = useParams();
//   const [employee, setEmployee] = useState(null);
//   const [rideHistory, setRideHistory] = useState([]);

//   useEffect(() => {
//     // Replace this with actual API call
//     const mockEmployee = {
//       id: employeeId,
//       name: "Alice Smith",
//       email: "alice.smith@example.com",
//       department: "Operations",
//       contact: "9876543210",
//     };

//     const mockRides = [
//       { month: "January", year: 2025, rides: 5 },
//       { month: "February", year: 2025, rides: 8 },
//       { month: "March", year: 2025, rides: 6 },
//       { month: "April", year: 2025, rides: 9 },
//       { month: "May", year: 2025, rides: 7 },
//       { month: "June", year: 2025, rides: 10 },
//       { month: "July", year: 2025, rides: 12 },
//     ];

//     setEmployee(mockEmployee);
//     setRideHistory(mockRides);
//   }, [employeeId]);

//   if (!employee) return <div className="p-4">Loading...</div>;

//   const chartData = {
//     labels: rideHistory.map((r) => r.month),
//     datasets: [
//       {
//         label: "Rides",
//         data: rideHistory.map((r) => r.rides),
//         backgroundColor: "#3B82F6",
//         borderColor: "#1E40AF",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Monthly Ride History" },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 1 },
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         Employee Details
//       </h1>

//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Basic Info</h2>
//         <p><strong>ID:</strong> {employee.id}</p>
//         <p><strong>Name:</strong> {employee.name}</p>
//         <p><strong>Email:</strong> {employee.email}</p>
//         <p><strong>Contact:</strong> {employee.contact}</p>
//         <p><strong>Department:</strong> {employee.department}</p>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Ride History</h2>
//         <div className="overflow-x-auto mb-4">
//           <table className="min-w-full text-left border rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border">Month</th>
//                 <th className="py-2 px-4 border">Year</th>
//                 <th className="py-2 px-4 border">Rides</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rideHistory.map((ride, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="py-2 px-4 border">{ride.month}</td>
//                   <td className="py-2 px-4 border">{ride.year}</td>
//                   <td className="py-2 px-4 border">{ride.rides}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="h-96">
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }
