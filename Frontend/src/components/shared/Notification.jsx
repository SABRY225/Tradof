import { motion } from "motion/react";
import { useState } from "react";
import {
  search,
  blackSupport,
  blackCalender,
  blackFinances,
  blackOffers,
  chat,
} from "../../assets/paths";

const commonClasses =
  "font-epilogue outline-none border-[1px] text-[12px] border-[#D6D7D7] rounded-full p-2 px-3 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const notifications = [
  {
    type: "Support team",
    message: "ay kalam fadee, ay kalam fadee,ay...",
    age: "2 min age",
  },
  {
    type: "Project date",
    message: "ay kalam fadee, ay kalam fadee,ay...",
    age: "2 min age",
  },
  {
    type: "Finances",
    message: "ay kalam fadee, ay kalam fadee,ay...",
    age: "2 min age",
  },
  {
    type: "Offers",
    message: "ay kalam fadee, ay kalam fadee,ay...",
    age: "2 min age",
  },
  {
    type: "Project chat",
    message: "ay kalam fadee, ay kalam fadee,aysaddddddddd",
    age: "2 min age",
  },
  {
    type: "Project chat",
    message: "ay kalam fadee, ay kalam fadee,aysaddddddddd",
    age: "2 min age",
  },
  {
    type: "Project chat",
    message: "chat message",
    age: "2 min age",
  },
];

export default function Notification({ classes }) {
  const [searchTerm, setSearchTerm] = useState("");

  const getIcon = (type) => {
    switch (type) {
      case "Support team":
        return blackSupport;
      case "Project date":
        return blackCalender;
      case "Finances":
        return blackFinances;
      case "Offers":
        return blackOffers;
      case "Project chat":
        return chat;
    }
  };

  // Filter notifications based on search input
  const filteredNotifications = notifications.filter((note) =>
    note.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ x: "50rem" }}
      animate={{ x: "0rem" }}
      exit={{ x: "50rem" }}
      transition={{ type: "keyframes", duration: 0.8 }}
      className={`bg-card-color rounded-lg w-[350px] py-[20px] px-[14px] ${classes}`}
    >
      <div className="flex justify-between font-roboto-condensed text-[18px] border-b-2 border-main-color pb-2">
        Notification
        <span className="p-1 bg-main-color text-white rounded-full text-[12px] flex items-center justify-center">
          5
        </span>
      </div>
      <div className="flex rounded-full my-4 h-[30px]">
        <input
          type="text"
          className={commonClasses}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={search} alt="search icon" className="p-2" />
      </div>
      <ul className="custom-scrollbar space-y-2 overflow-y-auto max-h-[435px]">
        {filteredNotifications.map((note, index) => (
          <li
            key={index}
            className="flex flex-col bg-white py-[8px] px-[10px] rounded-lg"
          >
            <h1 className="flex gap-2 font-roboto-condensed font-medium">
              <img src={getIcon(note.type)} alt="" />
              {note.type}
            </h1>
            <p className="flex items-end font-roboto-condensed font-light">
              <span
                className="truncate max-w-[240px] cursor-pointer"
                title={note.message} // Show full message on hover
              >
                {note.message}
              </span>
              <span className="text-[9px] font-medium ml-auto">{note.age}</span>
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
