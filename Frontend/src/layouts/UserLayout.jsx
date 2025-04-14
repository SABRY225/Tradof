import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

import UserNavbar from "../components/shared/UserNavbar";
import Footer from "@/components/shared/Footer";
import FloatingChat from "./FloatingChat";


export default function UserLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) navigate("/auth");
  return (
    <>
      <UserNavbar />
      <div className=" pb-1">
      <Outlet />
      </div>
      <FloatingChat user={user} />
      <Footer borderColor="#6C63FF" borderSize="true" />
    </>
  );
}
