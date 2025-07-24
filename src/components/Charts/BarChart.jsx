import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarChart = () => {

const labels = ["Swift","Toyata", "Atios", "Waganar", "Alto", "Beat"];

const data = {
    labels : labels,
    datasets:[{
        label:"Cars",
        backgroundColor:"rgba(59, 130, 246, 0.5)",
        borderColor:"rgba(59, 130, 246, 0.5)",
        data:[5,1,8,4,2,6],
    }, 
],
};
  return (
    <div>
      <Bar data={data}/>
    </div>
  );
};

export default BarChart
