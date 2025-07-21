// import React, { useEffect, useState, useRef } from "react";
// import DataTable from "react-data-table-component";
// import { Dialog } from "@headlessui/react";
// import { io } from "socket.io-client";
// import { Link } from "react-router-dom";
// import BackButton from "./BackButton";
// import globalTableStyles from '../styles/globalTableStyles';


// export default function BookRide() {
//   const [rides, setRides] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [selectedDriver, setSelectedDriver] = useState("");
//   const [decision, setDecision] = useState("");
//   const [drivers, setDrivers] = useState([]);

//   //For Viewing Ride Details 
//   const [viewDetailsRide, setViewDetailsRide] = useState(null);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);


//   const VITE_API = import.meta.env.VITE_API;
//   const SOCKET_URL = `${VITE_API}`;
//   const socketRef = useRef(null);
//   const hrId = "1234565432";

//   // ✅ Utility to update badge count globally
//   const updatePendingBadge = (rideList) => {
//     const pending = rideList.filter((ride) => ride.status === "inactive").length;
//     window.dispatchEvent(
//       new CustomEvent("update_pending_count", { detail: { pending } })
//     );
//   };

//   useEffect(() => {
//     const socket = io(SOCKET_URL);
//     socketRef.current = socket;

//     fetch(`${VITE_API}driver/status/inactive`)
//       .then((res) => res.json())
//       .then((data) => setDrivers(data))
//       .catch((err) => console.error("Failed to fetch inactive drivers:", err));

//     socket.on("connect", () => {
//       console.log("Connected:", socket.id);
//       socket.emit("register_hr", { hrId });
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected");
//     });

//     // ✅ When new ride is received
//     socket.on("ride_request_to_hr", (rideRequest) => {
//       console.log("Ride request:", rideRequest);

//       setRides((prev) => {
//         const alreadyExists = prev.some((r) => r.id === rideRequest.id);
//         const updated = alreadyExists
//           ? prev
//           : [...prev, { ...rideRequest, status: rideRequest.status || "inactive" }];
//         updatePendingBadge(updated);
//         return updated;
//       });
//     });

//     // ✅ When ride status is updated (approved/rejected)
//     socket.on("ride_updated", (updatedRide) => {
//       console.log("Ride updated:", updatedRide);
//       setRides((prev) => {
//         const updated = prev.map((ride) =>
//           ride.id === updatedRide.id ? updatedRide : ride
//         );
//         updatePendingBadge(updated);
//         return updated;
//       });
//     });

//     socket.on("ride_approved", (data) => {
//       console.log("Server acknowledged ride approval", data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleOpenDialog = (ride, action) => {
//     setSelectedRide(ride);
//     setDecision(action);
//     setSelectedDriver("");
//     setIsDialogOpen(true);
//   };

//   const handleSubmitDecision = () => {
//     if (!selectedDriver && decision === "approved") {
//       alert("Please select a driver.");
//       return;
//     }

//     if (!socketRef.current) {
//       console.error("Socket not connected!");
//       return;
//     }

//     // ✅New Socket Listener for Ride Cost (approved/rejected)
//      socket.on("ride_cost_details", (data) => {
//     console.log("Received ride_cost_details:", data);
//     setRides((prev) =>
//       prev.map((ride) =>
//         ride.id === data.rideId
//           ? {
//               ...ride,
//               hubToPickup: data.hubToPickup,
//               pickupToDrop: data.pickupToDrop,
//               totalKm: data.totalKm,
//               totalCost: data.totalCost,
//             }
//           : ride
//       )
//     );
//   });

// //     socket.on("ride_cost_details", (data) => {
// //   // Example data: { rideId, hubToPickup, pickupToDrop, totalKm, totalCost }
// //   setRides((prev) =>
// //     prev.map((ride) =>
// //       ride.id === data.rideId
// //         ? {
// //             ...ride,
// //             hubToPickup: data.hubToPickup,
// //             pickupToDrop: data.pickupToDrop,
// //             totalKm: data.totalKm,
// //             totalCost: data.totalCost,
// //           }
// //         : ride
// //     )
// //   );
// // });

// // Handle View Details Function  
// const handleViewDetails = (ride) => {
//   setViewDetailsRide(ride);
//   setIsDetailsOpen(true);

//   // Optional: Fetch latest cost from server if not already attached
//   if (!ride.totalCost) {
//     socketRef.current.emit("get_ride_cost", { rideId: ride.id });
//   }
// };


