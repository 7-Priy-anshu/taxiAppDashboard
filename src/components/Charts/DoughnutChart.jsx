import React from "react";
import Chart from "react-apexcharts";

export default function DoughnutChart() {
  // Chart size based on screen using media query match
  const isMobile = window.innerWidth <= 640;
  const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;

  const chartSize = isMobile ? 180 : isTablet ? 200 : 250;

  const options = {
    chart: {
      type: "donut",
      height: chartSize,
      width: chartSize,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "76%",
        },
      },
    },
    series: [40, 25, 30, 5],
    labels: ["Active Driver", "Deactivate Driver", "Working Driver", "On Live Driver"],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 5, colors: ["#fff"] },
    grid: {
      padding: { top: -12, bottom: -11, left: -12, right: -12 },
    },
    colors: ["#3b82f6", "#ef4444", "#f59e0b", "#22d3ee"],
    tooltip: {
      y: { formatter: (value) => `${value}%` },
    },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Chart
        options={options}
        series={options.series}
        type="donut"
        height={chartSize}
        width={chartSize}
      />

      <div className="flex justify-center flex-wrap gap-3 mt-4 text-[13px] text-gray-700 text-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-blue-600"></span> Active Driver
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-red-500"></span> Deactivate Driver
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-amber-400"></span> Working Driver
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-cyan-400"></span> On Live Driver
        </div>
      </div>
    </div>
  );
}