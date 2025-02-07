import React from 'react'
import PageTitle from '@/UI/PageTitle'
import Rating from '@/components/Client/Profile/Rating'
import ProfileInformation from '@/components/Client/Profile/ProfileInformation'
import ContactInfo from '@/components/Client/Profile/ContactInfo';
import OperationalInfo from '@/components/Client/Profile/OperationalInfo';

export default function Profile() {
    return (
        <>
            <PageTitle title="Your Profile" />
            <div className="container max-w-screen-xl mx-auto p-4 w-full my-[30px] mt-12">
                {/* Rating & Reviews */}
                <Rating  />
                {/* Profile Information */}
                <ProfileInformation />
                {/* Contact Info */}
                <ContactInfo />
                {/* Operational Info */}
                <OperationalInfo />
            </div>
        </>
    )
}
