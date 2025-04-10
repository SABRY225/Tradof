
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Pagination,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Footer from '@/components/shared/Footer';

function AdminFeedback() {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mock data for the feedback list
  const feedbacks = [
    { id: 1, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 2, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 3, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 4, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 5, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 6, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 7, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 8, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
    { id: 9, name: 'Mohamed Abdelrazek', role: 'Dr.rabi3', email: 'abdelrazekmohamad6@gmail.com', phone: '+20 1146 202 455' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7ff]">
      <div className="flex-grow">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
              Last Feedback
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{
            boxShadow: 'none',
            borderRadius: '10px',
            overflow: 'auto',
            mb: 4
          }}>
            <Table sx={{ minWidth: isMobile ? 500 : 650 }}>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow
                    key={feedback.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      },
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <TableCell sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      minWidth: '200px'
                    }}>
                      <Avatar
                        src={`https://ui-avatars.com/api/?name=${feedback.name}&background=6c63ff&color=fff`}
                        alt={feedback.name}
                      />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {feedback.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Freelancer
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ minWidth: '180px' }}>
                      <Typography variant="body2">
                        {feedback.email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: '120px' }}>
                      <Typography variant="body2">
                        {feedback.phone}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: '80px' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6c63ff',
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        Details
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: '50px' }}>
                      <IconButton size="small">
                        <SettingsIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Pagination
              count={5}
              page={page}
              onChange={handleChangePage}
              color="primary"
              size={isMobile ? "small" : "medium"}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#6c63ff',
                },
                '& .Mui-selected': {
                  bgcolor: '#6c63ff !important',
                  color: 'white !important'
                }
              }}
            />
          </Box>
        </Container>
      </div>
      <Footer borderColor={"#6c63ff"}/>
    </div>
  );
}

export default AdminFeedback;
