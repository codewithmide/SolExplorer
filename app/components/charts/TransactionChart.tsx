import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export interface TransactionData {
  blockTime: number;
  confirmationStatus: number;
}

interface TransactionChartProps {
  data: TransactionData[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: data.map((tx) => new Date(tx.blockTime * 1000).toLocaleString())
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Recent Transactions',
      align: 'left'
    },
  };

  const chartSeries = [{
    name: 'Transactions',
    data: data.map((tx) => tx.confirmationStatus)
  }];

  return (
    <div id="chart">
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default TransactionChart;
