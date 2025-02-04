import { Outlet } from "react-router-dom";
import UserNavbar from "../components/shared/UserNavbar";
import { Footer } from "../constants/Path";

export default function UserLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer borderColor="#6C63FF" borderSize="true" />
    </>
  );
}
