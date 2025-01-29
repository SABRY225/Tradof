// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
// import AuthLayout from './layouts/AuthLayout.jsx';

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "root",
    children: [
      {
        path: "landing",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/auth",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "send-otp",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password/:email",
        element: <RestPassword />,
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
