import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

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

const Feature = ({ selectedFeature }) => {
  const selectedDetails = features.find(
    (feature) => feature.name === selectedFeature
  )?.details;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.3, duration: 0.4 }, // Stagger effect
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }, // Smooth exit
  };

  return (
    <div className="mt-4 md:mt-0 p-6 bg-[#6c63ff] text-white rounded-lg flex flex-col justify-center md:w-[550px] w-[400px] h-[450px] md:h-[370px] overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedDetails && (
          <motion.div
            key={selectedFeature}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col"
          >
            {selectedDetails.map((detail, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index} // Pass index to stagger effect
                className="mb-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <h4 className="font-bold text-lg">{detail.title}</h4>
                </div>
                <p className="text-sm pl-5">{detail.body}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState("Project and Task");
  const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.8, duration: 0.4 }, // Stagger effect
    }),
  };
  return (
    <>
      <div className="hidden lg:block relative w-full h-full">
        <div className="z-[-1] absolute bg-[#d2d4f6] w-[200px] h-[200px] rounded-full right-[10%]"></div>
        <div className="z-[-1] absolute bg-[#37C8DC] opacity-[30%] w-[50px] h-[50px] rounded-full left-[40%] top-[50px]"></div>
        <div className="z-[-1] absolute bg-[#F48C06] opacity-[20%] w-[80px] h-[80px] rounded-full right-[16%] top-[350px]"></div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32 py-4 md:px-32 px-4 h-[80vh] md:h-[70vh]">
        <div className="flex flex-row lg:flex-col flex-wrap justify-center gap-5 md:gap-4">
          {features.map((feature, index) => (
            <motion.button
              key={feature.name}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              custom={index} 
              onClick={() => setSelectedFeature(feature.name)}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className={`flex items-center gap-3 p-2 text-left transition border-b-2 rounded-lg
              ${
                selectedFeature === feature.name
                  ? "font-bold border-[#6c63ff]"
                  : "border-gray-300"
              }`}
            >
              {selectedFeature === feature.name && (
                <span className=" hidden  md:block w-2 h-2 rounded-full bg-[#6c63ff] ml-[-1.5rem]"></span>
              )}
              {feature.name}
            </motion.button>
          ))}
        </div>

        <Feature selectedFeature={selectedFeature} />
      </div>
    </>
  );
};

export default Features;
