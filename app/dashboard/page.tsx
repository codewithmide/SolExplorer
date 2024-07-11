"use client";

import { useEffect, useState } from "react";
import Card from "../components/layout/Card";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardService from "../services/dashboardService";
import { TPSChart, TPSChartLoader } from "../components/charts/TPSChart";
import { PerformanceSample } from "../components/charts/TPSChart";
import { TransactionData, ValidatorData } from "../common/types/dashboardTypes";


export default function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [blockInfo, setBlockInfo] = useState(null);
  const [validatorPerformance, setValidatorPerformance] = useState<{
    current: ValidatorData[];
  }>({ current: [] });
  const [stakingInfo, setStakingInfo] = useState(null);
  const [tpsData, setTpsData] = useState<PerformanceSample[]>([]);
  // const [pingData, setPingData] = useState<PingTimeData[]>([]); // Adjust this if you have the implementation

  useEffect(() => {
    async function fetchData() {
      try {
        // const blockResponse = await DashboardService.fetchData('getRecentBlockhash');
        // setBlockInfo(blockResponse);

        // const validatorResponse = await DashboardService.fetchData('getVoteAccounts');
        // setValidatorPerformance(validatorResponse);

        // const stakingResponse = await DashboardService.fetchData('getStakeActivation', ["your-stake-account"]);
        // setStakingInfo(stakingResponse);

        const tpsResponse = await DashboardService.fetchData(
          "getRecentPerformanceSamples",
          [30]
        );
        console.log(tpsResponse);
        setTpsData(tpsResponse);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <DashboardLayout path="Dashboard">
      {/* <Card>
        <h2>Recent Transactions</h2>
        {transactions.length > 0 ? (
          <TransactionChart data={transactions} />
        ) : (
          "Loading transactions..."
        )}
      </Card> */}
      {/* <Card>
        <h2>Current Block Information</h2>
        {blockInfo ? (
          <div>
            <p>Block Hash: {blockInfo.blockhash}</p>
            <p>Last Valid Block Height: {blockInfo.lastValidBlockHeight}</p>
          </div>
        ) : (
          "Loading block information..."
        )}
      </Card> */}
      {/* <Card>
        <h2>Validator Performance</h2>
        {validatorPerformance.current.length > 0 ? (
          <ValidatorChart data={validatorPerformance} />
        ) : (
          "Loading validator performance..."
        )}
      </Card> */}
      <Card>
        {tpsData.length > 0 ? (
          <TPSChart data={tpsData} />
        ) : (
          <TPSChartLoader />
        )}
      </Card>
      {/* 
      <Card>
        <h2>Ping Time</h2>
        {pingData.length > 0 ? (
          <PingTimeChart data={pingData} />
        ) : (
          "Loading ping time data..."
        )}
      </Card>
      */}
      {/* <Card>
        <h2>Staking Information</h2>
        {stakingInfo ? (
          <div>
            <p>Active Stake: {stakingInfo.active}</p>
            <p>Inactive Stake: {stakingInfo.inactive}</p>
          </div>
        ) : (
          "Loading staking information..."
        )}
      </Card> */}
    </DashboardLayout>
  );
}