//     if (decision === "approved") {
//       console.log("Emitting ride_assign...");
//       socketRef.current.emit("ride_assign", {
//         rideId: selectedRide.id,
//         status: "approved",
//         driverEmail: selectedDriver,
//       });
//     } else if (decision === "rejected") {
//       console.log("Emitting ride_rejected...");
//       socketRef.current.emit("ride_rejected", {
//         rideId: selectedRide.id,
//         status: "rejected",
//       });
//     }

//     console.log(
//       `Ride ${decision} for ${selectedDriver || "no driver"} (ride ID ${
//         selectedRide.id
//       }) sent to server`
//     );

//     setRides((prev) => {
//       const updated = prev.map((r) =>
//         r.id === selectedRide.id
//           ? { ...r, status: decision, driverEmail: selectedDriver }
//           : r
//       );
//       updatePendingBadge(updated);
//       return updated;
//     });

//     setIsDialogOpen(false);
//     setSelectedRide(null);
//     setDecision("");
//   };

//   const columns = [
//     { name: "Id", selector: (row) => row.id },
//     { name: "Client Email", selector: (row) => row.userEmail },
//     { name: "Pickup", selector: (row) => row.from },
//     { name: "Drop", selector: (row) => row.to },
//     { name: "Time", selector: (row) => row.rideTime },
//     { name: "Status", selector: (row) => row.status },
//     { name: "Driver", selector: (row) => row.driverEmail || "-" },
//     {
//   name: "Action",
//   cell: (row) => {
//     if (row.status === "inactive" || row.status === "pending") {
//       return (
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleOpenDialog(row, "approved")}
//             className="bg-green-500 text-white px-2 py-1 rounded"
//           >
//             Approve
//           </button>
//           <button
//             onClick={() => handleOpenDialog(row, "rejected")}
//             className="bg-red-500 text-white px-2 py-1 rounded"
//           >
//             Reject
//           </button>
//         </div>
//       );
//     } else {
//       return (
//         <button
//           onClick={() => handleViewDetails(row)}
//           className="text-blue-600 underline"
//         >
//           View
//         </button>
//       );
//     }
//   },
// }

//     // {
//     //   name: "Action",
//     //   cell: (row) => {
//     //     if (row.status === "inactive" || row.status === "pending") {
//     //       return (
//     //         <div className="flex gap-2">
//     //           <button
//     //             onClick={() => handleOpenDialog(row, "approved")}
//     //             className="bg-green-500 text-white px-2 py-1 rounded"
//     //           >
//     //             Approve
//     //           </button>
//     //           <button
//     //             onClick={() => handleOpenDialog(row, "rejected")}
//     //             className="bg-red-500 text-white px-2 py-1 rounded"
//     //           >
//     //             Reject
//     //           </button>
//     //         </div>
//     //       );
//     //     } else {
//     //       return (
//     //         <span
//     //           className={`font-semibold ${
//     //             row.status === "approved" ? "text-green-600" : "text-red-600"
//     //           }`}
//     //         >
//     //           {row.status}
//     //         </span>
//     //       );
//     //     }
//     //   },
//     // },
//   ];

//   return (
//     <div className="p-6 flex flex-col gap-2">
//       <div className="bg-white rounded-xl shadow p-4">
//         <div className="max-w-4xl flex">
//           <Link to="/superadmin">
//             <BackButton text="Back" />
//           </Link>
//         </div>
//       </div>
//       <div className="bg-white rounded-xl shadow p-4">
//         <h2 className="text-2xl mb-4 font-bold">Ride Requests</h2>
//         <DataTable
//           columns={columns}
//           data={rides}
//           pagination
//           highlightOnHover
//           responsive
//           keyField="id"
//           globalTableStyles={globalTableStyles}
//         />
//         <Dialog
//           open={isDialogOpen}
//           onClose={() => setIsDialogOpen(false)}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//         >
//           <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
//             <Dialog.Title className="text-lg font-bold mb-4">
//               Select Driver
//             </Dialog.Title>
//             <select
//               value={selectedDriver}
//               onChange={(e) => setSelectedDriver(e.target.value)}
//               className="border border-gray-300 p-2 w-full rounded"
//             >
//               <option value="">Select a driver</option>
//               {drivers.map((driver) => (
//                 <option key={driver.id} value={driver.email}>
//                   ({driver.email || driver.driverEmail})
//                 </option>
//               ))}
//             </select>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setIsDialogOpen(false)}
//                 className="bg-gray-400 text-white px-3 py-1 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitDecision}
//                 className="bg-blue-600 text-white px-3 py-1 rounded"
//               >
//                 Confirm {decision}
//               </button>
//             </div>
//           </Dialog.Panel>
//         </Dialog>
//         <Dialog
//   open={isDetailsOpen}
//   onClose={() => setIsDetailsOpen(false)}
//   className="fixed inset-0 z-50 flex items-center justify-center"
// >
//   <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
//     <Dialog.Title className="text-lg font-bold mb-4">Ride Details</Dialog.Title>

