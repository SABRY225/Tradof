export default function Subscription({ subscriptionData }) {
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
              {subscriptionData.name}
            </span>
          </p>
          <p className="flex gap-16 font-bold font-roboto-condensed">
            Subscription price:{" "}
            <span className="font-bold italic font-roboto-condensed">
              {subscriptionData.price} EUR
            </span>{" "}
            <span className="text-gray-500 text-[13px] italic font-roboto-condensed">
              {Math.floor(
                subscriptionData.price / subscriptionData.durationParMonth / 10
              ) * 10}{" "}
              EUR per month
            </span>
          </p>
        </div>
        <div className="bg-card-color w-full md:w-1/4 flex p-2 ml-4 rounded-lg justify-between rounded-[8px] p-[20px] text-center md:text-left">
          <p className="text-[16px] font-semibold ">Ramming Time</p>
          <p className="text-lg flex justify-between">
            <span className="flex flex-col">
              <span className="font-bold ">0</span>Year
            </span>
            <span className="w-[1.5px] mx-2 h-full bg-main-color"></span>
            <span className="flex flex-col">
              <span className="font-bold ">15</span>Week
            </span>
            <span className="w-[1.5px] mx-2 h-full bg-main-color"></span>
            <span className="flex flex-col">
              <span className="font-bold ">105</span>Day
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
