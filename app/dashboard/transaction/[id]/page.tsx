"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../../components/layout/Card";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import AccountService from "@/app/services/accountService";
import { FaRegCopy } from "react-icons/fa";
import { TransactionCard } from "../components/transactionCard";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { LoadingCard } from "@/app/components/molecules/LoadingCard";
import AccountKeyTable from "../components/accountKeyTable";

export default function SingleTransaction() {
  const param = useParams();
  const txnSig = param.id;

  const [transaction, setTransaction] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState<string>("");

  useEffect(() => {
    if (txnSig) {
      fetchTransactionDetails(txnSig as string);
    }
  }, [txnSig]);

  const fetchTransactionDetails = async (txnSig: string) => {
    try {
      const transactionDetails = await AccountService.getTransactionDetails(
        txnSig
      );
      setTransaction(transactionDetails);
      // console.log(transactionDetails);
    } catch (error: any) {
      console.error("Error fetching transaction details:", error);
      setError("Error fetching transaction details");
    }
  };

  const renderStatus = (meta: any) => {
    if (meta.err === null) {
      return {
        status: "Confirmed",
        statusStyle: "bg-[#1690311A] text-[#169031] font-semibold",
      };
    } else {
      return {
        status: "Error",
        statusStyle: "bg-[#F21F111A] text-[#F21F11] font-semibold",
      };
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(String(txnSig)).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Hide after 2 seconds
    });
  };

  if (error) {
    return (
      <DashboardLayout path={`Accounts`}>
        <Card>
          <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
            Transaction Overview
          </h3>
          <p className="text-red-500 w-full h-full flex items-start justify-center">
            {error}
          </p>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout path={`Transactions`}>
      <Card>
        <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
          Transaction Overview
        </h3>
        {transaction ? (
          <div className="px-6 pb-6 center flex-col gap-5 bg-[#F9FAFB] dark:bg-[#111928]">
            <div className="w-full p-4 border border-[#E5E7EB] dark:border-[#374151] flex gap-4 items-start bg-whiteBg dark:bg-darkBg mt-5">
              <p className="text-sm">{txnSig}</p>
              <FaRegCopy size={12} className="my-auto cursor-pointer" onClick={handleCopy} />
              {copySuccess && <span className="text-green-500 text-sm">{copySuccess}</span>}
            </div>
            <div className="between w-full">
              <TransactionCard
                title="Transaction Status"
                value={renderStatus(transaction.meta).status}
              />
              <TransactionCard
                title="Transaction Timestamp"
                value={new Date(transaction.blockTime * 1000).toLocaleString()}
              />
              <TransactionCard
                title="Transaction Fee $SOL"
                value={(transaction.meta.fee / LAMPORTS_PER_SOL).toString()}
              />
              <TransactionCard
                title="Post Balance $SOL"
                value={(
                  transaction?.meta?.postBalances[0] / LAMPORTS_PER_SOL
                ).toFixed(2)}
              />
            </div>
            <div className="w-full border center flex-col p-5 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg divide-[#E5E7EB] rounded-lg dark:divide-[#374151] divide-y-[1px]">
              <div className="w-full py-4 between">
                <p>Slot Number</p>
                <p>{transaction.slot}</p>
              </div>
              <div className="w-full py-4 between">
                <p>Number of Signatures</p>
                <p>{transaction.transaction.signatures.length}</p>
              </div>
              <div className="w-full py-4 between">
                <p>Compute Units Consumed</p>
                <p>{transaction.meta.computeUnitsConsumed}</p>
              </div>
              <div className="w-full py-4 between">
                <p>Number of Instructions</p>
                <p>{transaction.transaction.message.instructions.length}</p>
              </div>
              <div className="w-full py-4 between">
                <p>Recent Blockhash</p>
                <p>{transaction.transaction.message.recentBlockhash}</p>
              </div>
            </div>

            <div className="w-full border flex-col p-6 gap-10 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
              <h2 className="font-semibold text-xl">Account Inputs</h2>
              <AccountKeyTable data={transaction} />
            </div>
          </div>
        ) : (
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
        )}
      </Card>
    </DashboardLayout>
  );
}
