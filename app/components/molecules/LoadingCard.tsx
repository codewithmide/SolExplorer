export const LoadingCard = () => (
  <div className="flex min-w-[24%] min-h-[200px] border border-[#E5E7EB] dark:border-[#374151] flex-col rounded-lg bg-whiteBg dark:bg-darkBg" style={{ minHeight: "8rem" }}>
    <div className="animate-pulse w-full gap-2 flex flex-col p-5">
      <div className="mt-2 w-10 h-10 bg-gray-200"></div>
      <div className="bg-gray-200 h-6 w-[80%]"></div>
      <div className="w-20 h-12 bg-gray-200"></div>
    </div>
  </div>
);
