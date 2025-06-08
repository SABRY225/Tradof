import { useState } from "react";
// import { MdSupportAgent  } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Chatbot from "./Chatbot";
import { motion, AnimatePresence } from "framer-motion";

const FloatingChat = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            style={styles.chatContainer}
          >
            <Chatbot user={user} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleChat}
        style={styles.floatingButton}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {isOpen ? (
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IoMdClose size={20} color="#fff" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MdSupportAgent size={30} color="#fff" />
          </motion.div>
        )}
      </motion.button>
    </>
  );
};

const styles = {
  chatContainer: {
    position: "fixed",
    bottom: 80,
    right: 20,
    zIndex: 999,
  },
  floatingButton: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#7b61ff",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1000,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
};

export default FloatingChat;
