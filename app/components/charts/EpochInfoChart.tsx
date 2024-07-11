import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { IoMdInformationCircle } from "react-icons/io";

export interface EpochInfo {
  epoch: number;
  slotsInEpoch: number;
  slotIndex: number;
  slotsRemaining: number;
}

interface EpochInfoChartProps {
  data: EpochInfo;
}

export const EpochInfoChart: React.FC<EpochInfoChartProps> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Slots in Epoch", "Slots Completed", "Slots Remaining"],
      labels: {
        style: {
          colors: "var(--text-color)",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "var(--text-color)",
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return `${val}`;
        },
        title: {
          formatter: () => "",
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };

  const chartSeries = [
    {
      name: "Epoch Info",
      data: [data.slotsInEpoch, data.slotIndex, data.slotsRemaining],
    },
  ];

  return (
    <div id="chart" className="text-white-text dark:text-dark-text">
      <div className="flex items-start gap-2">
        <h2 className="font-semibold">Current Epoch Info</h2>
        <div className="tooltip">
          <IoMdInformationCircle />
          <span className="tooltiptext">
            Epochs help organize the validation process and allow for the
            regular reconfiguration of the network, including the rotation of
            validators and the redistribution of rewards.
          </span>
        </div>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={350}
      />
    </div>
  );
};
export const EpochInfoChartLoader = () => {
  return (
    <div className="w-full h-[350px] flex items-end justify-between px-5">
      <div className="bg-gray-200 h-[80%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[60%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[40%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[80%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[60%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[40%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[80%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[60%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[40%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[80%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[60%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[40%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[80%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[60%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[40%] w-[27px] animate-pulse"></div>
      <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
    </div>
  );
};
