import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

import UserNavbar from "../components/shared/UserNavbar";
import Footer from "@/components/shared/Footer";
import Loading from "@/pages/Loading";

export default function UserLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user || !user?.role) {
    navigate("/auth");
    return null; // Prevent rendering the layout if user is not authenticated
  }

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) return <Loading />;
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer borderColor="#6C63FF" borderSize="true" />
    </>
  );
}
