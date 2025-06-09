import { useState } from 'react';
import UsersList from './UsersList';
import ChatWindow from './ChatWindow';
import { useAuth } from '@/Context/AuthContext';
import PageTitle from '@/UI/PageTitle';
import { Box } from '@mui/material';

const AdminTechnicalSupport = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Box className='bg-background-color'>
      <PageTitle title="Technical Support" subtitle="" />
      <Box style={{ display: 'flex' }} className="pt-10 pb-20 mx-36">
        <Box sx={{ width: "50%", height: 500, overflowY: "auto" }}>
          <UsersList 
            userToken={user?.token} 
            onUserSelect={setSelectedUser} 
            selectedUserId={selectedUser?.id}
          />
        </Box>
        <Box sx={{ width: "50%", height: 370 }}>
          <ChatWindow 
            selectedUser={selectedUser} 
            userToken={user?.token} 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminTechnicalSupport;
