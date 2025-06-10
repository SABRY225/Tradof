import { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Slider,
} from "@mui/material";
import feedbackImg from "@/assets/images/feedback.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceFrownOpen,
  faFaceMeh,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { sendFeedback } from "@/Util/Https/http";
import Cookies from "js-cookie";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [rating, setRating] = useState(50);
  const [reason, setReason] = useState("");
  const [idea, setIdea] = useState("");
  const token = Cookies.get("token");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ratingsMap = {
        0: "Very Bad",
        25: "Bad",
        50: "Good",
        75: "Very Good",
        100: "Excellent",
      };

      const rate = ratingsMap[rating];
      if (!rate || !reason) {
        message.error("rete and reason for rate are required.");
      }

      const data = await sendFeedback({
        token,
        rate,
        reasonRate: reason,
        idea,
      });
      console.log("Feedback response:", data);
      messageApi.success(data?.message);
    } catch (error) {
      messageApi.error(error?.message);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="relative overflow-hidden min-h-screen">
        <div className="bg-background-color absolute top-0 left-0 w-full h-full z-[-1]"></div>
        <motion.div
          initial={{ y: "-300rem" }}
          animate={{ y: "0" }}
          transition={{ type: "keyframes", duration: 1 }}
          className="hidden md:block polygon-background-2 z-[-1] absolute bg-[#d2d4f6] h-full w-full md:flex items-center justify-center"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0% 95%)" }}
        />
        <motion.div
          initial={{ y: "-300rem" }}
          animate={{ y: "0" }}
          transition={{ type: "keyframes", duration: 1.3 }}
          className="hidden md:block polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-full w-full md:flex items-center justify-center"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 93%)" }}
        />

        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 },
            mx: { xs: "0px", sm: "20px", md: "100px" },
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-[90%]">
            <motion.div
              initial={{ x: "-500rem" }}
              animate={{ x: "0" }}
              transition={{ type: "keyframes", duration: 1.2 }}
              className="flex flex-col gap-4 sm:gap-6 md:gap-[30px] items-start py-4 sm:py-6 md:py-8 px-2 sm:px-4 w-full md:w-1/2"
            >
              <Typography
                sx={{
                  fontSize: { xs: "32px", sm: "38px", md: "46px" },
                  color: { xs: "#000", md: "white" },
                  fontWeight: 500,
                  width: "100%",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                We'd love to hear from you
              </Typography>

              <Typography
                sx={{
                  color: { xs: "#000", md: "white" },
                  opacity: 0.7,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                Share your thoughts and help us improve
              </Typography>

              <Box sx={{ width: "100%", color: "white", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: `${rating}%`,
                    transform: "translateX(-50%)",
                    transition: "left 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      rating <= 24
                        ? faFaceFrown
                        : rating <= 49
                        ? faFaceFrownOpen
                        : rating <= 74
                        ? faFaceMeh
                        : faFaceSmile
                    }
                    className="text-main-color md:text-white text-2xl sm:text-3xl"
                  />
                </div>
                <Slider
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  step={25}
                  marks={[
                    { value: 0 },
                    { value: 25 },
                    { value: 50 },
                    { value: 75 },
                    { value: 100 },
                  ]}
                  sx={{
                    color: "white",
                    height: { xs: "12px", sm: "16px" },
                    mt: 4,
                    "& .MuiSlider-thumb": {
                      bgcolor: "white",
                      width: { xs: "16px", sm: "20px" },
                      height: { xs: "16px", sm: "20px" },
                    },
                    "& .MuiSlider-track": {
                      bgcolor: "#6C63FF",
                    },
                    "& .MuiSlider-rail": {
                      bgcolor: "white",
                      opacity: 0.8,
                    },
                    "& .MuiSlider-mark": {
                      bgcolor: "white",
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { xs: "13px", sm: "15px" },
                    position: "absolute",
                    left: `${rating}%`,
                    bottom: "-7px",
                    transform: "translateX(-50%)",
                    transition: "left 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {rating <= 24
                    ? "Very Poor"
                    : rating <= 49
                    ? "Poor"
                    : rating <= 74
                    ? "Good"
                    : rating <= 99
                    ? "Very Good"
                    : "Excellent"}
                </Typography>
              </Box>

              <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Write your feedback here..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  label="Feedback"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: 2,
                      color: { xs: "#000", md: "white" },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: { xs: "#000", md: "white" },
                    },
                    "& .MuiInputLabel-root": {
                      color: { xs: "#000", md: "white" },
                      backgroundColor: { xs: "#fff", md: "#6c63ff" },
                      px: 1,
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                    "& textarea::placeholder": {
                      color: {
                        xs: "rgba(0, 0, 0, 0.7)",
                        md: "rgba(255, 255, 255, 0.7)",
                      },
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                  }}
                />

                {/* <Typography
                  sx={{
                    color: { xs: "#000", md: "white" },
                    mb: 1,
                    fontSize: { xs: "14px", sm: "16px" },
                  }}
                >
                  How would you rate your experience?
                </Typography> */}

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="write some thing to improve..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  label="Your idea"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      borderRadius: 2,
                      color: { xs: "#000", md: "white" },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: { xs: "#000", md: "white" },
                    },
                    "& .MuiInputLabel-root": {
                      color: { xs: "#000", md: "white" },
                      backgroundColor: { xs: "#fff", md: "#6c63ff" },
                      px: 1,
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                    "& textarea::placeholder": {
                      color: {
                        xs: "rgba(0, 0, 0, 0.7)",
                        md: "rgba(255, 255, 255, 0.7)",
                      },
                      fontSize: { xs: "14px", sm: "16px" },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: { xs: 3, sm: 4 },
                    py: { xs: 0.5, sm: 1 },
                    bgcolor: "#FF6B6B",
                    "&:hover": {
                      bgcolor: "#FF5252",
                    },
                    borderRadius: 1,
                    fontSize: { xs: "14px", sm: "16px" },
                  }}
                >
                  Submit Feedback
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ x: "500rem" }}
              animate={{ x: "0" }}
              transition={{ type: "keyframes", duration: 1.2 }}
              className="hidden md:flex w-1/2 items-center justify-center"
            >
              <img
                src={feedbackImg}
                alt="Feedback Illustration"
                className="max-w-full h-auto"
              />
            </motion.div>
          </div>
        </Container>

        <style>{`
          @media (max-width: 1020px) {
            .polygon-background-1 {
              display: none !important;
            }
            .polygon-background-2 {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default Feedback;
