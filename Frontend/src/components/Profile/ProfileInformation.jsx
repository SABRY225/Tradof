import { getCountryById } from "@/Util/Https/http";
import { useQuery } from "@tanstack/react-query";

const DisableInput = ({ label, value }) => {
  return (
    <div className="flex flex-col w-[300px] gap-1">
      <label className="text-gray-600 text-sm">{label}</label>
      <input
        type="text"
        disabled
        className="bg-[#F1F2F3] font-epilogue text-[#212225] outline-none rounded p-2"
        value={value}
      />
    </div>
  );
};

export default function ProfileInformation({ profileData }) {
  const { data: country } = useQuery({
    queryKey: ["country"],
    queryFn: ({ signal }) =>
      getCountryById({ signal, id: profileData.country }),
  });

  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Profile Information
      </h1>
      <form className="flex flex-col items-center md:items-start space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <div className="flex flex-col font-epilogue text-[14px] text-center md:text-left  mb-[20px]">
          <div className="flex items-center space-x-6">
            <img
              src={profileData.image}
              alt="Profile"
              width={140}
              className="h-[140px] rounded-full border-4 border-white shadow-lg"
            />
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-poppins">
                {profileData.firstName + " " + profileData.lastName}
              </h3>
              <p className="text-[16px] text-gray-600">{profileData.role}</p>
              <p className="text-[14px] text-gray-500">
                {country && country.name + " " + profileData.location}
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5 md:w-full font-epilogue text-[14px] items-center text-left">
          <DisableInput label="First name" value={profileData.firstName} />
          <DisableInput label="Last name" value={profileData.lastName} />
          {profileData.jopTitle && (
            <DisableInput label="Jop title" value={profileData.jopTitle} />
          )}
          {profileData.className && (
            <DisableInput
              label="Company name"
              value={profileData.companyName}
            />
          )}
        </div>
      </form>
    </div>
  );
}
