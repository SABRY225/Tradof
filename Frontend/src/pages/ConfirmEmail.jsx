import { useNavigate } from "react-router-dom";
import AnimatedLogo from "../UI/AnimatedLogo";
import ButtonFelid from "../UI/ButtonFelid";

export default function ConfirmEmail() {
  const divs = Array.from({ length: 50 }, (_, index) => (
    <div
      key={index}
      className="bg-[#fff] w-4 h-4 rounded-full opacity-30"
      style={{ clipPath: "circle(50% at 50% 50%)" }}
    ></div>
  ));

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 sm:px-10">
      <div className="absolute w-full h-full background z-[-1]">
        <div
          className="polygon-background-1 z-[-1] absolute bg-[#d2d4f6] h-full w-full"
          style={{
            clipPath: "polygon(0% 15%, 100% 98%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div
          className="polygon-background-2 z-[-1] absolute bg-[#6c63ff] h-full w-full"
          style={{
            clipPath: "polygon(0% 30%, 100% 100%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div
          className="z-[-1] absolute bg-[#fff] w-[30rem] h-[30rem] bottom-[0] left-[-12rem] opacity-[5%]"
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
        ></div>
        <div className="absolute grid grid-cols-5 gap-4 gap-y-6 bottom-[2%] left-[-0.5rem] z-[-1]">
          {divs}
        </div>
        <div className="fixed top-0 left-0 w-full h-full bg-[#FEFEFE] bg-opacity-[10%] backdrop-blur-sm z-[-1]"></div>
      </div>
      <div className="rounded-lg bg-white bg-opacity-50 backdrop-blur-lg p-6 sm:p-10 text-center shadow-lg max-w-md w-full">
        <div className="flex justify-center items-center gap-5 mb-5">
          <AnimatedLogo size={40} />
          <h1 className="font-markazi-text text-2xl sm:text-3xl transform scale-y-110 font-semibold">
            Tradof
          </h1>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-roboto-condensed">
            We are happy to have you join us. Please confirm your email, then
            login again.
          </p>
          <p className="text-main-color font-semibold mt-2">
            Check your email.
          </p>
          <ButtonFelid
            text="Log in"
            classes="mt-6 px-6 py-2 bg-second-color rounded-md"
            onClick={() => navigate("/auth")}
          />
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
