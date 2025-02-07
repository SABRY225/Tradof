// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Util/http";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import { LoginLayout } from "./constants/Path";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
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
import Profile from "./pages/Client/Profile";
import Setting from "./pages/Client/Setting";
// import AuthLayout from './layouts/AuthLayout.jsx';

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
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmail />,
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
      { path: "send-otp", element: <ForgetPassword /> },
      { path: "reset-password/:email", element: <RestPassword /> },
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
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Setting /> },
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
