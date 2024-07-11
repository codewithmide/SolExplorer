"use client";

import SideNav from "../SideNav";
import formattedDate from "@/app/common/utils/current-date";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch";

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

      <div className="flex justify-start bg-whiteBg dark:bg-darkBg text-white-text dark:text-dark-text p-2 pr-4 h-[80px]">
        <div className="w-[17rem] font-semibold text-lg flex items-center justify-center">
          Solana Data Explorer
          {/* <Image src="/svgs/logo.svg" alt="logo" width={135} height={20}/> */}
        </div>

        <div className="w-full px-6 flex items-center justify-between">
          <div>
            <p className="whitespace-nowrap text-brand text-lg font-semibold">
              {path}
            </p>
            <p className="whitespace-nowrap text-[#04D192] text-sm font-semibold">
              {formattedDate}
            </p>
          </div>

          <div className="flex gap-6 items-center">
            <ThemeSwitch />
            <FaGithub size={24} />
          </div>
        </div>
      </div>

      <main
        className="w-full bg-background flex flex-row"
        style={{ height: "calc(100vh - 80px" }}
      >
        <SideNav active={path} />
        <div
          className=" bg-background w-full overflow-y-scroll"
          
        >
          {children}
        </div>
      </main>
    </main>
  );
};

export default DashboardLayout;
