import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ButtonFelid from "@/UI/ButtonFelid";
import { getStatusPayProject, PayProjectPayment } from "@/Util/Https/companyHttp";
import { useParams } from "react-router-dom";

export default function ProjectPayment({freelancerId,budget,deliveryTime,statusProject}) {
  const {
    user: { token },
  } = useAuth();

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {projectId} = useParams(); 

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getStatusPayProject(token, projectId);
        
        setStatus(data.paymentStatus); 
      } catch (err) {
        console.error("Error fetching status", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [token, projectId]);

  const handlePay = async () => {
    setPayLoading(true);
    setMessage("");
    try {
      const data = await PayProjectPayment(token, projectId, freelancerId, budget, deliveryTime);
      console.log(data);
      if(data.success){
      setMessage("Payment successful");
      window.location.href=data.iframURL
      }
    } catch (err) {
      setMessage("Payment failed: " + (err.response?.data?.message || err.message));
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <div className="flex-1 h-[100%]">
      <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
        Project Finances
      </h1>

      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[10px] py-[20px]">
        {loading ? (
          <p className="text-center text-gray-500">Loading payment status...</p>
        ) : (
<div className="space-y-4 bg-card-color ">
  {loading ? (
    <p className="text-center text-gray-500 italic">Loading payment status...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-3 gap-4 text-center">
      <div className="flex justify-between  items-center bg-white rounded-lg shadow p-2">
        <p className="text-sm text-gray-500 mb-1">Price of Project</p>
        <p className="text-sm font-semibold text-main-color ">{budget || "N/A"} EGP</p>
      </div>

      <div className="flex justify-between  items-center bg-white rounded-lg shadow p-2">
        <p className=" text-sm text-gray-500 mb-1">Agreed Period</p>
        <p className="text-sm font-semibold text-main-color">{deliveryTime || "N/A"} days</p>
      </div>

      <div className="flex justify-between  items-center bg-white rounded-lg shadow p-2">
        <p className=" text-sm text-gray-500 mb-1">Payment Status</p>
        <p className={`text-sm font-semibold ${status === "paid" ? "text-green-600" : "text-red-600"}`}>
          {status || "N/A"}
        </p>
      </div>
    </div>
  )}
</div>

        )}
  {status !== "paid"&&statusProject==="OnReviewing" && <ButtonFelid
          text={payLoading ? "Processing..." : "Pay money"}
          classes="bg-second-color px-10 py-2 font-medium m-auto"
          disabled={payLoading || status === "paid"}
          onClick={handlePay}
        />
}
        
        {message && (
          <p className="text-center mt-2 text-sm text-blue-600">{message}</p>
        )}
      </div>
    </div>
  );
}
