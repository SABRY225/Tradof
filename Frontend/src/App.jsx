import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";

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
import CreateProject from "./pages/Client/CreateProject";
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
import PayProject from "./pages/Client/PayProject";
import Finances from "./pages/Client/Finances";
import ProjectOffers from "./pages/Client/ProjectOffers";
import AddOffer from "./pages/Freelancer/AddOffer";
import AvailableProjects from "./pages/Freelancer/AvailableProjects";
import Offers from "./pages/Freelancer/Offers";
import ProjectPage, { projectLoader } from "./pages/shared/ProjectPage";
import ErrorPage from "./pages/ErrorPage";

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage />, loader: subscriptionsLoader }, // Default route
    ],
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/auth",
    element: <LoginLayout />,
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
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "project",
        children: [
          {
            path: ":projectId",
            element: <ProjectPage />,
            loader: projectLoader,
          },
          { path: "offer/:projectId", element: <ProjectOffers /> },
          { path: "add-offer/:projectId", element: <AddOffer /> },
          { path: "create", element: <CreateProject /> },
          { path: "start", element: <StartedProjects /> },
          { path: "upcoming", element: <UpcomingProjects /> },
          { path: "pay", element: <PayProject /> },
          { path: "available", element: <AvailableProjects /> },
        ],
      },
      { path: "profile", element: <Profile /> },
      { path: "finances", element: <Finances /> },
      { path: "settings", element: <Setting />, loader: settingsLoader },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "calender",
        element: <Calender />,
        loader: calendarLoader,
        // errorElement: <ErrorPage />,
      },
      { path: "offers", element: <Offers /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ToastContainer stacked position="top-center" autoClose={3000} />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default App;
