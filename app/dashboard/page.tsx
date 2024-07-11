"use client";

import { useEffect, useState } from "react";
import Card from "../components/layout/Card";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardService from "../services/dashboardService";
import { TPSChart, TPSChartLoader } from "../components/charts/TPSChart";
import { PerformanceSample } from "../components/charts/TPSChart";
import { EpochInfoChart, EpochInfoChartLoader } from "../components/charts/EpochInfoChart";
import { EpochInfo } from "../components/charts/EpochInfoChart";
import { FaCircleNotch } from "react-icons/fa6";


export default function Dashboard() {
  const [epochInfo, setEpochInfo] = useState<EpochInfo | null>(null);
  const [tpsData, setTpsData] = useState<PerformanceSample[]>([]);
  const [circulatingSupply, setCirculatingSupply] = useState<number | null>(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [transactionCount, setTransactionCount] = useState<number | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const epochInfoResponse = await DashboardService.fetchEpochInfo();
        setEpochInfo({
          epoch: epochInfoResponse.epoch,
          slotsInEpoch: epochInfoResponse.slotsInEpoch,
          slotIndex: epochInfoResponse.slotIndex,
          slotsRemaining: epochInfoResponse.slotsInEpoch - epochInfoResponse.slotIndex,
        });

        const tpsResponse = await DashboardService.fetchData("getRecentPerformanceSamples", [30]);
        setTpsData(tpsResponse);

        const supplyResponse = await DashboardService.fetchCirculatingSupply();
        setCirculatingSupply(supplyResponse.value.circulating / 1e9);
        setTotalSupply(supplyResponse.value.total / 1e9);

        const transactionCountResponse = await DashboardService.fetchData("getTransactionCount");
        setTransactionCount(transactionCountResponse);

        const blockHeightResponse = await DashboardService.fetchData("getBlockHeight");
        setBlockHeight(blockHeightResponse);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardLayout path="Dashboard">
      <Card>
        <div className="w-full my-6 between">
          <MetricCard
            title="Circulating Supply"
            value={circulatingSupply}
            unit="$SOL"
          />
          <MetricCard
            title="Total Supply"
            value={totalSupply}
            unit="$SOL"
          />
          <MetricCard
            title="Transaction Count"
            value={transactionCount}
            unit=""
          />
          <MetricCard
            title="Block Height"
            value={blockHeight}
            unit=""
          />
        </div>
        {tpsData.length > 0 ? <TPSChart data={tpsData} /> : <TPSChartLoader />}
        <div></div>
        {epochInfo ? <EpochInfoChart data={epochInfo} /> : <EpochInfoChartLoader />}
      </Card>
    </DashboardLayout>
  );
}

const MetricCard = ({ title, value, unit }: { title: string, value: number | null, unit: string }) => (
  <div className="flex center w-full flex-col px-6 py-10 rounded-lg card-shadow">
    {value !== null ? (
      <div className="flex-col center gap-4 p-3">
        <FaCircleNotch size={42} />
        <div className="center flex-col">
          <p>{title}</p>
          <h3 className="font-semibold text-xl">
            {value.toLocaleString()} {unit}
          </h3>
        </div>
      </div>
    ) : (
      <LoadingCard />
    )}
  </div>
);

const LoadingCard = () => (
  <div className="w-[25%] rounded-lg center" style={{ minHeight: "8rem" }}>
    <div className="animate-pulse w-full gap-6 flex flex-col center">
      <div className="mt-2 w-20 h-12 bg-gray-200"></div>
      <div className="bg-gray-200 h-6 w-[80%]"></div>
    </div>
  </div>
);
