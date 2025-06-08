import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

import Footer from "@/components/shared/Footer";
import AdminNavbar from "@/components/shared/AdminNavbar";
import { useEffect } from "react";

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/auth");
      return null;
    }
  }, [user]);
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer borderColor="#6C63FF" borderSize="true" />
    </>
  );
}
