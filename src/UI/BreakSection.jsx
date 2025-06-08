import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function BreakSection({ id, text, label }) {
  const ref = useRef(null); // Reference for the section
  const { scrollYProgress } = useScroll({
    target: ref, // Bind the scroll progress to this element
    offset: ["start 95%", "end start"], // Trigger animation when section enters viewport
  });
  const spaceTitle = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5, 1],
    [40, 20, 10, 0, 0]
  );
  const spaceSubtitle = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5, 1],
    [10, 8, 5, 0, 0]
  );
  return (
    <>
      <div
        id={id}
        ref={ref}
        className="font-roboto-condensed w-full flex justify-between items-center my-10 lg:px-32 px-16 gap-12"
      >
        <motion.div className="md:w-full md:h-[2px]  md:p-0 p-2 bg-[#6c63ff] rounded-full md:rounded-none"></motion.div>
        <div className="text-black flex flex-col items-center justify-center w-full">
          <span className="flex gap-2 font-extrabold md:text-4xl text-xl">
            {text.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="flex ">
                {word.split("").map((char, index) => {
                  const rotate = useTransform(
                    scrollYProgress,
                    [0, 0.2, 0.4, 0.5, 1],
                    [
                      (Math.random() - 0.5) * 90,
                      (Math.random() - 0.5) * 50,
                      (Math.random() - 0.5) * 20,
                      0,
                      0,
                    ]
                  );
                  return (
                    <motion.span
                      key={index}
                      style={{
                        marginLeft: window.innerWidth >= 1024 ? spaceTitle : 0,
                        rotate: window.innerWidth >= 1024 ? rotate : 0,
                      }}
                      transition={{ duration: 3, type: "keyframes" }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </span>
          <span className=" flex gap-1 font-bold md:text-base text-xs">
            {label.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="flex ">
                {word.split("").map((char, index) => {
                  const rotate = useTransform(
                    scrollYProgress,
                    [0, 0.2, 0.4, 0.5, 1],
                    [
                      (Math.random() - 0.5) * 90,
                      (Math.random() - 0.5) * 50,
                      (Math.random() - 0.5) * 20,
                      0,
                      0,
                    ]
                  );
                  return (
                    <motion.span
                      key={index}
                      style={{
                        marginLeft:
                          window.innerWidth >= 1024 ? spaceSubtitle : 0,
                        rotate: window.innerWidth >= 1024 ? rotate : 0,
                      }}
                      transition={{ duration: 3, type: "keyframes" }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </span>
        </div>
        <div className="md:w-full md:h-[2px]  md:p-0 p-2  bg-[#6c63ff] rounded-full md:rounded-none"></div>
      </div>
    </>
  );
}
