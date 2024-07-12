"use client";

import DashboardIconActive from "@/public/svgs/dashboardIcon.svg";
import TransactionIconInactive from "@/public/svgs/transactionIconInactive.svg";
import BlockIconInactive from "@/public/svgs/blocks.svg";
import AccountIconInactive from "@/public/svgs/accountIconInactive.svg";
import ValidatorIconInactive from "@/public/svgs/validatorIconInactive.svg";
import TokenIconInactive from "@/public/svgs/tokenIconInactive.svg";
import DevIconInactive from "@/public/svgs/devIconInactive.svg";
import DefiIconInactive from "@/public/svgs/defiIconInactive.svg";
import NetworkIconInactive from "@/public/svgs/networkIconInactive.svg";
import SolanaLogo from "@/public/icons/solana.png";
import NavLink from "./atoms/NavLink";
import { useState } from "react";
import Image from "next/image";

const navLinks = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: DashboardIconActive,
  },
  {
    id: 2,
    name: "Transactions",
    link: "/dashboard/transactions",
    icon: TransactionIconInactive,
  },
  {
    id: 3,
    name: "Blocks",
    link: "/dashboard/blocks",
    icon: BlockIconInactive,
    drop: false,
  },
  {
    id: 4,
    name: "Accounts",
    link: "/dashboard/accounts",
    icon: AccountIconInactive,
    drop: false,
  },
  {
    id: 5,
    name: "Validators",
    link: "/dashboard/validators",
    icon: ValidatorIconInactive,
    drop: false,
  },
  {
    id: 6,
    name: "Tokens",
    link: "/dashboard/tokens",
    icon: TokenIconInactive,
  },
  {
    id: 7,
    name: "DeFi & DApps",
    link: "/dashboard/defi-dapps",
    icon: DefiIconInactive,
  },
  {
    id: 8,
    name: "Network",
    link: "/dashboard/network",
    icon: NetworkIconInactive,
  },
  {
    id: 9,
    name: "Developer Tools",
    link: "/dashboard/developer-tools",
    icon: DevIconInactive,
  },
];

const SideNav = ({ active }: any) => {
  const [links, setLinks] = useState(navLinks);

  return (
    <div className="w-[18rem] pt-5 bg-whiteBg dark:bg-darkBg text-white-text dark:text-dark-text">
      <div className="sticky top-0 flex flex-col justify-between max-h-screen h-full  pl-2 pr-5 overflow-scroll">
        <div>
          {links?.map((item, index) => (
            <NavLink
              item={item}
              key={item.id}
              index={index}
              active={active}
              setLinks={(param: any) => setLinks(param)}
              links={links}
            />
          ))}
        </div>
        <div className="flex flex-col pb-6 pl-2">
          <div className="flex gap-2">
            <Image src={SolanaLogo} alt="Solana" />
            <p className="font-semibold text-sm">Powered by Solana</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
