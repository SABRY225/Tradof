import React, { useState } from "react";
import img from "../../assets/images/landing-2.png";

export default function TopRatedSection() {
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
        <div className="min-h-screen p-4 flex flex-col items-center space-y-6">
            {/* Buttons */}
            <div className="flex gap-8 flex-row space-y-2 md:space-y-0 md:space-x-4">
                <button
                    onClick={() => setActiveTab("companies")}
                    className={`px-6 py-2 rounded-md transition-all ${activeTab === "companies"
                        ? "font-bold text-white bg-[#6c63ff]"
                        : "font-normal text-blue-600 bg-gray-200 hover:bg-blue-300"
                        }`}
                >
                    Top 5 Companies
                </button>
                <button
                    onClick={() => setActiveTab("translators")}
                    className={`px-6 py-2 rounded-md transition-all ${activeTab === "translators"
                        ? "font-bold text-white bg-[#6c63ff]"
                        : "font-normal text-blue-600 bg-gray-200 hover:bg-blue-300"
                        }`}
                >
                    Top 5 Translators
                </button>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
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
    );
}