//     {viewDetailsRide ? (
//       <div className="space-y-2 text-sm">
//         <p><strong>Hub:</strong> Sector 21A (Fixed)</p>
//         <p><strong>Pickup:</strong> {viewDetailsRide.from}</p>
//         <p><strong>Drop:</strong> {viewDetailsRide.to}</p>
//         <hr />
//         <p><strong>Hub → Pickup:</strong> {viewDetailsRide.hubToPickup || "Calculating..."} km</p>
//         <p><strong>Pickup → Drop:</strong> {viewDetailsRide.pickupToDrop || "Calculating..."} km</p>
//         <p><strong>Total Distance:</strong> {viewDetailsRide.totalKm || "-"} km</p>
//         <p><strong>Total Cost:</strong> ₹{viewDetailsRide.totalCost || "-"}</p>
//       </div>
//     ) : (
//       <p>Loading...</p>
//     )}

//     <div className="flex justify-end mt-4">
//       <button
//         onClick={() => setIsDetailsOpen(false)}
//         className="bg-gray-400 text-white px-3 py-1 rounded"
//       >
//         Close
//       </button>
//     </div>
//   </Dialog.Panel>
// </Dialog>

//       </div>
//     </div>
//   );
// }

//-----------------------------------------------------------------Before the cost adding ---------------------------------------------------------------

import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Dialog } from "@headlessui/react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import globalTableStyles from '../styles/globalTableStyles';


export default function BookRide() {
  const [rides, setRides] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [decision, setDecision] = useState("");
  const [drivers, setDrivers] = useState([]);
  
  //For Viewing Ride Details 

  const VITE_API = import.meta.env.VITE_API;
  const SOCKET_URL = `${VITE_API}`;
  const socketRef = useRef(null);
  const hrId = "1234565432";

  // ✅ Utility to update badge count globally
  const updatePendingBadge = (rideList) => {
    const pending = rideList.filter((ride) => ride.status === "inactive").length;
    window.dispatchEvent(
      new CustomEvent("update_pending_count", { detail: { pending } })
    );
  };

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    fetch(`${VITE_API}driver/status/inactive`)
      .then((res) => res.json())
      .then((data) => setDrivers(data))
      .catch((err) => console.error("Failed to fetch inactive drivers:", err));

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("register_hr", { hrId });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    // ✅ When new ride is received
    socket.on("ride_request_to_hr", (rideRequest) => {
      console.log("Ride request:", rideRequest);

      setRides((prev) => {
        const alreadyExists = prev.some((r) => r.id === rideRequest.id);
        const updated = alreadyExists
          ? prev
          : [...prev, { ...rideRequest, status: rideRequest.status || "inactive" }];
        updatePendingBadge(updated);
        return updated;
      });
    });

    // ✅ When ride status is updated (approved/rejected)
    socket.on("ride_updated", (updatedRide) => {
      console.log("Ride updated:", updatedRide);
      setRides((prev) => {
        const updated = prev.map((ride) =>
          ride.id === updatedRide.id ? updatedRide : ride
        );
        updatePendingBadge(updated);
        return updated;
      });
    });

    socket.on("ride_approved", (data) => {
      console.log("Server acknowledged ride approval", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpenDialog = (ride, action) => {
    setSelectedRide(ride);
    setDecision(action);
    setSelectedDriver("");
    setIsDialogOpen(true);
  };

  const handleSubmitDecision = () => {
    if (!selectedDriver && decision === "approved") {
      alert("Please select a driver.");
      return;
    }

    if (!socketRef.current) {
      console.error("Socket not connected!");
      return;
    }

    if (decision === "approved") {
      console.log("Emitting ride_assign...");
      socketRef.current.emit("ride_assign", {
        rideId: selectedRide.id,
        status: "approved",
        driverEmail: selectedDriver,
      });
    } else if (decision === "rejected") {
      console.log("Emitting ride_rejected...");
      socketRef.current.emit("ride_rejected", {
        rideId: selectedRide.id,
        status: "rejected",
      });
    }

    console.log(
      `Ride ${decision} for ${selectedDriver || "no driver"} (ride ID ${
        selectedRide.id
      }) sent to server`
    );

    setRides((prev) => {
      const updated = prev.map((r) =>
        r.id === selectedRide.id
          ? { ...r, status: decision, driverEmail: selectedDriver }
          : r
      );
      updatePendingBadge(updated);
      return updated;
    });

    setIsDialogOpen(false);
    setSelectedRide(null);
    setDecision("");
  };

  const columns = [
    { name: "Id", selector: (row) => row.id },
    { name: "Client Email", selector: (row) => row.userEmail },
    { name: "Pickup", selector: (row) => row.from },
    { name: "Drop", selector: (row) => row.to },
    { name: "Time", selector: (row) => row.rideTime },
    { name: "Status", selector: (row) => row.status },
    { name: "Driver", selector: (row) => row.driverEmail || "-" },
    {
      name: "Action",
      cell: (row) => {
        if (row.status === "inactive" || row.status === "pending") {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenDialog(row, "approved")}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleOpenDialog(row, "rejected")}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Reject
              </button>
            </div>
          );
        } else {
          return (
            <span
              className={`font-semibold ${
                row.status === "approved" ? "text-green-600" : "text-red-600"
              }`}
            >
              {row.status}
            </span>
          );
        }
      },
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-2">
      <div className="bg-white rounded-xl shadow p-4">
        <div className="max-w-4xl flex">
          <Link to="/superadmin">
            <BackButton text="Back" />
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-2xl mb-4 font-bold">Ride Requests</h2>
        <DataTable
          columns={columns}
          data={rides}
          pagination
          highlightOnHover
          responsive
          keyField="id"
          globalTableStyles={globalTableStyles}
        />
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-4">
              Select Driver
            </Dialog.Title>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.email}>
                  ({driver.email})
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitDecision}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Confirm {decision}
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
}


