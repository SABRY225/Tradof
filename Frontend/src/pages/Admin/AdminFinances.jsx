import Cards from "@/components/Admin/finances/cards";
import Chart from "@/components/Admin/finances/Chart";
import Subscriptions from "@/components/Admin/finances/subscriptions";

function AdminFinances() {
  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px] space-y-10">
        <Cards />
        <Chart />
        <Subscriptions />
      </div>
    </div>
  );
}

export default AdminFinances;
