import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { logo, droplist } from "../../assets/paths.js";
import ButtonFelid from "../../UI/ButtonFelid";

export default function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const [activeHash, setActiveHash] = useState(
    decodeURIComponent(window.location.hash).replace("#", "")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkHash = () => {
      const cleanHash = decodeURIComponent(window.location.hash).replace(
        "#",
        ""
      );
      if (cleanHash !== activeHash) {
        setActiveHash(cleanHash);
        // console.log("Detected Hash Change:", cleanHash);
      }
    };

    const interval = setInterval(checkHash, 500);

    return () => clearInterval(interval);
  }, [activeHash]);

  useEffect(() => {
    if (!activeHash) return;
    const section = document.getElementById(activeHash);
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  }, [activeHash]);

  const navItems = ["Home", "Plans", "Features", "Rated", "Contact Us"];

  return (
    <motion.nav
      initial={{ y: "-15rem" }}
      animate={{ y: "0" }}
      transition={{ type: "keyframes", duration: 1.2 }}
      className="bg-main-color border-gray-200 text-white"
    >
      <motion.div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Tradof Logo" />
          <span className=" font-markazi-text text-2xl font-semibold whitespace-nowrap">
            Tradof
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ButtonFelid
            type="button"
            text="Get Start"
            classes="text-[15px] px-[15px] py-[8px] bg-second-color"
            onClick={() => navigate("/auth")}
            style={{ width: "124px" }}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:ring-2"
            aria-controls="navbar-cta"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <img src={droplist} alt="drop list icon" />
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1 bg-background-color md:bg-main-color mt-5`}
          id="navbar-cta"
        >
          <ul className="flex flex-col p-4 md:p-0 md:space-x-8 md:flex-row md:mt-0">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.15, fontWeight: 500 }}
                transition={{ type: "keyframes", stiffness: 300 }}
                className="py-2 px-3 md:p-0"
              >
                <Link
                  to={`#${item}`}
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
