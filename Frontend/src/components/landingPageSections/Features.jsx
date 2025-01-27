import React, { useState } from "react";

const Features = () => {
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
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-32 py-4 px-32 h-[60vh]">
            {/* Buttons/Labels */}
            <div className="flex flex-row md:flex-col gap-4">
                {features.map((feature) => (
                    <button
                        key={feature.name}
                        onClick={() => setSelectedFeature(feature.name)}
                        className={`flex items-center gap-2 p-2 text-left transition font-medium border rounded-lg md:w-48 
              ${selectedFeature === feature.name
                                ? "font-bold border-[#6c63ff]"
                                : "border-gray-300"
                            }`}
                    >
                        {selectedFeature === feature.name && (
                            <span className="w-3 h-3 rounded-full bg-[#6c63ff]"></span>
                        )}
                        {feature.name}
                    </button>
                ))}
            </div>

            {/* Details Box */}
            <div
                className="mt-4 md:mt-0 p-6 bg-[#6c63ff] text-white rounded-lg flex flex-col w-[650px]"
            >
                {features
                    .find((feature) => feature.name === selectedFeature)
                    ?.details.map((detail, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                            <h4 className="font-bold text-lg">{detail.title}</h4>
                            </div>
                            <p className="text-sm">{detail.body}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Features;
