import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { searchAskQuestion, sendAskQuestion } from "@/Util/Https/http";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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
      toast.success(res?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setQuestion("");
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <div className="relative overflow-hidden ">
      <div className="bg-background-color absolute top-0 left-0 w-full h-full z-[-1]"></div>
      <motion.div
        initial={{ y: "-300rem" }}
        animate={{ y: "0" }}
        transition={{ type: "keyframes", duration: 1 }}
        className="hidden polygon-background-2 z-[-1] absolute bg-[#d2d4f6] h-full md:w-full w-[92vh] md:flex items-center justify-center"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0% 95%)" }}
      />
      <motion.div
        initial={{ y: "-300rem" }}
        animate={{ y: "0" }}
        transition={{ type: "keyframes", duration: 1.3 }}
        className="polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-full md:w-full w-[92vh] md:flex items-center justify-center"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 93%)" }}
      />
      <Container maxWidth="xl" sx={{ py: 4, mx: { md: "101px", xs: "0px" } }}>
        <motion.div
          initial={{ x: "-500rem" }}
          animate={{ x: "0" }}
          transition={{ type: "keyframes", duration: 1.2 }}
          className="flex flex-col gap-[30px] items-start py-8 px-4"
        >
          <Typography
            sx={{
              fontSize: { md: "46px", xs: "30px" },
              color: "white",
              fontWeight: 500,
              mb: 1,
              width: "100%",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            We are here to help you
          </Typography>

          <TextField
            fullWidth
            placeholder="search for your question"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            label="Search"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{
              maxWidth: "600px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                borderRadius: 2,
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
                backgroundColor: "#6c63ff",
                px: 1,
              },
              "& input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "white", cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />

          {loading ? (
            <Typography sx={{ color: "white" }}>Loading...</Typography>
          ) : searchQuery && searchResults.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {searchResults.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: "#E5E5FF",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    width: { md: "40vw", xs: "81vw" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#6C63FF",
                      mb: 1,
                      fontSize: "20px",
                      fontStyle: "italic",
                    }}
                  >
                    {item.question}
                  </Typography>
                  <Typography sx={{ color: "#000", mb: 1, fontSize: "14px" }}>
                    {item.answer}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : searchQuery && searchResults.length === 0 ? (
            <Typography sx={{ color: "white" }}>No Questions Found</Typography>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-[600px]">
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="write a new question"
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
                    color: "white",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    backgroundColor: "#6c63ff",
                    px: 1,
                  },
                  "& textarea::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 4,
                  py: 1,
                  bgcolor: "#FF6B6B",
                  "&:hover": {
                    bgcolor: "#FF5252",
                  },
                  borderRadius: 1,
                }}
              >
                Send
              </Button>
            </form>
          )}
        </motion.div>
      </Container>

      <Box
        sx={{
          mt: "auto",
          width: "100%",
          position: "relative",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#1a1a1a",
            fontFamily: "Roboto, sans-serif",
            fontSize: { md: "32px", xs: "25px" },
            fontWeight: 500,
            marginTop: { md: "1rem", xs: "3rem" },
            marginBottom: "1rem",
          }}
        >
          Frequently asked questions
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: { md: "gray", xs: "white" },
            fontFamily: "Roboto, sans-serif",
          }}
        >
          There are no questions yet
        </Typography>
      </Box>

      <style>{`
        @media (max-width: 1020px) {
          .polygon-background-1 {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AskQuestion;
