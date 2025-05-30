import BreakSection from "../UI/BreakSection";
import SubscriptionSection from "../components/landingPageSections/SubscriptionSection";
import Features from "../components/landingPageSections/Features";
import TopRatedSection from "../components/landingPageSections/TopRatedSection";
import Home from "../components/landingPageSections/Home";
import ContactUs from "../components/landingPageSections/ContactUs";
import { useQuery } from "@tanstack/react-query";
import { getAllSubscriptions } from "@/Util/Https/http";
import { useLoaderData } from "react-router-dom";
import TeamPage from "./TeamPage";

export default function LandingPage() {
  const { cards } = useLoaderData();

  return (
    <div className="block w-full">
      <Home />
      <BreakSection
        id="Plans"
        text="Subscription plans"
        label="check you suitable plan for best experience"
      />
      <SubscriptionSection cards={cards} />
      <BreakSection
        id="Features"
        text="Features"
        label="Learn more about our features"
      />
      <Features />
      <BreakSection
        id="Rated"
        text="Top 5 Rated"
        label="check top 5 rated companies and translators"
      />
      <TopRatedSection />
      <BreakSection
        id="Rated"
        text="Developer Team"
        label="The development team of the Tradof platform and application"
      />
      <TeamPage />
      {/* <BreakSection id="Contact Us" text='Contact Us' label='Get in touch with our support team' /> */}
      <ContactUs id="Contact Us" />
    </div>
  );
}

export const subscriptionsLoader = async ({ request }) => {
  const data = await getAllSubscriptions({ signal: request.signal });

  const indexedData = data.map((item, index) => ({
    ...item,
    index, // Adding index
  }));
  return { cards: indexedData };
};
