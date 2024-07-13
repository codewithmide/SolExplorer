import { LoadingCard } from "@/app/components/molecules/LoadingCard";

export const TransactionCard = ({
  title,
  value,
  status,
  statusStyle,
}: {
  title: string;
  value?: string | any;
  status?: string;
  statusStyle?: string;
}) => (
  <div className="flex min-w-[23%] min-h-[200px] border border-[#E5E7EB] dark:border-[#374151] flex-col rounded-lg bg-whiteBg dark:bg-darkBg">
    {value !== null ? (
      <div className="flex-col w-full h-full my-auto items-start justify-center flex p-5 gap-3">
        <div className="my-auto">
          <p className="font-light">{title}</p>
          <h3 className="font-bold text-wrap text-[30px]">{value}</h3>
        </div>
        {/* {status && (
          <div className={`mt-2 px-2 py-1 rounded-full text-center ${statusStyle}`}>
            <small>{status}</small>
          </div>
        )} */}
      </div>
    ) : (
      <LoadingCard />
    )}
  </div>
);
