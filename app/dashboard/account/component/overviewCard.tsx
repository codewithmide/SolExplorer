import Image, { StaticImageData } from "next/image";
import { IoMdInformationCircle } from "react-icons/io";

const OverviewCard = ({
  title,
  value,
  unit,
  icon,
  tooltip,
}: {
  title: string;
  value: number | null | string;
  unit?: string;
  icon: StaticImageData;
  tooltip?: boolean;
}) => {
  return (
    <div className="flex min-w-[49%] border border-[#E5E7EB] dark:border-[#374151] flex-col rounded-lg bg-whiteBg dark:bg-darkBg">
      {value !== null ? (
        <div className="flex-col flex my-auto p-10 gap-3">
          <div>
            <Image
              src={icon}
              alt="title"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="flex gap-2">
              <p className="font-light">{title}</p>
              {tooltip && (
                <div className="tooltip my-auto">
                  <IoMdInformationCircle size={24} />
                  <span className="tooltiptext">
                    Allocated space typically refers to the storage space used
                    by accounts on the Solana blockchain. Solana accounts, which
                    include wallet addresses, smart contract accounts, and token
                    accounts, must store data on the blockchain. This data
                    storage consumes a certain amount of Solana tokens
                  </span>
                </div>
              )}
            </div>
            <h3 className="font-bold text-[30px]">
              {value?.toLocaleString()} {unit}
            </h3>
          </div>
        </div>
      ) : (
        <OverviewLoadingCard />
      )}
    </div>
  );
};

export const OverviewLoadingCard = () => (
  <div className="w-full rounded-lg center" style={{ minHeight: "8rem" }}>
    <div className="animate-pulse w-full gap-2 flex flex-col p-5">
      <div className="mt-2 w-10 h-10 bg-gray-200"></div>
      <div className="bg-gray-200 h-6 w-[80%]"></div>
      <div className="w-20 h-12 bg-gray-200"></div>
    </div>
  </div>
);

export default OverviewCard;
