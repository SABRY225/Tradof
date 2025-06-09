import InfoCard from "@/components/Admin/dashboard/InfoCard";
import {
  group_light,
  group_list,
  people,
  Done_ring_round,
  layer,
  active,
  online,
} from "../../assets/paths.js";
import { LineChartCard } from "@/components/Admin/dashboard/LineChartCard.jsx";
import Notification from "@/components/shared/Notification.jsx";
import Freelancers from "@/components/Admin/dashboard/Freelancers.jsx";
import Companies from "@/components/Admin/dashboard/Companies.jsx";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStatistics,
  getStatistics,
  getFreelancersAndCompanies,
} from "@/Util/Https/adminHttp";
import { useAuth } from "@/Context/AuthContext.jsx";

export default function Dashboard() {
  const {
    user: { token },
  } = useAuth();

  const { data: dashboardStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => getDashboardStatistics({ token }),
  });

  const { data: statistics, isLoading: isLoadingChart } = useQuery({
    queryKey: ["statistics", new Date().getFullYear()],
    queryFn: () => getStatistics({ token, year: new Date().getFullYear() }),
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getFreelancersAndCompanies({ token }),
  });

  const freelancers = users?.filter((user) => user.role === "Freelancer") || [];
  const companies = users?.filter((user) => user.role === "CompanyAdmin") || [];

  if (isLoadingStats || isLoadingChart || isLoadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-background-color p-[50px] py-[30px]">
      <div className="max-w-full mx-auto space-y-10">
        <div className="overflow-x-auto custom-scrollbar ">
          <div className="min-w-[600px] flex gap-5 flex-row flex-wrap">
            <InfoCard
              name="Projects"
              number={dashboardStats?.numberOfProjects || "0"}
              icon={layer}
              label="Completed projects"
              labelIcon={Done_ring_round}
            />
            <InfoCard
              name="Company"
              number={dashboardStats?.numberOfCompanies || "0"}
              icon={people}
              label="2 project par company"
              labelIcon={active}
            />
            <InfoCard
              name="Freelancer"
              number={dashboardStats?.numberOfFreelancers || "0"}
              icon={group_list}
              label="Daily work"
            />
            <InfoCard
              name="Admins"
              number={dashboardStats?.numberOfAdmins || "0"}
              icon={group_light}
              label={`${
                dashboardStats?.numberOfAdminsOnline || "0"
              } are online`}
              labelIcon={online}
            />
          </div>
        </div>
        <div className="max-w-full flex gap-[20px]">
          <LineChartCard classes="flex-grow" data={statistics || []} />
          <Notification classes="hidden lg:block" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          <Freelancers freelancers={freelancers} />
          <Companies companies={companies} />
        </div>
      </div>
    </div>
  );
}
