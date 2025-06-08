import { useState, useEffect } from 'react';
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
    Chip,
    IconButton,
    useMediaQuery,
    useTheme,
    Modal,
    Button,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { editProfitWithdrawalRequests, getProfitWithdrawalRequests } from '@/Util/Https/adminHttp';
import { useAuth } from '@/context/AuthContext';
import Loading from '../Loading';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function ProfitWithdrawalRequests() {
    const {
        user: { token },
    } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [settingsRequest, setSettingsRequest] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchData = async () => {
        try {
            const data = await getProfitWithdrawalRequests(token);
            setRequests(data.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Typography align="center"><Loading /></Typography>;

    const handleApprove = async () => {
        try {
            await editProfitWithdrawalRequests({ token, requestId: settingsRequest._id, paymentStatus: "paid" });
            await fetchData();
        } catch (error) {
            console.error("Error approving request:", error);
        } finally {
            setSettingsRequest(null);
        }
    };

    const handleReject = async () => {
        try {
            await editProfitWithdrawalRequests({ token, requestId: settingsRequest._id, paymentStatus: "rejected" });
            await fetchData();
        } catch (error) {
            console.error("Error rejecting request:", error);
        } finally {
            setSettingsRequest(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f5f7ff]">
            <div className="flex-grow">
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        sx={{
                            mb: 4,
                            color: '#6c63ff',
                            fontWeight: 500
                        }}
                    >
                        Profit Withdrawal Requests
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                            Orders
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
                                {requests.map((request) => (
                                    <TableRow
                                        key={request.id}
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
                                                src={request?.freelancer?.profileImageUrl}
                                                alt={request?.freelancer?.firstName}
                                            />
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {request?.freelancer?.firstName}{" "}{request?.freelancer?.lastName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {request.freelancer?.role}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ minWidth: '180px' }}>
                                            <Typography variant="body2">
                                                {request.freelancer?.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ minWidth: '120px' }}>
                                            <Typography variant="body2">
                                                {request.amount} EGP
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
                                                onClick={() => setSelectedRequest(request)}
                                            >
                                                Details
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ minWidth: '100px' }}>
                                            <Chip
                                                label={request.paymentStatus}
                                                size="small"
                                                sx={{
                                                    bgcolor: request.paymentStatus === 'paid' ? '#e6f7ee' : request.paymentStatus === 'rejected' ? '#e74c3c' : '#f0f0f0',
                                                    color: request.paymentStatus === 'paid' ? '#00c853' : request.paymentStatus === 'rejected' ? '#fff' : '#757575',
                                                    fontWeight: 500,
                                                    borderRadius: '4px',
                                                    width: "70px"
                                                }}
                                            />
                                        </TableCell>
                                        {request.paymentStatus === "pending" && <TableCell sx={{ minWidth: '50px' }}>
                                            <IconButton size="small" onClick={() => setSettingsRequest(request)}>
                                                <SettingsIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>}

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>

            {/* Details Modal */}
            <Modal
                open={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>Details of the bank account</Typography>
                    {selectedRequest && (
                        <>
                            <Typography variant="body2" mb={1}><strong>The name of the account owner : </strong> {selectedRequest.paymentDetails.name}</Typography>
                            <Typography variant="body2" mb={1}><strong>SWIFT Code : </strong> {selectedRequest.paymentDetails.swiftCode}</Typography>
                            <Typography variant="body2" mb={1}><strong>Amount : </strong> {selectedRequest.amount} EGP</Typography>
                            <Typography variant="body2" mb={1}><strong>Address Line 1 : </strong> {selectedRequest.paymentDetails.addressLine1}</Typography>
                            <Typography variant="body2" mb={1}><strong>Address Line 2 : </strong> {selectedRequest.paymentDetails.addressLine2}</Typography>
                            <Typography variant="body2" mb={1}><strong>Country : </strong> {selectedRequest.paymentDetails.country}</Typography>
                            <Typography variant="body2" mb={1}><strong>City : </strong> {selectedRequest.paymentDetails.city}</Typography>
                            <Typography variant="body2" mb={1}><strong>State : </strong> {selectedRequest.paymentDetails.state}</Typography>
                            <Typography variant="body2" mb={1}><strong>PostalCode : </strong> {selectedRequest.paymentDetails.postalCode}</Typography>
                        </>
                    )}
                </Box>
            </Modal>

            {/* Settings Modal */}
            <Modal
                open={!!settingsRequest}
                onClose={() => setSettingsRequest(null)}
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom>Manage Request</Typography>
                    {settingsRequest && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                Do you want to approve or reject this request for <strong>{settingsRequest.freelancer.firstName}</strong>?
                            </Typography>
                            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button variant="contained" className='text-[#6C63FF]' onClick={handleApprove}>
                                    Approve
                                </Button>
                                <Button variant="contained" color="error" onClick={handleReject}>
                                    Reject
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
