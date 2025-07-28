import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const SingleBarChart = () => {
  const [chartOptions] = useState({
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '24px',
        borderRadius: 4,
      },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 12,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Hyundai', 'Bike', 'Honda', 'Renault', 'Toyota', 'Kia'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: { show: false },
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
        },
        offsetX: -2,
      },
    },
    yaxis: {
      labels: {
        align: 'left',
        minWidth: 0,
        maxWidth: 140,
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
        },
        formatter: (value) =>
          value >= 1000 ? `${value / 1000}k` : value,
      },
    },
    tooltip: {
      y: {
        formatter: (value) =>
          `$${value >= 1000 ? `${value / 1000}k` : value}`,
      },
    },
    responsive: [
      {
        breakpoint: 1024, // Tablet
        options: {
          plotOptions: { bar: { columnWidth: '20px' } },
          stroke: { width: 10 },
          xaxis: {
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
        },
      },
      {
        breakpoint: 640, // Mobile
        options: {
          plotOptions: { bar: { columnWidth: '18px' } },
          stroke: { width: 8 },
          xaxis: {
            labels: {
              style: {
                fontSize: '10px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '10px',
              },
            },
          },
        },
      },
    ],
  });

  const [chartSeries] = useState([
    {
      name: 'Vehicle Sales',
      data: [23000, 44000, 55000, 61000, 58000, 78000],
    },
  ]);

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 max-w-5xl mx-auto">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default SingleBarChart;