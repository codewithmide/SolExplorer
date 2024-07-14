"use client";

import { Button, Input } from "@/app/components/molecules/FormComponents";
import Card from "../../components/layout/Card";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState } from "react";
import AccountService from "@/app/services/accountService";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const gemini = new GoogleGenerativeAI(String(process.env.NEXT_PUBLIC_GEMINI_API_KEY));

export default function DevTools() {
  const [userAddress, setUserAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [airdropLoading, setAirdropLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [airdropError, setAirdropError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");

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

  const handlePrompt = async () => {
    setLoading(true);
    setError(null);
    setAiResponse("");
    try {
      const model = await gemini.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const result = await model.generateContent([
        `Hello, you are Toly. You will be asked anything about Solana. ${prompt}`,
      ]);
      const formattedResponse = formatResponse(await result.response.text());
      setAiResponse(String(formattedResponse));
      setPrompt("");
    } catch (err: any) {
      setError(`Failed to get response: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (response: any) => {
    return marked(response);
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

          <div className="w-full border flex-col p-6 gap-5 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
            <h2 className="font-semibold text-xl">Ask Toly</h2>

            <p>Greetings! I am Toly, your guide to all things Solana. Ask me anything you&apos;d like to know about this exciting blockchain platform. I&apos;m ready to share my knowledge and answer your questions!</p>

            <div className="my-3 mt-6">
              {aiResponse && (
                <p className="text-black dark:text-white" dangerouslySetInnerHTML={{ __html: aiResponse }}></p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </div>

            <div className="w-full flex flex-col gap-3">
              <Input
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                placeholder="Ask Toly anything..."
                classname="w-full border border-[#D1D5DB] dark:border-[#4B5563] rounded-[8px]"
              />

              <Button
                classname="dark:bg-whiteBg bg-darkBg text-whiteBg dark:text-darkBg"
                validation={prompt === "" || loading}
                link={handlePrompt}
              >
                {loading ? "Asking..." : "Ask Toly"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
