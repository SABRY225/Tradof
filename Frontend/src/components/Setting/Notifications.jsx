import { useState } from "react";

const notes = [
  {
    key: "emailAlerts",
    title: "Activate sending email alerts",
    description: "Send a message if there is a project that suits you",
  },
  {
    key: "offerAlerts",
    title: "Send alerts about any offers you make",
    description:
      "Send a message in case of approval or rejection of your offer",
  },
  {
    key: "clientMessages",
    title: "Special message alerts from any client",
    description: "Send an alert if the project owner sends you a message",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    offerAlerts: false,
    clientMessages: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <>
      {/* Notifications */}
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Notifications
      </h1>
      <div className="bg-card-color rounded-[8px] p-[30px]">
        <div className="space-y-3">
          {notes.map(({ key, title, description }) => (
            <div
              key={key}
              className="px-[15px] py-[7px] border border-main-color rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications[key]}
                  onChange={() => toggleNotification(key)}
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-main-color peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
