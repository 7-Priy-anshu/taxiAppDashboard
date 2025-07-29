import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Dialog } from "@headlessui/react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
// import BackButton from "./BackButton";

export default function BookRide() {
  const {token} = useAuth();
  const [rides, setRides] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [decision, setDecision] = useState("");
  const [drivers, setDrivers] = useState([]);

  const VITE_API = import.meta.env.VITE_API;
  const SOCKET_URL = `${VITE_API}`;
  const socketRef = useRef(null);
  const hrId = "1234565432";

  // ✅ Update pending badge count globally
  const updatePendingBadge = (rideList) => {
    const pending = rideList.filter((ride) => ride.status === "inactive").length;
    window.dispatchEvent(
      new CustomEvent("update_pending_count", { detail: { pending } })
    );
  };

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    // Fetch inactive drivers
    // fetch(`${VITE_API}view/driver`)
    //   .then((res) => res.json())
    //   .then((data) => setDrivers(data))
    //   .catch((err) => console.error("Failed to fetch inactive drivers:", err));
    fetch(`${VITE_API}view/driver`,{
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`,
      }
    })
  .then((res) => res.json())
  .then((data) => {
    console.log("Driver data:", data); // 👈 check actual structure
    setDrivers(Array.isArray(data) ? data : data.drivers || []);
  })
  .catch((err) => console.error("Failed to fetch drivers:", err));


    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("register_hr", { hrId });
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    // ✅ New ride request
    socket.on("ride_request_to_hr", (rideRequest) => {
      console.log("Ride request:", rideRequest);
      setRides((prev) => {
        const alreadyExists = prev.some((r) => r.id === rideRequest._id);
        const updated = alreadyExists
          ? prev
          : [...prev, { ...rideRequest,id: rideRequest._id, status: rideRequest.status || "inactive" }];
        updatePendingBadge(updated);
        return updated;
      });
    });

    // ✅ Ride updated
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

    return () => {
      socket.disconnect();
    };
  }, [SOCKET_URL]);

  const handleOpenDialog = (ride, action) => {
    setSelectedRide(ride);
    setDecision(action);
    setSelectedDriver("");
    setIsDialogOpen(true);
  };

  const handleSubmitDecision = () => {
    if (!selectedRide || !socketRef.current) return;

    if (decision === "approved") {
      if (!selectedDriver) {
        alert("Please select a driver.");
        return;
      }

socketRef.current.emit("ride_assign", {
  id: selectedRide._id,
  rideStatus: "Approved",
  driverEmail: selectedDriver,
  pickupAddress: selectedRide.pickup?.address,
  pickupLatitude: selectedRide.pickup?.location?.coordinates?.[1],
  pickupLongitude: selectedRide.pickup?.location?.coordinates?.[0],
  destination: selectedRide.destination?.address,
  destinationLatitude: selectedRide.destination?.location?.coordinates?.[1],
  destinationLongitude: selectedRide.destination?.location?.coordinates?.[0],
  email: selectedRide.email,
  rideTime: selectedRide.rideTime,
  rideDateTime: selectedRide.rideDateTime,
});

    } else if (decision === "rejected") {
      socketRef.current.emit("ride_rejected", {
        id: selectedRide.id,
        status: "rejected",
      });
    }

    console.log(
      `Ride ${decision} for ${selectedDriver || "no driver"} (ride ID ${
        selectedRide._id
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
    { name: "Id", selector: (row) => row._id },
    { name: "Client Email", selector: (row) => row.email },
{ name: "Pickup", selector: (row) => row.pickup?.address || "-" },
{ name: "Pickup Lat", selector: (row) => row.pickup?.location?.coordinates?.[1] || "-" },
{ name: "Pickup Lng", selector: (row) => row.pickup?.location?.coordinates?.[0] || "-" },
{ name: "Drop", selector: (row) => row.destination?.address || "-" },
{ name: "Drop Lat", selector: (row) => row.destination?.location?.coordinates?.[1] || "-" },
{ name: "Drop Lng", selector: (row) => row.destination?.location?.coordinates?.[0] || "-" },
    { name: "Time", selector: (row) => row.rideTime },
    { name: "Status", selector: (row) => row.status },
    { name: "Ride TimeAndDate", selector: (row) => row.rideDateTime},
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
        />
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-4">
              {decision === "approved" ? "Select Driver" : "Confirm Rejection"}
            </Dialog.Title>
            {decision === "approved" ? (
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
              >
                <option value="">Select a driver</option>
                {drivers.map((driver) => (
                  <option key={driver._id} value={driver.email}>
                    {driver.name ? `${driver.name} (${driver.email})` : driver.email}
                  </option>
                ))}
              </select>
            ) : (
              <p>Are you sure you want to reject this ride?</p>
            )}
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
//-----------------------------------------------------------------Before the cost adding ---------------------------------------------------------------

// import React, { useEffect, useState, useRef } from "react";
// import DataTable from "react-data-table-component";
// import { Dialog } from "@headlessui/react";
// import { io } from "socket.io-client";
// import { Link } from "react-router-dom";
// import BackButton from "../components/BackButton";
// import globalTableStyles from '../styles/globalTableStyles';


// export default function BookRide() {
//   const [rides, setRides] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [selectedDriver, setSelectedDriver] = useState("");
//   const [decision, setDecision] = useState("");
//   const [drivers, setDrivers] = useState([]);
  
//   //For Viewing Ride Details 

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

//     // socket.on("ride_approved", (data) => {
//     //   console.log("Server acknowledged ride approval", data);
//     // });

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
//       name: "Action",
//       cell: (row) => {
//         if (row.status === "inactive" || row.status === "pending") {
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

