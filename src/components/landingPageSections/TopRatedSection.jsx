import React, { useEffect, useState } from "react";
import { Avatar, Rate } from "antd";
import { getTopRatedUsers } from "@/Util/Https/http";
import { motion, AnimatePresence } from "framer-motion";

export default function TopRatedSection() {
  const [activeTab, setActiveTab] = useState("companies");
  const [companies, setCompanies] = useState([]);
  const [translators, setTranslators] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopRatedUsers();
      setCompanies(data.data.topCompanies);
      setTranslators(data.data.topFreelancers);
    };

    fetchData();
  }, []);

  const dataList = activeTab === "companies" ? companies : translators;

  const containerVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? -500 : 500,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
    exit: (direction) => ({
      x: direction === "left" ? 500 : -500,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.2,
      },
    }),
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <div className="hidden lg:block relative max-w-screen max-h-screen">
        <div
          className="z-[-1] absolute bg-main-color opacity-[30%] w-[200px] h-[200px] rounded-full right-[0%]"
          style={{ boxShadow: "0px 0px 31px 43px #6c63ff" }}
        ></div>
        <div
          className="z-[-1] absolute bg-[#37C8DC] opacity-[30%] w-[150px] h-[150px] rounded-full left-[0%] top-[20rem]"
          style={{
            boxShadow: "0px 0px 31px 43px #37C8DC",
          }}
        ></div>
        <div
          className="z-[-1] absolute bg-[#F48C06] opacity-[30%] w-[80px] h-[80px] rounded-full right-[16%] top-[350px]"
          style={{ boxShadow: "0px 0px 31px 43px #F48C06" }}
        ></div>
        <div className="absolute top-0 left-0 w-screen-lg h-screen bg-[#FEFEFE] bg-opacity-[10%] backdrop-blur-sm z-[-1]"></div>
      </div>

      <div className="max-h-screen p-4 flex flex-col items-center space-y-6">
        <div className="flex gap-8 flex-row space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => setActiveTab("companies")}
            className={`px-6 py-2 rounded-md transition-all ${
              activeTab === "companies" ? "font-bold text-[18px]" : ""
            }`}
          >
            Top 5 Companies
          </button>
          <button
            onClick={() => setActiveTab("translators")}
            className={`px-6 py-2 rounded-md transition-all ${
              activeTab === "translators" ? "font-bold text-[18px]" : ""
            }`}
          >
            Top 5 Translators
          </button>
        </div>

          <motion.div
            key={activeTab}
            custom={activeTab === "companies" ? "left" : "right"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{type:"keyframes"}}
            className="flex flex-wrap items-center justify-center gap-[70px] max-w-2xl overflow-hidden"
          >
            {dataList.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="flex flex-col items-center p-4 rounded-lg overflow-hidden"
              >
                <div
                  className={`rounded-full p-1 ${
                    activeTab === "companies"
                      ? "border-2 border-blue-500"
                      : "border-2 border-[#6c63ff]"
                  }`}
                >
                  <Avatar
                    src={item.profileImageUrl || ""}
                    alt={`${item.firstName} ${item.lastName}`}
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />
                </div>
                <p className="font-semibold text-lg mt-2">
                  {item.firstName} {item.lastName}
                </p>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={item.averageRating}
                  style={{ fontSize: "16px", marginTop: "4px" }}
                />
              </motion.div>
            ))}
          </motion.div>
      </div>
    </>
  );
}
