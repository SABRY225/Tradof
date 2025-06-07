import Charts from "@/components/Client/dashboard/Charts";
import Notification from "@/components/shared/Notification";
import StartProject from "@/components/Client/dashboard/StartProject";
import UpcomingProject from "@/components/Client/dashboard/UpcomingProjects";

export default function ClientDashboard() {
  return (
    <div className="py-[30px] px-10 space-y-[50px] bg-background-color overflow-hidden">
      <div className="flex gap-[20px]">
        <Charts  />
        <Notification classes="hidden lg:block" />
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-[20px]">
        <StartProject />
        <UpcomingProject />
      </div>
    </div>
  );
}
