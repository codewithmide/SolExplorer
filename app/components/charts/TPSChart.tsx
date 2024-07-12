import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export interface PerformanceSample {
  numTransactions: number;
  numNonVoteTransactions: number;
  samplePeriodSecs: number;
  slot: number;
}

interface TPSChartProps {
  data: PerformanceSample[];
}

export const TPSChart: React.FC<TPSChartProps> = ({ data }) => {
  const tpsData = data.map((sample) => ({
    numTransactions: Math.round(sample.numTransactions),
    numNonVoteTransactions: Math.round(sample.numNonVoteTransactions),
  }));

  const ratios = data.map((sample) => (
    (sample.numNonVoteTransactions / sample.numTransactions).toFixed(2)
  ));

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    xaxis: {
      categories: ratios,
      labels: {
        style: {
          colors: "var(--text-color)",
        },
        formatter: function (val: string) {
          return `${val}`;
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
        columnWidth: "70%",
        borderRadius: 6,
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
        formatter: function (val, { seriesIndex }) {
          return seriesIndex === 0
            ? `Non-Vote Transactions: ${val}`
            : `Transactions: ${val}`;
        },
        title: {
          formatter: () => "",
        },
      },
    },
    colors: ["#FDBA8C", "#16BDCA"],
    legend: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: "Non-Vote TPS",
      data: tpsData.map((d) => d.numNonVoteTransactions),
    },
    {
      name: "True TPS",
      data: tpsData.map((d) => d.numTransactions),
    },
  ];

  return (
    <div id="chart" className="text-white-text border border-[#E5E7EB] rounded-lg dark:border-[#374151] p-8 dark:text-dark-text">
      <div className="flex border-b border-[#E5E7EB] dark:border-[#374151]  pb-6 mb-6 items-start gap-2">
        <h2 className="font-semibold text-xl">TPS (Transactions Per Second)</h2>
      </div>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={400} />
      <div className="flex justify-center gap-4 mt-2 pt-5 border-t border-[#E5E7EB] dark:border-[#374151]">
        <div className="flex items-center gap-2">
          <div className="bg-[#FDBA8C] w-3 h-3 rounded-full"></div>
          <p className="text-sm">Non-Vote TPS</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#16BDCA] w-3 h-3 rounded-full"></div>
          <p className="text-sm">True TPS</p>
        </div>
      </div>
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
