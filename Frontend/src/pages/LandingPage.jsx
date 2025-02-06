
import BreakSection from '../UI/BreakSection'
import SubscriptionSection from '../components/landingPageSections/SubscriptionSection'
import Features from '../components/landingPageSections/Features'
import TopRatedSection from '../components/landingPageSections/TopRatedSection'
import Home from '../components/landingPageSections/Home'
import ContactUs from '../components/landingPageSections/ContactUs'

export default function LandingPage() {
  return (
    <div className='block w-full'>
      <Home />
      <BreakSection id="Plans" text='Subscription plans' label='check you suitable plan for best experience' />
      <SubscriptionSection />
      <BreakSection id="Features" text='Features' label='Learn more about our features' />
      <Features />
      <BreakSection id="Rated" text='Top 5 Rated' label='check top 5 rated companies and translators' />
      <TopRatedSection />
      {/* <BreakSection id="Contact Us" text='Contact Us' label='Get in touch with our support team' /> */}
      <ContactUs id="Contact Us"/>
    </div>

  )
}