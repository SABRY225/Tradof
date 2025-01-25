import React from 'react'
import Button from '../UI/Button'
import image_1 from '../assets/images/landing-1.png'
import BreakSection from '../UI/BreakSection'
import SubscriptionSection from './landingPageSections/SubscriptionSection'
import Features from './landingPageSections/Features'
import TopRatedSection from './landingPageSections/TopRatedSection'

export default function LandingPage() {
    return (
        <div className='block md:w-full w-[91vh]'>
                <div className="z-[-1] absolute bg-[#d2d4f6] h-screen md:w-full w-[92vh] flex items-center justify-center "
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)'
                    }}
                >
                </div>
                <div className="z-[-1] absolute bg-[#6c63ff] h-screen md:w-full w-[92vh] flex items-center justify-center "
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 100%)'
                    }}
                >
                </div>


            <div className='container flex sm:py-36 py-28'>
                <div className='left flex flex-col md:items-start items-center justify-center sm:px-36 px-12'>
                    <div className='top felx flex-col mb-14 '>
                        <h1 className='text-6xl font-bold mb-4'> <span className='text-black'>Welcome to</span> <span className='text-white'>Tradof</span></h1>
                        <p className='text-[#d6d5d5] font-semibold text-center'>Your Trusted Partner in Language Translation</p>
                    </div>
                    <p className='text-justify text-lg text-white mb-12'>we understand that communication is at the heart of every successful business. Whether you're expanding into new markets, building relationships with international clients, or sharing your brand story, language should never be a barrier. That's where we come in.</p>
                    <Button
                    text='Get Started'
                    action={''}
                    style={{
                        text: 'text-white',
                        bg: 'bg-[#ff6f61]',
                        hover: 'hover:bg-orange-600',
                        font: 'font-bold',
                        rounded: 'rounded-lg',
                        textSm: 'text-sm',
                        px: 'px-8',
                        py: 'py-3',
                    }}
                    />
                </div>
                <div className='right hidden md:block'>
                    <img src={image_1} alt="" className='w-[1400px]' />
                </div>
            </div>
            <BreakSection text='Subscription plans' label='check you suitable plan for best experience' />
            <SubscriptionSection />
            <BreakSection text='Features' label='Learn more about our features' />
            <Features />
            <BreakSection text='Top 5 Rated' label='check top 5 rated companies and translators' />
            <TopRatedSection />
            </div>
        
    )
}
