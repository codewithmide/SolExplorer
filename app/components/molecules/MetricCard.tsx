import { FaCircleNotch } from "react-icons/fa";
import { LoadingCard } from "./LoadingCard";

export const MetricCard = ({
  title,
  value,
  unit,
}: {
  title: string;
  value: number | null;
  unit: string;
}) => (
  <div className="flex center w-full flex-col px-6 py-10 rounded-lg card-shadow">
    {value !== null ? (
      <div className="flex-col center gap-4 p-3">
        <FaCircleNotch size={42} />
        <div className="center flex-col">
          <p>{title}</p>
          <h3 className="font-semibold text-xl">
            {value.toLocaleString()} {unit}
          </h3>
        </div>
      </div>
    ) : (
      <LoadingCard />
    )}
  </div>
);
