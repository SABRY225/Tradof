import { RadialStackedChart } from "@/UI/RadialStackedChart";
const chartData = [{ completed: 500, inCompleted: 570 }];

export default function Charts({ classes }) {
  return (
    <div
      className={`bg-main-color rounded-lg flex h-fit flex-grow overflow-x-auto overflow-y-hidden custom-scrollbar ${classes}`}
    >
      <div className="flex flex-col w-full items-center p-3">
        <RadialStackedChart data={chartData} label="Completed project" />
        <div className="flex text-white justify-between w-[200px] p-2 border-t-2 ">
          <p className="font-light">Complete projects</p>
          <span>{chartData[0].completed}</span>
        </div>
      </div>
      <div className="flex flex-col w-full items-center p-3">
        <RadialStackedChart data={chartData} label="Completed project" />
        <div className="flex text-white justify-between w-[200px] p-2 border-t-2 ">
          <p className="font-light">Complete projects</p>
          <span>{chartData[0].completed}</span>
        </div>
      </div>
      <div className="flex flex-col w-full items-center p-3">
        <RadialStackedChart data={chartData} label="Completed project" />
        <div className="flex text-white justify-between w-[200px] p-2 border-t-2 ">
          <p className="font-light">Complete projects</p>
          <span>{chartData[0].completed}</span>
        </div>
      </div>
    </div>
  );
}
