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

const data = [
  { month: "January", companies: 186, freelancer: 80, projects: { number: 500, cost: 120000 } },
  { month: "February", companies: 305, freelancer: 200, projects: { number: 50, cost: 30000 } },
  { month: "March", companies: 237, freelancer: 120, projects: { number: 200, cost: 75000 } },
  { month: "April", companies: 73, freelancer: 190, projects: { number: 350, cost: 95000 } },
  { month: "May", companies: 209, freelancer: 130, projects: { number: 400, cost: 110000 } },
  { month: "June", companies: 214, freelancer: 140, projects: { number: 40, cost: 20000 } },
  { month: "July", companies: 150, freelancer: 100, projects: { number: 0, cost: 0 } }, // No projects
  { month: "August", companies: 0, freelancer: 80, projects: { number: 300, cost: 85000 } },
  { month: "September", companies: 280, freelancer: 0, projects: { number: 450, cost: 130000 } },
  { month: "October", companies: 320, freelancer: 250, projects: { number: 0, cost: 0 } }, // No projects
  { month: "November", companies: 210, freelancer: 90, projects: { number: 230, cost: 70000 } },
  { month: "December", companies: 190, freelancer: 120, projects: { number: 500, cost: 140000 } }
];


export default function Dashboard() {
  return (
    <div className="bg-background-color p-[50px] py-[30px]">
      <div className="max-w-full mx-auto space-y-10">
        <div className="overflow-x-auto custom-scrollbar ">
          <div className="min-w-[600px] flex gap-5 flex-row flex-wrap">
            <InfoCard
              name="Projects"
              number="105"
              icon={layer}
              label="Completed projects"
              labelIcon={Done_ring_round}
            />
            <InfoCard
              name="Company"
              number="10"
              icon={people}
              label="2 project par company"
              labelIcon={active}
            />
            <InfoCard
              name="Freelancer"
              number="25"
              icon={group_list}
              label="Daily work"
            />
            <InfoCard
              name="Admins"
              number="3"
              icon={group_light}
              label="2 are online"
              labelIcon={online}
            />
          </div>
        </div>
        <div className="max-w-full flex gap-[20px]">
          <LineChartCard classes="flex-grow" data={data} />
          <Notification classes="hidden lg:block" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
          <Freelancers />
          <Companies />
        </div>
      </div>
    </div>
  );
}
