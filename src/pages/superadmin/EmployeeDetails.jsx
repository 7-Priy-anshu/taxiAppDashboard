import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const mockClients = [
  {
    id: "client1",
    name: "Client A",
    employees: [
      {
        id: "emp1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+91-9999999991",
        role: "Admin",
        rides: [
          { month: "Jan", count: 4, car: "Toyota Innova", approvedBy: "Admin A", status: "Approved" },
          { month: "Feb", count: 7, car: "Hyundai i20", approvedBy: "HR X", status: "Approved" },
          { month: "Mar", count: 3, car: "Maruti Swift", approvedBy: "HR Y", status: "Rejected" },
        ],
      },
      {
        id: "emp2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+91-9999999992",
        role: "HR",
        rides: [
          { month: "Jan", count: 6, car: "Honda Amaze", approvedBy: "Admin B", status: "Approved" },
          { month: "Feb", count: 2, car: "Tata Nexon", approvedBy: "HR X", status: "Rejected" },
          { month: "Mar", count: 5, car: "Hyundai Venue", approvedBy: "HR Z", status: "Approved" },
        ],
      },
    ],
  },
];

export default function EmployeeDetails() {
  const { clientId, id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [rideData, setRideData] = useState([]);

  useEffect(() => {
    const client = mockClients.find((c) => c.id === clientId);
    if (!client) return;

    const emp = client.employees.find((e) => e.id === id);
    if (emp) {
      setEmployee(emp);
      setRideData(emp.rides);
    }
  }, [clientId, id]);

  if (!employee) {
    return <div className="p-6">Employee not found</div>;
  }

  const chartData = {
    labels: rideData.map((ride) => ride.month),
    datasets: [
      {
        label: "Rides Taken",
        data: rideData.map((ride) => ride.count),
        backgroundColor: "#3b82f6",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Monthly Ride History for ${employee.name}`,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Details - {employee.name}
        </h1>
        <Link to={`/superadmin/client/${clientId}`} className="text-blue-600 underline">
          ← Back to Client
        </Link>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <p><strong className="text-gray-900">Employee ID:</strong> {id}</p>
          <p><strong className="text-gray-900">Role:</strong> {employee.role}</p>
          <p><strong className="text-gray-900">Email:</strong> {employee.email}</p>
          <p><strong className="text-gray-900">Phone:</strong> {employee.phone}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Ride Table */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h4 className="text-lg font-medium mb-2">Detailed Ride Info</h4>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Month</th>
              <th className="py-2">Car Used</th>
              <th className="py-2">Approved/Rejected By</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rideData.map((ride, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{ride.month}</td>
                <td className="py-2">{ride.car}</td>
                <td className="py-2">{ride.approvedBy}</td>
                <td className={`py-2 font-medium ${ride.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                  {ride.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


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
