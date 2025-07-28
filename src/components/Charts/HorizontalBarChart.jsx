import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const HorizontalBarChart = () => {
  const [chartData] = useState({
    series: [{
      name: 'Sales',
      data: [23000, 44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000, 34000, 78000]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '45%',
          borderRadius: 4,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        labels: {
          style: {
            colors: '#4B5563',
            fontSize: '13px',
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#4B5563',
            fontSize: '13px',
          }
        }
      },
      grid: {
        borderColor: '#E5E7EB'
      },
      tooltip: {
        y: {
          formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}`
        }
      },
      colors: ['#2563eb'],
    }
  });

  return (
    <div className="w-full">
      <ReactApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="bar" 
        height={300} 
        width={700}
      />
    </div>
  );
};

export default HorizontalBarChart;



// import React from "react";
// import Chart from "react-apexcharts";

// const AreaChartCompare = () => {
//   const series = [
//     {
//       name: "2023",
//       data: [18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000, 60000, 70000],
//     },
//     {
//       name: "2022",
//       data: [27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000, 42000, 50000],
//     },
//   ];

//   const options = {
//     chart: {
//       type: "area",
//       height: 300,
//       zoom: { enabled: false },
//       toolbar: { show: false },
//     },
//     dataLabels: { enabled: false },
//     stroke: {
//       curve: "straight",
//       width: 2,
//     },
//     grid: {
//       strokeDashArray: 2,
//       borderColor: "#E5E7EB",
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shadeIntensity: 0.1,
//         opacityFrom: 0.5,
//         opacityTo: 0,
//         stops: [50, 100],
//       },
//     },
//     colors: ["#2563eb", "#9333ea"],
//     xaxis: {
//       categories: [
//         "15 January", "15 February", "15 March", "15 April", "15 May", "15 June",
//         "15 July", "15 August", "15 September", "15 October", "15 November", "15 December"
//       ],
//       labels: {
//         style: {
//           colors: "#9ca3af",
//           fontSize: "13px",
//           fontFamily: "Inter, ui-sans-serif",
//           fontWeight: 400,
//         },
//         formatter: (val) => val.split(" ")[1].slice(0, 3),
//       },
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     yaxis: {
//       labels: {
//         style: {
//           colors: "#9ca3af",
//           fontSize: "13px",
//           fontFamily: "Inter, ui-sans-serif",
//           fontWeight: 400,
//         },
//         formatter: (val) => (val >= 1000 ? `${val / 1000}k` : val),
//       },
//     },
//     tooltip: {
//       y: {
//         formatter: (val) => `$${val >= 1000 ? `${val / 1000}k` : val}`,
//       },
//     },
//     legend: { show: false },
//     responsive: [
//       {
//         breakpoint: 768,
//         options: {
//           xaxis: {
//             labels: { fontSize: "11px" },
//           },
//           yaxis: {
//             labels: { fontSize: "11px" },
//           },
//         },
//       },
//     ],
//   };

//   return (
//     <div className="w-full flex justify-center items-center p-4">
//       <div className="w-full max-w-md rounded-xl bg-gradient-to-br from-white via-slate-200 to-white shadow-lg p-5">
//         <Chart options={options} series={series} type="area" height={300} />
//       </div>
//     </div>
//   );
// };

// export default AreaChartCompare;