import { useEffect, useState } from 'react';
import styles from './ChatLayout.module.css';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { IoMdSend } from 'react-icons/io';
import { FaFileAlt, FaFileImage, FaTimes } from 'react-icons/fa';
import logoIcon from "../../assets/icons/logo.svg";
import Loading from '../Loading';

const MessageBubble = ({ message, isUser, file }) => (
  <div className={`${styles.messageBubble} ${isUser === "admin" ? styles.userMessage : styles.otherMessage}`}>
    {message}
    {file && <img src={file} width={100} alt="Attached File" />}
  </div>
);

const LastMessageItem = ({ user, lastMessage, onUserSelect, isActive }) => (
  <div
    className={`${styles.lastMessageItem} ${isActive ? styles.active : ''}`}
    onClick={() => onUserSelect(user)}
  >
    <img src={user?.profileImageUrl} alt={user?.firstName} className={styles.avatar} />
    <div className={styles.messageDetails}>
      <h3 className={styles.userName}>{user?.firstName + " " + user?.lastName}</h3>
      <p className={styles.lastMessageText}>{lastMessage?.message}</p>
    </div>
  </div>
);

const AdminTechnicalSupport = () => {
  const { user } = useAuth();
  const [messagesData, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [input, setInput] = useState("");
  const [selectedUserChat, setSelectedUserChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const getMessagesList = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport`,
        { headers: { Authorization: `${user?.token}` } }
      );
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching messages list:", err);
    }
  };

  const getChatMessages = async (userId) => {
    if (!userId) return;
    setLoadingMessages(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport/${userId}`,
        { headers: { Authorization: `${user?.token}` } }
      );
      setChatMessages(res.data.messages);
    } catch (err) {
      console.error(`Error fetching chat messages for user ${userId}:`, err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getMessagesList();
      const interval = setInterval(getMessagesList, 5000);
      return () => clearInterval(interval);
    }
  }, [user?.userId]);

  useEffect(() => {
    if (selectedUserChat?.id) {
      getChatMessages(selectedUserChat.id);
    } else {
      setChatMessages([]); // Clear messages when no user is selected
    }
  }, [selectedUserChat?.id]);

  const handleUserSelect = (user) => {
    setSelectedUserChat(user);
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
      setUploadError("");
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
    return <FaFileAlt style={styles.fileIcon} />;
  };

  const removeFile = () => setSelectedFile(null);

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;
    if (!selectedUserChat) {
      alert("Please select a user to send a message to.");
      return;
    }
    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("receiverId", selectedUserChat.id);
    formData.append("message", input);
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport/admin`,
        formData,
        {
          headers: {
            Authorization: `${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getChatMessages(selectedUserChat.id); // Refresh chat messages
      setInput("");
      setSelectedFile(null);
    } catch (err) {
      console.error("Error sending message:", err);
      setUploadError("حدث خطأ أثناء إرسال الرسالة أو رفع الملف.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.lastMessagesSection}>
        <div className={styles.lastMessagesHeader}>
          <h3>Users</h3>
        </div>
        <div className={styles.lastMessagesList}>
          {messagesData.length > 0 ? (
            messagesData.map(item => (
              <LastMessageItem
                key={item?.user?.id}
                user={item?.user}
                lastMessage={item?.latestMessage}
                onUserSelect={handleUserSelect}
                isActive={selectedUserChat && selectedUserChat.id === item?.user?.id}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>

      <div className={styles.chattingSection}>
        <div className={styles.chatHeader}>
          <h3 className='flex items-center'>
            {selectedUserChat ? (
              <>
                <img src={selectedUserChat.profileImageUrl} className={styles.avatar} alt={selectedUserChat.firstName} />
                <h4>{selectedUserChat.firstName + " " + selectedUserChat.lastName}</h4>
              </>
            ) : (
              'Chatting'
            )}
          </h3>
        </div>
        <div className={styles.messageList}>
          {loadingMessages ? (
            <Loading />
          ) : (
            chatMessages.map(msg => (
              <MessageBubble key={msg.id} message={msg.message} isUser={msg.senderId} file={msg.file}/>
            ))
          )}
        </div>
        {selectedUserChat ? (
          <>
            {selectedFile && (
              <div className='flex justify-between items-center mx-2 py-3 px-2'>
                <div className='flex items-center'>
                  {getFileIcon(selectedFile)}
                  <span className='mx-2'>{selectedFile.name}</span>
                </div>
                <FaTimes onClick={removeFile} />
              </div>
            )}
            {uploadError && <p className={styles.uploadError}>{uploadError}</p>}
            <div style={styleClass.inputBox}>
              <label style={styleClass.attachButton}>
                <FaFileImage size={20} color="#7b61ff" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                style={styleClass.input}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                style={styleClass.sendButton}
                disabled={uploading || uploadError}
              >
                {uploading ? (
                  <div style={styleClass.spinner} />
                ) : (
                  <IoMdSend color="#fff" size={20} />
                )}
              </button>
            </div>
          </>
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <img src={logoIcon} alt={logoIcon} width={300} />
            <div className='text-2xl mt-3 mb-28 text-main-color font-bold'>You can chat now</div>
          </div>
        )}
      </div>
    </div>
  );
};

const styleClass = {
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

export default AdminTechnicalSupport;