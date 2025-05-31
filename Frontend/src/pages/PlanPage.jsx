import SelectPlan from "@/components/ui/SelectPlan";
import logo from "../assets/icons/logo.svg"
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
export default function PlanPage() {
    const {
      user: { userId, role },
    } = useAuth();
  const {token} = useParams();
  const navigate = useNavigate();

  const handlePlanSelect = async(planId) => {
    console.log("Selected plan:", planId);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_NODE_URL}/payment/subscription`,
        { packageId:planId }, // body of the request
        {
          headers: {
            Authorization: `${token}`, // رأس المصادقة
          },
        }
      );
      
      if(response.data.type=="Free"){
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        if(role==="admin"){
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        }else{
          navigate("/user/dashboard"); // Redirect after login
        }
      }else{
       window.location.href=response.data.iframURL
      }
      
    } catch (err) {
      toast.error(err?.message , {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 text-center">
      <div className="flex justify-center"><img src={logo} alt={logo}  width={150} /></div>
      <h1 className="text-3xl font-bold mb-6 text-center mt-5 text-[#6D63FF] ">Choose Your Plan</h1>
      <SelectPlan onPlanSelect={handlePlanSelect}  />
    </div>
  );
}
