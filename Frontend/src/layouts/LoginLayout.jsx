import { Outlet } from "react-router-dom";

import Footer from "../components/shared/Footer";
import BackgroundAuth from "../UI/BackgroundAuth";
// import LoginAndResetPass from "../Forms/LoginAndResetPass";

import "../styles/LoginAndResetPass.css";
import "../styles/BackgroundAuth.css";

export default function LoginLayout() {
  return (
    <div className="flex items-center justify-center relative min-h-screen h-fit">
      <BackgroundAuth />
      <Outlet />
    </div>
  );
}
