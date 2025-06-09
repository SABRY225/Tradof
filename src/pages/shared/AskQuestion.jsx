import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { searchAskQuestion, sendAskQuestion } from "@/Util/Https/http";
import Cookies from "js-cookie";
import { message } from "antd";
import askqustion from "../../assets/images/askquestion.png";

function AskQuestion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const results = await searchAskQuestion({ token, query: searchQuery });
        console.log(results);

        setSearchResults(results.data || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendAskQuestion({ token, question });
      console.log(res);
      message.success(res?.message);
      setQuestion("");
    } catch (error) {
      message.error(error?.message);
    }
  };

  return (
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
        <div className="flex flex-col md:flex-row gap-8 md:w-[90%] w-full">
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
              We are here to help you
            </Typography>

            <Typography
              sx={{
                color: { xs: "#000", md: "white" },
                opacity: 0.7,
                fontFamily: "Roboto, sans-serif",
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              Search for answers or ask a new question
            </Typography>

            <TextField
              fullWidth
              placeholder="Search for your question"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              label="Search"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{
                maxWidth: { xs: "100%", sm: "500px", md: "600px" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  color: { xs: "#000", md: "white" },
                  height: { xs: "40px", sm: "48px" },
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
                "& input::placeholder": {
                  color: {
                    xs: "rgba(0, 0, 0, 0.7)",
                    md: "rgba(255, 255, 255, 0.7)",
                  },
                  fontSize: { xs: "14px", sm: "16px" },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon
                      sx={{
                        color: { xs: "#000", md: "white" },
                        cursor: "pointer",
                        fontSize: { xs: "20px", sm: "24px" },
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {loading ? (
              <Typography
                sx={{
                  color: { xs: "#000", md: "white" },
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                Loading...
              </Typography>
            ) : searchQuery && searchResults.length > 0 ? (
              <Box sx={{ mt: 2, width: "100%" }}>
                {searchResults.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: "#E5E5FF",
                      mb: 2,
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 2,
                      width: { xs: "100%", sm: "90%", md: "80%" },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#6C63FF",
                        mb: 1,
                        fontSize: { xs: "16px", sm: "18px", md: "20px" },
                        fontStyle: "italic",
                      }}
                    >
                      {item.question}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#000",
                        mb: 1,
                        fontSize: { xs: "13px", sm: "14px" },
                      }}
                    >
                      {item.answer}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : searchQuery && searchResults.length === 0 ? (
              <Typography
                sx={{
                  color: { xs: "#000", md: "white" },
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                No Questions Found
              </Typography>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Write your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  label="Question"
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
                  Send
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ x: "500rem" }}
            animate={{ x: "0" }}
            transition={{ type: "keyframes", duration: 1.2 }}
            className="hidden md:flex w-1/2 items-center justify-center"
          >
            <img
              src={askqustion}
              alt="Ask Question Illustration"
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
  );
}

export default AskQuestion;
