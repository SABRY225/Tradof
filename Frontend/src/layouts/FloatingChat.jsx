import  { useState } from "react";
// import { MdSupportAgent  } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Chatbot from "./Chatbot";
import { BiSupport } from "react-icons/bi";
const FloatingChat = ({ user }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div style={styles.chatContainer}>
          <Chatbot user={user} />
        </div>
      )}
      <button onClick={toggleChat} style={styles.floatingButton}>
        {isOpen ? <IoMdClose size={24} color="#fff" /> : <MdSupportAgent  size={45} color="#fff" />}
      </button>
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
    width: 70,
    height: 70,
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
