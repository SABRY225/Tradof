import React, { useState, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { FaFileImage, FaFileAlt, FaTimes } from 'react-icons/fa';
import { Avatar, Box } from '@mui/material';
import { getChatMessages, sendMessage } from '../../Util/Https/adminHttp';
import styles from './ChatLayout.module.css';
import Loading from "@/pages/Loading";
import ChatIcon from '@mui/icons-material/Chat';
const MessageBubble = ({ message, isUser, file }) => (
<Box 
  sx={{
    display: 'flex', 
    justifyContent: isUser === "admin" ? 'flex-end' : 'flex-start',  
  }}
>
  <Box 
    sx={{
      padding: "10px 20px",
      borderRadius: "16px",
      backgroundColor: isUser === "admin" ? "#6C63FF" : "#e0e0e0",
      color: isUser === "admin" ? "#fff" : "#000",
      maxWidth: "70%", 
      wordWrap: 'break-word',  
      marginBottom: "0.5rem",
      overflow: 'hidden', 
    }}
  >
    {message}
  </Box>
</Box>


);

const ChatWindow = ({ selectedUser, userToken }) => {
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [uploadError, setUploadError] = useState('');

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
            setUploadError('');
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
            setInput('');
            setSelectedFile(null);
            setChatMessages(await getChatMessages(selectedUser.id, userToken)); // Refresh chat messages
        } catch (err) {
            setUploadError("حدث خطأ أثناء إرسال الرسالة أو رفع الملف.");
        } finally {
            setUploading(false);
        }
    };

    const getFileIcon = (file) => {
        const fileName = typeof file === 'string' ? file : file.name;
        const lowerCaseFile = fileName.toLowerCase();
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
        return imageExtensions.some((ext) => lowerCaseFile.endsWith(ext))
            ? <FaFileImage style={styles.fileIcon} />
            : <FaFileAlt style={styles.fileIcon} />;
    };

    return (
        <Box className="border-2  rounded-lg " >
            {selectedUser ? (
                <>
                    <Box
                        className="p-4 border-b-2 "
                    >
                        <h3 className='flex items-center'>
                            {selectedUser ? (
                                <>
                                    <Avatar
                                        src={selectedUser?.profileImageUrl}
                                        alt={selectedUser?.firstName}
                                        sx={{ width: 50, height: 50, mr: 1, border: "3px solid #6C63FF" }}
                                    />
                                    <h4>{selectedUser.firstName + " " + selectedUser.lastName}</h4>
                                </>
                            ) : (
                                'Chatting'
                            )}
                        </h3>
                    </Box>

                    <Box sx={{ height: 370, overflowY: "auto" ,padding:"0.5rem"}} >
                        {loadingMessages ? (
                            <Loading />
                        ) : (
                            chatMessages.map(msg => (
                                <MessageBubble key={msg.id} message={msg.message} isUser={msg.senderId} file={msg.file} />
                            ))
                        )}
                    </Box>
                    {selectedUser && (
                        <Box className="flex justify-center items-center mb-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message..."
                                style={{width:"90%",height:"50px"}}
                                className='border border-main-color rounded-3xl pl-3'
                                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                            />
                            <button
                                onClick={sendChatMessage}
                                disabled={uploading || uploadError}
                            >
                                {uploading ? <Box style={styles.spinner} /> : <IoMdSend color="#6C63FF" size={30} />}
                            </button>
                        </Box>
                    )}
                </>

            ) : <Box className="text-center">

                <ChatIcon sx={{ fontSize: "500px", color: "#e0e0e0" }} />
            </Box>}
        </Box>
    );
};

export default ChatWindow;
