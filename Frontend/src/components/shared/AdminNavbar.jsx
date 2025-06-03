import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.svg"

import {
  logo,
  profilePhoto,
  notification,
  droplist,
} from "../../assets/paths.js";
import DropList from "../../components/Navbar/DropList";
import { useAuth } from "@/context/AuthContext.jsx";
import Notification from "./Notification.jsx";

const List = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
  },
  { name: "Technical support", link: "/admin/technical-support" },
  { name: "Ask Questions", link: "/admin/ask-question" },
  { name: "Feedback", link: "/admin/feedback" },
  { name: "Finances", link: "/admin/finances" },
  { name: "Withdrawal", link: "/admin/withdrawal" },
  { name: "Settings", link: "/admin/settings" },
];

export default function AdminNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const dropdownRefNotification = useRef(null);
  const [activePath, setActivePath] = useState(location.pathname);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setIsDropdownOpen(null);
    setIsNavOpen(false);
    setActivePath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
      if (
        dropdownRefNotification.current &&
        !dropdownRefNotification.current.contains(event.target)
      ) {
        setIsDropdownOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      initial={{ y: "-15rem" }}
      animate={{ y: "0" }}
      transition={{ type: "keyframes", duration: 1.5 }}
      className="sticky top-0 bg-main-color text-white border-gray-200 z-[10]"
    >
      <motion.div className="max-w-screen-xl flex flex-wrap items-center md:gap-[50px] mx-auto p-4 w-full">
        <Link to="/admin/dashboard" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Tradof Logo" />
          <span className=" font-markazi-text text-2xl font-semibold whitespace-nowrap">
            Tradof
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 ml-auto">
          <Link to="/admin/dashboard#notification">
            <div ref={dropdownRefNotification} className="pt-[9px]">
              <button
                type="button"
                onClick={() =>
                  setIsDropdownOpen((prev) => (prev ? null : "notification"))
                }
              >
                <img
                  src={notification}
                  alt="notification icon"
                  className="w-5"
                />
              </button>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white rounded-md transition-colors duration-200 font-medium flex items-center space-x-2"
          >
            <span>Logout</span>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isNavOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 md:space-x-8 md:flex-row md:mt-0">
            {List.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1, fontWeight: 500 }}
                transition={{ stiffness: 300, type: "keyframes" }}
                className="py-2 px-3 md:p-0"
              >
                <Link
                  to={item.link}
                  className={`text-white font-roboto-condensed block ${
                    activePath === item.link ? "text-[18px] font-medium" : ""
                  }`}
                  aria-current={activePath === item.link ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </nav>
  );
}
