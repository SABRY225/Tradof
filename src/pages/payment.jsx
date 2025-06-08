import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import axios from "axios";
import { message } from "antd";

export default function SuccessPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const success = queryParams.get("success");
  const orderId = queryParams.get("order");
  const message = queryParams.get("data.message");

  useEffect(() => {
    async function handleSuccess() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_NODE_URL}/payment/callback`,
          { id, success, orderId, message }
        );
        if (response.data.success === true) {
          message.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (err) {
        console.error(err);
      }
    }
    handleSuccess();
  }, [id, success, orderId, message, navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6D63FF",
      }}
    >
      <Paper
        sx={{
          width: "500px",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <div className="flex justify-center my-5">
          <img src={logo} alt="logo" width={100} />
        </div>
        <Box
          sx={{
            width: "70px",
            height: "70px",
            backgroundColor: "#40D186",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px auto",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CheckIcon sx={{ color: "white", fontSize: "40px" }} />
        </Box>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#333", // لون النص
            marginTop: "20px",
            lineHeight: "1.4",
          }}
        >
          Payment completed successfully
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#333", // لون النص
            marginTop: "15px",
            opacity: 0.8,
          }}
        >
          Thank you for your order. You will be redirected shortly.
        </Typography>
      </Paper>
    </Box>
  );
}
