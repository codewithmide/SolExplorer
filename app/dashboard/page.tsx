"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import Card from "../components/layout/Card";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardService from "../services/dashboardService";
import { PerformanceSample } from "../components/charts/TPSChart";
import { EpochInfo } from "../components/charts/EpochInfoChart";
import { MetricCard } from "../components/molecules/MetricCard";

const TPSChart = dynamic(() => import("../components/charts/TPSChart").then((mod) => mod.TPSChart), {
  ssr: false,
});
const TPSChartLoader = dynamic(() => import("../components/charts/TPSChart").then((mod) => mod.TPSChartLoader), {
  ssr: false,
});
const EpochInfoChart = dynamic(() => import("../components/charts/EpochInfoChart").then((mod) => mod.EpochInfoChart), {
  ssr: false,
});
const EpochInfoChartLoader = dynamic(() => import("../components/charts/EpochInfoChart").then((mod) => mod.EpochInfoChartLoader), {
  ssr: false,
});


export default function Dashboard() {
  const [epochInfo, setEpochInfo] = useState<EpochInfo | null>(null);
  const [tpsData, setTpsData] = useState<PerformanceSample[]>([]);
  const [circulatingSupply, setCirculatingSupply] = useState<number | null>(
    null
  );
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [transactionCount, setTransactionCount] = useState<number | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  async function fetchData() {
    try {
      const epochInfoResponse = await DashboardService.fetchEpochInfo();
      setEpochInfo({
        epoch: epochInfoResponse.epoch,
        slotsInEpoch: epochInfoResponse.slotsInEpoch,
        slotIndex: epochInfoResponse.slotIndex,
        slotsRemaining:
          epochInfoResponse.slotsInEpoch - epochInfoResponse.slotIndex,
      });

      const tpsResponse = await DashboardService.fetchData(
        "getRecentPerformanceSamples",
        [30]
      );
      setTpsData(tpsResponse);

      const supplyResponse = await DashboardService.fetchCirculatingSupply();
      setCirculatingSupply(supplyResponse.value.circulating / 1e9);
      setTotalSupply(supplyResponse.value.total / 1e9);

      const transactionCountResponse = await DashboardService.fetchData(
        "getTransactionCount"
      );
      setTransactionCount(transactionCountResponse);

      const blockHeightResponse = await DashboardService.fetchData(
        "getBlockHeight"
      );
      setBlockHeight(blockHeightResponse);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  useEffect(() => {
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
          <MetricCard title="Total Supply" value={totalSupply} unit="$SOL" />
          <MetricCard
            title="Transaction Count"
            value={transactionCount}
            unit=""
          />
          <MetricCard title="Block Height" value={blockHeight} unit="" />
        </div>
        <div>
          {tpsData.length > 0 ? (
            <TPSChart data={tpsData} />
          ) : (
            <TPSChartLoader />
          )}
        </div>
        {epochInfo ? (
          <EpochInfoChart data={epochInfo} />
        ) : (
          <EpochInfoChartLoader />
        )}
      </Card>
    </DashboardLayout>
  );
}
