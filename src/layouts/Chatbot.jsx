import { useState, useEffect, useCallback } from "react";
import logoIcon from "../assets/icons/logo.svg";
import { FadeLoader } from "react-spinners";
import { rightArrow } from "@/assets/paths";
import { getMessages, sendMessage } from "@/Util/Https/http";

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isPolling, setIsPolling] = useState(true); // حالة لتحديد إذا كنا في حالة polling أم لا

  const fetchMessages = useCallback(async () => {
    try {
      const fetchedMessages = await getMessages(user?.userId, user?.token);
      setMessages(fetchedMessages);
    } catch (err) {
      console.error(err);
    }
  }, [user?.userId, user?.token]);

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedFile) return;
    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("senderId", user?.userId);
    formData.append("message", input);
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const newMessage = await sendMessage(user?.userId, user?.token, formData);
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      setUploadError("حدث خطأ أثناء رفع الملف.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (user?.userId && isPolling) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000); // polling كل 15 ثانية بدلاً من 5
      return () => clearInterval(interval);
    }
  }, [fetchMessages, isPolling, user?.userId]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <img src={logoIcon} alt="logo" style={styles.logo} />
        <span style={styles.title}>Tradof Team</span>
      </div>
      <div style={styles.chatBody} className="custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <FadeLoader
              color="#000"
              height={8}
              width={8}
              loading
              margin={-7}
              radius={10}
              speedMultiplier={1}
            />
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.senderId === user?.userId;
            return (
              <div key={index} style={styles.messageContainer(isUser)}>
                <div style={styles.messageBubble(isUser)}>
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
      </div>
      {uploadError && <p style={styles.error}>{uploadError}</p>}
      <div style={styles.inputBox}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          style={styles.sendButton}
          disabled={uploading || uploadError}
        >
          {uploading ? (
            <div style={styles.spinner} />
          ) : (
            <img src={rightArrow} alt="send" width={20} />
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: 300,
    height: 500,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#7b61ff",
    color: "#fff",
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginRight: 4,
    width: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
  chatBody: {
    flex: 1,
    padding: 12,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  messageContainer: (isUser) => ({
    display: "flex",
    justifyContent: isUser ? "flex-end" : "flex-start",
  }),
  messageBubble: (isUser) => ({
    backgroundColor: isUser ? "#6C63FF" : "#FF6F61",
    color: "#fff",
    padding: 10,
    borderRadius: 12,
    maxWidth: "75%",
    borderTopRightRadius: isUser ? 0 : 12,
    borderTopLeftRadius: isUser ? 12 : 0,
    wordWrap: "break-word",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
  }),
  error: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: 10,
  },
  inputBox: {
    display: "flex",
    padding: "8px",
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  },
  input: {
    flex: 1,
    padding: "5px 10px",
    borderRadius: 20,
    border: "1px solid #ccc",
    outline: "none",
    fontSize: 12,
    resize: "none",
    height: "32px",
    minHeight: "32px",
    maxHeight: "50px",
    overflow: "hidden",
  },
  sendButton: {
    border: "none",
    borderRadius: "50%",
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  spinner: {
    width: 16,
    height: 16,
    border: "2px solid #fff",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Chatbot;
