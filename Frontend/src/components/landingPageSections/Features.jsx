import React, { useState } from "react";

import '../../styles/Circle.css';

const Features = ({ ...prams }) => {
  const [selectedFeature, setSelectedFeature] = useState("Project and Task");

  const features = [
    {
      name: "Project and Task",
      details: [
        {
          title: "Project Management",
          body: "Create, assign, and track translation projects with multiple tasks and stages, keeping everything on schedule with real-time updates.",
        },
        {
          title: "Deadline and Task Tracking",
          body: "Set deadlines and track tasks in real-time to ensure projects stay on schedule.",
        },
        {
          title: "Document Management",
          body: "Keep all project documents organized and secure. Upload and access files directly within each project.",
        },
        {
          title: "Customizable Workflows",
          body: "Adjust workflows to suit specific processes, making it easy to manage any project setup or client requirements.",
        },
      ],
    },
    {
      name: "Financial and Business Insights",
      details: [
        {
          title: "Financial Reporting",
          body: "Get detailed financial insights to track revenue and manage expenses effectively.",
        },
        {
          title: "Invoicing and Payments",
          body: "Generate invoices and manage payments for all your projects seamlessly.",
        },
        {
          title: "Budget Management",
          body: "Set budgets for projects and monitor expenses in real-time.",
        },
      ],
    },
    {
      name: "Collaboration and Access",
      details: [
        {
          title: "Team Collaboration",
          body: "Enable seamless collaboration among team members with shared tools and resources.",
        },
        {
          title: "Access Control",
          body: "Set permissions and manage access for different roles and team members.",
        },
        {
          title: "Real-Time Updates",
          body: "Keep everyone informed with real-time updates on project progress.",
        },
      ],
    },
  ];

  return (
    <>
      <div
        {...prams}
        className="relative grid grid-cols-[30%_30%] items-center justify-center gap-[165px] h-height-section px-[170px]"
      >
        <div
          className="z-[-1] absolute w-[300px] h-[300px] bottom-[10%] left-[40%] translate-x-1/2"
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
        >
          <div className="circle before:bg-[#F48C06] after:bg-background-color"></div>
        </div>
        <div
          className="z-[-1] absolute w-[313px] h-[313px] bottom-[30%] right-[10rem]"
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
        >
          <div className="circle before:bg-[#37C8DC] after:bg-background-color"></div>
        </div>
        <div
          className="z-[-1] absolute w-[100px] h-[100px] top-[20%] left-[40%]"
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
        >
          <div className="circle before:bg-[#F48C06] after:bg-background-color after:width-[80%] after:height-[80%]"></div>
        </div>
        {/* Buttons/Labels */}
        <ul className="flex flex-row md:flex-col gap-4">
          {features.map((feature) => (
            <li key={feature.name}>
              <button
                onClick={() => setSelectedFeature(feature.name)}
                className={`text-[26px] font-regular flex items-center gap-3 p-2 text-left transition font-medium
                ${
                  selectedFeature === feature.name
                    ? " border-b-[3px] font-bold border-[#6c63ff]"
                    : ""
                }`}
              >
                {selectedFeature === feature.name && (
                  <span className="w-[15px] h-[15px] rounded-full bg-[#6c63ff] ml-[-35px]"></span>
                )}
                {feature.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Details Box */}
        <ul className="list-disc pl-10 mt-4 md:mt-0 p-6 bg-[#6c63ff] text-white rounded-lg flex flex-col justify-center w-[650px] mx-auto h-[550px]">
          {features
            .find((feature) => feature.name === selectedFeature)
            ?.details.map((detail, index) => (
              <li key={index} className="mb-4 marker:text-[25px]">
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 rounded-full bg-white"></div> */}
                  <h4 className="font-regular text-[25px]">{detail.title}</h4>
                </div>
                <p className="text-[20px] italic">{detail.body}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Features;
