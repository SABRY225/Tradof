import { useState } from "react";
import {
  BookOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  LeftOutlined,
  MailOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Collapse,
  Progress,
  Typography,
} from "antd";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import Loading from "../Loading";

const { Panel } = Collapse;
const { Title, Text } = Typography;

export default function ExamPage() {
  const { initial, target } = useParams();
  const navigate = useNavigate();
  const [deviceChecks, setDeviceChecks] = useState({
    internet: false,
    browser: false,
    environment: false,
  });
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  
  if (isLoading) return <Loading />;

  const allChecksComplete = Object.values(deviceChecks).every((check) => check);

  const handleDeviceCheck = (key) => {
    setDeviceChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center justify-center">
            <BookOutlined className="text-blue-600 text-3xl mr-4" />
            <Title level={4} className="m-0 text-blue-800">
              Exam Preparation
            </Title>
          </div>
          <div className="flex items-center">
            <Text className="mr-4 text-gray-600">
              Today:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-md">
            <div className="flex items-center justify-between">
              <Title level={4} className="p-0">
                Translation {initial + " to " + target} Exam
              </Title>
            </div>
          </Card>

          <Card className="mb-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <Title level={4} className="m-0">
                Exam Readiness Checklist
              </Title>
              <Badge
                count={
                  Object.values(deviceChecks).filter(Boolean).length +
                  "/" +
                  Object.keys(deviceChecks).length
                }
                style={{
                  backgroundColor: allChecksComplete ? "#52c41a" : "#1890ff",
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Checkbox
                    checked={deviceChecks.speakers}
                    onChange={() => handleDeviceCheck("speakers")}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <Text strong className="block text-base">
                      Speakers Check
                    </Text>
                    <Text className="text-gray-600">
                      Verify audio output is functioning correctly
                    </Text>
                  </div>
                </div>

                <div className="flex items-start">
                  <Checkbox
                    checked={deviceChecks.internet}
                    onChange={() => handleDeviceCheck("internet")}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <Text strong className="block text-base">
                      Internet Connection
                    </Text>
                    <Text className="text-gray-600">
                      Confirm stable internet connection
                    </Text>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Checkbox
                    checked={deviceChecks.browser}
                    onChange={() => handleDeviceCheck("browser")}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <Text strong className="block text-base">
                      Browser Compatibility
                    </Text>
                    <Text className="text-gray-600">
                      Using a supported browser version
                    </Text>
                  </div>
                </div>

                <div className="flex items-start">
                  <Checkbox
                    checked={deviceChecks.environment}
                    onChange={() => handleDeviceCheck("environment")}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <Text strong className="block text-base">
                      Quiet Environment
                    </Text>
                    <Text className="text-gray-600">
                      Ensure you're in a quiet, distraction-free space
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Progress
                percent={Math.round(
                  (Object.values(deviceChecks).filter(Boolean).length /
                    Object.keys(deviceChecks).length) *
                    100
                )}
                status={allChecksComplete ? "success" : "active"}
                strokeColor={allChecksComplete ? "#52c41a" : "#1890ff"}
              />
            </div>
          </Card>

          <Card className="mb-8 shadow-md">
            <Title level={4} className="mb-6 flex items-center">
              <BulbOutlined className="mr-2 text-yellow-500" />
              Important Notes
            </Title>

            <Collapse bordered={false} className="bg-white">
              <Panel
                header={
                  <div className="flex items-center text-base font-medium">
                    <FileTextOutlined className="mr-2 text-blue-500" />
                    Exam Rules & Guidelines
                  </div>
                }
                key="1"
              >
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    No external resources are allowed unless specifically
                    permitted
                  </li>
                  <li>
                    No other person is allowed in your room during the exam
                  </li>
                  <li>
                    Any suspicious behavior may result in exam termination
                  </li>
                </ul>
              </Panel>

              <Panel
                header={
                  <div className="flex items-center text-base font-medium">
                    <ClockCircleOutlined className="mr-2 text-blue-500" />
                    Time Duration & Breaks
                  </div>
                }
                key="2"
              >
                <ul className="list-disc pl-6 space-y-2">
                  <li>Total exam duration: 1 hours (60 minutes)</li>
                  <li>No scheduled breaks during the exam</li>
                  <li>
                    Timer will continue running even if you experience technical
                    issues
                  </li>
                  <li>Last 15 minutes will be highlighted with a warning</li>
                  <li>Exam will automatically submit when time expires</li>
                </ul>
              </Panel>

              <Panel
                header={
                  <div className="flex items-center text-base font-medium">
                    <CheckCircleOutlined className="mr-2 text-blue-500" />
                    Permitted Materials
                  </div>
                }
                key="3"
              >
                <ul className="list-disc pl-6 space-y-2">
                  <li>No phones, smart watches, or other electronic devices</li>
                  <li>No printed materials or handwritten notes</li>
                </ul>
              </Panel>

              <Panel
                header={
                  <div className="flex items-center text-base font-medium">
                    <PhoneOutlined className="mr-2 text-blue-500" />
                    Emergency Contact Information
                  </div>
                }
                key="4"
              >
                <div className="space-y-3">
                  <p>
                    If you experience technical difficulties during the exam:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {/* <div className="flex items-center mb-2">
                      <PhoneOutlined className="mr-2 text-green-600" />
                      <Text strong>Technical Support:</Text>
                      <Text className="ml-2">1-800-555-0123</Text>
                    </div> */}
                    <div className="flex items-center">
                      <MailOutlined className="mr-2 text-blue-600" />
                      <Text strong>Email Support:</Text>
                      <Text className="ml-2">tradofhelp@gmail.com</Text>
                    </div>
                  </div>
                  <Alert
                    message="Important"
                    description="If you need to contact support, your exam timer will continue running. Document the issue with screenshots if possible."
                    type="warning"
                    showIcon
                  />
                </div>
              </Panel>
            </Collapse>
          </Card>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <Alert
              message="Ready to Begin?"
              description="Once you start the exam, the timer will begin and you cannot pause. Make sure you've completed all the preparation steps above."
              type="info"
              showIcon
              className="mb-6"
            />
            <Alert
              message="May take a lot of time to generate exam."
              description="If take more then 15m, please send to us."
              type="warning"
              className="mb-6"
              showIcon
            />

            <div className="flex justify-between items-center">
              <Button
                size="large"
                icon={<LeftOutlined />}
                onClick={() => navigate("/user/dashboard")}
              >
                Back to Dashboard
              </Button>

              <Button
                type="primary"
                size="large"
                icon={<RightOutlined />}
                disabled={!allChecksComplete}
                onClick={() => navigate("free")}
                className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg font-medium"
              >
                Start Exam
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Text className="text-gray-300">
                © 2025 Tradof Platform. All rights reserved.
              </Text>
            </div>
            <div className="flex space-x-4">
              <Button type="link" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Button>
              <Button type="link" className="text-gray-300 hover:text-white">
                Terms of Service
              </Button>
              <Button type="link" className="text-gray-300 hover:text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
