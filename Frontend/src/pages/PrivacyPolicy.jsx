import Footer from '@/components/shared/Footer';
import {  Typography, Paper, Box } from '@mui/material';

export default function PrivacyPolicy() {
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
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: "20px" }}>Privacy Policy</Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          <strong>Information We Collect:</strong> We collect personal information when you use our services. This includes your name, email address, and other details you provide.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          <strong>How We Use Your Information:</strong> We use your information to improve our services, provide customer support, and notify you of updates and offers.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          <strong>Data Security:</strong> We take data security seriously and employ industry-standard security measures to protect your information.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          If you have any questions about this policy, feel free to contact us.
        </Typography>
      </Paper>

    </Box>
      <Footer color="#fff" borderColor="#fff" borderSize="true" />

   </>
  );
}
