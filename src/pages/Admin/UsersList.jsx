import { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import Loading from "@/pages/Loading";
import { getMessagesList } from '../../Util/Https/adminHttp';

const LastMessageItem = ({ user, lastMessage, onUserSelect, isActive }) => (
  <Box
    onClick={() => onUserSelect(user)}
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: 1,
      borderRadius: 2,
      marginBottom:1,
      backgroundColor: isActive ? '#e0e0e0' : '#6C63FF',
      '&:hover': {
        backgroundColor: '#f5f5f5',
        cursor: 'pointer',
      },
    }}
  >
    <Avatar 
      src={user?.profileImageUrl}
      alt={user?.firstName}
      sx={{
        width: 50, 
        height: 50, 
        border:"3px solid #6C63FF",
        mr: 2, 
        '&:hover': { 
          transform: 'scale(1.1)', 
          transition: '0.3s ease-in-out' 
        }
      }} 
    />
    <Box>
      <Typography sx={{ fontWeight: 'bold' , color: isActive ? '#6C63FF' : '#fff', }}>
        {user?.firstName + " " + user?.lastName}
      </Typography>
      <Typography variant="body2" sx={{ width:"100px", overflow: 'hidden', textOverflow: 'ellipsis',color: isActive ? '#6C63FF' : '#fff',  }}>
        {lastMessage?.message}
      </Typography>
    </Box>
  </Box>
);

const UsersList = ({ onUserSelect, selectedUserId, userToken }) => {
  const [messagesData, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessagesList(userToken);
      setMessages(messages);
    };
    fetchMessages();
  }, [userToken]);

  return (
    <Box sx={{ padding: 2 }}>
      {messagesData.length > 0 ? (
        messagesData.map(item => (
          <LastMessageItem
            key={item?.user?.id}
            user={item?.user}
            lastMessage={item?.latestMessage}
            onUserSelect={onUserSelect}
            isActive={selectedUserId === item?.user?.id}
          />
        ))
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default UsersList;
