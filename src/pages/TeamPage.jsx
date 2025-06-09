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
      linkedin:
        "https://www.linkedin.com/in/ahmed-sabry-46364b364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Mohamed Abdalrazek",
      role: "Full Stack Developer",
      image: "mohmed abdalrazek.jpg",
      email: "abdalrazekmohmed6@gmail.com",
      linkedin:
        "https://www.linkedin.com/in/mohamed-abdalrazek-6515a0232?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Ahmed Nady",
      role: "Full Stack Developer",
      image: "nady.png",
      email: "dev.ahmed.nady@gmail.com",
      linkedin: "https://www.linkedin.com/in/mohamed-hagag-ba9697223",
    },
    {
      name: "Ahmed Kamal",
      role: "Full Stack Developer",
      image: "kamal.jpg",
      email: "ahmedkamalyoussef4@gmail.com",
      linkedin: "https://www.linkedin.com/in/ahmed-kamal-b51621277/",
    },
    {
      name: "Ahmed Nassar",
      role: "Backend Developer",
      image: "nasser.jpg",
      email: "an229314@gmail.com",
      linkedin: "https://www.linkedin.com/in/ahmed-nasser-128a1b309",
    },
    {
      name: "Yasser Mohamed",
      role: "Backend Developer",
      image: "Yasser Mohamed.jpg",
      email: "yasser92220@gmail.com",
      linkedin: "https://www.linkedin.com/in/yasser-mohamed-928a761b2",
    },

    {
      name: "Youssef Ghareb",
      role: "Mobile Developer (Flutter)",
      image: "Youssef Ghareb.png",
      email: "yuossefghareb27@gmail.com",
      linkedin: "https://www.linkedin.com/in/youssef-ghareb-81303b226/",
    },
    {
      name: "Mohamed Hagag",
      role: "Mobile Developer (Flutter)",
      image: "hgaga.png",
      email: "mh169824@gmail.com",
      linkedin: "https://www.linkedin.com/in/mohamed-hagag-ba9697223",
    },
  ];

  return (
    <>
      <div className="hidden lg:block relative max-w-screen max-h-screen">
        <div
          className="z-[-1] absolute bg-[#F48C06] opacity-[30%] w-[200px] h-[200px] rounded-full right-[0%]"
          style={{ boxShadow: "0px 0px 31px 43px #F48C06" }}
        ></div>
        <div
          className="z-[-1] absolute bg-[#6c63ff] opacity-[30%] w-[150px] h-[150px] rounded-full left-[0%] top-[20rem]"
          style={{
            boxShadow: "0px 0px 31px 43px #6c63ff",
          }}
        ></div>
        <div
          className="z-[-1] absolute bg-[#37C8DC] opacity-[30%] w-[80px] h-[80px] rounded-full right-[16%] top-[350px]"
          style={{ boxShadow: "0px 0px 31px 43px #37C8DC" }}
        ></div>
        <div className="absolute top-0 left-0 w-screen-lg h-screen bg-[#FEFEFE] bg-opacity-[10%] backdrop-blur-sm z-[-1]"></div>
      </div>
      <div className="min-h-screen py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-lg shadow-md p-6 flex flex-col items-center border-2"
            >
              <div className="mb-4 border-2 border-main-color rounded-full p-1">
                <img
                  src={`/${member.image}`}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-main-color mb-1">
                {member.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">{member.role}</p>
              <a
                href={`mailto:${member.email}`}
                className="text-blue-500 text-xs mb-1"
              >
                {member.email}
              </a>
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
    </>
  );
};

export default TeamPage;
