"use client";

import { fetchTokenMetadata } from "@/app/services/tokenService";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/app/components/layout/DashboardLayout";
import Card from "@/app/components/layout/Card";
import { TokenCard } from "../components/tokenCard";
import { FaRegCopy } from "react-icons/fa";
import { formatNumber } from "@/app/common/utils/numberFormatter";
import Usdc from "@/public/icons/usdc.webp";
import TxnTable from "../../account/component/txnTable";
import TokenTxn from "./txn";
import { LoadingCard } from "@/app/components/molecules/LoadingCard";

const SingleToken = () => {
  const param = useParams();
  const tokenAddress = param.id;

  const [tokenDetails, setTokenDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string>("");

  useEffect(() => {
    const fetchTokensData = async () => {
      try {
        const result = await fetchTokenMetadata(tokenAddress);
        setTokenDetails(result);
        console.log(result);
      } catch (error) {
        setError("Failed to fetch token metadata");
      } finally {
        setLoading(false);
      }
    };

    fetchTokensData();
  }, [tokenAddress]);

  if (loading) {
    return (
        <DashboardLayout path={`Tokens`}>
        <Card>
          <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
            Token Overview
          </h3>
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
        </Card>
      </DashboardLayout>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!tokenDetails) {
    return <div>No token details available</div>;
  }

  const { metadata } = tokenDetails?.content;
  const price = tokenDetails.token_info?.price_info?.price_per_token || 0;

//   console.log({ metadata, tokenDetails });

  const handleCopy = () => {
    navigator.clipboard.writeText(String(tokenAddress)).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  return (
    <DashboardLayout path="Tokens">
      <Card>
        <div className="flex gap-2 items-center bg-whiteBg dark:bg-darkBg w-full">
          <h3 className="text-xl pl-5 py-5 leading-[25px] font-semibold">
            Token Overview
          </h3>
        </div>
        <div className="px-5 pb-6 center flex-col bg-[#F9FAFB] dark:bg-[#111928]">
          <div className="w-full p-4 border border-[#E5E7EB] dark:border-[#374151] flex gap-4 items-start bg-whiteBg dark:bg-darkBg mt-5">
            <p className="text-sm">{tokenAddress}</p>
            <FaRegCopy
              size={12}
              className="my-auto cursor-pointer"
              onClick={handleCopy}
            />
            {copySuccess && (
              <span className="text-green-500 text-sm">{copySuccess}</span>
            )}
          </div>
          <div className=" w-full center flex-col bg-[#F9FAFB] dark:bg-[#111928]">
            <div className="w-full my-6 between">
              <TokenCard
                title="Name"
                value={metadata.name}
                unit=""
                icon={tokenDetails.content.links.image}
              />
              <TokenCard
                title="Symbol"
                icon={tokenDetails.content.links.image}
                value={tokenDetails.token_info?.symbol}
                unit=""
              />
              <TokenCard
                title="Price"
                icon="/icons/usdc.webp"
                value={price.toFixed(8)}
                unit="USDC"
              />
              <TokenCard
                title="Supply"
                icon={tokenDetails.content.links.image}
                value={formatNumber(tokenDetails.token_info?.supply)}
                unit={tokenDetails.token_info?.symbol}
              />
            </div>
          </div>

          <div className="w-full border center flex-col p-5 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg divide-[#E5E7EB] rounded-lg dark:divide-[#374151] divide-y-[1px]">
            <div className="w-full py-4 between">
              <p>Authorities</p>
              <p>
                {tokenDetails.authorities
                  .map((auth: { address: any }) => auth.address)
                  .join(", ")}
              </p>
            </div>
            <div className="w-full py-4 between">
              <p>Compression Eligible</p>
              <p>{tokenDetails.compression.eligible ? "Yes" : "No"}</p>
            </div>
            <div className="w-full py-4 between">
              <p>Compressed</p>
              <p>{tokenDetails.compression.compressed ? "Yes" : "No"}</p>
            </div>
            <div className="w-full py-4 between">
              <p>Burnt</p>
              <p>{tokenDetails.burnt ? "True" : "False"}</p>
            </div>
          </div>

          <TokenTxn />
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default SingleToken;
