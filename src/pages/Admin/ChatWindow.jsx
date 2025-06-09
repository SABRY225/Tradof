import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import { FaFileImage, FaFileAlt, FaTimes } from "react-icons/fa";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { getChatMessages, sendMessage } from "../../Util/Https/adminHttp";
import styles from "./ChatLayout.module.css";
import Loading from "@/pages/Loading";
import ChatIcon from "@mui/icons-material/Chat";

const MessageBubble = ({ message, isUser, file }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: isUser === "admin" ? "flex-end" : "flex-start",
      mb: 1,
      px: { xs: 1, sm: 2 },
    }}
  >
    <Box
      sx={{
        padding: { xs: "8px 16px", sm: "10px 20px" },
        borderRadius: "16px",
        backgroundColor: isUser === "admin" ? "#6C63FF" : "#e0e0e0",
        color: isUser === "admin" ? "#fff" : "#000",
        maxWidth: { xs: "85%", sm: "70%" },
        wordWrap: "break-word",
        fontSize: { xs: "14px", sm: "16px" },
        overflow: "hidden",
      }}
    >
      {message}
    </Box>
  </Box>
);

const ChatWindow = ({ selectedUser, userToken }) => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (selectedUser?.id) {
        setLoadingMessages(true);
        const messages = await getChatMessages(selectedUser.id, userToken);
        setChatMessages(messages);
        setLoadingMessages(false);
      }
    };

    fetchChatMessages();
  }, [selectedUser, userToken]);

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

  const sendChatMessage = async () => {
    if (!input.trim() && !selectedFile) return;
    if (!selectedUser) {
      alert("Please select a user to send a message to.");
      return;
    }
    setUploading(true);
    setUploadError("");

    try {
      await sendMessage(selectedUser.id, input, selectedFile, userToken);
      setInput("");
      setSelectedFile(null);
      setChatMessages(await getChatMessages(selectedUser.id, userToken));
    } catch (err) {
      setUploadError("حدث خطأ أثناء إرسال الرسالة أو رفع الملف.");
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (file) => {
    const fileName = typeof file === "string" ? file : file.name;
    const lowerCaseFile = fileName.toLowerCase();
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    return imageExtensions.some((ext) => lowerCaseFile.endsWith(ext)) ? (
      <FaFileImage style={styles.fileIcon} />
    ) : (
      <FaFileAlt style={styles.fileIcon} />
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      {selectedUser ? (
        <>
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              src={selectedUser?.profileImageUrl}
              alt={selectedUser?.firstName}
              sx={{
                width: { xs: 40, sm: 50 },
                height: { xs: 40, sm: 50 },
                border: "3px solid #6C63FF",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "16px", sm: "18px" },
                fontWeight: 500,
              }}
            >
              {selectedUser.firstName + " " + selectedUser.lastName}
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: { xs: 1, sm: 2 },
              height: { xs: "300px", sm: "400px", md: "100%" },
            }}
          >
            {loadingMessages ? (
              <Loading />
            ) : (
              chatMessages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg.message}
                  isUser={msg.senderId}
                  file={msg.file}
                />
              ))
            )}
          </Box>

          {selectedUser && (
            <Box
              sx={{
                p: { xs: 1, sm: 2 },
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                style={{
                  flex: 1,
                  height: { xs: "40px", sm: "50px" },
                  padding: "0 16px",
                  borderRadius: "24px",
                  border: "1px solid #6C63FF",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
              />
              <IconButton
                onClick={sendChatMessage}
                disabled={uploading || uploadError}
                sx={{
                  color: "#6C63FF",
                  "&:hover": { color: "#5a52d5" },
                }}
              >
                {uploading ? (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      border: "2px solid #6C63FF",
                      borderTop: "none",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                ) : (
                  <IoMdSend size={24} />
                )}
              </IconButton>
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <ChatIcon
            sx={{
              fontSize: { xs: "200px", sm: "300px", md: "400px" },
              color: "#e0e0e0",
            }}
          />
          <Typography
            sx={{
              color: "#666",
              mt: 2,
              fontSize: { xs: "16px", sm: "18px" },
            }}
          >
            Select a user to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
