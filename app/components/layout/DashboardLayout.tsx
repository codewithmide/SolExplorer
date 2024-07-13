"use client";

import { useState } from "react";
import SideNav from "../SideNav";
import { FaGithub } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch";
import Link from "next/link";
import { Input } from "../molecules/FormComponents";
import searchIcon from "@/public/svgs/search.svg";
import LogoIcon from "@/public/svgs/logoIcon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchResult } from "@/app/common/types/dashboardTypes";
import AccountService from "@/app/services/accountService";

const DashboardLayout = ({ children, path }: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      await identifySearchType(value);
    } else {
      setSearchResult(null);
    }
  };

  const identifySearchType = async (value: string) => {
    setIsLoading(true);
    const transactionPattern = /^[1-9A-HJ-NP-Za-km-z]{87,88}$/;
    const blockPattern = /^\d+$/;
    const accountPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

    try {
      if (blockPattern.test(value)) {
        setSearchResult({ type: "Block", value });
      } else if (transactionPattern.test(value)) {
        setSearchResult({ type: "Transaction", value });
      } else if (accountPattern.test(value)) {
        const accountInfo = await AccountService.fetchData("getAccountInfo", [value]);
        if (accountInfo && accountInfo.value !== null) {
          setSearchResult({ type: "Account", value });
        } else {
          const tokenInfo = await AccountService.fetchData("getTokenAccountsByOwner", [value, { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" }]);
          if (tokenInfo && tokenInfo.length > 0) {
            setSearchResult({ type: "Token", value });
          } else {
            const programInfo = await AccountService.fetchData("getProgramAccounts", [value]);
            if (programInfo && programInfo.length > 0) {
              setSearchResult({ type: "Program", value });
            } else {
              setSearchResult({ type: "Invalid", value: "Invalid or incorrect address" });
            }
          }
        }
      } else {
        setSearchResult({ type: "Invalid", value: "Invalid or incorrect address" });
      }
    } catch (error) {
      console.error("Error identifying search type:", error);
      setSearchResult({ type: "Invalid", value: "Invalid or incorrect address" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = () => {
    if (searchResult && searchResult.type !== "Invalid") {
      const { type, value } = searchResult;
      const path = `/dashboard/${type.toLowerCase()}/${value}`;
      router.push(path);
    }
  };

  return (
    <main className="h-[100%] overflow-hidden flex flex-col text-[#000000] relative">
      <div className="md:hidden h-full w-full absolute bg-white dark:bg-slate-800 text-black dark:text-white z-50 flex items-center justify-center">
        <div className="px-4">
          <h1 className="text-xl lg:text-2xl font-bold text-action mb-2">
            Mobile view coming soon
          </h1>
          <p className="text-base lg:text-xl max-w-xs">
            For Best experience, use a desktop device
          </p>
        </div>
      </div>

      <div className="between border-b border-[#E5E7EB] dark:border-[#374151] bg-whiteBg dark:bg-darkBg text-white-text dark:text-dark-text px-5 h-[80px]">
        <Link
          href="/"
          className="font-semibold text-teal dark:text-dark-text text-lg flex gap-1 items-center justify-center"
        >
          <Image src={LogoIcon} alt="logo" width={24} height={24} />
          SolExplore
        </Link>

        <div className="relative">
          <Input
            preIcon={searchIcon}
            onChange={handleSearchChange}
            value={searchTerm}
            placeholder="Search transactions, account, tokens, blocks..."
            classname="w-[450px] border border-[#D1D5DB] dark:border-[#4B5563] rounded-[8px]"
          />
          {isLoading ? (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 min-w-[450px] bg-white dark:bg-slate-800 border border-[#D1D5DB] dark:border-[#4B5563] rounded-[8px] mt-1 p-4 cursor-pointer">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mt-2"></div>
              </div>
            </div>
          ) : (
            searchResult && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 min-w-[450px] bg-white dark:bg-slate-800 border border-[#D1D5DB] dark:border-[#4B5563] rounded-[8px] mt-1 p-4 cursor-pointer"
                onClick={handleResultClick}
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {searchResult.type}
                </p>
                <p className="text-md text-black dark:text-white">
                  {searchResult.value}
                </p>
              </div>
            )
          )}
        </div>

        <div className="flex gap-6 items-center">
          <ThemeSwitch />
          <FaGithub size={24} />
        </div>
      </div>

      <main
        className="w-full bg-background flex flex-row"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <SideNav active={path} />
        <div className="bg-background w-full overflow-y-scroll">{children}</div>
      </main>
    </main>
  );
};

export default DashboardLayout;
