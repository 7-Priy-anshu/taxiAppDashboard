import React from 'react';
import Chart from 'react-apexcharts';

const MultipleBarChart = () => {
  const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const series = [
    {
      name: 'Sales',
      data: [2000, 2500, 3000, 4000, 3500, 2700, 3200],
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#2563eb'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: daysShort,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        rotate: 0,
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        align: 'left',
        style: {
          colors: '#9ca3af',
          fontSize: '13px',
          fontFamily: 'Inter, ui-sans-serif',
          fontWeight: 500,
        },
        formatter: (val) => (val >= 1000 ? `${val / 1000}k` : val),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val >= 1000 ? `${val / 1000}k` : val}`,
      },
    },
    grid: {
      borderColor: '#e5e7eb',
    },
    responsive: [
      {
        // Tablet
        breakpoint: 1024,
        options: {
          chart: {
            height: 280,
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              borderRadius: 5,
            },
          },
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
        // Mobile
        breakpoint: 640,
        options: {
          chart: {
            height: 260,
          },
          plotOptions: {
            bar: {
              columnWidth: '50%',
              borderRadius: 4,
            },
          },
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
  };

  return (
    <div className="w-full overflow-x-auto">
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default MultipleBarChart;