import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '@/components/shared/Footer';

function AdminAskQuestion() {
  const [currentAnswer, setCurrentAnswer] = useState('');

  // Mock data for questions
  const questions = [
    {
      id: 1,
      question: 'Nady Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      answer: '',
      status: 'pending'
    },
    {
      id: 2,
      question: 'Sabry Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      answer: '',
      status: 'pending'
    },
    {
      id: 3,
      question: 'Rabi3 Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      answer: '',
      status: 'pending'
    }
  ];

  // Mock data for recent questions sidebar
  const recentQuestions = [
    {
      id: 1,
      question: 'Nady Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      preview: 'Nady Beh ya Walaad, Sabry Beh ya Walaad, Rabi3 Beh ya Walaad'
    },
    {
      id: 2,
      question: 'Nady Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      preview: 'Nady Beh ya Walaad, Sabry Beh ya Walaad, Rabi3 Beh ya Walaad'
    },
    {
      id: 3,
      question: 'Nady Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      preview: 'Nady Beh ya Walaad, Sabry Beh ya Walaad, Rabi3 Beh ya Walaad'
    },
    {
      id: 4,
      question: 'Nady Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      preview: 'Nady Beh ya Walaad, Sabry Beh ya Walaad, Rabi3 Beh ya Walaad'
    },
    {
      id: 5,
      question: 'Nady Beh ya Walaad',
      user: 'Ahmed Nady Issa',
      email: 'dev.ahmed.nady@gmail.com',
      preview: 'Nady Beh ya Walaad, Sabry Beh ya Walaad, Rabi3 Beh ya Walaad'
    }
  ];

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    console.log('Submitting answer:', currentAnswer);
    setCurrentAnswer('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7ff]">
      <div className="flex-grow">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Main content - Questions and Answers */}
            <Grid item xs={12} md={8}>
              {questions.map((question) => (
                <Paper
                  key={question.id}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: '8px',
                    boxShadow: 'none',
                    bgcolor: '#E5E5FF'
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={`https://ui-avatars.com/api/?name=${question.user}&background=6c63ff&color=fff`}
                          alt={question.user}
                          sx={{ width: 20, height: 20 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#333' }}>
                          {question.user}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 3.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {question.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1.1rem' }}>
                    {question.question}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, fontSize: '0.9rem' }}>
                    Answer
                  </Typography>

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="answer"
                    value={currentAnswer}
                    onChange={handleAnswerChange}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        backgroundColor: '#ffffff'
                      }
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmitAnswer}
                      sx={{
                        bgcolor: '#ff6b6b',
                        '&:hover': { bgcolor: '#ff5252' },
                        borderRadius: '4px',
                        textTransform: 'none',
                        boxShadow: 'none',
                        px: 3,
                        py: 0.5,
                        fontSize: '0.85rem'
                      }}
                    >
                      answer
                    </Button>
                  </Box>
                </Paper>
              ))}

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    sx={{
                      color: '#6c63ff',
                      textTransform: 'none',
                      fontWeight: 400,
                      fontSize: '0.85rem'
                    }}
                  >
                    previous
                  </Button>

                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      sx={{
                        minWidth: '30px',
                        height: '30px',
                        mx: 0.5,
                        color: num === 1 ? 'white' : '#6c63ff',
                        bgcolor: num === 1 ? '#6c63ff' : 'transparent',
                        '&:hover': {
                          bgcolor: num === 1 ? '#6c63ff' : 'rgba(108, 99, 255, 0.1)'
                        },
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {num}
                    </Button>
                  ))}

                  <Typography sx={{ mx: 1, color: '#6c63ff', fontSize: '0.85rem' }}>...</Typography>

                  <Button
                    sx={{
                      color: '#6c63ff',
                      textTransform: 'none',
                      fontWeight: 400,
                      fontSize: '0.85rem'
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Sidebar - Recent Questions */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: 'none', bgcolor: '#E5E5FF' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}>
                  Last questions
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.8rem' }}>
                    Search
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Substring of project name"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        backgroundColor: '#ffffff'
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" sx={{ color: '#6c63ff' }}>
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ mt: 3 }}>
                  {recentQuestions.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <Box
                        sx={{
                          py: 1.5,
                          mb: 1,
                          cursor: 'pointer',
                          bgcolor: '#ffffff',
                          borderRadius: '4px',
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          },
                          padding: "10px"
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.9rem' }}>
                          {item.question}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Avatar
                              src={`https://ui-avatars.com/api/?name=${item.user}&background=6c63ff&color=fff`}
                              alt={item.user}
                              sx={{ width: 16, height: 16 }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              {item.user}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2.5 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {item.email}
                          </Typography>
                        </Box>

                        <Box sx={{
                          bgcolor: '#6c63ff',
                          px: 3,
                          py: 0.1,
                          width: '100%',
                          borderRadius: '4px',
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          mb: 1
                        }}>
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{
                          fontSize: '0.75rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}>
                          {item.preview}
                        </Typography>
                      </Box>
                      {index < recentQuestions.length - 1 && (
                        <Divider sx={{ borderColor: '#eaeaea' }} />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Divider sx={{ borderColor: '#e0e0e0', my: 4 }} />

      <Footer />
    </div>
  );
}

export default AdminAskQuestion
