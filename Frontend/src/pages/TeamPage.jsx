import React from "react";

const teamMembers = [
  {
    name: "Ahmed Nady",
    role: "Frontend Developer",
    image: "/images/team/ahmed-nady.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Specialist in React and UI/UX design."
  },
  {
    name: "Ahmed Nady",
    role: "Backend Developer",
    image: "/images/team/sara-mostafa.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Expert in Node.js and database management."
  },
  {
    name: "Ahmed Nady",
    role: "Full Stack Developer",
    image: "/images/team/mohamed-ali.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Handles both frontend and backend integration."
  },
  {
    name: "Ahmed Nady",
    role: "Project Manager",
    image: "/images/team/fatma-hassan.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Coordinates the team and manages project timelines."
  },
  {
    name: "Ahmed Nady",
    role: "DevOps Engineer",
    image: "/images/team/omar-khaled.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Ensures smooth deployment and CI/CD pipelines."
  },
  {
    name: "Ahmed Nady",
    role: "QA Engineer",
    image: "/images/team/mona-adel.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Responsible for testing and quality assurance."
  },
  {
    name: "Ahmed Nady",
    role: "Mobile Developer",
    image: "/images/team/youssef-samir.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Develops and maintains mobile applications."
  },
  {
    name: "Ahmed Nady",
    role: "UI/UX Designer",
    image: "/images/team/nourhan-tarek.jpg",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Designs user interfaces and improves user experience."
  }
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background-color py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-main-color">Meet the Developer Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-main-color"
              onError={e => { e.target.src = '/images/team/default.jpg'; }}
            />
            <h2 className="text-xl font-semibold text-main-color mb-1">{member.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{member.role}</p>
            <p className="text-xs text-gray-500 mb-2">{member.bio}</p>
            <a href={`mailto:${member.email}`} className="text-blue-500 text-xs mb-1">{member.email}</a>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 text-xs">LinkedIn</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
