import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Import page components
import LandingPage from "./components/LandingPage";

// Import layout components
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
// import AuthLayout from './layouts/AuthLayout.jsx';

// create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "root",
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Register />,
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
