import Footer from '@/components/shared/Footer';
import { Typography, Paper, Box } from '@mui/material';

export default function Privacy() {
  return (
    <>
      <Box sx={{
        padding:"3rem 0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6D63FF"
      }}>
        <Paper sx={{ padding: "30px", borderRadius: "8px", boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", background: "rgba(255, 255, 255, 0.9)" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: "20px" }}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {`Last Updated: [31/5/2025]
Tradof ("we," "our") respects your privacy. This policy explains how we collect, use, and protect your data on our Translation Project Management Platform.

1. Data Collected
• Account Information: Name, email, payment details (processed securely via third-party providers like Stripe/PayPal).
• Project Data: Files, communication logs, and metadata related to translation projects.
• Usage Analytics: Non-personal data (e.g., IP address, browser type) to improve Platform performance.

2. How We Use Data
• To facilitate project management, payments, and user support.
• To enhance Platform features and security.
• Aggregate analytics may be used for internal research (never identifying individuals).

3. Data Sharing
• With Consent: Freelancers/companies share project details to collaborate.
• Service Providers: Trusted third parties (e.g., hosting, payment processors) access data only to perform necessary functions.
• Legal Compliance: Data may be disclosed if required by law.

4. Security Measures
• Encryption (SSL/TLS) for data transmission.
• Restricted access to sensitive information.

5. User Rights
• Access, correct, or request deletion of personal data via account settings or by contacting us.

6. Cookies
• Essential cookies ensure Platform functionality; optional cookies (e.g., analytics) require user consent.

7. Policy Updates
• Users will be notified of material changes via email or Platform notifications.

8. Contact
• For questions, contact: tradofhelp@gmail.com`}
          </Typography>
        </Paper>
      </Box>
      <Footer color="#fff" borderColor="#fff" borderSize="true" />
    </>
  );
}
