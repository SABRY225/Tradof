import AddAdmin from "@/components/Setting/AddAdmin"
import CompanyEmployees from "@/components/Setting/CompanyEmployees"
import EditProfile from "@/components/Setting/EditProfile"
import Plans from "@/components/Setting/Plans"
import Subscription from "@/components/Setting/Subscription"
import PageTitle from "@/UI/PageTitle"

function SettingAdmin() {
    const profileData=[]
    const employees=[]
    const subscriptionData=[]
    const plans=[
      {
        planName:"Free",
        Duration:"1 Month",
        Price:"0 EUR"
      }
      ,
      {
        planName:"Free",
        Duration:"1 Month",
        Price:"0 EUR"
      }
      ,
      {
        planName:"Free",
        Duration:"1 Month",
        Price:"0 EUR"
      }
    ]
    
    
    const admins = [
      {
        name: "Ahmed Nady",
        jobTitle: "HR",
        email: "dev.ahmed.nady@gmail.com",
        password: "12345678910ma",
        phone: "01023536355",
        city: "Qena",
        country: "Egypt",
        permission: "Project Management",
      },
      // Duplicate entries to match the provided table structure
      {
        name: "Ahmed Nady",
        jobTitle: "HR",
        email: "dev.ahmed.nady@gmail.com",
        password: "12345678910ma",
        phone: "01023536355",
        city: "Qena",
        country: "Egypt",
        permission: "Project Management",
      },
      {
        name: "Ahmed Nady",
        jobTitle: "HR",
        email: "dev.ahmed.nady@gmail.com",
        password: "12345678910ma",
        phone: "01023536355",
        city: "Qena",
        country: "Egypt",
        permission: "Project Management",
      },
      {
        name: "Ahmed Nady",
        jobTitle: "HR",
        email: "dev.ahmed.nady@gmail.com",
        password: "12345678910ma",
        phone: "01023536355",
        city: "Qena",
        country: "Egypt",
        permission: "Project Management",
      },
    ];
    
    
    
    
        
  return (
<div className="bg-background-color py-[50px]">
      <PageTitle title="Settings" subtitle="Edit your data" />
      <div className="container max-w-screen-xl mx-auto">
        <EditProfile profileData={profileData || []} />
        <AddAdmin admins={admins } />
        <Plans plans={plans} />

      </div>
    </div>
  )
}

export default SettingAdmin
