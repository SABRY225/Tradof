import { motion } from "framer-motion";

export default function AnimatedLogo({ size }) {
  const pathVariants = {
    hidden: { strokeDasharray: 150, strokeDashoffset: 150, opacity: 1 },
    visible: (i) => ({
      strokeDashoffset: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: i * 0.3,
        ease: "easeInOut",
      },
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className="rounded w-fit"
      style={{
        overflow: "hidden",
        borderRadius: `${size * 0.1}px`,
        width: size,
        height: size,
      }}
    >
      <motion.svg
        width={size || 85} // Increased size
        height={size || 85} // Increased size
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
        exit="exit"
        // onAnimationComplete={() => setAnimationCompleted(true)} // Set state to hide paths after animation
      >
        {/* Background Rectangle */}
        <rect
          width="10000"
          height="100000"
          rx="8"
          fill="white"
        />

        {/* Animated Paths */}
        {[
          "M8.15218 28.9673C8.15218 35.4875 13.4255 40.7608 19.9457 40.7608L18.1766 37.8125", // Arrow 1
          "M41.8478 18.8587C41.8478 12.3386 36.5744 7.06522 30.0543 7.06522L31.8233 10.0136", // Arrow 2
          "M25 34.7826C31.0031 34.7826 35.8696 29.9162 35.8696 23.9131C35.8696 17.91 31.0031 13.0435 25 13.0435C18.9969 13.0435 14.1304 17.91 14.1304 23.9131C14.1304 29.9162 18.9969 34.7826 25 34.7826Z", // Circle
          "M20.6522 14.1304H21.7391C19.6196 20.4783 19.6196 27.3478 21.7391 33.6957H20.6522", // Line 1
          "M28.2609 14.1304C30.3804 20.4783 30.3804 27.3478 28.2609 33.6957", // Line 2
          "M15.2174 28.2609V27.1739C21.5652 29.2935 28.4348 29.2935 34.7826 27.1739V28.2609", // Line 3
          "M15.2174 20.6522C21.5652 18.5326 28.4348 18.5326 34.7826 20.6522", // Line 4
          "M5.43478 8.43479C5.43478 6.77793 6.77793 5.43478 8.43478 5.43478H17.6522C19.309 5.43478 20.6522 6.77793 20.6522 8.43478V12.0235C20.6522 12.215 20.5046 12.3777 20.3173 12.4175C19.6073 12.5683 17.8437 13.1345 15.7609 15.2174C13.0435 17.9348 13.1687 20.6522 12.5 20.6522C12.0539 20.6522 10.3814 20.6522 8.43518 20.6522C6.77833 20.6522 5.43478 19.3091 5.43478 17.6522V8.43479Z", // Shape 1
          "M44.5652 39.3914C44.5652 41.0482 43.2221 42.3914 41.5652 42.3914H32.3478C30.691 42.3914 29.3478 41.0482 29.3478 39.3914V35.8027C29.3478 35.6112 29.4954 35.4484 29.6827 35.4086C30.3927 35.2578 32.1563 34.6916 34.2391 32.6087C36.9565 29.8913 36.8313 27.1739 37.5 27.1739C37.9461 27.1739 39.6186 27.1739 41.5648 27.1739C43.2217 27.1739 44.5652 28.5171 44.5652 30.1739V39.3914Z", // Shape 2
          "M14.2066 9.798H7.62494", // Horizontal Line 1
          "M10.8995 8.69565V9.79798", // Vertical Line 1
          "M12.553 9.78186C12.553 12.6188 10.3321 14.9207 7.6087 14.9207", // Curve 1
          "M14.2065 14.9207C13.0231 14.9207 11.9532 14.2884 11.2075 13.2834", // Curve 2
          "M41.6087 38.3318L38.1957 31.5218L34.7826 38.3318", // Arrow 3
          "M35.4046 37.1196H41.0186", // Horizontal Line 2
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#6C63FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
            custom={i}
            initial="hidden"
            animate="visible"
            exit="exit" // Apply exit animation when animation is complete
          />
        ))}
      </motion.svg>
    </div>
  );
}
