import Footer from '../UI/Footer';
import BackgroundAuth from '../UI/BackgroundAuth';
import LoginAndResetPass from '../Forms/LoginAndResetPass';
import "../styles/BackgroundAuth.css";

export default function LoginLayout() {
    return (
        <div>
            <div className="bg-[#F5F5FF]">
                <div className="flex flex-col-reverse md:flex-col">
                    <LoginAndResetPass />
                    <BackgroundAuth />
                </div>
            </div>
            <Footer color={`#6C63FF`} />
        </div>
    );
}
