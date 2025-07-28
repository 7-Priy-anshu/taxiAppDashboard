import React from "react";
import Chart from "react-apexcharts";

const BubbleChart = () => {
  const options = {
    chart: {
      type: "pie",
      zoom: { enabled: false },
    },
    labels: ["Accepted", "Rejected", "Customer Cancelled"],
    dataLabels: {
      style: {
        fontSize: "15px",
        fontFamily: "Inter, ui-sans-serif",
        fontWeight: 400,
        colors: ["#fff", "#fff", "#1f2937"],
      },
      dropShadow: { enabled: false },
      formatter: (value) => `${value.toFixed(1)} %`,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -15,
        },
      },
    },
    legend: { show: false },
    stroke: { width: 4, colors: ["#ffffff"] },
    grid: {
      padding: { top: -10, bottom: -14, left: -9, right: -9 },
    },
    tooltip: { enabled: false },
    states: {
      hover: {
        filter: { type: "none" },
      },
    },
    colors: ["#3b82f6", "#22d3ee", "#e5e7eb"],
  };

  const series = [70, 18, 12];

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col items-center">
        {/* Chart Container */}
        <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] aspect-square">
          <Chart options={options} series={series} type="pie" width="100%" height="100%" />
        </div>

        {/* Legend */}
       {/* Legend Indicator */}
<div className="flex flex-row flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 mt-4">
  <div className="inline-flex items-center">
    <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
    <span className="text-[13px] text-gray-600 dark:text-neutral-400">
      Driver Accepted
    </span>
  </div>
  <div className="inline-flex items-center">
    <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
    <span className="text-[13px] text-gray-600 dark:text-neutral-400">
      Rejected
    </span>
  </div>
  <div className="inline-flex items-center">
    <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2 dark:bg-neutral-700"></span>
    <span className="text-[13px] text-gray-600 dark:text-neutral-400">
      Customer Cancelled
    </span>
  </div>
</div>

      </div>
    </div>
  );
};

export default BubbleChart;