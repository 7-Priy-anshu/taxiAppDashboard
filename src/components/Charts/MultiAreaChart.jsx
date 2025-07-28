import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const MultiAreaChart = () => {
  const [series] = useState([
    {
      name: '2023',
      data: [18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000, 60000, 70000],
    },
    {
      name: '2022',
      data: [27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000, 42000, 50000],
    },
  ]);

  const [options] = useState({
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    grid: {
      strokeDashArray: 2,
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8,
      },
    },
    xaxis: {
      type: 'category',
      categories: [
        ' Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun',
        ' Jul', ' Aug', ' Sep', ' Oct', ' Nov', ' Dec',
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      min: 0,
      max: 100000,
      labels: {
        align: 'left',
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 400,
        },
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
    tooltip: {
      x: {
        format: 'MMMM yyyy',
      },
      y: {
        formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}`,
      },
    },
    colors: ['#2563eb', '#9333ea'],
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { height: 300 },
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
        breakpoint: 768,
        options: {
          chart: { height: 260 },
          xaxis: {
            labels: {
              style: {
                fontSize: '11px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '11px',
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: { height: 230 },
          xaxis: {
            labels: {
              rotate: -45,
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

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
      <Chart
        options={options}
        series={series}
        type="area"
        height={options.chart.height}
      />
    </div>
  );
};

export default MultiAreaChart;