import PageTitle from "@/UI/PageTitle"
import { getStartedProjects } from "@/Util/Https/companyHttp";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"

function StartedProjects() {
  const [data,setData]=useState([])
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    console.log(token);
    console.log(userId);
    
  useEffect(()=>{
      const FatchData=async()=>{
        const data = await getStartedProjects({ id: userId ,token});
        setData(data);
      }
      FatchData();
  },[token,userId])
  console.log(data);
  
  return (
    <>
    <PageTitle title="Started Project" subtitle="Project has been assigned to freelancer" />
    <div className="flex justify-around items-center my-10">
      <div>1</div>
      <div>2</div>
    </div>
    </>
  )
}

export default StartedProjects
