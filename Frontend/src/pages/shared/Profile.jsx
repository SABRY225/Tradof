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
import { useEffect } from "react";
import { addReview } from "@/Util/Https/http";

export default function Profile() {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const share = queryParams.get("share");
  const sessionId = queryParams.get("sessionId"); // assuming this is part of the URL

  const { person, role } = useLoaderData();
  const addReviewMutation = useMutation({
    mutationFn: () => addReview({ id: person.userId }), // customize if needed
    onSuccess: () => {
      console.log("Review submitted from shared link.");
    },
    onError: (error) => {
      console.error("Error submitting review", error);
    },
  });
  useEffect(() => {
    if (share) {
      console.log(sessionId);;
      addReviewMutation.mutate();
    }
  }, [share]);
  // console.log(person);
  const profileData = {
    image: person?.profileImageUrl,
    firstName: person?.firstName,
    lastName: person?.lastName,
    role: user?.role || role,
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
  }));

  const professionalDetails = {
    cv: person?.cvFilePath,
    certifications: person?.freelancerSpecializations,
  };

  const preferredLanguages = person?.preferredLanguages;

  const industriesServed = person?.specializations;

  const currentURL = new URL(
    window.location.origin + location.pathname + location.search
  );

  // Encode and append to URL as query string
  const encoded = encodeURIComponent(JSON.stringify(person));
  currentURL.searchParams.set("data", encoded); // URL becomes ?...&data=...
  currentURL.searchParams.set("share", "true"); // URL becomes ?...&data=...
  currentURL.searchParams.set("role", role || user?.role); // URL becomes ?...&data=...

  // Final shareable URL as string
  const finalURL = currentURL.toString();

  return (
    <div className="bg-background-color">
      <div className=" container bg-background-color max-w-screen-xl mx-auto p-4 w-full py-[40px]">
        {/* Rating & Reviews */}
        <Reviews
          rating={person?.ratingSum}
          reviews={person?.profileViews}
          isShared={share}
          currentURL={finalURL}
        />
        {/* Profile Information */}
        <ProfileInformation profileData={profileData} isShared={share} />
        {/* Contact Info */}
        <ContactInfo contactData={contactData} isShared={share} />
        {/* Operational Info */}
        {(user?.role || role) === "CompanyAdmin" && (
          <OperationalInfo
            preferredLanguages={preferredLanguages}
            industriesServed={industriesServed}
            isShared={share}
          />
        )}
        {(user?.role || role) === "Freelancer" && (
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
