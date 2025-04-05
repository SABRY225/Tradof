import CompanyEmployees from "@/components/Setting/CompanyEmployees"
import EditProfile from "@/components/Setting/EditProfile"
import Subscription from "@/components/Setting/Subscription"
import PageTitle from "@/UI/PageTitle"

function SettingAdmin() {
    const profileData=[]
    const employees=[]
    const subscriptionData=[]
  return (
<div className="bg-background-color py-[50px]">
      <PageTitle title="Settings" subtitle="Edit your data" />
      <div className="container max-w-screen-xl mx-auto">
        <EditProfile profileData={profileData || []} />
        <CompanyEmployees employees={employees || []} />
        <Subscription subscriptionData={subscriptionData || []} />

      </div>
    </div>
  )
}

export default SettingAdmin