// import React, { useEffect, useState, useRef } from "react";
// import DataTable from "react-data-table-component";
// import { Dialog } from "@headlessui/react";
// import { io } from "socket.io-client";
// import { Link } from "react-router-dom";
// import BackButton from "./BackButton";


// export default function BookRide() {
//   const [rides, setRides] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [selectedDriver, setSelectedDriver] = useState("");
//   const [decision, setDecision] = useState("");
//   const [drivers, setDrivers] = useState([]);

//   const VITE_API = import.meta.env.VITE_API;
//   const socketRef = useRef(null);
//   const SOCKET_URL = `${VITE_API}`;
//   const hrId = "1234565432";

//   // ✅ Move this to the top!
//   const updatePendingBadge = (rideList) => {
//     const pending = rideList.filter((ride) => ride.status === "pending").length;
//     window.dispatchEvent(
//       new CustomEvent("update_pending_count", {
//         detail: { pending },
//       })
//     );
//   };

//   useEffect(() => {
//     const socket = io(SOCKET_URL);
//     socketRef.current = socket;

//     fetch(`${VITE_API}driver/status/inactive`)
//       .then((res) => res.json())
//       .then((data) => setDrivers(data))
//       .catch((err) => console.error("Failed to fetch inactive drivers:", err));

//     socket.on("connect", () => {
//       console.log("Connected:", socket.id);
//       socket.emit("register_hr", { hrId });
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected");
//     });

//     socket.on("ride_request_to_hr", (rideRequest) => {
//       console.log("Ride request:", rideRequest);

//       setRides((prev) => {
//         const alreadyExists = prev.some((r) => r.id === rideRequest.id);
//         const updated = alreadyExists
//           ? prev
//           : [...prev, { ...rideRequest, status: rideRequest.status || "pending" }];
//         updatePendingBadge(updated);
//         return updated;
//       });
//     });

//     socket.on("ride_updated", (updatedRide) => {
//       console.log("Ride updated:", updatedRide);

//       setRides((prev) => {
//         const updated = prev.map((ride) =>
//           ride.id === updatedRide.id ? updatedRide : ride
//         );
//         updatePendingBadge(updated);
//         return updated;
//       });
//     });

//     return () => {

//       socket.disconnect();
//     };
//   }, []);

//   const handleSubmitDecision = () => {
//     if (!selectedDriver && decision === "approved") {
//       alert("Please select a driver.");
//       return;
//     }

//     if (!socketRef.current) {
//       console.error("Socket not connected!");
//       return;
//     }

//     if (decision === "approved") {
//       socketRef.current.emit("ride_assign", {
//         rideId: selectedRide.id,
//         status: "approved",
//         driverEmail: selectedDriver,
//       });
//     } else if (decision === "rejected") {
//       socketRef.current.emit("ride_rejected", {
//         rideId: selectedRide.id,
//         status: "rejected",
//       });
//     }

