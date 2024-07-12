import { LoadingCard } from "./LoadingCard";
import Image, { StaticImageData } from "next/image";

export const MetricCard = ({
  title,
  value,
  unit,
  icon,
}: {
  title: string;
  value: number | null | string;
  unit?: string;
  icon: StaticImageData;
}) => (
  <div className="flex min-w-[24%] min-h-[200px] border border-[#E5E7EB] dark:border-[#374151] flex-col rounded-lg bg-whiteBg dark:bg-darkBg">
    {value !== null ? (
      <div className="flex-col flex p-5 gap-3">
        <div>
          <Image src={icon} alt="title" width={32} height={32} />
        </div>
        <div>
          <p className="font-light">{title} {unit}</p>
          <h3 className="font-bold text-[30px]">
            {value.toLocaleString()}
          </h3>
        </div>
        
      </div>
    ) : (
      <LoadingCard />
    )}
  </div>
);
