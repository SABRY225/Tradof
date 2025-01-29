import { Outlet } from "react-router-dom";

import Footer from "../components/shared/Footer";
import LandingNav from "../components/shared/LandingNav";

export default function MainLayout() {
  return (
    <>
      <LandingNav />
      <Outlet />
      <Footer color="#6C63FF" />
    </>
  );
}
