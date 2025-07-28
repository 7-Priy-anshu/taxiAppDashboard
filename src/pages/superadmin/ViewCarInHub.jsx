import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewCarsInHub() {
  const { hubId } = useParams();
  const [hub, setHub] = useState(null);
  const [assignedCars, setAssignedCars] = useState([]);

  useEffect(() => {
    // Dummy hub data
    setHub({
      _id: hubId,
      name: "Hub A",
      location: "Delhi",
    });

    // Dummy assigned cars
    setAssignedCars([
      { _id: "1", carNumber: "DL-01-1234", carModel: "Maruti", carName: "Alto" },
      { _id: "2", carNumber: "DL-02-5678", carModel: "Hyundai", carName: "i10" },
    ]);
  }, [hubId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Cars in {hub?.name}</h2>
      <p className="mb-4">Location: {hub?.location}</p>

      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Car Number</th>
            <th className="border px-4 py-2">Car Name</th>
            <th className="border px-4 py-2">Car Model</th>
          </tr>
        </thead>
        <tbody>
          {assignedCars.map((car) => (
            <tr key={car._id}>
              <td className="border px-4 py-2">{car.carNumber}</td>
              <td className="border px-4 py-2">{car.carName}</td>
              <td className="border px-4 py-2">{car.carModel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import BackButton from "../../components/BackButton";

// export default function ViewCarsInHub() {
//   const { hubId } = useParams();
//   const [cars, setCars] = useState([]);
//   const [hub, setHub] = useState(null);
//   const VITE_API = import.meta.env.VITE_API;

//   useEffect(() => {
//     axios.get(`${VITE_API}hub/${hubId}`)
//       .then(res => setHub(res.data))
//       .catch(err => console.error("Hub load error", err));

//     axios.get(`${VITE_API}hub/${hubId}/cars`)
//       .then(res => setCars(res.data))
//       .catch(err => console.error("Car fetch error", err));
//   }, [hubId]);

//   const columns = [
//     { name: "Car Name", selector: row => row.carName },
//     { name: "Car Model", selector: row => row.carModel },
//     { name: "Car Number", selector: row => row.carNumber },
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <Link to="/superadmin/viewHub">
//           <BackButton text="Back" />
//         </Link>
//         <h2 className="text-2xl font-bold">Cars in {hub?.hubName}</h2>
//       </div>
//       <DataTable
//         columns={columns}
//         data={cars}
//         pagination
//         noDataComponent="No cars assigned to this hub."
//       />
//     </div>
//   );
// }
