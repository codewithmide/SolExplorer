import { useRouter } from "next/navigation";
import classnames from "@/app/common/utils/classnames";
import { format } from "date-fns";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const BlockTable = ({ data, classname }: any) => {
  const router = useRouter();

  return (
    <table
      className={classnames(
        "w-full divide-[#E5E7EB] rounded-lg dark:divide-[#374151] divide-y-1 text-dark",
        classname
      )}
    >
      <thead className="bg-[#D5F5F6] dark:bg-[#036672]">
        <tr>
          <th className="px-6 py-5 text-left text-sm leading-4 font-semibold">
            Transaction Signature
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-center">
            Status
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-center">
            Fee (SOL)
          </th>
        </tr>
      </thead>
      <tbody className="divide-[#E5E7EB] dark:divide-[#374151] divide-y-[1px]  text-dark">
        {data.map((item: any, index: any) => (
          <tr
            key={index}
            className="hover:bg-[#EDFAFA] dark:hover:bg-[#4e9fa9] cursor-pointer"
            onClick={() =>
              router.push(
                `/dashboard/transaction/${item.transaction.signatures[0]}`
              )
            }
          >
            <td className="px-6 py-5 whitespace-no-wrap text-[12px] leading-5 flex gap-2 items-center">
              {item.transaction.signatures[0]}
            </td>
            <td className="px-6 py-5 whitespace-no-wrap text-sm leading-5 text-center">
              {item?.meta?.err === null ? (
                <span className="bg-[#1690311A] text-[#169031] font-semibold px-2 py-1 rounded-full">
                  <small>Confirmed</small>
                </span>
              ) : (
                <span className="bg-[#F21F111A] font-semibold text-[#F21F11] px-2 py-1 rounded-full">
                  <small>Error</small>
                </span>
              )}
            </td>
            <td className="px-6 py-5 whitespace-no-wrap text-sm leading-5 text-center">
              {(item?.meta?.fee / LAMPORTS_PER_SOL).toFixed(9)} SOL
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const BlockTableLoading = ({ classname }: any) => {
  return (
    <table
      className={classnames(
        "min-w-full divide-background divide-y-4 text-dark",
        classname
      )}
    >
      <thead className="bg-[#D5F5F6] dark:bg-[#036672]">
        <tr>
          <th className="px-6 py-5 text-left text-sm leading-4 font-semibold">
            Transaction Signature
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-center">
            Status
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-center">
            Fee (SOL)
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-background divide-y-2 text-dark">
        {[...new Array(5).fill(0)].map((item: any, index: any) => (
          <tr key={index} className="cursor-progress">
            <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 flex gap-2 items-center">
              <p className="h-2 animate-pulse w-full bg-slate-200 mx-auto"></p>
            </td>
            <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5">
              <p className="h-2 animate-pulse w-full bg-slate-200 mx-auto"></p>
            </td>
            <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 item-center text-center">
              <p className="h-2 animate-pulse w-12 bg-slate-200 mx-auto"></p>
            </td>
            <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 item-center text-center">
              <p className="h-2 animate-pulse w-12 bg-slate-200 mx-auto"></p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockTable;
