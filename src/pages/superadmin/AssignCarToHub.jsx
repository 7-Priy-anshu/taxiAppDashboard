import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AssignCarToHub() {
  const { hubId } = useParams();
  const navigate = useNavigate();

  const [hub, setHub] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);

  useEffect(() => {
    // Dummy hub data
    setHub({
      _id: hubId,
      name: "Hub A",
      location: "Delhi",
      capacity: 10,
    });

    // Dummy list of unassigned cars
    setCars([
      { _id: "1", carNumber: "DL-01-1234", carModel: "Maruti", carName: "Alto" },
      { _id: "2", carNumber: "DL-02-5678", carModel: "Hyundai", carName: "i10" },
      { _id: "3", carNumber: "DL-03-9999", carModel: "Tata", carName: "Nexon" },
    ]);
  }, [hubId]);

  const handleAssign = () => {
    console.log("Assigning cars:", selectedCars, "to hub:", hubId);
    alert("Cars assigned successfully!");
    navigate("/superadmin/hubs/view");
  };

  const handleCheckbox = (carId) => {
    setSelectedCars((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Assign Cars to {hub?.name}</h2>
      <p className="mb-4">Location: {hub?.location} | Capacity: {hub?.capacity}</p>

      <div className="mb-6 border p-4 rounded bg-white">
        {cars.map((car) => (
          <div key={car._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              onChange={() => handleCheckbox(car._id)}
              checked={selectedCars.includes(car._id)}
              className="mr-2"
            />
            <span>
              {car.carNumber} - {car.carName} ({car.carModel})
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Assign Selected Cars
      </button>
    </div>
  );
}
