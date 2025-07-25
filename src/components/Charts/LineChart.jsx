import React from 'react'
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
    //   backgroundColor: "rgb(255, 99, 132)",
      backgroundColor: "#000",
      borderColor: "rgba(59, 130, 246, 0.5)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};
const LineChart = () => {
  return (
    <div>
            <Line data={data} />
    </div>
  )
}

export default LineChart
