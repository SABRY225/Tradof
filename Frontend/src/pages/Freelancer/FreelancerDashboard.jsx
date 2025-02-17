import Charts from "@/components/Freelancer/Dashboard/Charts";
import CurrentProjects from "@/components/Freelancer/Dashboard/CurrentProjects";
import DiscoverProject from "@/components/Freelancer/Dashboard/DiscoverProject";
import OffersChart from "@/components/Freelancer/Dashboard/OffersChart";
import Notification from "@/components/shared/Notification";

export default function FreelancerDashboard() {
  return (
    <div className="py-[30px] px-10 space-y-[50px] bg-background-color overflow-hidden">
      <div className="flex gap-[30px]">
        <div className="flex-grow space-y-[30px]">
          <Charts />
          <CurrentProjects />
          <DiscoverProject/>
        </div>
        <div className="flex flex-col gap-[30px]">
          <Notification />
          <OffersChart />
        </div>
      </div>
    </div>
  );
}
