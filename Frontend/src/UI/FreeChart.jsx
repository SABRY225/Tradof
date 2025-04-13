import { FadeLoader } from "react-spinners";
import { RadialStackedChart } from "./RadialStackedChart";

export default function CardChart({ name, data, isLoading, label }) {
  console.log(data);
  return (
    <div className="flex flex-col w-full items-center p-3 justify-between">
      {data && (
        <>
          {data[0]?.completed > 0 ? (
            <RadialStackedChart data={data} label="Completed project" />
          ) : (
            <div className="text-white m-auto font-bold">{label}</div>
          )}
          <div className="flex text-white justify-between w-[200px] p-2 border-t-2">
            <p className="font-light">{name} projects</p>
            <span>{data[0]?.completed}</span>
          </div>
        </>
      )}
      {isLoading && (
        <FadeLoader
          color="#fff"
          height={12}
          width={5}
          loading
          margin={5}
          radius={15}
          speedMultiplier={1}
        />
      )}
    </div>
  );
}
