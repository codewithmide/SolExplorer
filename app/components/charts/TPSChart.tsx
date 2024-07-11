import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export interface PerformanceSample {
  numTransactions: number;
  samplePeriodSecs: number;
  slot: number;
}

interface TPSChartProps {
  data: PerformanceSample[];
}

export const TPSChart: React.FC<TPSChartProps> = ({ data }) => {
  const tpsData = data.map((sample) => ({
    tps: Math.round(sample.numTransactions),
  }));

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
        style: {
          colors: "var(--text-color)",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 10000,
              color: "#04D192",
            },
          ],
        },
      },
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
          return `TPS: ${val}`;
        },
        title: {
          formatter: () => "",
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "TPS",
      data: tpsData.map((d) => d.tps),
    },
  ];

  return (
    <div id="chart" className="text-white-text dark:text-dark-text">
      <h2 className="font-semibold">TPS (Transactions Per Second)</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export const TPSChartLoader = () => {
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
        <div className="bg-gray-200 h-[80%] w-[27px] animate-pulse"></div>
        <div className="bg-gray-200 h-[60%] w-[27px] animate-pulse"></div>
        <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
        <div className="bg-gray-200 h-[40%] w-[27px] animate-pulse"></div>
        <div className="bg-gray-200 h-[50%] w-[27px] animate-pulse"></div>
      </div>
  );
};
