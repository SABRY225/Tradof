import { useState } from "react";
import UsersList from "./UsersList";
import ChatWindow from "./ChatWindow";
import { useAuth } from "@/context/AuthContext";
import PageTitle from "@/UI/PageTitle";
import { Box, Container } from "@mui/material";

const AdminTechnicalSupport = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Box className="bg-background-color min-h-screen">
      <PageTitle title="Technical Support" subtitle="" />
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, sm: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, sm: 3, md: 4 },
            height: { xs: "auto", md: "calc(100vh - 200px)" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: "400px", md: "100%" },
              overflowY: "auto",
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              p: { xs: 1, sm: 2 },
            }}
          >
            <UsersList
              userToken={user?.token}
              onUserSelect={setSelectedUser}
              selectedUserId={selectedUser?.id}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: "400px", md: "100%" },
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              p: { xs: 1, sm: 2 },
            }}
          >
            <ChatWindow selectedUser={selectedUser} userToken={user?.token} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminTechnicalSupport;
