import { motion } from "motion/react";

export default function PageTitle({ title, subtitle }) {
  return (
    <motion.header
      initial={{ y: "-50rem" }}
      animate={{ y: "0rem" }}
      transition={{ type: "keyframes", duration: 1 }}
      className="relative"
    >
      <div className="relative z-[1] title font-namdhinggo font-extrabold text-center text-[50px] text-white max-w-screen-xl md:py-[60px] mx-auto p-4 w-full">
        {title}
        <div className="subtitle font-roboto-condensed text-[20px] font-regular opacity-[80%]">
          {subtitle}
        </div>
      </div>
      <svg
        className="w-full absolute top-[-1px] lg:top-[-100px] left-0 z-[0]"
        // width="1440"
        // height="323"
        viewBox="0 0 1440 323"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0H1440V221.709C720 355.728 720 357.796 0 221.709V0Z"
          fill="#6C63FF"
        />
      </svg>
    </motion.header>
  );
}
