// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';



// Import page components
import LandingPage from './components/LandingPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// Import layout components
import MainLayout from './layouts/MainLayout';
import {  LoginLayout } from './constants/Path';
// import AuthLayout from './layouts/AuthLayout.jsx';

function App() {

  return (
  <div className="App">
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="auth" element={<LoginLayout />} />
        <Route path="send-email" element={<LoginLayout />} />
        <Route path=":email" element={<LoginLayout />} />

        {/* Auth Layout Routes */}

        {/* Fallback Route for 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>

);

}


export default App;