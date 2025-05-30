import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 3,
      ease: "easeOut",
    },
  },
};

const TeamPage = () => {
const teamMembers = [
  {
    name: "Ahmed Sabry",
    role: "Full Stack Developer",
    image: "sabry.jpg",
    email: "ahmedsabrymahmoud225@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Specialist in React and UI/UX design."
  },
      {
    name: "Mohamed Abdalrazek",
    role: "Full Stack Developer",
    image: "mohmed abdalrazek.jpg",
    email: "mohmedabdalrazek@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Develops and maintains mobile applications."
  },
  {
    name: "Ahmed Nady",
    role: "Full Stack Developer",
    image: "nady.png",
    email: "ahmed.nady@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Expert in Node.js and database management."
  },
  {
    name: "Ahmed Kamal",
    role: "Full Stack Developer",
    image: "kamal.jpg",
    email: "kamal@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Handles both frontend and backend integration."
  },
  {
    name: "Ahmed Nassar",
    role: "Backend Developer",
    image: "nasser.jpg",
    email: "ahmed.nasser@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Coordinates the team and manages project timelines."
  },
  {
    name: "Yasser Mohamed",
    role: "Backend Developer",
    image: "Yasser Mohamed.jpg",
    email: "yasser.mohamed@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Ensures smooth deployment and CI/CD pipelines."
  },

  {
    name: "Youssef Ghareb",
    role: "Mobile Developer (Flutter)",
    image: "Youssef Ghareb.png",
    email: "youssef.ghareb@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Responsible for testing and quality assurance."
  },
  {
    name: "Mohamed Hagag",
    role: "Mobile Developer (Flutter)",
    image: "hgaga.png",
    email: "mohamed.hagag@email.com",
    linkedin: "https://linkedin.com/",
    bio: "Designs user interfaces and improves user experience."
  }
];

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border-2 border-main-color"
          >
            <img
              src={`/${member.image}`}
              alt={member.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-main-color"
            />
            <h2 className="text-xl font-semibold text-main-color mb-1">{member.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{member.role}</p>
            <a href={`mailto:${member.email}`} className="text-blue-500 text-xs mb-1">{member.email}</a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 text-xs"
            >
              LinkedIn
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
