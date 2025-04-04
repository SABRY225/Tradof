import { useAuth } from "@/context/AuthContext";
import ClientDashboard from "./Client/ClientDashboard";
import FreelancerDashboard from "./Freelancer/FreelancerDashboard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    user: { role },
  } = useAuth();
  console.log(role);
  useEffect(() => {
    if (!role) {
      navigate("/auth");
    }
  }, [role]);
  return (
    <>{role === "Freelancer" ? <FreelancerDashboard /> : <ClientDashboard />}</>
  );
}
