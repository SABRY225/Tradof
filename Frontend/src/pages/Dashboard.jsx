import { useAuth } from "@/context/AuthContext";
import ClientDashboard from "./Client/ClientDashboard";
import FreelancerDashboard from "./Freelancer/FreelancerDashboard";

export default function Dashboard() {
  const {
    user: { role },
  } = useAuth();
  console.log(role);
  return (
    // <FreelancerDashboard />
    <>{role === "Freelancer" ? <FreelancerDashboard /> : <ClientDashboard />}</>
  );
}
