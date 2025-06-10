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
  console.log(data);
  const activeChart = data
    ? [{ completed: data.active, inCompleted: data.completed + data.cancelled }]
    : null;
  const completedChart = data
    ? [
        {
          completed: data.completed,
          inCompleted: data.active + data.cancelled,
        },
      ]
    : null;
  const cancelledChart =  data
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
        label="active project"
      />
      <CardChart
        name="Completed"
        data={completedChart}
        isLoading={isLoading}
        label="completed project"
      />
      <CardChart
        name="Canceled"
        data={cancelledChart}
        isLoading={isLoading}
        label="canceled project"
      />
    </div>
  );
}
