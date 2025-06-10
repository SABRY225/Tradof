import PageTitle from "@/UI/PageTitle";
import Reviews from "@/components/Profile/Reviews";
import ProfileInformation from "@/components/Profile/ProfileInformation";
import ContactInfo from "@/components/Profile/ContactInfo";
import OperationalInfo from "@/components/Profile/OperationalInfo";
import { useAuth } from "@/context/AuthContext";
import TranslationServices from "@/components/Profile/TranslationServices";
import ProfessionalDetails from "@/components/Profile/ProfessionalDetails";
import { useLoaderData, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { addReview } from "@/Util/Https/http";
import { getFreelancer } from "@/Util/Https/freelancerHttp";
import { getCompany } from "@/Util/Https/companyHttp";

export default function Profile() {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const share = queryParams.get("share");
  const sessionId = queryParams.get("sessionId");
  const { person: loaderPerson } = useLoaderData();
  const [person, setPerson] = useState(loaderPerson);
  const [role, setRole] = useState(user?.role);

  useEffect(() => {
    console.log(share);
    const fetchSharedData = async () => {
      if (share) {
        const dataParam = queryParams.get("data");
        const id = queryParams.get("id");
        const roleParam = queryParams.get("role");
        console.log(roleParam);
        if (dataParam) {
          try {
            const decodedData = JSON.parse(decodeURIComponent(dataParam));
            setPerson(decodedData);
            setRole(roleParam);
          } catch (error) {
            console.error("Error parsing shared data:", error);
          }
        } else if (id && roleParam) {
          try {
            let data;
            if (roleParam === "Freelancer") {
              data = await getFreelancer({ id, token: user?.token });
            } else if (roleParam === "CompanyAdmin") {
              data = await getCompany({ id, token: user?.token });
            }
            if (data) {
              setPerson(data);
              setRole(roleParam);
            }
          } catch (error) {
            console.error("Error fetching shared profile:", error);
          }
        }
      }
    };

    fetchSharedData();
  }, [share, queryParams, user?.token, user?.role]);

  const profileData = {
    image: person?.profileImageUrl,
    firstName: person?.firstName,
    lastName: person?.lastName,
    role: role,
    country: person?.countryId,
    companyName: person?.companyName,
    jopTitle: person?.jobTitle,
    location: person?.companyAddress,
  };

  const contactData = {
    email: person?.email,
    phone: person?.phone,
    location: person?.companyAddress,
  };

  const languagePairs = person?.freelancerLanguagePairs?.map((lang) => ({
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
    isExam: lang.freeTaken,
    examScore: lang.freeMark,
  }));

  const professionalDetails = {
    cv: person?.cvFilePath,
    certifications: person?.freelancerSpecializations,
  };

  const preferredLanguages = person?.preferredLanguages;
  // console.log(person);
  const industriesServed = person?.specializations;

  const currentURL = new URL(
    window.location.origin + location.pathname + location.search
  );

  const encoded = encodeURIComponent(JSON.stringify(person));
  currentURL.searchParams.set("data", encoded);
  currentURL.searchParams.set("share", "true");
  currentURL.searchParams.set("role", role);

  const finalURL = currentURL.toString();

  return (
    <div className="bg-background-color">
      <div className=" container bg-background-color max-w-screen-xl mx-auto p-4 w-full py-[40px]">
        <Reviews
          rating={person?.ratingSum}
          reviews={person?.profileViews}
          isShared={share}
          currentURL={finalURL}
        />
        <ProfileInformation profileData={profileData} isShared={share} />
        <ContactInfo contactData={contactData} isShared={share} />
        {role === "CompanyAdmin" && (
          <OperationalInfo
            preferredLanguages={preferredLanguages}
            industriesServed={industriesServed}
            isShared={share}
          />
        )}
        {role === "Freelancer" && (
          <>
            <TranslationServices
              languagesPairs={languagePairs}
              isShared={share}
            />
            <ProfessionalDetails
              professionalDetails={professionalDetails}
              isShared={share}
            />
          </>
        )}
      </div>
    </div>
  );
}
