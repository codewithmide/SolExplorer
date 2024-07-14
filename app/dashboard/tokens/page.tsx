"use client";

import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { IoMdInformationCircle } from "react-icons/io";
import WSol from "@/public/icons/wsol.webp";
import Jup from "@/public/icons/jup.webp";
import Pyth from "@/public/icons/pyth.webp";
import Worm from "@/public/icons/worm.webp";
import Usdc from "@/public/icons/usdc.webp";
import Bonk from "@/public/icons/bonk.webp";
import Jito from "@/public/icons/jito.webp";
import Usdt from "@/public/icons/usdt.webp";
import IO from "@/public/icons/io.webp";
import Jito2 from "@/public/icons/jitoS.webp";
import Dogw from "@/public/icons/dogw.webp";
import Ray from "@/public/icons/ray.webp";
import TokenTable from "./components/tokenTable";

export default function Tokens() {
  const TokenAddresses = [
    {
      No: 1,
      Token: "Wrapped SOL",
      Symbol: "SOL",
      address: "So11111111111111111111111111111111111111112",
      Image: WSol,
    },
    {
      No: 2,
      Token: "Jupiter",
      Symbol: "JUP",
      address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
      Image: Jup,
    },
    {
      No: 3,
      Token: "Pyth Network",
      Symbol: "PYTH",
      address: "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3",
      Image: Pyth,
    },
    {
      No: 4,
      Token: "Wormhole Token",
      Symbol: "W",
      address: "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ",
      Image: Worm,
    },
    {
      No: 5,
      Token: "USDC",
      Symbol: "USDC",
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      Image: Usdc,
    },
    {
      No: 6,
      Token: "Bonk",
      Symbol: "Bonk",
      address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      Image: Bonk,
    },
    {
      No: 7,
      Token: "JITO",
      Symbol: "JTO",
      address: "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL",
      Image: Jito,
    },
    {
      No: 8,
      Token: "USDT",
      Symbol: "USDT",
      address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
      Image: Usdt,
    },
    {
      No: 9,
      Token: "IO",
      Symbol: "IO",
      address: "BZLbGTNCSFfoth2GYDtwr7e4imWzpR5jqcUuGEwr646K",
      Image: IO,
    },
    {
      No: 10,
      Token: "Jito Staked SOL",
      Symbol: "JitoSOL",
      address: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
      Image: Jito2,
    },
    {
      No: 11,
      Token: "dogwifhat",
      Symbol: "$WIF",
      address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
      Image: Dogw,
    },
    {
      No: 12,
      Token: "Raydium",
      Symbol: "RAY",
      address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
      Image: Ray,
    },
  ];

  return (
    <DashboardLayout path="Tokens">
      <Card>
        <div className="flex gap-2 items-center bg-whiteBg dark:bg-darkBg w-full">
          <h3 className="text-xl pl-5 py-5 leading-[25px] font-semibold">
            Token Overview
          </h3>
          <div className="tooltip my-auto">
            <IoMdInformationCircle size={18} className="text-start" />
            <span className="tooltiptext-2">
              Token are listed in no particular order. Also, only few tokens are
              listed, to get infomation about a token kindly search using the
              token contract address
            </span>
          </div>
        </div>
        <div className="px-6 py-6 center w-full flex-col gap-5 bg-[#F9FAFB] dark:bg-[#111928]">
          <div className="w-full border flex-col p-6 gap-5 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
            <TokenTable data={TokenAddresses} />
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
