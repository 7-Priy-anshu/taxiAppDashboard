import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { io } from 'socket.io-client';

// const socket = io('http://183.18.18.71:4000'); // your backend socket server

export default function BookRide() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // socket.emit('register-admin'); // optional if backend needs to know

    // Listen for new ride requests
    socket.on('new-ride-request', (ride) => {
      setRides((prev) => [...prev, ride]);
    });

    // Optional: backend broadcasts ride decision update
    socket.on('ride-status-updated', ({ rideId, status }) => {
      setRides((prev) =>
        prev.map((r) =>
          r._id === rideId ? { ...r, status } : r
        )
      );
    });

    return () => {
      socket.off('new-ride-request');
      socket.off('ride-status-updated');
      socket.disconnect();
    };
  }, []);

  // Unified handler for both approve/reject
  const handleDecision = (rideId, status) => {
    socket.emit('ride-decision', { rideId, status });
    setRides((prev) =>
      prev.map((r) =>
        r._id === rideId ? { ...r, status } : r
      )
    );
  };

  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'User Name',
      selector: row => row.userName,
      sortable: true,
    },
    {
      name: 'Pickup',
      selector: row => row.from,
      sortable: true,
    },
    {
      name: 'Drop',
      selector: row => row.to,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => {
        if (row.status === 'pending') {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleDecision(row._id, 'approved')}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleDecision(row._id, 'rejected')}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          );
        } else {
          return (
            <span className={`font-semibold ${row.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
              {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
            </span>
          );
        }
      },
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-semibold">Ride Requests</h2>
      <DataTable
        columns={columns}
        data={rides}
        pagination
        highlightOnHover
        responsive
        persistTableHead
      />
    </div>
  );
}


// // AdminDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { io } from 'socket.io-client';

// const socket = io('http://183.18.18.71:4000'); // your backend socket server

// const columns = [
//   {
//     name: 'User Name',
//     selector: row => row.userName,
//     sortable: true,
//   },
//   {
//     name: 'Pickup',
//     selector: row => row.from,
//     sortable: true,
//   },
//   {
//     name: 'Drop',
//     selector: row => row.to,
//     sortable: true,
//   },
// //   {
// //     name: 'Status',
// //     selector: row => row.status,
// //     sortable: true,
// //   },
//   {
//     name: 'Action',
//     cell: row =>
//       row.status === 'pending' ? (
//         <button
//           onClick={() => handleApprove(row._id)}
//           className="bg-green-500 text-white px-3 py-1 rounded"
//         >
//           Approve
//         </button>
//       ) : (
//         <span className="text-green-600 font-semibold">Approved</span>
//       ),
//   },
// ];

// export default function BookRide() {
//   const [rides, setRides] = useState([]);

//   useEffect(() => {
//     // socket.emit('register-admin');

//     socket.on('new-ride-request', (ride) => {
//       setRides((prev) => [...prev, ride]);
//     });

//     socket.on('ride-approved', ({ rideId }) => {
//       setRides((prev) =>
//         prev.map((r) =>
//           r._id === rideId ? { ...r, status: 'approved' } : {status: 'rejected'}
//         )
//       );
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Approve handler
//   const handleApprove = (rideId) => {
//     socket.emit('approve-ride', { rideId });
//     setRides((prev) =>
//       prev.map((r) =>
//         r._id === rideId ? { ...r, status: 'approved' } : r
//       )
//     );
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl mb-4 font-semibold">Ride Requests</h2>
//       <DataTable
//         columns={columns}
//         data={rides}
//         pagination
//         highlightOnHover
//         responsive
//         persistTableHead
//       />
//     </div>
//   );
// }
