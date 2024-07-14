import { useRouter } from "next/navigation";
import classnames from "@/app/common/utils/classnames";
import Image from "next/image";

const TokenTable = ({ data, classname }: any) => {
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
            Name
          </th>
          <th className="px-6 py-5 text-left text-sm leading-4 font-semibold max-w-xs">
            Symbol
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-right">
            Address
          </th>
        </tr>
      </thead>
      <tbody className="divide-[#E5E7EB] dark:divide-[#374151] divide-y-[1px] text-dark">
        {data.map((item: any, index: number) => (
          <tr
            key={index}
            className="hover:bg-[#EDFAFA] dark:hover:bg-[#4e9fa9] cursor-pointer text-sm"
            onClick={() => router.push(`/dashboard/tokens/${item.address}`)}
          >
            <td className="px-6 py-5 whitespace-no-wrap leading-5 flex gap-2 items-center">
              <Image src={item.Image} alt={item.Image} width={20} height={20} />
              {item.Token}
            </td>
            <td className="px-6 py-5 whitespace-no-wrap text-sm leading-5">
              {item.Symbol}
            </td>
            <td className="px-6 py-5 whitespace-no-wrap text-sm leading-5 text-right">
              {item.address}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TokenTableLoading = ({ classname }: any) => {
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
            Name
          </th>
          <th className="px-6 py-5 text-left text-sm leading-4 font-semibold max-w-xs">
            Symbol
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-center">
            Address
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

export default TokenTable;
