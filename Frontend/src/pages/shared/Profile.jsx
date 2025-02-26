import PageTitle from "@/UI/PageTitle";
import ProfileImage from "../../assets/images/prof2.jpeg";
import Reviews from "@/components/Profile/Reviews";
import ProfileInformation from "@/components/Profile/ProfileInformation";
import ContactInfo from "@/components/Profile/ContactInfo";
import OperationalInfo from "@/components/Profile/OperationalInfo";
import { useAuth } from "@/context/AuthContext";
import TranslationServices from "@/components/Profile/TranslationServices";
import ProfessionalDetails from "@/components/Profile/ProfessionalDetails";
import { useQuery } from "@tanstack/react-query";
import { getFreelancer } from "@/Util/Https/freelancerHttp";
import Loading from "../Loading";
import { getCompany } from "@/Util/Https/companyHttp";


export default function Profile() {
  const {
    user: { role, userId, token },
  } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [role],
    queryFn: ({ signal }) =>
      role === "Freelancer"
        ? getFreelancer({
            signal,
            token,
            id: userId,
          })
        : getCompany({ signal, token, id: userId }),
  });
  // console.log(role);
  if (isLoading) return <Loading />;

  const profileData = {
    image: data?.profileImageUrl,
    firstName: data?.firstName,
    lastName: data?.lastName,
    role: role,
    country: data?.countryId,
    companyName: data?.companyName,
    jopTitle: data?.jobTitle,
    location: data?.companyAddress,
  };

  const contactData = {
    email: data?.email,
    phone: data?.phone,
    location: data?.companyAddress,
  };

  const languagePairs = data?.freelancerLanguagePairs?.map((lang) => ({
    id: lang.id,
    from: {
      id: lang.languageFromId,
      lang: lang.languageFromName,
      langCode: lang.languageFromCode,
      country: lang.countryFromName,
      countryCode: lang.countryFromCode,
    },
    to: {
      id: lang.languageToId,
      lang: lang.languageToName,
      langCode: lang.languageToCode,
      country: lang.countryToName,
      countryCode: lang.countryToCode,
    },
  }));

  const professionalDetails = {
    cv: data?.cvFilePath,
    certifications: data?.freelancerSpecializations,
  };

  const preferredLanguages = data?.preferredLanguages;

  const industriesServed = data?.specializations;

  console.log(data);
  return (
    <>
      <PageTitle title="Your Profile" />
      <div className="container max-w-screen-xl mx-auto p-4 w-full my-[50px]">
        {/* Rating & Reviews */}
        <Reviews rating={data?.ratingSum} reviews={data?.reviewCount} />
        {/* Profile Information */}
        <ProfileInformation profileData={profileData} />
        {/* Contact Info */}
        <ContactInfo contactData={contactData} />
        {/* Operational Info */}
        {role === "CompanyAdmin" && (
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
