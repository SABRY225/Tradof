import React from 'react'
import PageTitle from '@/UI/PageTitle'
import Subscription from "@/components/Client/Setting/Subscription";
import ChangePassword from "@/components/Client/Setting/ChangePassword";
import Notifications from "@/components/Client/Setting/Notifications";
import EditProfile from "@/components/Client/Setting/EditProfile";
import SocialMedia from "@/components/Client/Setting/SocialMedia";
import CompanyEmployees from '@/components/Client/Setting/CompanyEmployees';


export default function Setting() {
    return (
        <>
            <PageTitle title="Setting" />
            <div className="container max-w-screen-xl mx-auto p-4 w-full my-[30px] mt-12">
                {/* Edit Profile */}
                <EditProfile />
                {/* Social Media */}
                <SocialMedia />
                {/* Company Employees */}
                <CompanyEmployees />
                {/* Subscription */}
                <Subscription />
                {/* Change Password */}
                <ChangePassword />
                {/* Notifications */}
                <Notifications />
            </div>
        </>
    )
}
