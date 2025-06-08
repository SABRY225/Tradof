import ChangePassword from "@/components/Setting/ChangePassword";
import CompanyEmployees from "@/components/Setting/CompanyEmployees";
import EditProfile from "@/components/Setting/EditProfile";
import Notifications from "@/components/Setting/Notifications";
import SocialMedia from "@/components/Setting/SocialMedia";
import Subscription from "@/components/Setting/Subscription";
import { useAuth } from "@/context/AuthContext";
import PageTitle from "@/UI/PageTitle";
import { getCompany, getEmployeeToCompany } from "@/Util/Https/companyHttp";
import { getFreelancer } from "@/Util/Https/freelancerHttp";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useLoaderData } from "react-router-dom";

const subscriptionData = {
  name: "1 Year",
  price: 500,
  durationParMonth: 12,
  startDate: "10/05/2015",
};

export default function Setting() {
  const {
    user: { userId, token },
  } = useAuth();
  const { data, role } = useLoaderData();
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: ({ signal }) =>
      getEmployeeToCompany({ signal, id: userId, token }),
  });

  const profileData = {
    image: data?.profileImageUrl,
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phone: data?.phone,
    location: data?.companyAddress,
    country: data?.countryId,
    companyName: data?.companyName,
    jopTitle: data?.jobTitle,
  };

  const socialMedia = data?.socialMedia || data?.freelancerSocialMedias;
  // console.log(socialMedia);
  return (
    <div className="bg-background-color">
      <PageTitle title="Settings" subtitle="Edit your data" />
      <div className="container max-w-screen-xl mx-auto">
        {/* Edit Profile */}
        <EditProfile profileData={profileData} />
        {/* Social Media */}
        <SocialMedia socialMedia={socialMedia} />
        {/* Company Employees */}
        {role === "CompanyAdmin" && (
          <>
            <CompanyEmployees employees={employees || []} />
            <Subscription subscriptionData={subscriptionData} />
          </>
        )}
        {/* Subscription */}
        {/* Change Password */}
        <ChangePassword />
        {/* Notifications */}
        <Notifications />
      </div>
    </div>
  );
}

export async function settingsLoader({ request }) {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const data =
    role === "Freelancer"
      ? await getFreelancer({ token, id: userId })
      : await getCompany({ token, id: userId });

  return { data, role };
}
