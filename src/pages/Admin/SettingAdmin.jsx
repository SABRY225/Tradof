import AddAdmin from "@/components/Setting/AddAdmin"
import EditProfileAdmin from "@/components/Setting/EditProfileAdmin"
import Plans from "@/components/Setting/Plans"
import { useAuth } from "@/Context/AuthContext"
import PageTitle from "@/UI/PageTitle"
import { GetAllAdmins } from "@/Util/Https/adminHttp"
import { fatchDataUser, getAllSubscriptions } from "@/Util/Https/http"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

function SettingAdmin() {
  const [profileData,setProfileDate] = useState(null);
  const [admins,setAdmins] = useState([]);
  const [plans,setPlans] = useState([]);
const {
    user: { userId, token },
  } = useAuth();
  console.log(userId);
  
  useEffect(()=>{
    const fetchUser=async()=>{
      const data=await fatchDataUser({userId,token});
      setProfileDate(data)
    }
    const fetchAdmins=async()=>{
      const data=await GetAllAdmins();
      setAdmins(data)
    }
    const fetchPlans=async()=>{
      const data=await getAllSubscriptions();
      console.log(data);
      
      setPlans(data)
    }
    fetchUser();
    fetchAdmins();
    fetchPlans();
  },[])



  return (
    <div className="bg-background-color pb-10">
      <PageTitle title="Settings" subtitle="Edit your data" />
      <div className="container max-w-screen-xl mx-auto">
        {/* <EditProfileAdmin profileData={profileData } /> */}
       <AddAdmin admins={admins} setAdmins={setAdmins} />
        <Plans plans={plans} />

      </div>
    </div>
  )
}

export default SettingAdmin
