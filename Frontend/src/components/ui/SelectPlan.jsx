// components/SelectPlan.jsx
import axios from "axios";
import { useEffect, useState } from "react";

export default function SelectPlan({ onPlanSelect }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `https://tradofapi-production.up.railway.app/api/package`
        );
        console.log(response);
        
        setPlans(response.data.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSelect = (planId) => {
    setSelectedPlan(planId);
    if (onPlanSelect) {
      onPlanSelect(planId);
    }
  };
  console.log(plans);
  
  if (loading) return <div className="text-center py-10">Loading plans...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 ">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`border rounded-xl p-6 shadow hover:shadow-lg transition-all text-center  ${
            selectedPlan === plan.id ? "border-blue-500 text-[#6D63FF] bg-[#fff]" : "border-gray-300 text-[#fff] bg-[#6D63FF]"
          }`}
        >
          <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
          <p className=" text-2xl font-bold mb-2">{plan.price} EGP</p>
          <p className="text-sm mb-4">{plan.description}</p>
          <button
            onClick={() => handleSelect(plan.id)}
            className={`w-full py-2 rounded ${
              selectedPlan === plan.id
                ? "bg-blue-600 text-white"
                : "bg-[#FF6F61] text-white hover:bg-gray-300"
            }`}
          >
            {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
          </button>
        </div>
      ))}
    </div>
  );
}
