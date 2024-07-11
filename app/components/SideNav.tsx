"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./molecules/FormComponents";

import { RxDashboard } from "react-icons/rx";
import { GrTransaction, GrValidate } from "react-icons/gr";
import { SiHiveBlockchain } from "react-icons/si";
import { RiAccountCircleFill } from "react-icons/ri";
import { GiToken } from "react-icons/gi";
import { MdPayments, MdNetworkCheck } from "react-icons/md";
import { BsTools } from "react-icons/bs";

import NavLink from "./atoms/NavLink";
import { useState } from "react";


const navLinks = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    icon: <RxDashboard />,
  },
  {
    id: 2,
    name: "Transactions",
    link: "/transactions",
    icon: <GrTransaction />,
  },
  {
    id: 3,
    name: "Blocks",
    link: "/blocks",
    icon: <SiHiveBlockchain />,
    drop: false,
  },
  {
    id: 4,
    name: "Accounts",
    link: "/accounts",
    icon: <RiAccountCircleFill />,
    drop: false,
  },
  {
    id: 5,
    name: "Validators",
    link: "/validators",
    icon: <GrValidate/ >,
    drop: false,
  },
  {
    id: 6,
    name: "Tokens",
    link: "/tokens",
    icon: <GiToken />,
  },
  {
    id: 7,
    name: "DeFi & DApps",
    link: "/defi-dapps",
    icon: <MdPayments />,
  },
  {
    id: 8,
    name: "Network",
    link: "/network",
    icon: <MdNetworkCheck />,
  },
  {
    id: 9,
    name: "Developer Tools",
    link: "/developer-tools",
    icon: <BsTools />,
  },
];

const SideNav = ({ active }: any) => {
  const [links, setLinks] = useState(navLinks);

  return (
    <div className="w-[18rem] bg-whiteBg dark:bg-darkBg text-white-text dark:text-dark-text">
      <div className="sticky top-0 flex flex-col justify-between max-h-screen h-full pb-10 mt-10 px-4 overflow-scroll">
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
      </div>
    </div>
  );
};

export default SideNav;