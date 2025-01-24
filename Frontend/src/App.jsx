<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage,LayoutAuth,Login } from './constants/Path';
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';



// Import page components
import LandingPage from './components/LandingPage';


// Import layout components
import MainLayout from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout.jsx';
>>>>>>> d1a871fd9bffd711281ae10ab930c24b88e4004a

function App() {
  const routers = createBrowserRouter([
 
    {
      path: "/",
      element: <LayoutAuth />,
      children: [
        { path: "login", element: <Login /> ,errorElement:<ErrorPage />},
      ],
      errorElement:<ErrorPage />
      
    },
  ]);
  
  return (
<<<<<<< HEAD
    <RouterProvider router={routers} />
  )
=======
  <div className="App">
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Auth Layout Routes */}

        {/* Fallback Route for 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>

);

>>>>>>> d1a871fd9bffd711281ae10ab930c24b88e4004a
}


export default App;