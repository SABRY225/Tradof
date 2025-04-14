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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export default function DropList({ name, email }) {
  const { logout: leave } = useAuth();
  const navigate = useNavigate();
  const [list, setList] = useState([
    {
      items: [
        {
          icon: finances,
          text: "Your Finances",
          link:"/user/finances"

        },
        {
          icon: offers,
          text: "Ask Question",
          link:"/user/ask-question"
        },
      ],
    },
    {
      items: [
        {
          icon: calender,
          text: "Calendar",
          link:"/user/calender"
        },
        // {
        //   icon: notification,
        //   text: "Notification",
        // },
      ],
    },
    {
      items: [
        {
          icon: feedback,
          text: "Give us feedback",
          link:"/user/feedback"
        },
      ],
    },
    {
      items: [
        {
          icon: settings,
          text: "Settings",
          link:"/user/settings"
        },
        {
          icon: logout,
          text: "Log out",
          link: "/auth",
          onClick: () => {
            console.log("logout");
            leave();
          },
        },
      ],
    },
  ]);
  return (
    <div
      className="z-50 my-6 list-none bg-main-color text-white divide-y divide-gray-300 rounded-lg shadow-sm absolute right-4 top-14"
      style={{ boxShadow: "#5050504d 0px 0px 3px 1px" }}
    >
      <Link to="/user/profile" className="flex items-center gap-2 px-4 py-3">
        <img
          src={photoImage}
          alt="profile image"
          width="30px"
          className="object-cover rounded-full h-[30px] border-1"
        />
        <p className="text-[11px]">
          <span className="block">{name}</span>
          <span className="block truncate">{email}</span>
        </p>
      </Link>
      <ul className="pt-2 pb-5">
        {list.map(({ items }, index) => (
          <li key={index} className="block mx-4">
            <ul>
              {items.map((item, index) => (
                <li key={index} className="mt-2">
                  <Link
                    onClick={item.onClick}
                    to={item.link}
                    className="flex gap-5 text-[12px]"
                  >
                    <img
                      src={item.icon}
                      alt="icon"
                      className="w-[15px] font-bold font-white font-bold"
                    />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
