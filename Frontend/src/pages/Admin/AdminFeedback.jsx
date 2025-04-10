
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Avatar, 
  Grid,
  IconButton,
  Pagination
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Footer from '@/components/shared/Footer';

function AdminFeedback() {
  const [page, setPage] = useState(1);
  
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
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              mb: 4, 
              fontWeight: 500
            }}
          >
            Last feedback
          </Typography>

          {feedbacks.map((feedback) => (
            <Paper 
              key={feedback.id}
              sx={{ 
                p: 2, 
                mb: 2, 
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={4} md={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={`https://ui-avatars.com/api/?name=${feedback.name}&background=6c63ff&color=fff`} 
                    alt={feedback.name} 
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {feedback.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feedback.role}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={3} md={3}>
                  <Typography variant="body2">
                    Freelancer
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={5} md={3}>
                  <Typography variant="body2">
                    {feedback.email}
                  </Typography>
                </Grid>
                
                <Grid item xs={6} sm={4} md={1}>
                  <Typography variant="body2">
                    {feedback.phone}
                  </Typography>
                </Grid>
                
                <Grid item xs={3} sm={4} md={1}>
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
                </Grid>
                
                <Grid item xs={3} sm={4} md={1} sx={{ textAlign: 'right' }}>
                  <IconButton size="small">
                    <SettingsIcon fontSize="small" sx={{ color: '#6c63ff' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Pagination 
              count={5} 
              page={page} 
              onChange={handleChangePage}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#6c63ff',
                },
                '& .Mui-selected': {
                  bgcolor: '#6c63ff !important',
                  color: 'white !important'
                }
              }}
              renderItem={(item) => (
                <div className={item.page === page ? 'bg-[#6c63ff] text-white' : ''}>
                  {item.page === 'previous' && <span className="text-[#6c63ff]">previous</span>}
                  {typeof item.page === 'number' && (
                    <span className={`px-3 py-1 mx-1 rounded-md ${item.selected ? 'bg-[#6c63ff] text-white' : 'text-[#6c63ff]'}`}>
                      {item.page}
                    </span>
                  )}
                  {item.page === 'next' && <span className="text-[#6c63ff]">Next</span>}
                </div>
              )}
            />
          </Box>
        </Container>
      </div>

      <Box sx={{ mt: 'auto' }}>
        <hr className="border-t border-gray-200 my-8" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 8, pb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src="/logo.svg" alt="Tradof Logo" width={24} height={24} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Tradof
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Your Trusted Partner in Language Translation
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Privacy policy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Terms of service
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ©2024 Copy Right
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AdminFeedback;
