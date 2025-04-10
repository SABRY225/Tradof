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
    Chip,
    IconButton,
    Pagination,
    useMediaQuery,
    useTheme
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Footer from '@/components/shared/Footer';

export default function ProfitWithdrawalRequests() {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Mock data for the table
    const requests = [
        { id: 1, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Pending' },
        { id: 2, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Pending' },
        { id: 3, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Pending' },
        { id: 4, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Pending' },
        { id: 5, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Pending' },
        { id: 6, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Pending' },
        { id: 7, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Complete' },
        { id: 8, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Complete' },
        { id: 9, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Complete' },
        { id: 10, name: 'Mohamed Abdelrazek', role: 'Freelancer', email: 'abdelrazekmohamad@gmail.com', phone: '+20 146 232 455', status: 'Pending' },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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
                                                src={`https://ui-avatars.com/api/?name=${request.name}&background=6c63ff&color=fff`}
                                                alt={request.name}
                                            />
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {request.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {request.role}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ minWidth: '180px' }}>
                                            <Typography variant="body2">
                                                {request.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ minWidth: '120px' }}>
                                            <Typography variant="body2">
                                                {request.phone}
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
                                        <TableCell sx={{ minWidth: '100px' }}>
                                            <Chip
                                                label={request.status}
                                                size="small"
                                                sx={{
                                                    bgcolor: request.status === 'Complete' ? '#e6f7ee' : '#f0f0f0',
                                                    color: request.status === 'Complete' ? '#00c853' : '#757575',
                                                    fontWeight: 500,
                                                    borderRadius: '4px'
                                                }}
                                            />
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
            <Footer borderColor={"#6c63ff"} />
        </div>
    );
}
