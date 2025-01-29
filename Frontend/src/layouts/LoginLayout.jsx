import { Outlet } from "react-router-dom";

import Footer from "../components/shared/Footer";
import BackgroundAuth from "../UI/BackgroundAuth";
// import LoginAndResetPass from "../Forms/LoginAndResetPass";

import "../styles/LoginAndResetPass.css";
import "../styles/BackgroundAuth.css";

export default function LoginLayout() {
  return (
    <div>
      <div className="bg-[#F5F5FF]">
        <div className="flex flex-col-reverse md:flex-col">
          {/* <LoginAndResetPass /> */}
          <Outlet />
          <BackgroundAuth />
        </div>
      </div>
      <Footer color={`#6C63FF`} />
    </div>
  );
}
