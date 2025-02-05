import { Outlet, useNavigation } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

import UserNavbar from "../components/shared/UserNavbar";
import { Footer } from "../constants/Path";

export default function UserLayout() {
  const { user } = useAuth();
  const navigate = useNavigation();
  if (!user) navigate("/auth");
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer borderColor="#6C63FF" borderSize="true" />
    </>
  );
}
