import { useState } from 'react';
import { motion } from "framer-motion";
import { Container, Typography, TextField, Button, Box, Slider } from '@mui/material';
import Footer from '@/components/shared/Footer';
import feedbackImg from '@/assets/images/feedback.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faFaceFrownOpen, faFaceMeh, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

function Feedback() {
  const [rating, setRating] = useState(50);
  const [reason, setReason] = useState('');
  const [idea, setIdea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ y: "-300rem" }}
          animate={{ y: "0" }}
          transition={{ type: "keyframes", duration: 1 }}
          className="hidden polygon-background-2 z-[-1] absolute bg-[#d2d4f6] h-full md:w-full w-[92vh] md:flex items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 40%, 0% 95%)",
          }}
        ></motion.div>
        <motion.div
          initial={{ y: "-300rem" }}
          animate={{ y: "0" }}
          transition={{ type: "keyframes", duration: 1.3 }}
          className="polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-full md:w-full w-[92vh] md:flex items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 93%)",
          }}
        ></motion.div>

        <Container maxWidth="xl" sx={{
          py: 4,
          mx: { xs: '0px', md: '100px' } 
        }}>
          <div className="flex gap-8 md:w-[90%] w-full">
            <motion.div
              initial={{ x: "-500rem" }}
              animate={{ x: "0" }}
              transition={{ type: "keyframes", duration: 1.2 }}
              className="flex flex-col gap-[30px] items-start py-8 px-4 w-full md:w-1/2"
            >
              <Typography sx={{
                fontSize: '46px',
                color: 'white',
                fontWeight: 500,
                width: '100%',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Give us feedback
              </Typography>

              <Typography sx={{
                color: 'white',
                opacity: 0.7,
                fontFamily: 'Roboto, sans-serif',
              }}>
                What do you think of the issue search experience within Tradof projects
              </Typography>

              <Box sx={{ width: '100%', color: 'white', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: `${rating}%`,
                  transform: 'translateX(-50%)',
                  transition: 'left 0.3s ease',
                }}>
                  <FontAwesomeIcon 
                    icon={
                      rating <= 24 ? faFaceFrown :
                      rating <= 49 ? faFaceFrownOpen :
                      rating <= 74 ? faFaceMeh :
                      faFaceSmile
                    } 
                    className="text-white text-3xl"
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
                    { value: 100 }
                  ]}
                  sx={{
                    color: 'white',
                    height: '16px',
                    mt: 4,
                    '& .MuiSlider-thumb': {
                      bgcolor: 'white',
                    },
                    '& .MuiSlider-track': {
                      bgcolor: '#6C63FF',
                    },
                    '& .MuiSlider-rail': {
                      bgcolor: 'white',
                      opacity: 0.8
                    },
                    '& .MuiSlider-mark': {
                      bgcolor: 'white',
                    }
                  }}
                />
                <Typography 
                  sx={{ 
                    color: 'white', 
                    fontSize: '15px',
                    position: 'absolute',
                    left: `${rating}%`,
                    bottom: '-7px',
                    transform: 'translateX(-50%)',
                    transition: 'left 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {rating <= 24 ? 'Very Poor' :
                   rating <= 49 ? 'Poor' :
                   rating <= 74 ? 'Good' :
                   rating <= 99 ? 'Very Good' :
                   'Excellent'}
                </Typography>
              </Box>

              <form onSubmit={handleSubmit} className="w-full">
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="write some thing"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  label="What are the main reason for your rating"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'transparent',
                      borderRadius: 2,
                      color: 'white'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                      backgroundColor: '#6c63ff',
                      px: 1
                    },
                    '& textarea::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                />

                <Typography sx={{ color: 'white', mb: 3, opacity: 0.7 }}>
                  If you have ideas to improve the experience, share them with us.
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="write some thing"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  label="Your idea"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'transparent',
                      borderRadius: 2,
                      color: 'white'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                      backgroundColor: '#6c63ff',
                      px: 1
                    },
                    '& textarea::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                />

                <div className="flex justify-center w-full">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      px: 4,
                      py: 1,
                      bgcolor: '#FF6B6B',
                      '&:hover': {
                        bgcolor: '#FF5252'
                      },
                      borderRadius: 1
                    }}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ x: "500rem" }}
              animate={{ x: "0" }}
              transition={{ type: "keyframes", duration: 1.2 }}
              className="w-1/2 md:flex hidden items-center justify-center"
            >
              <img
                src={feedbackImg}
                alt="Feedback Illustration"
                className="max-w-[600px] h-auto"
              />
            </motion.div>
          </div>
        </Container>

        <style>{`
          @media (max-width: 1020px) {
            .polygon-background-1 {
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
            }
          }
        `}</style>
      </div>
      <Footer color="white" borderColor="#6C63FF" borderSize="true" />
    </>
  );
}

export default Feedback;
