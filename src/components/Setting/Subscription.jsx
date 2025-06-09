import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { getSubscriptionData } from "@/Util/Https/companyHttp";

export default function Subscription() {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    user: { userId,token },
  } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubscriptionData({id: userId, token });
        setSubscriptionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  console.log(subscriptionData);
  
  if (loading) return <div className="p-5">Loading...</div>;
  if (error) return <div className="p-5 text-red-500">Error: {error}</div>;
  if (!subscriptionData) return null;

  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Subscription Plan
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="bg-card-color w-full md:w-3/4 p-3 rounded-[8px] p-[20px] mb-[10px] md:mb-0">
          <p className="flex gap-32 font-bold font-roboto-condensed">
            Your plan:{" "}
            <span className="italic font-roboto-condensed">
              {subscriptionData?.sub.packageId.name}
            </span>
          </p>
          <p className="flex gap-16 font-bold font-roboto-condensed">
            Subscription price:{" "}
            <span className="font-bold italic font-roboto-condensed">
              {subscriptionData.sub.packageId.price} EGP
            </span>{" "}
            <span className="text-gray-500 text-[13px] italic font-roboto-condensed">
              {Math.floor(
                subscriptionData.sub.packageId.price /
                  subscriptionData.sub.packageId.durationInMonths /
                  10
              ) * 10}{" "}
              EGP per month
            </span>
          </p>
        </div>
        <div className="bg-card-color w-full md:w-1/4 flex p-2 ml-4 rounded-lg justify-between rounded-[8px] p-[20px] text-center md:text-left">
          <p className="text-[16px] font-semibold ">Ramming Time</p>
          <p className="text-lg flex justify-between">
            <span className="flex flex-col">
              <span className="font-bold ">{subscriptionData.remaining.years}</span>Year
            </span>
            <span className="w-[1.5px] mx-2 h-full bg-main-color"></span>
            <span className="flex flex-col">
              <span className="font-bold ">{subscriptionData.remaining.months}</span>months
            </span>
            <span className="w-[1.5px] mx-2 h-full bg-main-color"></span>
            <span className="flex flex-col">
              <span className="font-bold ">{subscriptionData.remaining.days}</span>Day
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
