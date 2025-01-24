import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LayoutAPP() {
  const notifyOffline = () => {
    toast.error("You are currently offline", {
      position: "top-right",
    });
  };

  return (
    <>
      <Offline>{notifyOffline()}</Offline>
      <Outlet />
    </>
  );
}
