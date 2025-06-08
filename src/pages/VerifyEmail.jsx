import AnimatedLogo from "@/UI/AnimatedLogo";
import BackgroundAuth from "@/UI/BackgroundAuth";

export default function VerifyEmail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 sm:px-10">
      <BackgroundAuth />
      <div className="min-w-[500px] rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-6 sm:p-10 text-center shadow-lg max-w-md w-full">
        <div className="flex justify-center items-center gap-5 mb-5">
          <AnimatedLogo size={40} />
          <h1 className="font-markazi-text text-2xl sm:text-3xl transform scale-y-110 font-semibold">
            Tradof
          </h1>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-roboto-condensed">
            You Email Address is <span className="text-main-color font-semibold">verified</span>
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .polygon-background-1 {
            clip-path: polygon(0% 10%, 100% 70%, 100% 100%, 0% 100%) !important;
          }
          .polygon-background-2 {
            clip-path: polygon(0% 25%, 100% 80%, 100% 100%, 0% 100%) !important;
          }
        }
      `}</style>
    </div>
  );
}