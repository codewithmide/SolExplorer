"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import Card from "@/app/components/layout/Card";
import bs58 from 'bs58';
import DashboardLayout from "@/app/components/layout/DashboardLayout";
import axiosInstance from "@/app/common/utils/axios.instance";
import AccountService from "@/app/services/accountService";

const SingleNFT = () => {
  const param = useParams();
  const nftAddress = param.id
  const [nftDetail, setNftDetail] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNftMetadata = async (nftAddress: string) => {
      try {
        const nftDetail = await AccountService.fetchData("getAsset",
          [nftAddress]
        );
        setNftDetail(nftDetail);
        console.log("NFT Metadata:", nftDetail);
      } catch (error: any) {
        console.error("Error fetching NFT metadata:", error);
        setError(error.message);
      }
    };

    if (nftAddress) {
      fetchNftMetadata(String(nftAddress));
    }
  }, [nftAddress]);

  return (
    <DashboardLayout path="NFTs">
      <Card>
        <h3 className="text-xl px-5 py-5 w-full bg-whiteBg dark:bg-darkBg leading-[25px] font-semibold">
          NFTs Overview
        </h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <pre>{JSON.stringify(nftDetail, null, 2)}</pre>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default SingleNFT;
