import React, { useState, useEffect, useCallback } from "react";
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
} from "@ant-design/icons";
import {
  useLoaderData,
  useParams,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  generateTranslationExam,
  getUserTranslationExam,
} from "@/Util/Https/http";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import Loading from "../Loading";

const { TabPane } = Tabs;
const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;

const FreeExam = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const {
    examData: { examData: exam },
  } = useLoaderData();

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [activeTab, setActiveTab] = useState("listening_comprehension");
  const [timeRemaining, setTimeRemaining] = useState(0); // 2 hours
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState({});
  const [examProgress, setExamProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [hasSpoken, setHasSpoken] = useState(false);

  // Set exam data when loader data is available
  useEffect(() => {
    if (exam) {
      setLoading(false);
      setTimeRemaining(exam.difficulty === "medium" ? 3600 : 7200);
    }
  }, [exam]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTotalQuestions = () => {
    if (!exam?.sections) return 0;
    let total = 0;
    console.log(exam);
    Object.values(exam.sections).forEach((section) => {
      section.forEach((item) => {
        total += item?.questions?.length || 1;
      });
    });
    return total;
  };

  useEffect(() => {
    const attempted = Object.keys(answers).length;
    const totalQuestions = getTotalQuestions();
    setExamProgress(Math.floor((attempted / totalQuestions) * 100));
  }, [answers]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };
  const speakText = useCallback(
    (text, lang = "en-US") => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    },
    [hasSpoken]
  );

  const getCurrentQuestion = () => {
    if (!exam?.sections) return null;

    let questionCount = 0;
    for (const [sectionKey, sectionItems] of Object.entries(exam.sections)) {
      console.log(sectionKey, sectionItems);
      for (const item of sectionItems) {
        if (item.questions) {
          for (const question of item.questions) {
            questionCount++;
            if (questionCount === currentQuestion) {
              if (item?.transcript) speakText(item.transcript, item.audio_lang);
              return {
                ...question,
                sectionTitle: sectionKey.replace(/_/g, " ").toUpperCase(),
                context:
                  item?.transcript || item?.source_text || item?.context || "",
                audioTitle: item?.audio_title || "",
              };
            }
          }
        } else {
          questionCount++;
          if (questionCount === currentQuestion) {
            return {
              ...item,
              sectionTitle: sectionKey.replace(/_/g, " ").toUpperCase(),
              context:
                item?.transcript || item?.source_text || item?.context || "",
              audioTitle: item?.audio_title || "",
            };
          }
        }
      }
    }
    return null;
  };

  const navigateQuestion = (direction) => {
    const totalQuestions = getTotalQuestions();

    if (direction === "prev" && currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (direction === "next" && currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goToQuestion = (num) => {
    setCurrentQuestion(num);
  };

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

    if (!currentQuestionData) return null;

    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <Title level={4}>{currentQuestionData.sectionTitle}</Title>
          {currentQuestionData.audioTitle && (
            <Text strong className="block text-lg mb-2">
              {currentQuestionData.audioTitle}
            </Text>
          )}
          {currentQuestionData.context && (
            <Paragraph className="mt-2 text-base italic">
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
          {currentQuestionData.options.map((option, index) => (
            <Radio
              key={index}
              value={option}
              className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <Text className="ml-2">{option}</Text>
            </Radio>
          ))}
        </Radio.Group>
      </div>
    );
  };

  const totalQuestions = getTotalQuestions();

  const questionPalette = [];
  for (let i = 1; i <= totalQuestions; i++) {
    const isAnswered = answers[i] !== undefined;
    const isCurrent = i === currentQuestion;

    questionPalette.push(
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

  if (loading || isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
                onClick={() => navigate("/user/dashboard")}
              >
                Exit Exam
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-6 flex-grow">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9">
              <Card className="shadow-md mb-6">{renderQuestionContent()}</Card>

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

            <div className="col-span-12 lg:col-span-3">
              <Card
                title="Question Navigator"
                className="shadow-md sticky top-24"
              >
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <Text>Attempted:</Text>
                    <Text strong>
                      {Object.keys(answers).length}/{totalQuestions}
                    </Text>
                  </div>
                  <Progress
                    percent={Math.round(
                      (Object.keys(answers).length / totalQuestions) * 100
                    )}
                    size="small"
                    status="active"
                  />
                </div>

                <Divider className="my-3" />

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">{questionPalette}</div>
                </div>

                <Divider className="my-3" />

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

                <Button
                  type="primary"
                  danger
                  block
                  size="large"
                  disabled={Object.keys(answers).length < totalQuestions}
                  className="cursor-pointer whitespace-nowrap"
                >
                  Submit Exam
                </Button>

                {Object.keys(answers).length < totalQuestions && (
                  <Text className="block text-center mt-2 text-red-500">
                    Answer all questions to enable submission
                  </Text>
                )}
              </Card>
            </div>
          </div>
        </main>

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
    const { initial, target, email } = params;
    if (!initial || !target) {
      throw new Error("Missing language parameters");
    }

    // Try to get existing exam first
    try {
      if (email) {
        const existingExam = await getUserTranslationExam({
          email,
        });
        if (existingExam) {
          return existingExam[0];
        }
      }
    } catch (error) {
      console.log("No existing exam found, generating new one");
    }

    // If no existing exam or error occurred, generate new exam
    const data = await generateTranslationExam({
      initial,
      target,
      email,
    });

    if (!data) {
      throw new Error("Failed to load exam questions");
    }

    return data;
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    throw new Response("Failed to load exam questions", { status: 500 });
  }
}
