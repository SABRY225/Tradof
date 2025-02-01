import { motion } from "framer-motion";
import AnimatedLogo from "../UI/AnimatedLogo";
import { useEffect, useState } from "react";

const Loading = () => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 6000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  // Animation variants for the dots
  const dotsAnimation = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.5 },
    },
  };

  return (
    <div className="flex flex-col justify-center gap-2 items-center h-screen">
      <AnimatedLogo key={key} />
      <motion.p
        className="text-[20px] font-semibold font-impact text-center"
        initial="hidden"
        animate="visible"
        variants={dotsAnimation}
      >
        Loading
        <motion.span
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            repeat: Infinity,
            repeatType: "loop",
            duration: 1,
          }}
        >
          .
        </motion.span>
        <motion.span
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            duration: 1,
          }}
        >
          .
        </motion.span>
        <motion.span
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2,
            repeat: Infinity,
            repeatType: "loop",
            duration: 1,
          }}
        >
          .
        </motion.span>
      </motion.p>
    </div>
  );
};

export default Loading;
