import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import { StreamProvider } from "@/context/StreamContext";

import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "react-toastify/dist/ReactToastify.css"; // Import default styles
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import { queryClient } from "./Util/Https/http";
import { AuthProvider } from "./context/AuthContext";

import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";

import LandingPage, { subscriptionsLoader } from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import RestPassword from "./pages/RestPassword";
import ConfirmEmail from "./pages/ConfirmEmail";
import Payment from "./pages/Freelancer/Payment";
import Loading from "./pages/Loading";
import CreateProject, { basicDataLoader } from "./pages/Client/CreateProject";
import UserLayout from "./layouts/UserLayout";
import Profile from "./pages/shared/Profile";
import Setting, { settingsLoader } from "./pages/shared/Setting";
import SendOTP from "./pages/SendOTP";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import { default as AdminDashboard } from "./pages/Admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import Calender, { calendarLoader } from "./pages/shared/Calender";
import StartedProjects from "./pages/Client/StartedProjects";
import UpcomingProjects from "./pages/Client/UpcomingProjects";
import Finances from "./pages/shared/Finances";
import ProjectOffers from "./pages/Client/ProjectOffers";
import AddOffer from "./pages/Freelancer/AddOffer";
import AvailableProjects from "./pages/Freelancer/AvailableProjects";
import Offers from "./pages/Freelancer/Offers";
import Feedback from "./pages/shared/Feedback";
import AdminTechnicalSupport from "./pages/Admin/AdminTechnicalSupport";
import AdminFinances from "./pages/Admin/AdminFinances";
import AdminAskQuestion from "./pages/Admin/AdminAskQuestion";
import AskQuestion from "./pages/shared/AskQuestion";
import WithdrawProfits from "./pages/Freelancer/WithdrawProfits";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import SettingAdmin from "./pages/Admin/SettingAdmin";
import SuccessPayment from "./pages/payment";
import PlanPage from "./pages/PlanPage";
import ProfitWithdrawalRequests from "./pages/Admin/ProfitWithdrawalRequests";
import TeamPage from "./pages/TeamPage";
import ProjectPage, { projectLoader } from "./pages/shared/ProjectPage";
import ErrorPage from "./pages/ErrorPage";
import PayProject, { payProjectLoader } from "./pages/shared/PayProject";
import { userDataLoader } from "./components/shared/UserNavbar";
import Waiting from "./pages/Meeting/Waiting";
import Room from "./pages/Meeting/Room";
import { SocketProvider } from "./context/SocketProvider";
import AllFreelancers from "./pages/Admin/AllFreelancers";
import AllCompanies from "./pages/Admin/AllCompanies";
import FreeExam, { loaderExam, ErrorBoundary } from "./pages/Exams/FreeExam";
import ExamPage from "./pages/Exams/ExamPage";
import TermsOfService from "./pages/TermsOfService";
// import AdminReports from "./pages/Admin/AdminReports";
import Invoices from "./pages/shared/Invoices";
import EmployeeLayout from "./layouts/employeeLayout";
// import Privacy from "./pages/PrivacyPolicy";

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: basicDataLoader,
    children: [
      { index: true, element: <LandingPage />, loader: subscriptionsLoader }, // Default route
    ],
  },
  { path: "service", element: <TermsOfService /> },
  // { path: "privacy", element: <Privacy /> },
  { path: "success-payment", element: <SuccessPayment /> },
  { path: "select-plan/:token", element: <PlanPage /> },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/auth",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "send-otp/:email", element: <SendOTP /> },
      { path: "reset-password/:email/:resetToken", element: <RestPassword /> },
      { path: "sign-up", element: <Register /> },
      { path: "confirm-email", element: <ConfirmEmail /> },
      { path: "verify-email", element: <VerifyEmail /> },
    ],
  },
  {
    path: "/meeting",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "waiting/:roomId",
        element: <Waiting />,
      },
      {
        path: "room/:roomId",
        element: <Room />,
      },
    ],
  },
  {
    path: "/payment",
    element: <Payment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    loader: userDataLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "project",
        children: [
          {
            path: ":projectId",
            element: <ProjectPage />,
            loader: projectLoader,
          },
          {
            path: "offer/:projectId",
            element: <ProjectOffers />,
            loader: projectLoader,
          },
          {
            path: "add-offer/:projectId",
            element: <AddOffer />,
            loader: projectLoader,
          },
          {
            path: "create",
            element: <CreateProject />,
          },
          { path: "start", element: <StartedProjects /> },
          { path: "upcoming", element: <UpcomingProjects /> },
          { path: ":projectId", element: <ProjectPage /> },
          {
            path: "pay/:projectId",
            element: <PayProject />,
            loader: payProjectLoader,
          },
          {
            path: "available",
            element: <AvailableProjects />,
            loader: basicDataLoader,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
        loader: userDataLoader,
      },
      { path: "settings", element: <Setting />, loader: settingsLoader },
      { path: "dashboard", element: <Dashboard /> },
      { path: "invoices", element: <Invoices /> },
      {
        path: "calender",
        element: <Calender />,
        loader: calendarLoader,
        // errorElement: <ErrorPage />,
      },
      { path: "offers", element: <Offers /> },
      { path: "feedback", element: <Feedback /> },
      { path: "ask-question", element: <AskQuestion /> },
      { path: "finances", element: <Finances /> },
      { path: "withdraw-profits/:amountMoney", element: <WithdrawProfits /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "settings", element: <SettingAdmin /> },
      { path: "ask-question", element: <AdminAskQuestion /> },
      { path: "technical-support", element: <AdminTechnicalSupport /> },
      { path: "feedback", element: <AdminFeedback /> },
      { path: "withdrawal", element: <ProfitWithdrawalRequests /> },
      { path: "finances", element: <AdminFinances /> },
      { path: "freelancers", element: <AllFreelancers /> },
      { path: "companies", element: <AllCompanies /> },
    ],
  },
  {
    path: "/exam",
    children: [
      {
        path: "free/:examId",
        element: <FreeExam />,
        loader: loaderExam,
        errorElement: <ErrorBoundary />,
      },
      { path: ":examId", element: <ExamPage /> },
    ],
  },
  {
    path: "/employee",

    element: <EmployeeLayout />,
  },
  {
    path: "test2",
    element: <WithdrawProfits />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <StreamProvider>
      <SocketProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {/* <ToastContainer stacked position="top-center" autoClose={3000} /> */}
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </AuthProvider>
        </MantineProvider>
      </SocketProvider>
    </StreamProvider>
  );
}

export default App;
