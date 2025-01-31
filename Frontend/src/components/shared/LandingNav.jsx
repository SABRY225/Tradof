// import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/icons/lightlogo.svg";
import ButtonFelid from "../../UI/ButtonFelid";

export default function LandingNav() {
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
        console.log("Detected Hash Change:", cleanHash);
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
    <nav className="bg-[#6c63ff] flex items-center justify-between w-full md:px-[145px] px-[40px] py-[20px] text-white">
        <Link className="flex items-center space-x-3" to="landing#Home">
          <img src={logo} className="w-[40px]" alt="Logo" />
          <span className="text-[31px] font-markazi-text font-semibold">
            Tradof
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3">
          <ButtonFelid
            text="Get Start"
            classes="text-[15px] px-[15px] py-[8px] bg-second-color"
            onClick={() => navigate("/auth")}
            style={{ width: "124px" }}
          />
          <button
            type="button"
            className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex justify-center items-center gap-[35px] p-4 md:p-0 ">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={`#${item}`}
                className={`text-[15px] font-semibold text-white ${
                  activeHash === item ? "text-[25px] font-medium" : ""
                }`}
                aria-current={activeHash === item ? "page" : undefined}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
    </nav>
  );
}
