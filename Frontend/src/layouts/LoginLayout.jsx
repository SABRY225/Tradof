import { Outlet, useNavigation } from "react-router-dom";

import Footer from "../components/shared/Footer";
import BackgroundAuth from "../UI/BackgroundAuth";
// import LoginAndResetPass from "../Forms/LoginAndResetPass";

import "../styles/LoginAndResetPass.css";
import "../styles/BackgroundAuth.css";
import Loading from "@/pages/Loading";

export default function LoginLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center relative min-h-screen h-fit">
      <BackgroundAuth />
      <Outlet />
    </div>
  );
}
