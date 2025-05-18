import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { logo, calender, notification, droplist } from "../../assets/paths.js";
import DropList from "../../components/Navbar/DropList";
import { useAuth } from "@/context/AuthContext.jsx";
import Notification from "./Notification.jsx";
import { getFreelancer } from "@/Util/Https/freelancerHttp.js";
import { getCompany } from "@/Util/Https/companyHttp.js";
import Cookies from "js-cookie";

const CompanyList = [
  {
    name: "Dashboard",
    link: "/user/dashboard",
  },
  { name: "Create Project", link: "/user/project/create" },
  {
    name: "Start Projects",
    link: "/user/project/start",
  },
  {
    name: "Upcoming Projects",
    link: "/user/project/upcoming",
  },
  { name: "Finances", link: "/user/finances" },
  { name: "Settings", link: "/user/settings" },
];

const FreelancerList = [
  {
    name: "Dashboard",
    link: "/user/dashboard",
  },
  {
    name: "Projects",
    link: "/user/project/available",
  },
  {
    name: "Offers",
    link: "/user/offers",
  },
  { name: "Finances", link: "/user/finances" },
  { name: "Settings", link: "/user/settings" },
];

export default function UserNavbar() {
  const {
    user: { role },
  } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const dropdownRefNotification = useRef(null);
  const [activePath, setActivePath] = useState(location.pathname);
  const { person } = useLoaderData();
  // console.log(person);
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

  return (
    <nav
      initial={{ y: "-15rem" }}
      animate={{ y: "0" }}
      transition={{ type: "keyframes", duration: 1.5 }}
      className="sticky top-0 bg-[#6C63FF] text-white border-gray-200 z-[10]"
    >
      <motion.div className="max-w-screen-xl flex flex-wrap items-center md:gap-[50px] mx-auto p-4 w-full">
        <Link to="/user/dashboard" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Tradof Logo" />
          <span className=" font-markazi-text text-2xl font-semibold whitespace-nowrap">
            Tradof
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 ml-auto">
          <Link to="/user/calender">
            <img src={calender} alt="calender icon" />
          </Link>
          <Link to="/user/dashboard#notification">
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
          <div ref={dropdownRef}>
            <button
              type="button"
              className="flex text-sm rounded-full border-2"
              onClick={() =>
                setIsDropdownOpen((prev) => (prev ? null : "profileMenu"))
              }
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="rounded-full w-[40px] h-[40px] object-cover"
                src={person?.profileImageUrl}
                alt="user photo"
              />
            </button>
            <AnimatePresence>
              {isDropdownOpen === "notification" && (
                <Notification classes="md:hidden text-black absolute right-[10px] top-[100px] shadow-lg " />
              )}
              {isDropdownOpen === "profileMenu" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropList
                    name={person?.firstName + " " + person?.lastName}
                    email={person?.email}
                    photoImage={person?.profileImageUrl}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:ring-2"
          >
            <span className="sr-only">Open main menu</span>
            <img src={droplist} alt="drop list icon" />
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isNavOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 md:p-0 md:space-x-8 md:flex-row md:mt-0">
            {(role === "CompanyAdmin" ? CompanyList : FreelancerList).map(
              (item, index) => (
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
              )
            )}
          </ul>
        </div>
      </motion.div>
    </nav>
  );
}

export const userDataLoader = async ({ request }) => {
  const url = new URL(request.url);
  const isShare = url.searchParams.get("share") === "true";
  // console.log(isShare);
  if (isShare) {
    const dataParam = url.searchParams.get("data");
    const role = url.searchParams.get("role");
    const sharedData = dataParam
      ? JSON.parse(decodeURIComponent(dataParam))
      : null;
    console.log(sharedData);
    return { person: sharedData, role };
  }

  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId");

  if (!token || !role || !userId) {
    return redirect("/auth");
  }
  console.log(token, role, userId);
  try {
    const personData =
      role === "Freelancer"
        ? await getFreelancer({
            id: userId,
            token,
          })
        : await getCompany({
            id: userId,
            token,
          });
    return { person: personData };
  } catch (error) {
    console.error("Failed to fetch project:", error);
    throw new Response("Failed to load project data", { status: 500 });
  }
};
