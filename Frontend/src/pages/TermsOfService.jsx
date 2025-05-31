import Footer from '@/components/shared/Footer';
import {  Typography, Paper, Box } from '@mui/material';

export default function TermsOfService() {
  return (
    <>
        <Box             sx={{
                height: "100vh",
                width:"100%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                backgroundColor: "#6D63FF" // لون خلفية الصفحة
            }}>
      <Paper sx={{ padding: "30px", borderRadius: "8px", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",background: "rgba(255, 255, 255, 0.9)",  }}>
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: "20px" }}>Terms of Service</Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          Welcome to our website. By accessing or using our services, you agree to be bound by the following terms and conditions.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          <strong>Use of Service:</strong> You agree to use our services only for lawful purposes and in accordance with these terms.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          <strong>Account Responsibility:</strong> If you create an account, you are responsible for maintaining the confidentiality of your login details and for all activities that occur under your account.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          <strong>Limitation of Liability:</strong> We are not liable for any damages arising from your use of our services or the inability to use our services.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          <strong>Termination:</strong> We reserve the right to suspend or terminate your access to our services at any time for violating these terms.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          If you have any questions or concerns regarding these terms, please contact us.
        </Typography>
      </Paper>
    </Box>
      <Footer color="#fff" borderColor="#fff" borderSize="true" />
    </>

  );
}
