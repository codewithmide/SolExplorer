"use client";

import { Button, Input } from "@/app/components/molecules/FormComponents";
import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState } from "react";
import AccountService from "@/app/services/accountService";


export default function DevTools() {
  const [userAddress, setUserAddress] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);
  const [airdropLoading, setAirdropLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [airdropError, setAirdropError] = useState<string | null>(null);


  const handleAirdrop = async () => {
    setAirdropLoading(true);
    setAirdropError(null);
    setSuccess(null);
    try {
      const lamports = 1000000000;
      const response = await AccountService.requestAirdrop(userAddress, lamports);
      if (response) {
        setSuccess(`Airdrop successful`);
      }
      setUserAddress("");
    } catch (err: any) {
      setAirdropError(`Airdrop failed: ${err.message}`);
    } finally {
      setAirdropLoading(false);
    }
  };

  return (
    <DashboardLayout path="Developer Tools">
      <Card>
        <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
          Developer Tools
        </h3>
        <div className="px-6 py-6 flex flex-col gap-5 bg-[#F9FAFB] dark:bg-[#111928] h-full">
          <div className="w-full border flex-col p-6 gap-5 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
            <h2 className="font-semibold text-xl">Request Devnet SOL</h2>

            <div className="w-full flex flex-col gap-3">
              <Input
                onChange={(e) => setUserAddress(e.target.value)}
                value={userAddress}
                placeholder="Enter wallet address"
                classname="w-full border border-[#D1D5DB] dark:border-[#4B5563] rounded-[8px]"
              />

              <Button
                classname="dark:bg-whiteBg bg-darkBg text-whiteBg dark:text-darkBg"
                validation={userAddress === "" || airdropLoading}
                link={handleAirdrop}
              >
                {airdropLoading ? "Requesting..." : "Request Airdrop"}
              </Button>
            </div>
            {airdropError && <p className="text-red-500">{airdropError}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
