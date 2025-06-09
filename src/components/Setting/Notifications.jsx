import { useAuth } from "@/Context/AuthContext";
import { getSettingNotification, settingNotification } from "@/Util/Https/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { message } from "antd";

const notes = [
  {
    key: "sendEmail",
    title: "Activate sending email alerts",
    description: "Send a message if there is a project that suits you",
  },
  {
    key: "alertOffers",
    title: "Send alerts about any offers you make",
    description:
      "Send a message in case of approval or rejection of your offer",
  },
  {
    key: "messageChat",
    title: "Special message alerts from any client",
    description: "Send an alert if the project owner sends you a message",
  },
];

export default function Notifications() {
  const { user } = useAuth();
  const token = user?.token; // or get it from context
  const [notifications, setNotifications] = useState({
    sendEmail: false,
    alertOffers: false,
    messageChat: false,
  });
  console.log(token);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notificationSettings"],
    queryFn: () => getSettingNotification({ token }),
    enabled: !!token, // only run if token exists
  });
  const mutation = useMutation({
    mutationFn: ({ data }) => settingNotification({ token, data }),
    onSuccess: () => {
      message.success("Set setting success");
    },
    onError: (error) => {
      message.error(error?.message || "set setting failed!");
    },
  });

  useEffect(() => {
    console.log(data);
    setNotifications({
      sendEmail: data?.sendEmail,
      alertOffers: data?.alertOffers,
      messageChat: data?.messageChat,
    });
  }, [data]);
  const toggleNotification = (key) => {
    mutation.mutate({
      data: {
        ...notifications,
        [key]: !notifications[key],
      },
      token,
    });
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <>
      {/* Notifications */}
      <h1 className="flex items-center gap-6 text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Notifications
        {mutation.isPending && (
          <FadeLoader
            color="#000"
            cssOverride={{ width: "0px", height: "0px" }}
            height={3}
            width={3}
            loading
            margin={-11}
            radius={15}
            speedMultiplier={1}
          />
        )}
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
