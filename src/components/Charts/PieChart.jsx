import React from 'react'
import {Pie} from "react-chartjs-2"
const PieChart = () => {
  const labels = ["Deactive Drivers","Active Driver", "On-Leave Driver", "Working Driver" ];
  const backgroundColors = [
    "#1f2937", // gray-800
    "#3b82f6", // blue-500
    "#6b7280", // gray-500
    "#0ea5e9", // sky-500
  ];

//   const borderColors = [
//     "#111827", // gray-900
//     "#2563eb", // blue-600
//     "#4b5563", // gray-600
//     "#0284c7", // sky-600
//   ];

  const data = {
     labels : labels,
     datasets:[{
        label: "Driver Status",
        // backgroundColor: "rgb(255, 99, 132)",
        backgroundColor:backgroundColors,
        // borderColor:  borderColors,
        data: [10, 20, 30, 45],
  }]
  }
  return (
    <div>
      <Pie data={data}/>
    </div>
  )
}

export default PieChart
