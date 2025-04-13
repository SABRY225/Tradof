import {
  Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow,
  Paper, Avatar, IconButton, useMediaQuery, useTheme, Chip, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Button, Modal
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { fetchFeedback } from '@/Util/Https/adminHttp';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = Cookies.get("token");

  useEffect(() => {
    const getFeedback = async () => {
      const data = await fetchFeedback({ token });
      setFeedbacks(data.data);
    };
    getFeedback();
  }, []);

  const handleOpenDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDetailsModal(true);
  };

  const handleOpenApproval = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenApproveDialog(true);
  };

  const handleClose = () => {
    setSelectedFeedback(null);
    setOpenDetailsModal(false);
    setOpenApproveDialog(false);
  };

  const handleApprove = () => {
    // Call API to approve the feedback (placeholder)
    console.log("Approved feedback:", selectedFeedback._id);
    handleClose();
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

          <TableContainer component={Paper} sx={{ borderRadius: '10px', mb: 4 }}>
            <Table sx={{ minWidth: isMobile ? 500 : 650 }}>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback._id}>
                    <TableCell sx={{ display: 'flex', gap: 2 }}>
                      <Avatar src={feedback?.user?.profileImageUrl} />
                      <Box>
                        <Typography fontWeight={500}>
                          {feedback.user?.firstName} {feedback.user?.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feedback.user?.role}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{feedback.user?.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={feedback?.isAllowed ? "Accepted" : "Pending"}
                        size="small"
                        sx={{
                          bgcolor: feedback?.isAllowed ? '#e6f7ee' : '#f0f0f0',
                          color: feedback?.isAllowed ? '#00c853' : '#757575'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: '#6c63ff', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        onClick={() => handleOpenDetails(feedback)}
                      >
                        Details
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleOpenApproval(feedback)}>
                        <SettingsIcon fontSize="medium" color="info" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>

      {/* ✅ مودال التفاصيل */}
      <Modal open={openDetailsModal} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, minWidth: 300
        }}>
          <Typography variant="h6" mb={2}>Feedback Details</Typography>
          <Typography variant="body1" mb={1}><strong>Name:</strong> {selectedFeedback?.user?.firstName} {selectedFeedback?.user?.lastName}</Typography>
          <Typography variant="body1" mb={1}><strong>Email:</strong> {selectedFeedback?.user?.email}</Typography>
          <Typography variant="body1" mb={1}><strong>Comment:</strong> {selectedFeedback?.comment || "No comment"}</Typography>
        </Box>
      </Modal>

      {/* ✅ Dialog الموافقة */}
      <Dialog open={openApproveDialog} onClose={handleClose}>
        <DialogTitle>Approve Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل توافق على التقييم المرسل من {selectedFeedback?.user?.firstName}؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button onClick={handleApprove} autoFocus color="primary">نعم</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminFeedback;
