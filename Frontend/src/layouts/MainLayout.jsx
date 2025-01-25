import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Navbar from '../components/Navbar/Navbar.jsx';
// import Footer from '../components/Footer/Footer.jsx';

export default function MainLayout() {
    return (
        <div className="w-full">
            <Navbar isLanding />
            <Outlet /> 
            {/* <Footer /> */}
        </div>
    );
}