//     setRides((prev) => {
//       const updated = prev.map((r) =>
//         r.id === selectedRide.id
//           ? { ...r, status: decision, driverEmail: selectedDriver }
//           : r
//       );
//       updatePendingBadge(updated); // ✅ recalculate pending after decision
//       return updated;
//     });

//     setIsDialogOpen(false);
//     setSelectedRide(null);
//     setDecision("");
//   };
//  const columns = [
//     { name: "Id", selector: (row) => row.id },
//     { name: "Client Email", selector: (row) => row.userEmail },
//     { name: "Pickup", selector: (row) => row.from },
//     { name: "Drop", selector: (row) => row.to },
//     { name: "Time", selector: (row) => row.rideTime },
//     { name: "Status", selector: (row) => row.status },
//     { name: "Driver", selector: (row) => row.driverEmail || "-" },
//     {
//       name: "Action",
//       cell: (row) => {
//         if (row.status === "pending") {
//           return (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleOpenDialog(row, "approved")}
//                 className="bg-green-500 text-white px-2 py-1 rounded"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleOpenDialog(row, "rejected")}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Reject
//               </button>
//             </div>
//           );
//         } else {
//           return (
//             <span
//               className={`font-semibold ${
//                 row.status === "approved" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {row.status}
//             </span>
//           );
//         }
//       },
//     },
//   ];

//   return (
//     <div className="p-6 flex flex-col gap-2">
//       <div className="bg-white rounded-xl shadow p-4">
//         <div className="max-w-4xl flex">
//           <Link to="/superadmin">
//             <BackButton text="Back" />
//           </Link>
//         </div>
//       </div>
//       <div className="bg-white rounded-xl shadow p-4">
//         <h2 className="text-2xl mb-4 font-bold">Ride Requests</h2>
//         <DataTable
//           columns={columns}
//           data={rides}
//           pagination
//           highlightOnHover
//           responsive
//           keyField="id"
//         />
//         <Dialog
//           open={isDialogOpen}
//           onClose={() => setIsDialogOpen(false)}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//         >
//           <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
//             <Dialog.Title className="text-lg font-bold mb-4">
//               Select Driver
//             </Dialog.Title>
//             <select
//               value={selectedDriver}
//               onChange={(e) => setSelectedDriver(e.target.value)}
//               className="border border-gray-300 p-2 w-full rounded"
//             >
//               <option value="">Select a driver</option>
//               {drivers.map((driver) => (
//                 <option key={driver.id} value={driver.email}>
//                   ({driver.email})
//                 </option>
//               ))}
//             </select>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setIsDialogOpen(false)}
//                 className="bg-gray-400 text-white px-3 py-1 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitDecision}
//                 className="bg-blue-600 text-white px-3 py-1 rounded"
//               >
//                 Confirm {decision}
//               </button>
//             </div>
//           </Dialog.Panel>
//         </Dialog>
//       </div>
//     </div>
//   );
// }

//------------------------------------------------------------without badge ----------------------------------------------------------------
// import React, { useEffect, useState, useRef } from "react";
// import DataTable from "react-data-table-component";
// import { Dialog } from "@headlessui/react";
// import { io } from "socket.io-client";
// import { Link } from "react-router-dom";
// import BackButton from "./BackButton";

// export default function BookRide() {
//   const [rides, setRides] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [selectedDriver, setSelectedDriver] = useState("");
//   const [decision, setDecision] = useState("");
//   const [drivers, setDrivers] = useState([]);

//   const VITE_API = import.meta.env.VITE_API;
//   const socketRef = useRef(null);
//   const SOCKET_URL = `${VITE_API}`;
//   const hrId = "1234565432";

//  setRides((prev) => {
//   const updated = prev.map((r) =>
//     r.id === selectedRide.id
//       ? { ...r, status: decision, driverEmail: selectedDriver }
//       : r
//   );
//   updatePendingBadge(updated);
//   return updated;
// });


//   useEffect(() => {
//     const socket = io(SOCKET_URL);
//     socketRef.current = socket;

//     fetch(`${VITE_API}driver/status/inactive`)
//       .then((res) => res.json())
//       .then((data) => setDrivers(data))
//       .catch((err) => console.error("Failed to fetch inactive drivers:", err));

//     socket.on("connect", () => {
//       console.log("Connected:", socket.id);
//       socket.emit("register_hr", { hrId });
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected");
//     });

//     // socket.on("ride_request_to_hr", (rideRequest) => {
//     //   console.log("Ride request:", rideRequest);
//     //   setRides((prev) => [
//     //     ...prev,
//     //     { ...rideRequest, status: rideRequest.status || "pending" }
//     //   ]);
//     // });

