import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  Progress,
  Radio,
  Input,
  Tabs,
  Card,
  Typography,
  Divider,
  message,
  Modal,
} from "antd";
import {
  CheckCircleOutlined,
  SoundOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
  RightOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useLoaderData,
  useParams,
  useNavigate,
  useNavigation,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import {
  generateTranslationExam,
  getUserTranslationExam,
  submitTranslationExam,
} from "@/Util/Https/http";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import Loading from "../Loading";

const { TabPane } = Tabs;
const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;

// Error Boundary Component
export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRouteErrorResponse(error) && error.status === 403) {
      Modal.error({
        title: "Exam Expired",
        content:
          "This exam has expired. You will be redirected to the dashboard.",
        okText: "Go to Dashboard",
        onOk: () => {
          navigate("/user/dashboard", { replace: true });
        },
      });
    }
  }, [error, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center no-copy">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <WarningOutlined className="text-4xl text-red-500 mb-4" />
          <Title level={3}>Error Loading Exam</Title>
          <Paragraph className="text-gray-600">
            {isRouteErrorResponse(error) && error.status === 403
              ? "This exam has expired"
              : "Failed to load exam questions. Please try again later."}
          </Paragraph>
          <Button
            type="primary"
            onClick={() => navigate("/user/dashboard")}
            className="mt-4"
          >
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Constants
const EXAM_DURATIONS = {
  medium: 3600, // 1 hour
  hard: 7200, // 2 hours
};

const FreeExam = () => {
  const {
    user: { token, userId },
  } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const {
    examData: { examData: exam },
    _id: examId,
  } = useLoaderData();

  // Refs for audio management
  const currentUtteranceRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [activeTab, setActiveTab] = useState("listening_comprehension");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState({});
  const [examProgress, setExamProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [playedAudioGroups, setPlayedAudioGroups] = useState(new Set());
  const [currentAudioGroup, setCurrentAudioGroup] = useState(null);
  const [audioGroupQuestions, setAudioGroupQuestions] = useState([]);

  // Initialize exam data and timer
  useEffect(() => {
    if (exam) {
      setLoading(false);
      const duration = EXAM_DURATIONS[exam.difficulty] || EXAM_DURATIONS.hard;
      setTimeRemaining(duration);
    }
  }, [exam]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleExamTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Progress calculation effect
  useEffect(() => {
    const attempted = Object.keys(answers).length;
    const totalQuestions = getTotalQuestions();
    setExamProgress(Math.floor((attempted / totalQuestions) * 100));
  }, [answers, exam]);

  // Audio management functions
  const stopCurrentAudio = useCallback(() => {
    if (currentUtteranceRef.current) {
      speechSynthesisRef.current.cancel();
      currentUtteranceRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  // Audio cleanup on component unmount or question change
  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  // Stop audio when question changes or component unmounts
  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, [currentQuestion]);

  // Stop audio on page unload/reload
  useEffect(() => {
    const handleBeforeUnload = async (e) => {
      stopCurrentAudio();
      Modal.confirm({
        title: `Confirm leave exam`,
        icon: <ExclamationCircleOutlined />,
        content: `Are you sure you want to leave exam, your answer will ignoring.?`,
        okText: `Yes, i want leave`,
        okType: "danger",
        cancelText: "Cancel",
        onOk() {
          // Send answers to backend before leaving
          submitTranslationExam({
            freelancerId: userId,
            token,
            examId: examId,
            answers,
            status: "exited",
          }).catch((error) => {
            console.error("Failed to submit answers on exit:", error);
          });
          navigate("/user/dashboard", { replace: true });
        },
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      stopCurrentAudio();
    };
  }, [examId, answers, stopCurrentAudio, userId, token, navigate]);

  const speakText = useCallback(
    (text, lang = "en-US") => {
      // Stop any currently playing audio
      stopCurrentAudio();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      utterance.onstart = () => {
        setIsPlaying(true);
        currentUtteranceRef.current = utterance;
      };

      utterance.onend = () => {
        setIsPlaying(false);
        currentUtteranceRef.current = null;
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        currentUtteranceRef.current = null;
        // message.error("Failed to play audio");
      };

      speechSynthesisRef.current.speak(utterance);
    },
    [stopCurrentAudio]
  );

  // Build audio groups structure
  const buildAudioGroups = useCallback(() => {
    if (!exam?.sections) return [];

    const groups = [];
    let questionCount = 0;

    for (const [sectionKey, sectionItems] of Object.entries(exam.sections)) {
      for (const item of sectionItems) {
        if (item.questions && item.transcript) {
          // This is a listening section with multiple questions for one audio
          const groupQuestions = item.questions.map((question, index) => {
            questionCount++;
            return {
              ...question,
              questionNumber: questionCount,
              sectionTitle: sectionKey.replace(/_/g, " ").toUpperCase(),
              audioTitle: item?.audio_title || "",
              transcript: item?.transcript,
              audioLang: item?.audio_lang,
              hasAudio: true,
              isListening: true,
            };
          });

          groups.push({
            id: `${sectionKey}_${item.audio_title || questionCount}`,
            transcript: item.transcript,
            audioLang: item.audio_lang,
            audioTitle: item.audio_title,
            sectionTitle: sectionKey.replace(/_/g, " ").toUpperCase(),
            questions: groupQuestions,
            startQuestion: groupQuestions[0].questionNumber,
            endQuestion:
              groupQuestions[groupQuestions.length - 1].questionNumber,
          });
        } else if (item.questions) {
          // Regular questions without audio
          item.questions.forEach((question) => {
            questionCount++;
            groups.push({
              id: `single_${questionCount}`,
              questions: [
                {
                  ...question,
                  questionNumber: questionCount,
                  sectionTitle: sectionKey.replace(/_/g, " ").toUpperCase(),
                  context: item?.source_text || item?.context || "",
                  hasAudio: false,
                  isListening: false,
                },
              ],
              startQuestion: questionCount,
              endQuestion: questionCount,
            });
          });
        } else {
          // Single question item
          questionCount++;
          groups.push({
            id: item.transcript
              ? `audio_${questionCount}`
              : `single_${questionCount}`,
            transcript: item?.transcript,
            audioLang: item?.audio_lang,
            audioTitle: item?.audio_title,
            sectionTitle: sectionKey.replace(/_/g, " ").toUpperCase(),
            questions: [
              {
                ...item,
                questionNumber: questionCount,
                sectionTitle: sectionKey.replace(/_/g, " ").toUpperCase(),
                context:
                  item?.transcript || item?.source_text || item?.context || "",
                audioTitle: item?.audio_title || "",
                hasAudio: Boolean(item?.transcript),
                isListening: Boolean(item?.transcript),
              },
            ],
            startQuestion: questionCount,
            endQuestion: questionCount,
          });
        }
      }
    }

    return groups;
  }, [exam]);

  // Utility functions
  const getTotalQuestions = useCallback(() => {
    const groups = buildAudioGroups();
    return groups.reduce((total, group) => total + group.questions.length, 0);
  }, [buildAudioGroups]);

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const handleExamTimeout = useCallback(() => {
    message.warning("Exam time expired!");
    navigate("/user/dashboard");
  }, [navigate]);

  // Get current audio group and questions
  const getCurrentAudioGroup = useCallback(() => {
    const groups = buildAudioGroups();
    const currentGroup = groups.find(
      (group) =>
        currentQuestion >= group.startQuestion &&
        currentQuestion <= group.endQuestion
    );
    return currentGroup;
  }, [currentQuestion, buildAudioGroups]);

  // Get current question data
  const getCurrentQuestion = useCallback(() => {
    const currentGroup = getCurrentAudioGroup();
    if (!currentGroup) return null;

    const questionInGroup = currentGroup.questions.find(
      (q) => q.questionNumber === currentQuestion
    );

    return questionInGroup;
  }, [currentQuestion, getCurrentAudioGroup]);

  // Auto-play audio for listening questions (only once per group)
  useEffect(() => {
    const currentGroup = getCurrentAudioGroup();

    if (
      currentGroup?.transcript &&
      currentGroup.questions[0]?.isListening &&
      !playedAudioGroups.has(currentGroup.id)
    ) {
      // Small delay to ensure component is fully rendered
      const timeoutId = setTimeout(() => {
        speakText(currentGroup.transcript, currentGroup.audioLang);
        setPlayedAudioGroups((prev) => new Set([...prev, currentGroup.id]));
        setCurrentAudioGroup(currentGroup);
        setAudioGroupQuestions(currentGroup.questions);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else if (currentGroup) {
      setCurrentAudioGroup(currentGroup);
      setAudioGroupQuestions(currentGroup.questions);
    }
  }, [currentQuestion, getCurrentAudioGroup, speakText, playedAudioGroups]);

  // Event handlers
  const handleAnswerChange = useCallback(
    (value) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: value,
      }));
    },
    [currentQuestion]
  );

  const navigateQuestion = useCallback(
    (direction) => {
      const totalQuestions = getTotalQuestions();

      if (direction === "prev" && currentQuestion > 1) {
        setCurrentQuestion((prev) => prev - 1);
      } else if (direction === "next" && currentQuestion < totalQuestions) {
        setCurrentQuestion((prev) => prev + 1);
      }
    },
    [currentQuestion, getTotalQuestions]
  );

  const goToQuestion = useCallback((num) => {
    setCurrentQuestion(num);
  }, []);

  const handleExitExam = useCallback(() => {
    stopCurrentAudio();
    Modal.confirm({
      title: `Confirm leave exam`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to leave exam, your answer will ignoring.?`,
      okText: `Yes, i want leave`,
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        // Send answers to backend before leaving
        submitTranslationExam({
          freelancerId: userId,
          token,
          examId: examId,
          answers,
          status: "exited",
        }).catch((error) => {
          console.error("Failed to submit answers on exit:", error);
        });
        navigate("/user/dashboard", { replace: true });
      },
    });
  }, [navigate, stopCurrentAudio, examId, answers, userId, token]);

  const handleSubmitExam = useCallback(async () => {
    const totalQuestions = getTotalQuestions();
    if (Object.keys(answers).length < totalQuestions) {
      message.warning("Please answer all questions before submitting.");
      return;
    }

    try {
      stopCurrentAudio();
      const result = await submitTranslationExam({
        freelancerId: userId,
        token,
        examId: examId,
        answers,
        status: "completed",
      });

      message.success("Exam submitted successfully!");
      navigate("/user/dashboard", { replace: true });
    } catch (error) {
      message.error(error.message || "Failed to submit exam");
    }
  }, [
    answers,
    getTotalQuestions,
    navigate,
    stopCurrentAudio,
    examId,
    userId,
    token,
  ]);

  // Render functions
  const renderQuestionContent = () => {
    if (loading || isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Text>Loading exam questions...</Text>
        </div>
      );
    }

    if (!exam) {
      return (
        <div className="flex justify-center items-center h-64">
          <Text type="danger">
            Failed to load exam questions. Please refresh the page.
          </Text>
        </div>
      );
    }

    const currentQuestionData = getCurrentQuestion();
    const currentGroup = getCurrentAudioGroup();

    if (!currentQuestionData) return null;

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <Title level={4}>{currentQuestionData.sectionTitle}</Title>

          {currentGroup?.audioTitle && (
            <Text strong className="block text-lg mb-2">
              {currentGroup.audioTitle}
            </Text>
          )}

          {/* Audio Control for Listening Questions */}
          {currentQuestionData.isListening && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Button
                  icon={
                    isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
                  }
                  onClick={() => {
                    if (isPlaying) {
                      stopCurrentAudio();
                    } else {
                      speakText(
                        currentGroup.transcript,
                        currentGroup.audioLang
                      );
                    }
                  }}
                  type="primary"
                  ghost
                  disabled={playedAudioGroups.has(currentGroup.id)}
                >
                  {isPlaying
                    ? "Pause"
                    : playedAudioGroups.has(currentGroup.id)
                    ? "Audio Played"
                    : "Play"}{" "}
                  Audio
                </Button>
                <SoundOutlined className="text-blue-500" />
                {playedAudioGroups.has(currentGroup.id) && (
                  <Text type="secondary" className="text-sm">
                    (Audio can only be played once)
                  </Text>
                )}
              </div>

              {/* Show all questions for this audio group */}
              {currentGroup.questions.length > 1 && (
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 mb-4">
                  <Text strong className="block mb-2">
                    <QuestionCircleOutlined className="mr-1" />
                    Listening Section: Questions {
                      currentGroup.startQuestion
                    } - {currentGroup.endQuestion}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Listen carefully to the audio. You can only play it once for
                    all questions in this section.
                  </Text>
                </div>
              )}
            </div>
          )}

          {/* Show context for non-listening questions */}
          {!currentQuestionData.isListening && currentQuestionData.context && (
            <Paragraph className="mt-2 text-base italic bg-gray-50 p-3 rounded">
              {currentQuestionData.context}
            </Paragraph>
          )}

          <Text strong className="block text-lg mt-4">
            Question {currentQuestion}:
          </Text>
          <Paragraph className="mt-2 text-base">
            {currentQuestionData.question}
          </Paragraph>
        </div>

        <Radio.Group
          onChange={(e) => handleAnswerChange(e.target.value)}
          value={answers[currentQuestion]}
          className="flex flex-col space-y-3"
        >
          {currentQuestionData.options?.map((option, index) => (
            <Radio
              key={index}
              value={option}
              className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <Text className="ml-2">{option}</Text>
            </Radio>
          ))}
        </Radio.Group>

        {/* Show other questions in the same audio group */}
        {currentQuestionData.isListening &&
          currentGroup.questions.length > 1 && (
            <div className="mt-6">
              <Divider />
              <Text strong className="block mb-3">
                Other questions for this audio:
              </Text>
              <div className="flex flex-wrap gap-2">
                {currentGroup.questions.map((q) => (
                  <Button
                    key={q.questionNumber}
                    size="small"
                    type={
                      q.questionNumber === currentQuestion
                        ? "primary"
                        : "default"
                    }
                    onClick={() => goToQuestion(q.questionNumber)}
                    className={
                      answers[q.questionNumber]
                        ? "bg-green-50 border-green-500"
                        : ""
                    }
                  >
                    Q{q.questionNumber}
                  </Button>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  const renderQuestionPalette = () => {
    const totalQuestions = getTotalQuestions();
    const palette = [];

    for (let i = 1; i <= totalQuestions; i++) {
      const isAnswered = answers[i] !== undefined;
      const isCurrent = i === currentQuestion;

      palette.push(
        <Button
          key={i}
          type={isCurrent ? "primary" : isAnswered ? "default" : "dashed"}
          shape="circle"
          size="small"
          className={`cursor-pointer whitespace-nowrap ${
            isAnswered ? "bg-green-50 border-green-500" : ""
          } ${isCurrent ? "border-blue-500" : ""}`}
          onClick={() => goToQuestion(i)}
        >
          {i}
        </Button>
      );
    }

    return palette;
  };

  // Loading state
  if (loading || isLoading) return <Loading />;

  const totalQuestions = getTotalQuestions();
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount >= totalQuestions;

  return (
    <div className="min-h-screen bg-gray-50 no-copy ">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md py-3 border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white py-1 px-3 rounded-md flex items-center">
                <ClockCircleOutlined className="mr-1" />
                <Text strong className="text-white">
                  {formatTime(timeRemaining)}
                </Text>
              </div>

              <Divider type="vertical" className="h-8 mx-4" />

              <div>
                <Text className="text-gray-600 mr-2">Progress:</Text>
                <Text strong>{examProgress}%</Text>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-4">
                <Text className="text-gray-600 mr-2">Question:</Text>
                <Text strong>
                  {currentQuestion}/{totalQuestions}
                </Text>
              </div>

              <Button
                danger
                className="cursor-pointer whitespace-nowrap"
                onClick={handleExitExam}
              >
                Exit Exam
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-6 flex-grow">
          <Card className="mb-2 shadow-md">
            <div className="flex items-center justify-between font-medium text-[17px]">
              Translation {exam?.language_pair} Exam
            </div>
          </Card>
          <div className="grid grid-cols-12 gap-6">
            {/* Question Content */}
            <div className="col-span-12 lg:col-span-9">
              <Card className="shadow-md mb-6">{renderQuestionContent()}</Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  size="large"
                  icon={<LeftOutlined />}
                  onClick={() => navigateQuestion("prev")}
                  disabled={currentQuestion === 1}
                  className="cursor-pointer whitespace-nowrap"
                >
                  Previous
                </Button>

                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigateQuestion("next")}
                  disabled={currentQuestion === totalQuestions}
                  className="cursor-pointer whitespace-nowrap"
                >
                  Next <RightOutlined />
                </Button>
              </div>
            </div>

            {/* Question Navigator Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <Card
                title="Question Navigator"
                className="shadow-md sticky top-24"
              >
                {/* Progress Info */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <Text>Attempted:</Text>
                    <Text strong>
                      {answeredCount}/{totalQuestions}
                    </Text>
                  </div>
                  <Progress
                    percent={Math.round((answeredCount / totalQuestions) * 100)}
                    size="small"
                    status="active"
                  />
                </div>

                <Divider className="my-3" />

                {/* Question Palette */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {renderQuestionPalette()}
                  </div>
                </div>

                <Divider className="my-3" />

                {/* Legend */}
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <Text>Current Question</Text>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-50 border border-green-500 mr-2"></div>
                    <Text>Answered</Text>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-white border border-gray-300 mr-2"></div>
                    <Text>Not Answered</Text>
                  </div>
                </div>

                <Divider className="my-3" />

                {/* Submit Button */}
                <Button
                  type="primary"
                  danger
                  block
                  size="large"
                  disabled={!allAnswered}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={handleSubmitExam}
                >
                  Submit Exam
                </Button>

                {!allAnswered && (
                  <Text className="block text-center mt-2 text-red-500">
                    Answer all questions to enable submission
                  </Text>
                )}
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white py-3 border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <Text className="text-gray-500">© 2025 Tradof Platform</Text>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FreeExam;

export async function loaderExam({ request, params }) {
  try {
    const { examId } = params;
    if (!examId) {
      throw new Response("Missing exam id", { status: 400 });
    }
    const existingExam = await getUserTranslationExam({ examId });
    return existingExam;
  } catch (error) {
    console.error(error.status);
    if (error?.status === 403) {
      throw new Response("This exam has expired", {
        status: 403,
        statusText: "Exam Expired",
      });
    }
    throw new Response("Failed to load exam questions", { status: 500 });
  }
}
