"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../../components/layout/Card";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import AccountService from "@/app/services/accountService";
import { FaRegCopy } from "react-icons/fa";
import { LoadingCard } from "@/app/components/molecules/LoadingCard";
import SolanaLogo from "@/public/icons/solana.png";
import { MetricCard } from "@/app/components/molecules/MetricCard";
import BlockTable from "../components/blockTable";

export default function SingleBlock() {
  const param = useParams();
  const blockSlot = param.id;

  const [blockData, setBlockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState<string>("");

  useEffect(() => {
    if (blockSlot) {
      fetchBlockData(blockSlot as string);
    }
  }, [blockSlot]);

  const fetchBlockData = async (slot: string) => {
    try {
      const blockInfoResponse = await AccountService.fetchData("getBlock", [parseInt(slot), { maxSupportedTransactionVersion: 0 }]);
      setBlockData(blockInfoResponse);
    } catch (error: any) {
      console.error("Error fetching block data:", error);
      setError("Error fetching block data");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(String(blockSlot)).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Hide after 2 seconds
    });
  };

  if (error) {
    return (
      <DashboardLayout path={`Blocks`}>
        <Card>
          <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
            Block Overview
          </h3>
          <p className="text-red-500 w-full h-full flex items-start justify-center">{error}</p>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout path={`Blocks`}>
      <Card>
        <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
          Block Overview
        </h3>
        {loading ? (
          <div className="px-6 pb-6 center flex-col gap-5 bg-[#F9FAFB] dark:bg-[#111928]">
            <div className="p-3 border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-darkBg w-full mt-5">
              <div className="w-[60%] animate-pulse bg-slate-200 p-2"></div>
            </div>
            <div className="between w-full">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
            <div className="p-5 center gap-5 flex-col border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-darkBg w-full divide-[#E5E7EB] rounded-lg dark:divide-[#374151] divide-y-[1px]">
              <div className="w-full py-4 animate-pulse bg-slate-200 p-2"></div>
              <div className="w-full py-4 animate-pulse bg-slate-200 p-2"></div>
              <div className="w-full py-4 animate-pulse bg-slate-200 p-2"></div>
              <div className="w-full py-4 animate-pulse bg-slate-200 p-2"></div>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-6 center flex-col bg-[#F9FAFB] dark:bg-[#111928]">
            <div className="w-full p-4 border border-[#E5E7EB] dark:border-[#374151] flex gap-4 items-start bg-whiteBg dark:bg-darkBg  mt-5">
              <p className="text-sm">{blockSlot}</p>
              <FaRegCopy size={12} className="my-auto cursor-pointer" onClick={handleCopy} />
              {copySuccess && <span className="text-green-500 text-sm">{copySuccess}</span>}
            </div>
            <div className="w-full my-6 between">
              <MetricCard
                title="Block Slot"
                value={blockData?.blockHeight ?? "N/A"}
                icon={SolanaLogo}
              />
              <MetricCard
                title="Block Time"
                value={blockData?.blockTime ? new Date(blockData.blockTime * 1000).toLocaleString() : "N/A"}
                icon={SolanaLogo}
              />
              <MetricCard
                title="Number of Transactions"
                value={blockData?.transactions?.length ?? "0"}
                icon={SolanaLogo}
              />
              <MetricCard
                title="Parent Slot"
                value={blockData?.parentSlot ?? "N/A"}
                icon={SolanaLogo}
              />
            </div>
            <div className="w-full border flex-col p-6 gap-10 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
              <h2 className="font-semibold text-xl">Transactions</h2>
              <BlockTable data={blockData.transactions} />
            </div>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
