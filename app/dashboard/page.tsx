"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Card from "../components/layout/Card";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardService from "../services/dashboardService";
import { PerformanceSample } from "../components/charts/TPSChart";
import { EpochInfo } from "../components/charts/EpochInfoChart";
import { MetricCard } from "../components/molecules/MetricCard";
import { formatNumber } from "../common/utils/numberFormatter";
import TotalSupplyIcon from "@/public/icons/supply.png";
import BlockHeightIcon from "@/public/icons/height.png";
import TransactionIcon from "@/public/icons/transaction.png";
import CirculatingIcon from "@/public/icons/circulating.png";
import { Button } from "../components/molecules/FormComponents";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TPSChart = dynamic(
  () => import("../components/charts/TPSChart").then((mod) => mod.TPSChart),
  {
    ssr: false,
  }
);
const TPSChartLoader = dynamic(
  () =>
    import("../components/charts/TPSChart").then((mod) => mod.TPSChartLoader),
  {
    ssr: false,
  }
);
const EpochInfoChart = dynamic(
  () =>
    import("../components/charts/EpochInfoChart").then(
      (mod) => mod.EpochInfoChart
    ),
  {
    ssr: false,
  }
);
const EpochInfoChartLoader = dynamic(
  () =>
    import("../components/charts/EpochInfoChart").then(
      (mod) => mod.EpochInfoChartLoader
    ),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  const [epochInfo, setEpochInfo] = useState<EpochInfo | null>(null);
  const [tpsData, setTpsData] = useState<PerformanceSample[]>([]);
  const [circulatingSupply, setCirculatingSupply] = useState<number | null>(
    null
  );
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [transactionCount, setTransactionCount] = useState<number | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);

  const router = useRouter();


  async function fetchData() {
    try {
      const epochInfoResponse = await DashboardService.fetchData(
        "getEpochInfo"
      );
      setEpochInfo({
        epoch: epochInfoResponse.epoch,
        slotsInEpoch: epochInfoResponse.slotsInEpoch,
        slotIndex: epochInfoResponse.slotIndex,
        slotsRemaining:
          epochInfoResponse.slotsInEpoch - epochInfoResponse.slotIndex,
      });

      const tpsResponse = await DashboardService.fetchData(
        "getRecentPerformanceSamples",
        [15]
      );
      setTpsData(tpsResponse);

      const supplyResponse = await DashboardService.fetchData("getSupply");
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
  
  const routeToToly = () => {
    router.push('/dashboard/toly');
  };

  return (
    <DashboardLayout path="Dashboard">
      <Card>
        <div className="between w-full py-3">
          <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
            Dashboard
          </h3>
          <Button
            link={routeToToly}
            classname="border-[#047481] dark:border-[#3db2be] border gap-2 center w-[250px] mr-4"
          >
            <Image src="/icons/sparkle.png" alt="sparkle" width={15} height={15}/>
            <p className="text-[#047481] dark:text-[#3db2be]">Ask Toly Anything</p>
          </Button>
        </div>
        <div className="px-6 pb-6 center flex-col bg-[#F9FAFB] dark:bg-[#111928]">
          <div className="w-full my-6 between">
            <MetricCard
              title="Circulating Supply"
              icon={CirculatingIcon}
              value={
                circulatingSupply !== null
                  ? formatNumber(circulatingSupply)
                  : null
              }
              unit="$SOL"
            />
            <MetricCard
              title="Total Supply"
              icon={TotalSupplyIcon}
              value={totalSupply !== null ? formatNumber(totalSupply) : null}
              unit="$SOL"
            />
            <MetricCard
              title="Transaction Count"
              icon={TransactionIcon}
              value={
                transactionCount !== null
                  ? formatNumber(transactionCount)
                  : null
              }
            />
            <MetricCard
              title="Block Height"
              icon={BlockHeightIcon}
              value={blockHeight !== null ? formatNumber(blockHeight) : null}
            />
          </div>
          <div className="w-full bg-whiteBg mb-6 dark:bg-darkBg">
            {tpsData.length > 0 ? (
              <TPSChart data={tpsData} />
            ) : (
              <TPSChartLoader />
            )}
          </div>
          <div className="w-full bg-whiteBg dark:bg-darkBg">
            {epochInfo ? (
              <EpochInfoChart data={epochInfo} />
            ) : (
              <EpochInfoChartLoader />
            )}
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
