import Button from "../UI/ButtonFelid";
import BreakSection from "../UI/BreakSection";
import SubscriptionSection from "../components/landingPageSections/SubscriptionSection";
import Features from "../components/landingPageSections/Features";
import TopRatedSection from "../components/landingPageSections/TopRatedSection";
import Home from "../components/landingPageSections/Home";
import ContactUs from "../components/landingPageSections/ContactUs";

export default function LandingPage() {
  return (
    <div className="block w-full">
      <Home />
      <BreakSection
        text="Subscription Plans"
        label="check you suitable plan for best experience"
      />
      <SubscriptionSection id="Plans" />
      <BreakSection text="Features" label="Learn more about our features" />
      <Features id="Features" />
      <BreakSection
        text="Top 5 Rated"
        label="check top 5 rated companies and translators"
      />
      <TopRatedSection id="Rated" />
      <ContactUs id="Contact Us" />
    </div>
  );
}
