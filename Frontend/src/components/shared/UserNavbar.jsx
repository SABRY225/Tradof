import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  logo,
  profilePhoto,
  calender,
  notification,
  droplist,
} from "../../assets/paths.js";
import DropList from "../../components/Navbar/DropList";

export default function UserNavbar() {
    const [activeHash, setActiveHash] = useState(
      decodeURIComponent(window.location.hash).replace("#", "")
    );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: "-15rem" }}
      animate={{ y: "0" }}
      transition={{ type: "keyframes", duration: 1 }}
      className="bg-main-color text-white border-gray-200"
    >
      <motion.div className="max-w-screen-xl flex flex-wrap items-center md:gap-[50px] mx-auto p-4 w-full">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Tradof Logo" />
          <span className=" font-markazi-text text-2xl font-semibold whitespace-nowrap">
            Tradof
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 ml-auto">
          <button type="button">
            <img src={calender} alt="calender icon" />
          </button>
          <button type="button">
            <img src={notification} alt="notification icon" />
          </button>
          <button
            type="button"
            className="flex text-sm rounded-full border-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="rounded-full w-[40px] h-[40px] object-cover"
              src={profilePhoto}
              alt="user photo"
            />
          </button>
          {isDropdownOpen && (
            <DropList
              name="Mohamed Abdalrazek"
              email="abdalrazekmohamed6@gmail.com"
            />
          )}
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
            {[
              "Dashboard",
              "Create Project",
              "Projects",
              "Offers",
              "Finances",
              "Settings",
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1, fontWeight: 500 }}
                transition={{ stiffness: 300, type: "keyframes" }}
                className="py-2 px-3 md:p-0"
              >
                <Link
                  to="#"
                  className={`text-black md:text-white font-roboto-condensed block ${
                    activeHash === item ? "text-[18px] font-medium" : ""
                  }`}
                  aria-current={activeHash === item ? "page" : undefined}
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.nav>
  );
}
