import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import {
  FaFileImage,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import logoIcon from "../assets/icons/logo.svg";
import Loading from "@/pages/Loading";

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(""); // حالة لعرض رسالة خطأ

  const getMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport/${user?.userId}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;
    setUploading(true);
    setUploadError(""); // مسح أي خطأ سابق

    const formData = new FormData();
    formData.append("senderId", user?.userId);
    formData.append("message", input);
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport`,
        formData,
        {
          headers: {
            Authorization: `${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessages((prev) => [...prev, res.data.message]);
      setInput("");
      setSelectedFile(null);
    } catch (err) {
      console.error("Error sending message:", err);
      setUploadError("حدث خطأ أثناء رفع الملف.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setUploadError("من فضلك قم برفع صورة فقط.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setUploadError(""); // مسح أي خطأ سابق
    }
  };

  const getFileIcon = (file) => {
    let fileName = "";
    if (typeof file === 'string') {
      fileName = file;
    } else if (file && file.name) {
      fileName = file.name;
    }

    const lowerCaseFile = fileName.toLowerCase();
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    if (imageExtensions.some((ext) => lowerCaseFile.endsWith(ext))) {
      return <FaFileImage style={styles.fileIcon} />;
    }
    return <FaFileAlt style={styles.fileIcon} />; // عرض أيقونة عامة إذا لم تكن صورة
  };

  const removeFile = () => setSelectedFile(null);

  useEffect(() => {
    if (user?.userId) {
      getMessages();
      const interval = setInterval(getMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [user?.userId]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <img src={logoIcon} alt="logo" style={styles.logo} />
        <span style={styles.title}>Tradof Team</span>
      </div>

      <div style={styles.chatBody}>
        {messages.length === 0 ? (
          <Loading />
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.senderId === user?.userId;
            
            return (
              <div key={index} style={styles.messageContainer(isUser)}>
                <div style={styles.messageBubble(isUser)}>
                  {msg.message}
                  {msg.file && (
                    <div style={styles.fileMessage}>
                      {getFileIcon(msg.file)}
                      {(() => {
                        let fileName = "";
                        if (typeof msg.file === 'string') {
                          fileName = msg.file;
                        } else if (msg.file && msg.file.name) {
                          fileName = msg.file.name;
                        }
                        const lowerCaseFile = fileName.toLowerCase();
                        const imageExtensions = [
                          ".jpg",
                          ".jpeg",
                          ".png",
                          ".gif",
                          ".bmp",
                          ".webp",
                        ];
                        if (imageExtensions.some((ext) =>
                          lowerCaseFile.endsWith(ext)
                        )) {
                          return (
                            <img src={msg.file} style={styles.fileLink} />
                          );
                        } else {
                          return (
                            <a
                              href={msg.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={styles.fileLink}
                            >
                              {fileName.split("/").pop()}
                            </a>
                          );
                        }
                      })()}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedFile && (
        <div style={styles.filePreview}>
          {getFileIcon(selectedFile)}
          <span style={styles.fileName}>{selectedFile.name}</span>
          <FaTimes style={styles.removeIcon} onClick={removeFile} />
        </div>
      )}

      {uploadError && <p style={styles.error}>{uploadError}</p>} {/* عرض رسالة الخطأ */}

      <div style={styles.inputBox}>
        <label style={styles.attachButton}>
          <FaFileImage size={20} color="#7b61ff" />
          <input
            type="file"
            accept="image/*" // لقبول جميع أنواع الصور
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={styles.sendButton}
          disabled={uploading || uploadError} // تعطيل الزر في حالة الرفع أو وجود خطأ
        >
          {uploading ? (
            <div style={styles.spinner} />
          ) : (
            <IoMdSend color="#fff" size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: 320,
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
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginRight: 8,
    width: 24,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
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
  }),
  fileMessage: {
    display: "flex",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
  },
  fileIcon: {
    marginRight: 8,
    fontSize: 18,
  },
  fileLink: {
    color: "#fff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  filePreview: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    margin: "0 12px 8px",
  },
  fileName: {
    fontSize: 12,
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  removeIcon: {
    cursor: "pointer",
    marginLeft: 8,
    color: "#ff4444",
  },
  inputBox: {
    display: "flex",
    padding: "10px 12px",
    borderTop: "1px solid #eee",
    backgroundColor: "#fafafa",
  },
  attachButton: {
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 20,
    border: "1px solid #ccc",
    outline: "none",
    fontSize: 14,
    margin: "0 8px",
  },
  sendButton: {
    backgroundColor: "#7b61ff",
    border: "none",
    borderRadius: "50%",
    width: 40,
    height: 40,
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