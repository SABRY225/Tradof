import {
  Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow,
  Paper, Avatar, IconButton, useMediaQuery, useTheme, Chip, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Button, Modal
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ApproveFeedback, DanyFeedback, fetchFeedback } from '@/Util/Https/adminHttp';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { message } from "antd";
import Loading from '../Loading';
import PageTitle from '@/UI/PageTitle';

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const token = Cookies.get("token");
  const getFeedback = async () => {
    const data = await fetchFeedback({ token });
    setFeedbacks(data.data);
  };
  useEffect(() => {
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

  const handleApprove = async() => {
    // Call API to approve the feedback (placeholder)
    const data=await ApproveFeedback({token,id:selectedFeedback._id})
    getFeedback();
    message.success(data.message);
    handleClose();
  };

  const handleDany = async() => {
    const data=await DanyFeedback({token,id:selectedFeedback._id})
    getFeedback();
    message.success(data.message);
    handleClose();
  };
  console.log(feedbacks);
  

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7ff]">
                  <PageTitle title="Feedback" subtitle="" />
      
      <div className="flex-grow">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {feedbacks.length>0 ? <>
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
                        label={feedback?.status}
                        size="small"
                        sx={{
                          bgcolor: feedback?.status=="approve" ? '#3DCF3D' : (feedback?.status=="dany"?"#E85050":"#f0f0f0"),
                          color: feedback?.status=="approve" ? '#fff' : (feedback?.status=="dany"?"#fff":"#000")
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
          </>:<Loading />}

        </Container>
      </div>

      {/* ✅ مودال التفاصيل */}
      <Modal open={openDetailsModal} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: '#6C63FF',color:"#fff", boxShadow: 24, p: 4, borderRadius: 2, minWidth: 500
        }}>
          <Typography variant="h6" mb={2}>Feedback Details</Typography>
          <Typography variant="body1" mb={1}><strong>Rate:</strong> {selectedFeedback?.rate}</Typography>
          <Typography variant="body1" mb={1}><strong>Reason Rate:</strong> {selectedFeedback?.reasonRate}</Typography>
          <Typography variant="body1" mb={1}><strong>idea:</strong> {selectedFeedback?.idea || "No idea"}</Typography>
        </Box>
      </Modal>

      {/* ✅ Dialog الموافقة */}
      <Dialog open={openApproveDialog} onClose={handleClose} >
        <Box sx={{
          bgcolor: '#6C63FF',color:"#fff", boxShadow: 24, p: 4, minWidth: 500,textAlign:"center"
        }}>
        <DialogTitle>Approve Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            color:"#fff"
          }}>
          Do you agree with the rating sent by <span className='text-[#FF6F61] font-bold'>{selectedFeedback?.user?.firstName} {" "}  {selectedFeedback?.user?.lastName}</span> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleDany} sx={{
            color:"#000",
            bgcolor:"#F5F5FF"
          }}>Deny</Button>
          <Button onClick={handleApprove} autoFocus sx={{
            color:"#fff",
            bgcolor:"#FF6F61"

          }}>Approve</Button>
        </DialogActions>
        </Box>

      </Dialog>
    </div>
  );
}

export default AdminFeedback;
