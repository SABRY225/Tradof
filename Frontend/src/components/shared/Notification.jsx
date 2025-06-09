import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  search,
  blackSupport,
  blackCalender,
  blackFinances,
  blackOffers,
  chat,
  project,
  feedback,
  evaluation,
  report,
  subscription,
  withdraw,
  ask,
} from "../../assets/paths";
import { useAuth } from "@/context/AuthContext";
import { message } from "antd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSocket } from "@/context/SocketProvider";

const commonClasses =
  "font-epilogue outline-none border-[1px] text-[12px] border-[#D6D7D7] rounded-full p-2 px-3 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

function getTimeAgo(timestamp) {
  const now = new Date();
  const diff = Math.floor((now - new Date(timestamp)) / 1000); // difference in seconds

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

const getIcon = (type) => {
  switch (type) {
    case "Technical Support":
      return blackSupport;
    case "Calendar":
      return blackCalender;
    case "Payment":
      return blackFinances;
    case "Offer":
      return blackOffers;
    case "Message":
      return chat;
    case "Project":
      return project;
    case "Feedback":
      return feedback;
    case "Evaluation":
      return evaluation;
    case "Report":
      return report;
    case "Subscriptions":
      return subscription;
    case "Withdraw Profit":
      return withdraw;
    case "AskQuestion":
      return ask;
  }
};
export default function Notification({ classes }) {
  const {
    user: { userId, role, subRole, companyId },
  } = useAuth();
  const socket = useSocket();

  const [notifications, setNotifications] = useState({
    notifications: [],
    unseenCount: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const notificationRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === "#notification") {
      notificationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      notificationRef.current.classList.add("ring-2", "ring-gray-300");
      const timeout = setTimeout(() => {
        notificationRef.current.classList.remove("ring-2", "ring-gray-300");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, []);

  const filteredNotifications = notifications?.notifications.filter((note) =>
    note.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsSeen = (notificationId) => {
    // Optimistically update UI
    setNotifications((prev) => ({
      notifications: prev.notifications.map((note) =>
        note._id === notificationId ? { ...note, seen: true } : note
      ),
      unseenCount: prev.unseenCount - 1,
    }));

    // Emit to backend
    socket.emit("seenNotification", notificationId);
  };
  useEffect(() => {
    socket.on("notificationSeen", ({ notificationId }) => {
      console.log("Confirmed by server:", notificationId);
    });

    return () => {
      socket.off("notificationSeen");
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    // socket.emit("getNotifications", { projectId: "7", userId });
    if (role == "admin") socket.emit("getNotifications", { userId: "admin" });
    else {
      socket.emit("getNotifications", { userId });
    }
    // console.log(projectId, senderId);
    const handleNotificationList = (data) => {
      console.log(data);
      setNotifications(data);
    };

    // const handleNewNotification = (newMessage) => {
    //   // console.log(newMessage.projectId, projectId);
    //   if (+newMessage.userId === userId) {
    //     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   }
    // };

    const handleError = (error) => {
      message.error(error?.message || "Some thing wrong happen!");
      console.error("Socket Error:", error);
    };
    socket.on("notificationsList", handleNotificationList);
    // socket.on("newMessage", handleNewMessage);
    socket.on("error", handleError);

    return () => {
      socket.off("notificationsList", handleNotificationList);
      // socket.off("newMessage", handleNewMessage);
      socket.off("error", handleError);
    };
  }, [userId]);
  console.log(notifications);
  return (
    <motion.div
      ref={notificationRef}
      className={`bg-card-color rounded-lg w-[350px] py-[20px] px-[14px] ${classes}`}
      id="notification"
    >
      <div className="flex justify-between font-roboto-condensed text-[18px] border-b-2 border-main-color pb-2">
        Notification
        <span className="p-1 bg-main-color text-white rounded-full text-[12px] flex items-center justify-center">
          {notifications.unseenCount}
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
      <ul className=" custom-scrollbar space-y-2 overflow-y-auto max-h-[160px] lg:max-h-[520px]">
        {filteredNotifications.length === 0 && (
          <p className="text-center">Not found notifications</p>
        )}
        {/* Unseen Notifications */}
        {filteredNotifications
          .filter((note) => !note.seen)
          .map((note) => (
            <Dialog
              onOpenChange={(isOpen) => {
                setOpen(isOpen, selectedNote);
                // Mark as seen *when closing* and note was unseen
                if (!isOpen && selectedNote && !selectedNote.seen) {
                  markAsSeen(selectedNote._id);
                }
              }}
            >
              <DialogTrigger className="w-full">
                <li
                  key={note._id}
                  className="flex flex-col bg-white py-[8px] px-[10px] rounded-lg relative"
                  onClick={() => {
                    setSelectedNote(note);
                  }}
                >
                  {/* "New" label */}
                  <span className="absolute top-1 right-2 text-[10px] bg-red-500 text-white px-1 rounded">
                    New
                  </span>
                  <h1 className="flex gap-2 font-roboto-condensed font-medium">
                    <img
                      src={getIcon(note.type)}
                      alt="icon"
                      className="w-[22px] h-[22px]"
                    />
                    {note.type}
                  </h1>
                  <p className="flex items-end font-roboto-condensed font-light">
                    <span
                      className="truncate max-w-[240px] cursor-pointer"
                      title={note.message}
                    >
                      {note.message}
                    </span>
                    <span className="text-[9px] font-medium ml-auto">
                      {getTimeAgo(note.timestamp)}
                    </span>
                  </p>
                </li>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <h1 className="flex gap-2 font-roboto-condensed font-medium">
                      <img
                        src={getIcon(note.type)}
                        alt="icon"
                        className="w-[30px] h-[30px]"
                      />
                      {note.type}
                    </h1>
                  </DialogTitle>
                  <DialogDescription className="text-black">
                    {note.message}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <span className="text-[9px] font-medium ml-auto">
                    {getTimeAgo(note.timestamp)}
                  </span>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}

        {/* Separator */}
        {filteredNotifications.some((n) => !n.seen) &&
          filteredNotifications.some((n) => n.seen) && (
            <hr className="border-t border-gray-300 my-2" />
          )}

        {/* Seen Notifications */}
        {filteredNotifications
          .filter((note) => note.seen)
          .map((note, index) => (
            <Dialog key={index}>
              <DialogTrigger className="w-full">
                <li
                  key={note._id}
                  className="flex flex-col bg-white py-[8px] px-[10px] rounded-lg"
                >
                  <h1 className="flex gap-2 font-roboto-condensed font-medium">
                    <img
                      src={getIcon(note.type)}
                      alt="icon"
                      className="w-[22px] h-[22px]"
                    />
                    {note.type}
                  </h1>
                  <p className="flex items-end font-roboto-condensed font-light">
                    <span
                      className="truncate max-w-[240px] cursor-pointer"
                      title={note.message}
                    >
                      {note.message}
                    </span>
                    <span className="text-[9px] font-medium ml-auto">
                      {getTimeAgo(note.timestamp)}
                    </span>
                  </p>
                </li>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <h1 className="flex items-center gap-2 font-roboto-condensed font-medium">
                      <img
                        src={getIcon(note.type)}
                        alt="icon"
                        className="w-[40px] h-[40px]"
                      />
                      <p className="text-[20px] font-semibold">{note.type}</p>
                    </h1>
                  </DialogTitle>
                  <DialogDescription className="text-black">
                    {note.message}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <span className="text-[9px] font-medium ml-auto">
                    {getTimeAgo(note.timestamp)}
                  </span>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
      </ul>
    </motion.div>
  );
}
