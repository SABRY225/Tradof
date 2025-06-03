import { file, meeting, send, whitePlus } from "@/assets/paths";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import EventModel from "./EventCalenderModel";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "@/Util/Https/http";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSocket } from "@/context/SocketProvider";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD HH:mm";
const today = new Date();
const getTimeAgo = (creationDate) => {
  const now = new Date();
  const created = new Date(creationDate);
  const diffMs = now - created;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffDays < 1) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  if (diffDays < 30)
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  if (diffDays < 365)
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
};
const isSameWeek = (date1, date2) => {
  const oneJan = new Date(date1.getFullYear(), 0, 1);
  const week1 = Math.floor(
    ((date1 - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
  );
  const week2 = Math.floor(
    ((date2 - oneJan) / 86400000 + oneJan.getDay() + 1) / 7
  );
  return date1.getFullYear() === date2.getFullYear() && week1 === week2;
};
const getFormattedDateTime = (date) => {
  const dayPart = isSameWeek(date, today)
    ? date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
    : date.toISOString().split("T")[0]; // "2024-05-01"

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${dayPart} · ${timePart}`; // Example: "TUE - 9:15 AM"
};

export default function Chatting({
  projectId,
  senderId,
  freelancerId,
  companyId,
  freelancerEmail,
  companyEmail,
  isCanceled,
}) {
  const socket = useSocket();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const contentRef = useRef(null);
  const [open, setOpen] = useState(false);
  const {
    mutate,
    data: newEvent,
    isPending,
  } = useMutation({
    mutationFn: createEvent,
    onSuccess: ({ data }) => {
      toast.success("Event created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error creating event:", error);
      toast.error(error.message || "create event failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!projectId || !senderId) return;
    socket.emit("getMessages", { projectId, userId: senderId });
    // console.log(projectId, senderId);
    const handleMessagesList = (data) => {
      setMessages(data);
    };

    const handleNewMessage = (newMessage) => {
      // console.log(newMessage.projectId, projectId);
      if (+newMessage.projectId === projectId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    const handleError = (error) => {
      toast.error(error?.message || "Some thing wrong happen!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      console.error("Socket Error:", error);
    };
    socket.on("messagesList", handleMessagesList);
    socket.on("newMessage", handleNewMessage);
    socket.on("error", handleError);

    return () => {
      socket.off("messagesList", handleMessagesList);
      socket.off("newMessage", handleNewMessage);
      socket.off("error", handleError);
    };
  }, [projectId, senderId]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!message.trim() || isCanceled) return;
    const messageData = {
      projectId,
      senderId,
      message: message.trim(),
      freelancerId,
      companyId,
    };

    console.log("Sending message:", messageData);
    socket.emit("sendMessage", messageData);
    setMessage("");
    event.reset();
  };

  const handleAddEvent = (newEvent) => {
    const token = Cookies.get("token");
    if (isCanceled) return;
    if (!token) {
      toast.error("No authentication token found!");
      return;
    }

    mutate({
      data: {
        ...newEvent,
        startDate: newEvent.start,
        endDate: newEvent.end,
      },
      token,
    });

    console.log("Event Data:", newEvent);
  };

  return (
    <>
      {open && (
        <EventModel
          handleAddEvent={handleAddEvent}
          open={open}
          date={new Date()}
          setOpen={setOpen}
          participation={
            senderId === freelancerId ? companyEmail : freelancerEmail
          }
          isPending={isPending}
        />
      )}
      <div>
        <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
          Chatting
        </h1>
        <div className="bg-card-color rounded-[8px] h-[500px] overflow-hidden flex flex-col pt-2">
          <div
            ref={contentRef}
            className="flex-1 h-[500px] p-4 overflow-y-auto space-y-4 custom-scrollbar"
          >
            {messages.map((message, index) => {
              const isSender = message.senderId === senderId;
              const messageDate = new Date(message.timestamp);
              const messageDay = messageDate.toDateString();
              const shouldShowDate =
                index === 0 ||
                new Date(messages[index - 1].timestamp).toDateString() !==
                  messageDay;

              const messageClass = isSender
                ? "bg-main-color text-white text-[14px] rounded-2xl px-4 py-2 max-w-[90%] shadow-md"
                : "bg-white rounded-2xl text-[14px] px-4 py-2 max-w-[90%] text-gray-800 shadow-md";
              return (
                <>
                  {shouldShowDate && (
                    <div className="flex justify-center my-4">
                      <div className="bg-[#F2F2F2] italic text-xs text-[#999999] rounded-full px-4 py-1">
                        {getFormattedDateTime(messageDate)}
                      </div>
                    </div>
                  )}
                  <div
                    key={index}
                    className={`flex flex-col ${
                      isSender ? "items-end" : "items-start"
                    }`}
                  >
                    <div className={messageClass}>{message.message}</div>
                    <span className="text-xs text-gray-400 mt-1">
                      {getTimeAgo(message.timestamp)}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
          {/* Chat Input */}
          {!isCanceled && (
            <form
              onSubmit={sendMessage}
              className="p-3 flex items-center space-x-2 border-t-[1px] border-main-color"
            >
              <Menubar className="w-fit h-fit p-[0px]">
                <MenubarMenu>
                  <MenubarTrigger className="bg-main-color p-1 rounded outline-none">
                    <img src={whitePlus} alt="plus icon" width="12px" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={() => setOpen(!open)}>
                      Create meeting{" "}
                      <MenubarShortcut>
                        <img src={meeting} alt="meeting icon" className="w-4" />
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>

              <input
                type="text"
                name="message"
                value={message}
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border outline-none text-sm"
              />
              <button type="submit" className="text-indigo-500 text-xl">
                <img src={send} alt="send icon" />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
