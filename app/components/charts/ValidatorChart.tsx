import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ValidatorData {
  nodePubkey: string;
  activatedStake: number;
}

interface ValidatorChartProps {
  data: {
    current: ValidatorData[];
  };
}

const ValidatorChart: React.FC<ValidatorChartProps> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: data.current.map((val) => val.nodePubkey)
    },
    title: {
      text: 'Validator Performance',
      align: 'left'
    },
  };

  const chartSeries = [{
    name: 'Active Stake',
    data: data.current.map((val) => val.activatedStake)
  }];

  return (
    <div id="chart">
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default ValidatorChart;
