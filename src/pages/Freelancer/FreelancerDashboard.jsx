import Charts from "@/components/Freelancer/Dashboard/Charts";
import CurrentProjects from "@/components/Freelancer/Dashboard/CurrentProjects";
import DiscoverProject from "@/components/Freelancer/Dashboard/DiscoverProject";
import OffersChart from "@/components/Freelancer/Dashboard/OffersChart";
import Notification from "@/components/shared/Notification";
import Cookies from "js-cookie";

export default function FreelancerDashboard() {

  
  return (
    <>
      <div className="py-8 px-10 bg-background-color overflow-hidden space-y-12">
        <div className="grid grid-cols-[repeat(3,1fr)_auto] gap-x-4 gap-y-10">
          <div className="order-1 col-span-3 row-span-1">
            <Charts classes="charts" />
          </div>
          <div className=" order-3 lg:order-2 col-span-3 row-span-1">
            <CurrentProjects classes="current" />
          </div>
          <div className="order-4 lg:order-3 col-span-3 row-span-1">
            <DiscoverProject classes="discover" />
          </div>
          <div className="flex gap-5 lg:block order-2 lg:order-4 row-start-2 col-span-3 lg:col-span-1 lg:row-span-4 lg:row-start-1 lg:col-start-4 lg:space-y-6">
            <Notification classes="notification max-h-[350px] lg:max-h-fit flex-1 hidden md:block" />
            <OffersChart classes="offers w-full md:max-w-[350px]" />
          </div>
        </div>
      </div>
    </>
  );
}

