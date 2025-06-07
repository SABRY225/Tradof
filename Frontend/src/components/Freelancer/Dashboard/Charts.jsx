import { useAuth } from "@/context/AuthContext";
import CardChart from "@/UI/FreeChart";
import { getStatistics } from "@/Util/Https/freelancerHttp";
import { useQuery } from "@tanstack/react-query";

export default function Charts({ classes }) {
  const {
    user: { userId, token },
  } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["freeChart"],
    queryFn: ({ signal }) => getStatistics({ signal, id: userId, token }),
  });
  // console.log(data);
  const activeChart = data
    ? [{ completed: data.active, inCompleted: data.completed + data.cancelled }]
    : null;
  const inProgressChart = data
    ? [
        {
          completed: data.completed,
          inCompleted: data.active + data.cancelled,
        },
      ]
    : null;
  const acceptedChart = data
    ? [
        {
          completed: data.cancelled,
          inCompleted: data.active + data.completed,
        },
      ]
    : null;
  
  return (
    <div
      className={`bg-main-color rounded-lg flex h-fit flex-grow overflow-x-auto overflow-y-hidden custom-scrollbar ${classes}`}
    >
      <CardChart
        name="Active"
        data={activeChart}
        isLoading={isLoading}
        label="Not active project yet..."
      />
      <CardChart
        name="In progress"
        data={inProgressChart}
        isLoading={isLoading}
        label="Not started project yet..."
      />
      <CardChart
        name="Accepted"
        data={acceptedChart}
        isLoading={isLoading}
        label="Not accepted project yet..."
      />
    </div>
  );
}
