"use client";

import SideNav from "../SideNav";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch";
import Link from "next/link";
import { Input } from "../molecules/FormComponents";
import searchIcon from "@/public/svgs/search.svg";
import LogoIcon from "@/public/svgs/logoIcon.svg";
import Image from "next/image";

const DashboardLayout = ({ children, path }: any) => {
  return (
    <main className="h-[100%] overflow-hidden flex flex-col text-[#000000] relative">
      <div className="md:hidden h-full w-full absolute bg-white dark:bg-slate-800 text-black dark:text-white z-50 flex items-center justify-center">
        <div className="px-4">
          <h1 className="text-xl lg:text-2xl font-bold text-action mb-2">
            Mobile Devices Not Supported for Dashboard
          </h1>
          <p className="text-base lg:text-xl max-w-xs">
            For Best experience, use a desktop device
          </p>
        </div>
      </div>

      <div className="between border-b border-[#E5E7EB] dark:border-[#374151]  bg-whiteBg dark:bg-darkBg text-white-text dark:text-dark-text px-5 h-[80px]">
        <Link
          href="/"
          className="font-semibold text-teal dark:text-dark-text text-lg flex gap-1 items-center justify-center"
        >
          <Image src={LogoIcon} alt="logo" width={24} height={24}/>
          SolExplore
        </Link>

        <Input preIcon={searchIcon} onChange={() => console.log("search")} placeholder="Search transactions, tokens, blocks..." classname="w-[450px] border border-[#D1D5DB] dark:border-[#4B5563] rounded-[8px]" />

        <div className="flex gap-6 items-center">
          <ThemeSwitch />
          <FaGithub size={24} />
        </div>
      </div>

      <main
        className="w-full bg-background flex flex-row"
        style={{ height: "calc(100vh - 80px" }}
      >
        <SideNav active={path} />
        <div className="bg-background w-full overflow-y-scroll">
          {children}
        </div>
      </main>
    </main>
  );
};

export default DashboardLayout;
