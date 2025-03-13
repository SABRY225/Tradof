import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

import Footer from "@/components/shared/Footer";
import AdminNavbar from "@/components/shared/AdminNavbar";

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) navigate("/auth");
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer borderColor="#6C63FF" borderSize="true" />
    </>
  );
}
