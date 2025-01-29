import React, { useState } from "react";
import img from "../../assets/images/landing-2.png";

export default function TopRatedSection({ ...prams }) {
  const [activeTab, setActiveTab] = useState("companies");

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

  const data = activeTab === "companies" ? companies : translators;

  return (
    <div {...prams} className="relative mt-[80px]">
      <div
        className="z-[-1] absolute bg-[#37C8DC] opacity-[20%] w-[300px] h-[300px] bottom-[20%] left-[10%] backdrop-blur-[100px]"
        style={{
          borderRadius: "50%",
          boxShadow: "0px 0px 60px 100px #37C8DC", // Updated values
        }}
      ></div>
      <div
        className="z-[-1] absolute bg-gradient-to-br from-[#CE5BEB] to-[#5B61EB] opacity-[20%] w-[200px] h-[200px] top-[20%] right-[10%] backdrop-blur-[100px]"
        style={{
          borderRadius: "50%",
          boxShadow: "0px 0px 60px 100px #CE5BEB", // Apply solid glow effect
        }}
      ></div>
      <div className="absolute w-screen h-screen bg-[#FEFEFE] bg-opacity-[10%] backdrop-blur-[70px] z-[-1]"></div>

      <div className="max-h-screen p-4 flex flex-col items-center space-y-6">
        {/* Buttons */}
        <div className="flex gap-8 flex-row space-y-3 md:space-y-0 md:space-x-4 font-roboto-condensed text-[22px] font-regular">
          <button
            onClick={() => setActiveTab("companies")}
            className={`transition-all ${
              activeTab === "companies" ? "font-semibold scale-110" : ""
            }`}
          >
            Top 5 Companies
          </button>
          <button
            onClick={() => setActiveTab("translators")}
            className={`transition-all ${
              activeTab === "translators" ? "font-semibold scale-110" : ""
            }`}
          >
            Top 5 Translators
          </button>
        </div>

        {/* Details Section */}
        <div className="flex flex-wrap items-center justify-center gap-[140px] w-full max-w-4xl mt-[90px]">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-4 rounded-lg "
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <p className="font-semibold text-lg">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
