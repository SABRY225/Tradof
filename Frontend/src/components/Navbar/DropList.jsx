import { useState } from "react";
import photoImage from "../../assets/images/1560a64114a9372e.jpg";
import profile from "../../assets/icons/profile.svg";
import offers from "../../assets/icons/offers.svg";
import finances from "../../assets/icons/finances.svg";
import calender from "../../assets/icons/whiteCalender.svg";
import notification from "../../assets/icons/notification.svg";
import support from "../../assets/icons/technicalSupport.svg";
import feedback from "../../assets/icons/feedback.svg";
import settings from "../../assets/icons/settings.svg";
import logout from "../../assets/icons/logout.svg";
import { Link } from "react-router-dom";
export default function DropList({ name, email }) {
  const [list, setList] = useState([
    {
      items: [
        {
          icon: profile,
          text: "Your Profile",
        },
        {
          icon: offers,
          text: "Your Offers",
        },
        {
          icon: finances,
          text: "Your Finances",
        },
      ],
    },
    {
      items: [
        {
          icon: calender,
          text: "Calendar",
        },
        {
          icon: notification,
          text: "Notification",
        },
      ],
    },
    {
      items: [
        {
          icon: support,
          text: "Tradof Supports",
        },
        {
          icon: feedback,
          text: "Give us feedback",
        },
      ],
    },
    {
      items: [
        {
          icon: settings,
          text: "Settings",
        },
        {
          icon: logout,
          text: "Log out",
        },
      ],
    },
  ]);
  return (
    <div
      className="z-50 my-6 list-none bg-main-color text-white divide-y divide-gray-300 rounded-lg shadow-sm absolute right-4 top-14"
      style={{ boxShadow: "#5050504d 0px 0px 3px 1px" }}
    >
      <div className="flex flex-col items-center gap-2 px-4 py-3 text-center">
        <img
          src={photoImage}
          alt="profile image"
          width="40px"
          className="object-cover rounded-full h-[40px] border-2"
        />
        <span className="block text-sm">{name}</span>
        <span className="block text-sm truncate">{email}</span>
      </div>
      <ul className="py-2">
        {list.map(({ items }, index) => (
          <li
            key={index}
            className={`block mx-4 py-2 text-sm ${
              index !== list.length - 1 ? "border-b border-customGray" : ""
            }`}
          >
            <ul>
              {items.map((item, index) => (
                <li key={index} className="mt-2">
                  <Link className="flex gap-2 ">
                    <img
                      src={item.icon}
                      alt="icon"
                      className="w-[22px] font-bold font-white font-bold"
                    />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {/* {["Dashboard", "Settings", "Earnings", "Sign out"].map((item) => (
          <li key={item}>
            <a href="#" className="block px-4 py-2 text-sm">
              {item}
            </a>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
