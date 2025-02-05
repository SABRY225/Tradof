import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

import UserNavbar from "../components/shared/UserNavbar";
import Footer from "@/components/shared/Footer";


export default function UserLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) navigate("/auth");
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer borderColor="#6C63FF" borderSize="true" />
    </>
  );
}
