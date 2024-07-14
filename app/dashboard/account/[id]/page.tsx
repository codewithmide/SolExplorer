"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../../components/layout/Card";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import AccountService from "@/app/services/accountService";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import OverviewCard from "../component/overviewCard";
import SolanaLogo from "@/public/svgs/SOL.png";
import { FaRegCopy } from "react-icons/fa";
import TxnTable from "../component/txnTable";
import { LoadingCard } from "@/app/components/molecules/LoadingCard";

export default function SingleAccount() {
  const param = useParams();
  const account = param.id;

  const [accountData, setAccountData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState<string>("");

  const balanceInSol = accountData?.lamports ? (accountData.lamports / LAMPORTS_PER_SOL).toFixed(2) : "0";

  useEffect(() => {
    if (account) {
      fetchAccountData(account as string);
      fetchAccountTransactions(account as string);
    }
  }, [account]);

  const fetchAccountData = async (account: string) => {
    try {
      const accountInfoResponse = await AccountService.fetchData(
        "getAccountInfo",
        [account]
      );
      // console.log(accountInfoResponse)
      setAccountData(accountInfoResponse.value);
    } catch (error: any) {
      console.error("Error fetching account data:", error);
      setError("Error fetching account data");
    }
  };

  const fetchAccountTransactions = async (account: string) => {
    try {
      const signaturesResponse = await AccountService.getTransactionSignatures(
        account
      );
      const signatures = signaturesResponse.map((sig: any) => sig.signature);

      const transactionDetails = await Promise.all(
        signatures.map(async (signature: string) => {
          return await AccountService.getTransactionDetails(signature);
        })
      );

      setTransactions(transactionDetails);
    } catch (error: any) {
      console.error("Error fetching account transactions:", error);
      // setError("Error fetching account transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(String(account)).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Hide after 2 seconds
    });
  };

  // console.log(accountData)

  if (error) {
    return (
      <DashboardLayout path={`Accounts`}>
        <Card>
          <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
            Account Overview
          </h3>
          <p className="text-red-500 w-full h-full flex items-start justify-center">{error}</p>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout path={`Accounts`}>
      <Card>
        <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
          Account Overview
        </h3>
        {loading ? (
          <div className="px-6 pb-6 center flex-col gap-5 bg-[#F9FAFB] dark:bg-[#111928]">
            <div className="p-3  border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-darkBg w-full mt-5">
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
          <div className="px-6 h-full pb-6 flex flex-col bg-[#F9FAFB] dark:bg-[#111928]">
            <div className="w-full p-4 border border-[#E5E7EB] dark:border-[#374151] flex gap-4 items-start bg-whiteBg dark:bg-darkBg mt-5">
              <p className="text-sm">{account}</p>
              <FaRegCopy size={12} className="my-auto cursor-pointer" onClick={handleCopy} />
              {copySuccess && <span className="text-green-500 text-sm">{copySuccess}</span>}
            </div>
            <div className="w-full my-6 between">
              <OverviewCard
                title="Balance"
                unit="$SOL"
                tooltip={false}
                value={balanceInSol}
                icon={SolanaLogo}
              />

              <OverviewCard
                title="Allocated Space"
                tooltip={true}
                value={accountData?.space ?? "0"}
                icon={SolanaLogo}
              />
            </div>
            <div className="w-full border flex-col p-6 gap-10 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
              <h2 className="font-semibold text-xl">Recent Transactions</h2>
              <TxnTable data={transactions} />
            </div>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
