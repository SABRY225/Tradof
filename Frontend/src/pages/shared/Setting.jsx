import profile from "../../assets/images/prof2.jpeg";

import ChangePassword from "@/components/Setting/ChangePassword";
import CompanyEmployees from "@/components/Setting/CompanyEmployees";
import EditProfile from "@/components/Setting/EditProfile";
import Notifications from "@/components/Setting/Notifications";
import SocialMedia from "@/components/Setting/SocialMedia";
import Subscription from "@/components/Setting/Subscription";
import { useAuth } from "@/context/AuthContext";
import PageTitle from "@/UI/PageTitle";
import { duration } from "@mui/material";

const profileData = {
  image: "https://userpic.codeforces.org/2369964/title/ee54ef592a88f2c9.jpg",
  firstName: "Ahmed",
  lastName: "Nady",
  email: "abdaraz@gmail.com",
  phone: "+201030666109",
  location: "Qena",
  country: "Egypt",
};

const socialMedia = {
  facebook: "",
  linkedin: "",
  gmail: "",
};

const employees = [
  {
    name: "Ahmed Nady",
    jobTitle: "HR",
    email: "dev.ahmed.nady@gmail.com",
    password: "12345678910ma",
    phone: "01023536355",
    city: "Qena",
    country: "Egypt",
    permission: "Project Management",
  },
  // Duplicate entries to match the provided table structure
  {
    name: "Ahmed Nady",
    jobTitle: "HR",
    email: "dev.ahmed.nady@gmail.com",
    password: "12345678910ma",
    phone: "01023536355",
    city: "Qena",
    country: "Egypt",
    permission: "Project Management",
  },
  {
    name: "Ahmed Nady",
    jobTitle: "HR",
    email: "dev.ahmed.nady@gmail.com",
    password: "12345678910ma",
    phone: "01023536355",
    city: "Qena",
    country: "Egypt",
    permission: "Project Management",
  },
  {
    name: "Ahmed Nady",
    jobTitle: "HR",
    email: "dev.ahmed.nady@gmail.com",
    password: "12345678910ma",
    phone: "01023536355",
    city: "Qena",
    country: "Egypt",
    permission: "Project Management",
  },
];

const subscriptionData = {
  name: "1 Year",
  price: 500,
  durationParMonth: 12,
  startDate: "10/05/2015",
};

export default function Setting() {
  const {
    user: { role },
  } = useAuth();
  return (
    <>
      <PageTitle title="Settings" subtitle="Edit your data" />
      <div className="container max-w-screen-xl mx-auto my-[50px]">
        {/* Edit Profile */}
        <EditProfile profileData={profileData} />
        {/* Social Media */}
        <SocialMedia socialMedia={socialMedia} />
        {/* Company Employees */}
        {role === "company" && (
          <>
            <CompanyEmployees employees={employees} />
            <Subscription subscriptionData={subscriptionData} />
          </>
        )}
        {/* Subscription */}
        {/* Change Password */}
        <ChangePassword />
        {/* Notifications */}
        <Notifications />
      </div>
    </>
  );
}