// //     socket.on("ride_request_to_hr", (rideRequest) => {
// //   console.log("Ride request:", rideRequest);

// //   setRides((prev) => {
// //     const alreadyExists = prev.some((r) => r.id === rideRequest.id);
// //     if (alreadyExists) return prev;
// //     return [
// //       ...prev,
// //       { ...rideRequest, status: rideRequest.status || "pending" }
// //     ];
// //   });
// // });
// socket.on("ride_request_to_hr", (rideRequest) => {
//   console.log("Ride request:", rideRequest);

//   setRides((prev) => {
//     const alreadyExists = prev.some((r) => r.id === rideRequest.id);
//     const updated = alreadyExists ? prev : [
//       ...prev,
//       { ...rideRequest, status: rideRequest.status || "pending" }
//     ];
//     updatePendingBadge(updated);  // 🔁 update badge count
//     return updated;
//   });
// });


//     // socket.on("ride_updated", (updatedRide) => {
//     //   console.log("Ride updated:", updatedRide);
//     //   setRides((prev) =>
//     //     prev.map((ride) =>
//     //       ride.id === updatedRide.id ? updatedRide : ride
//     //     )
//     //   );
//     // });
//     socket.on("ride_updated", (updatedRide) => {
//   console.log("Ride updated:", updatedRide);

//   setRides((prev) => {
//     const updated = prev.map((ride) =>
//       ride.id === updatedRide.id ? updatedRide : ride
//     );
//     updatePendingBadge(updated);
//     return updated;
//   });
// });


//     socket.on("ride_approved", (data) => {
//       console.log("Server acknowledged ride approval", data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleOpenDialog = (ride, action) => {
//     setSelectedRide(ride);
//     setDecision(action);
//     setSelectedDriver("");
//     setIsDialogOpen(true);
//   };

//   // const handleSubmitDecision = () => {
//   //   if (!selectedDriver) {
//   //     alert("Please select a driver.");
//   //     return;
//   //   }

//   //   if (!socketRef.current) {
//   //     console.error("Socket not connected!");
//   //     return;
//   //   }

//   //   socketRef.current.emit("ride_assign", {
//   //     rideId: selectedRide.id,
//   //     status: decision,
//   //     driverEmail: selectedDriver,
//   //   });
//   //   socketRef.current.emit("ride_reject", {
//   //     console.log(`Ride ${decision} this is rejected`);
//   //   });

//   //   console.log(
//   //     `Ride ${decision} for ${selectedDriver} (ride ID ${selectedRide.id}) sent to server`
//   //   );

//   //   setRides((prev) =>
//   //     prev.map((r) =>
//   //       r.id === selectedRide.id
//   //         ? { ...r, status: decision, driverEmail: selectedDriver }
//   //         : r
//   //     )
//   //   );

//   //   setIsDialogOpen(false);
//   //   setSelectedRide(null);
//   //   setDecision("");
//   // };

//   const handleSubmitDecision = () => {
//   if (!selectedDriver && decision === "approved") {
//     alert("Please select a driver.");
//     return;
//   }

//   if (!socketRef.current) {
//     console.error("Socket not connected!");
//     return;
//   }

//   if (decision === "approved") {
//     socketRef.current.emit("ride_assign", {
//       rideId: selectedRide.id,
//       status: "approved",
//       driverEmail: selectedDriver,
//     });
//   } else if (decision === "rejected") {
//     socketRef.current.emit("ride_rejected", {
//       rideId: selectedRide.id,
//       status: "rejected",
//     });
//   }

//   const updatePendingBadge = (rideList) => {
//   const pending = rideList.filter((ride) => ride.status === "inactive").length;
//   window.dispatchEvent(new CustomEvent("update_pending_count", {
//     detail: { pending }
//   }));
// };

//   console.log(
//     `Ride ${decision} for ${selectedDriver || "no driver"} (ride ID ${selectedRide.id}) sent to server`
//   );

//   // setRides((prev) =>
//   //   prev.map((r) =>
//   //     r.id === selectedRide.id
//   //       ? { ...r, status: decision, driverEmail: selectedDriver }
//   //       : r
//   //   )
//   // );

 
//   setIsDialogOpen(false);
//   setSelectedRide(null);
//   setDecision("");
// };

