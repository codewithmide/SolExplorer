import AccountService from "@/app/services/accountService";
import TxnTable, { TxnTableLoading } from "../../account/component/txnTable";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const TokenTxn = () => {
  const param = useParams();
  const tokenAddress = param.id;

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAccountTransactions = async (account: string) => {
    setLoading(true)
    try {
      const signaturesResponse = await AccountService.getTransactionSignatures(
        account
      );
      const signatures = signaturesResponse.map((sig: any) => sig.signature);

      const transactionDetails = await Promise.all(
        signatures.map(async (signature: string) => {
          return await AccountService.getTransactionDetails(signature);
        })
      );

      setTransactions(transactionDetails);
    } catch (error: any) {
      console.error("Error fetching account transactions:", error);
      // setError("Error fetching account transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountTransactions(String(tokenAddress));
  }, []);
  return (
    <div className="w-full mt-5 border flex-col p-6 gap-10 border-[#E5E7EB] dark:border-[#374151] flex items-start bg-whiteBg dark:bg-darkBg">
      <h2 className="font-semibold text-xl">Recent Transactions</h2>
      {loading ? <TxnTableLoading /> : <TxnTable data={transactions} />}
    </div>
  );
};

export default TokenTxn;
