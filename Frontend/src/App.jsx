// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';



// Import page components
import LandingPage from './components/LandingPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// Import layout components
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import {  LoginLayout } from './constants/Path';
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
    path: "/auth",
    element: <LoginLayout />,
  },
  {
    path: "/send-email",
    element: <LoginLayout />,
  },
  {
    path: "/:email",
    element: <LoginLayout />,
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
