import PageTitle from "@/UI/PageTitle";
import ProfileImage from "../../assets/images/prof2.jpeg";
import Reviews from "@/components/Profile/Reviews";
import ProfileInformation from "@/components/Profile/ProfileInformation";
import ContactInfo from "@/components/Profile/ContactInfo";
import OperationalInfo from "@/components/Profile/OperationalInfo";
import { useAuth } from "@/context/AuthContext";
import TranslationServices from "@/components/Profile/TranslationServices";
import ProfessionalDetails from "@/components/Profile/ProfessionalDetails";

const profileData = {
  image: ProfileImage,
  firstName: "Ahmed",
  lastName: "Nady",
  role: "Freelancer",
  country: "Egypt",
  companyName: "",
  location: "",
  jopTitle: "CEO",
};

const contactData = {
  email: "abdalraz@gmail.com",
  phone: "+20 1030666109",
  location: "Egypt",
};

const preferredLanguages = [
  {
    lang: "French",
    country: "France",
    langCode: "fr",
    countryCode: "FR",
  },
  {
    lang: "English",
    country: "United States",
    langCode: "en",
    countryCode: "US",
  },
];

const industriesServed = ["Medical", "Engineering"];

const languagePairs = [
  {
    from: {
      lang: "English",
      langCode: "en",
      country: "United States",
      countryCode: "US",
    },
    to: {
      lang: "French",
      langCode: "fr",
      country: "France",
      countryCode: "FR",
    },
  },
];

const professionalDetails = {
  cv: "cv.pdf",
  certifications: ["certifications1.pdf", "certifications2.pdf"],
};
export default function Profile() {
  const {
    user: { role },
  } = useAuth();
  console.log(role);
  return (
    <>
      <PageTitle title="Your Profile" />
      <div className="container max-w-screen-xl mx-auto p-4 w-full my-[50px]">
        {/* Rating & Reviews */}
        <Reviews rating={1000} reviews={3000} />
        {/* Profile Information */}
        <ProfileInformation profileData={profileData} />
        {/* Contact Info */}
        <ContactInfo contactData={contactData} />
        {/* Operational Info */}
        {role === "company" && (
          <OperationalInfo
            preferredLanguages={preferredLanguages}
            industriesServed={industriesServed}
          />
        )}
        {role === "Freelancer" && (
          <>
            <TranslationServices languagesPairs={languagePairs} />
            <ProfessionalDetails professionalDetails={professionalDetails} />
          </>
        )}
      </div>
    </>
  );
}
