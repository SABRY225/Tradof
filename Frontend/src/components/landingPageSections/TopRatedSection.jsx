import React, { useState } from "react";
import img from "../../assets/images/landing-2.png";

const companies = [
  { id: 1, name: "Company A", image: img },
  { id: 2, name: "Company B", image: img },
  { id: 3, name: "Company C", image: img },
  { id: 4, name: "Company D", image: img },
  { id: 5, name: "Company E", image: img },
];

const translators = [
  { id: 1, name: "Translator X", image: img },
  { id: 2, name: "Translator Y", image: img },
  { id: 3, name: "Translator Z", image: img },
  { id: 4, name: "Translator W", image: img },
  { id: 5, name: "Translator V", image: img },
];

export default function TopRatedSection() {
  const [activeTab, setActiveTab] = useState("companies");

  const data = activeTab === "companies" ? companies : translators;

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
        {/* Buttons */}
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
              activeTab === "translators" ? "font-bold  text-[18px]" : ""
            }`}
          >
            Top 5 Translators
          </button>
        </div>

        {/* Details Section */}
        <div className="flex flex-wrap items-center justify-center gap-[70px] max-w-xl">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-4 rounded-lg "
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100px] h-[100px] object-cover rounded-lg mb-4"
              />
              <p className="font-semibold text-lg">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
