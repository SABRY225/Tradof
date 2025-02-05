import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css"; // Import default styles
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import { queryClient } from "./Util/http";
import { AuthProvider } from "./context/AuthContext";

import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";

import LandingPage from "./pages/LandingPage";
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
import SendOTP from "./pages/SendOTP";
import VerifyEmail from "./pages/VerifyEmail";

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> }, // Default route
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
      { path: "project/create", element: <CreateProject /> }, // Direct path
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
      <ToastContainer stacked position="top-center" autoClose={3000} />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
