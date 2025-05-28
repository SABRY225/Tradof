import { motion } from "motion/react";

export default function PageTitle({ title, subtitle }) {
  return (
    <header className="container max-w-screen-xl mx-auto p-4 w-full bg-background-color mb-[-30px]">
      <div className="bg-main-color max-w-screen-xl m-auto rounded-lg py-[10px]">
        <div className="title font-namdhinggo font-extrabold text-center text-[50px] text-white mx-auto w-full ">
          {title}
          <div className="subtitle font-roboto-condensed text-[16px] font-medium opacity-[80%] text-white">
            {subtitle}
          </div>
        </div>
      </div>
    </header>
  );
}
