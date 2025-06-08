import Footer from '@/components/shared/Footer';
import { Typography, Paper, Box } from '@mui/material';

export default function TermsOfService() {
  return (
    <>
      <Box sx={{
        padding:"3rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6D63FF"
      }}>
        <Paper sx={{ padding: "30px", borderRadius: "8px", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", background: "rgba(255, 255, 255, 0.9)" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: "20px" }}>
            Terms of Service
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {`Last Updated: [31/5/2025]
By accessing or using Tradof ("the Platform"), you agree to comply with these Terms of Service ("ToS"). The Platform is designed to streamline translation workflows for companies and freelancers, offering project management, collaboration tools, and secure payment processing.

1. Eligibility
• Users must be at least 18 years old or have legal authority to enter binding agreements.
• Companies and freelancers are responsible for ensuring the accuracy of their account information.

2. Account Responsibilities
• You are accountable for maintaining confidentiality of login credentials.
• Notify Tradof immediately of unauthorized account activity.

3. Platform Usage
• The Platform may be used only for lawful purposes related to translation project management.
• Prohibited activities include:
  i. Uploading malicious or copyrighted content without authorization.
  ii. Disrupting the Platform’s functionality or security.
  iii. Misrepresenting project details or engaging in fraudulent payments.

4. Payments & Fees
• Tradof may charge service fees for transactions; details will be disclosed during payment processing.
• Chargebacks or disputes must be resolved directly between users; Tradof is not liable for payment conflicts.

5. Intellectual Property
• Users retain rights to their translation work but grant Tradof a license to host and display content as needed for service delivery.
• Tradof’s software, branding, and features remain its exclusive property.

6. Termination
• Tradof reserves the right to suspend accounts violating these ToS or engaging in harmful conduct.

7. Disclaimers
• The Platform is provided "as is"; Tradof does not guarantee uninterrupted or error-free service.
• Users assume all risks related to translations, collaborations, and payments.

8. Limitation of Liability
• Tradof is not liable for indirect damages (e.g., lost profits) arising from Platform use.

9. Governing Law
• These ToS are governed by the laws of [Your Jurisdiction].`}
          </Typography>
        </Paper>
      </Box>
      <Footer color="#fff" borderColor="#fff" borderSize="true" />
    </>
  );
}
