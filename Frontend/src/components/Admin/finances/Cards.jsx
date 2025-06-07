import { cardRemove, cardTick, strongBox } from "@/assets/paths";
import { useAuth } from "@/context/AuthContext";
import { getAdminStatistics } from "@/Util/Https/adminHttp";
import { useQuery } from "@tanstack/react-query";

export default function Cards() {
  const {
    user: { token },
  } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: ({ signal }) => getAdminStatistics({ signal, token }),
  });
  const totalSubscription = data?.totalSubscription;
  const totalPendingMoney = data?.totalPendingMoney;
  const totalMoneyByFreelancers = data?.totalMoneyByFreelancers;
  const totalMoneyByFreelancersReceive = data?.totalMoneyByFreelancersReceive;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 xl:gap-16">
      <div className="bg-card-color p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Total subscription money</h1>
          <img src={strongBox} alt="icon" className="w-6 h-6" />
        </div>
        <p className="text-lg mt-2">${totalSubscription}</p>
      </div>

      <div className="bg-card-color p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Total money earned by freelancers</h1>
          <img src={cardTick} alt="icon" className="w-6 h-6" />
        </div>
        <p className="text-lg mt-2">${totalMoneyByFreelancers}</p>
      </div>

      <div className="bg-card-color p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Total pending balance</h1>
          <img src={cardRemove} alt="icon" className="w-6 h-6" />
        </div>
        <p className="text-lg mt-2">${totalPendingMoney}</p>
      </div>
            <div className="bg-card-color p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-medium">Total Money Freelancers Receive</h1>
          <img src={cardRemove} alt="icon" className="w-6 h-6" />
        </div>
        <p className="text-lg mt-2">${totalMoneyByFreelancersReceive}</p>
      </div>
    </div>
  );
}
