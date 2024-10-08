import { useRouter } from "next/navigation";
import classnames from "@/app/common/utils/classnames";

const AccountKeyTable = ({ data, classname }: any) => {
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
            Address
          </th>
          <th className="px-6 py-5 text-left text-sm leading-4 font-semibold max-w-xs">
            Is Writable
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-center">
            Is Signer
          </th>
        </tr>
      </thead>
      <tbody className="divide-[#E5E7EB] dark:divide-[#374151] divide-y-[1px] text-dark">
        {data.transaction.message.accountKeys.map((address: string, index: number) => (
          <tr
            key={index}
            className="hover:bg-[#EDFAFA] dark:hover:bg-[#4e9fa9] cursor-pointer"
            onClick={() =>
              router.push(`/dashboard/account/${address}`)
            }
          >
            <td className="px-6 py-5 whitespace-no-wrap text-[12px] leading-5 flex gap-2 items-center">
              {address}
            </td>
            <td className="px-6 py-5 whitespace-no-wrap text-sm leading-5">
              {data.transaction.message.header.numReadonlyUnsignedAccounts > index ? 'No' : 'Yes'}
            </td>
            <td className="px-6 py-5 whitespace-no-wrap text-sm leading-5 text-center">
              {data.transaction.message.header.numRequiredSignatures > index ? 'Yes' : 'No'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export const AccountKeyTableLoading = ({ classname }: any) => {
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
            Address
          </th>
          <th className="px-6 py-5 text-left text-sm leading-4 font-semibold max-w-xs">
            Is Writable
          </th>
          <th className="px-6 py-5 text-sm leading-4 font-semibold max-w-xs text-center">
            Is Signer
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

export default AccountKeyTable;
