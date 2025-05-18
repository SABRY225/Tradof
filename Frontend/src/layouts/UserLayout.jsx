import {
  Outlet,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

import UserNavbar from "../components/shared/UserNavbar";
import Footer from "@/components/shared/Footer";
import FloatingChat from "./FloatingChat";
import Loading from "@/pages/Loading";
import { useEffect } from "react";
import Profile from "@/pages/shared/Profile";

export default function UserLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const isShare = params.get("share") === "true";

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // console.log(user);
  // Redirect unauthenticated user
  useEffect(() => {
    if (!isShare && (!user || !user?.role)) {
      navigate("/auth");
      return null;
    }
  }, [user, isShare]);

  // Show loading state
  if (isLoading) return <Loading />;

  // If it's a share link, render only the profile (no navbar, footer, etc.)
  if (isShare) {
    return <Profile />;
  }

  // Authenticated normal layout
  return (
    <>
      {user && (
        <>
          <UserNavbar />
          <div className="pb-1">
            <Outlet />
          </div>
          <FloatingChat user={user} />
          <Footer borderColor="#6C63FF" borderSize="true" />
        </>
      )}
    </>
  );
}
