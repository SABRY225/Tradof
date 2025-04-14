import React, { useEffect, useState } from 'react';
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
import { AnswerAskQuestion, fetchAskQuestion } from '@/Util/Https/adminHttp';
import Cookies from 'js-cookie';
import { searchAskQuestion } from '@/Util/Https/http';

function AdminAskQuestion() {
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const token = Cookies.get("token");


  useEffect(() => {
    const getAskQuestion = async () => {
      const data = await fetchAskQuestion({ token })
      setQuestions(data.data);
    }
    getAskQuestion();

  }, [])

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setRecentQuestions([]);
        return;
      }

      try {
        // setLoading(true);
        const results = await searchAskQuestion({ token, query: searchQuery });
        console.log(results);

        setRecentQuestions(results.data || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        // setLoading(false);
      }
    };

    handleSearch();
  }, [searchQuery]);

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleSubmitAnswer = async(id) => {
    console.log('Submitting answer:', currentAnswer);
    await AnswerAskQuestion({token,id,answer:currentAnswer})
    setCurrentAnswer('');
  };

  return (
    <div className="flex  min-h-screen bg-[#f5f7ff]">
      <div className="flex-grow">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3} >
            <Grid item xs={12} md={8}>
              {
                questions.length==0?<div className='text-center text-2xl text-[#6C63FF]'>No questions available at the moment</div>:
                questions.map((row) => (
                  <Paper
                    key={row.id}
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
                            src={row.user.profileImageUrl}
                            alt={row.user.firstName}
                            sx={{ width: 50, height: 50 }}
                          />
                          <Box sx={{ display: 'flex-col', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body" sx={{ fontWeight: 500, fontSize: '0.89rem', color: '#333' }}>
                              {row.user.firstName}{" "}{row.user.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                              {row.user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
  
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, fontSize: '1.1rem' }}>
                      {row.question}
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
                        onClick={()=>handleSubmitAnswer(row._id)}
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
                ))
              }
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                  {!searchQuery.trim() ? <div className='text-center'>You can search for any question.</div> : (
                    recentQuestions.length == 0 ? `There is no question about "${searchQuery}"` : <>
                      {
                        recentQuestions.map((item, index) => (
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

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Avatar
                                  src={item.user.profileImageUrl}
                                  alt={item.user}
                                  sx={{ width: 50, height: 50 }}
                                />
                                <Box sx={{ display: "flex-col", alignItems: 'center', ml: 0.3 }}>
                                  <Box variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem', mr: 1 }}>
                                    {item.user.firstName}{" "}{item.user.lastName}
                                  </Box>
                                  <Box variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                                    {item.user.email}
                                  </Box>
                                </Box>
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

                              <Typography variant="body2" sx={{
                                fontSize: '0.75rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}>
                                {item.answer}
                              </Typography>
                            </Box>
                            {index < recentQuestions.length - 1 && (
                              <Divider sx={{ borderColor: '#eaeaea' }} />
                            )}
                          </React.Fragment>
                        )
                        )

                      }</>

                  )
                  }

                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

    </div>
  );
}

export default AdminAskQuestion