//   const columns = [
//     { name: "Id", selector: (row) => row.id },
//     { name: "Client Email", selector: (row) => row.userEmail },
//     { name: "Pickup", selector: (row) => row.from },
//     { name: "Drop", selector: (row) => row.to },
//     { name: "Time", selector: (row) => row.rideTime },
//     { name: "Status", selector: (row) => row.status },
//     { name: "Driver", selector: (row) => row.driverEmail || "-" },
//     {
//       name: "Action",
//       cell: (row) => {
//         if (row.status === "pending") {
//           return (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleOpenDialog(row, "approved")}
//                 className="bg-green-500 text-white px-2 py-1 rounded"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleOpenDialog(row, "rejected")}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Reject
//               </button>
//             </div>
//           );
//         } else {
//           return (
//             <span
//               className={`font-semibold ${
//                 row.status === "approved" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {row.status}
//             </span>
//           );
//         }
//       },
//     },
//   ];

//   return (
//     <div className="p-6 flex flex-col gap-2">
//       <div className="bg-white rounded-xl shadow p-4">
//         <div className="max-w-4xl flex">
//           <Link to="/superadmin">
//             <BackButton text="Back" />
//           </Link>
//         </div>
//       </div>
//       <div className="bg-white rounded-xl shadow p-4">
//         <h2 className="text-2xl mb-4 font-bold">Ride Requests</h2>
//         <DataTable
//           columns={columns}
//           data={rides}
//           pagination
//           highlightOnHover
//           responsive
//           keyField="id"
//         />
//         <Dialog
//           open={isDialogOpen}
//           onClose={() => setIsDialogOpen(false)}
//           className="fixed inset-0 z-50 flex items-center justify-center"
//         >
//           <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
//             <Dialog.Title className="text-lg font-bold mb-4">
//               Select Driver
//             </Dialog.Title>
//             <select
//               value={selectedDriver}
//               onChange={(e) => setSelectedDriver(e.target.value)}
//               className="border border-gray-300 p-2 w-full rounded"
//             >
//               <option value="">Select a driver</option>
//               {drivers.map((driver) => (
//                 <option key={driver.id} value={driver.email}>
//                   ({driver.email})
//                 </option>
//               ))}
//             </select>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setIsDialogOpen(false)}
//                 className="bg-gray-400 text-white px-3 py-1 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitDecision}
//                 className="bg-blue-600 text-white px-3 py-1 rounded"
//               >
//                 Confirm {decision}
//               </button>
//             </div>
//           </Dialog.Panel>
//         </Dialog>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState, useRef } from "react";
  // import DataTable from "react-data-table-component";
  // import { Dialog } from "@headlessui/react";
  // import { io } from "socket.io-client";
  // import { Link } from "react-router-dom";
  // import BackButton from "./BackButton";

  // export default function BookRide() {
  //   const [rides, setRides] = useState([]);
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);
  //   const [selectedRide, setSelectedRide] = useState(null);
  //   const [selectedDriver, setSelectedDriver] = useState("");
  //   const [decision, setDecision] = useState("");
  //   const [drivers, setDrivers] = useState([]);


  //   const VITE_API = import.meta.env.VITE_API;
  //   const socketRef = useRef(null);
  //   const SOCKET_URL = `${VITE_API}`;
  //   const hrId = "1234565432";

  //   useEffect(() => {
  //     const socket = io(SOCKET_URL);
  //     socketRef.current = socket;
  //     fetch(`${VITE_API}driver/status/inactive`)
  //   .then((res) => res.json())
  //   .then((data) => setDrivers(data))
  //   .catch((err) => console.error("Failed to fetch active drivers:", err));


  //     socket.on("connect", () => {
  //       console.log("Connected:", socket.id);
  //       socket.emit("register_hr", { hrId });
  //     });

  //     socket.on("disconnect", () => {
  //       console.log("Disconnected");
  //     });

  //     socket.on("ride_request_to_hr", (rideRequest) => {
  //       console.log("Ride request:", rideRequest);
  //       setRides((prev) => [
  //         ...prev,
  //         { ...rideRequest, status: rideRequest.status || "pending" }
  //       ]);
  //     });

  //     socket.on("ride_updated", (updatedRide) => {
  //       console.log("Ride updated:", updatedRide);
  //       setRides((prev) =>
  //         prev.map((ride) =>
  //           ride._id === updatedRide._id ? updatedRide : ride
  //         )
  //       );
  //     });

  //     // listen for ride-approved ack from server if you want
  //     socket.on("ride_approved", (data) => {
  //       console.log("Server acknowledged ride approval", data);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  //   const handleOpenDialog = (ride, action) => {
  //     setSelectedRide(ride);
  //     setDecision(action);
  //     setSelectedDriver("");
  //     setIsDialogOpen(true);
  //   };

  //   const handleSubmitDecision = () => {
  //     if (!selectedDriver) {
  //       alert("Please select a driver.");
  //       return;
  //     }
  //     if (!socketRef.current) {
  //       console.error("Socket not connected!");
  //       return;
  //     }

  //     socketRef.current.emit("ride_assign", {
  //       rideId: selectedRide._id,
  //       status: decision,
  //       driverEmail: selectedDriver,
  //     });

  //     console.log(
  //       `Ride ${decision} for ${selectedDriver} (ride ID ${selectedRide._id}) sent to server`
  //     );

  //     // optionally update UI immediately
  //     setRides((prev) =>
  //       prev.map((r) =>
  //         r._id === selectedRide._id
  //           ? { ...r, status: decision, driverEmail: selectedDriver }
  //           : r
  //       )
  //     );

  //     setIsDialogOpen(false);
  //     setSelectedRide(null);
  //     setDecision("");
  //   };

  //   const columns = [
  //     { name: "Id", selector: (row) => row._id },
  //     { name: "Client Email", selector: (row) => row.userEmail },
  //     { name: "Pickup", selector: (row) => row.from },
  //     { name: "Drop", selector: (row) => row.to },
  //     { name: "Time", selector: (row) => row.rideTime },
  //     { name: "Status", selector: (row) => row.status },
  //     { name: "Driver", selector: (row) => row.driverEmail || "-" },
  //     {
  //       name: "Action",
  //       cell: (row) => {
  //         if (row.status === "pending") {
  //           return (
  //             <div className="flex gap-2">
  //               <button
  //                 onClick={() => handleOpenDialog(row, "approved")}
  //                 className="bg-green-500 text-white px-2 py-1 rounded"
  //               >
  //                 Approve
  //               </button>
  //               <button
  //                 onClick={() => handleOpenDialog(row, "rejected")}
  //                 className="bg-red-500 text-white px-2 py-1 rounded"
  //               >
  //                 Reject
  //               </button>
  //             </div>
  //           );
  //         } else {
  //           return (
  //             <span
  //               className={`font-semibold ${
  //                 row.status === "approved" ? "text-green-600" : "text-red-600"
  //               }`}
  //             >
  //               {row.status}
  //             </span>
  //           );
  //         }
  //       },
  //     },
  //   ];

  //   return (
  //     <div className="p-6 flex flex-col gap-2">
  //       <div className="bg-white rounded-xl shadow p-4">
  //         <div className="max-w-4xl flex">
  //           <Link to="/superadmin">
  //             <BackButton text="Back" />
  //           </Link>
  //         </div>
  //       </div>
  //       <div className="bg-white rounded-xl shadow p-4">
  //         <h2 className="text-2xl mb-4 font-bold">Ride Requests</h2>
  //         <DataTable
  //           columns={columns}
  //           data={rides}
  //           pagination
  //           highlightOnHover
  //           responsive
  //         />
  //         <Dialog
  //           open={isDialogOpen}
  //           onClose={() => setIsDialogOpen(false)}
  //           className="fixed inset-0 z-50 flex items-center justify-center"
  //         >
  //           <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
  //             <Dialog.Title className="text-lg font-bold mb-4">
  //               Select Driver
  //             </Dialog.Title>
  //             <select
  //   value={selectedDriver}
  //   onChange={(e) => setSelectedDriver(e.target.value)}
  //   className="border border-gray-300 p-2 w-full rounded"
  // >
  //   <option value="">Select a driver</option>
  //   {drivers.map((driver) => (
  //     <option key={driver._id} value={driver.email}>
  //       {/* {driver.name}({driver.email}) */}
  //       ({driver.email})
  //     </option>
  //   ))}
  // </select>

  //             {/* <input
  //               type="email"
  //               value={selectedDriver}
  //               onChange={(e) => setSelectedDriver(e.target.value)}
  //               className="border border-gray-300 p-2 w-full rounded"
  //               placeholder="driver@example.com"
  //             /> */}   
  //             <div className="flex justify-end gap-2 mt-4">
  //               <button
  //                 onClick={() => setIsDialogOpen(false)}
  //                 className="bg-gray-400 text-white px-3 py-1 rounded"
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 onClick={handleSubmitDecision}
  //                 className="bg-blue-600 text-white px-3 py-1 rounded"
  //               >
  //                 Confirm {decision}
  //               </button>
  //             </div>
  //           </Dialog.Panel>
  //         </Dialog>
  //       </div>
  //     </div>
  //   );

  // }

