import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';



// Import page components
import LandingPage from './components/LandingPage';


// Import layout components
import MainLayout from './layouts/MainLayout';
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

        {/* Auth Layout Routes */}

        {/* Fallback Route for 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
    </div>

);

}


export default App;