import { motion } from 'motion/react';

import image_1 from "../../assets/images/landing-1.png";

import ButtonFelid from "../../UI/ButtonFelid";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="Home"
        className="h-height-section w-screen relative flex items-center justify-center md:px-6 lg:px-[170px]"
      >
        <div
          className="polygon-background-2 z-[-1] absolute bg-[#d2d4f6] h-full md:w-full w-[92vh] flex items-center justify-center "
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 40%, 1% 95%)",
          }}
        ></div>
        <div
          className="polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-full md:w-full w-[92vh] flex items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 93%)",
          }}
        ></div>

        {/* Content */}
        <div className="lg:px-[170px] w-full h-full grid lg:grid-cols-[60%_30%] gap-5 mx-auto items-center">
          <div className="flex flex-col items-center lg:items-start font-roboto-condensed font-semibold max-w-[70%] mx-auto lg:mx-0">
            <div className="flex flex-col mb-14">
              <h1 className="text-[64px] mb-4 transform scale-y-110">
                <span className="text-black">Welcome to </span>
                <span className="text-white">Tradof</span>
              </h1>
              <p className="pl-10 text-[#fff] opacity-[57%] font-regular text-[22px]">
                Your Trusted Partner in Language Translation
              </p>
            </div>
            <p className="text-justify text-[24px] font-regular text-white mb-12">
              We understand that communication is at the heart of every
              successful business. Whether you're expanding into new markets,
              building relationships with international clients, or sharing your
              brand story, language should never be a barrier. That's where we
              come in.
            </p>
            <ButtonFelid
              text="Get Started"
              classes="text-[20px] px-[20px] py-[7px] bg-second-color"
              onClick={() => navigate("/auth")}
              style={{ width: "154px" }}
            />
          </div>
          <motion.div
            className="hidden lg:block w-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={image_1}
              alt="Translation Service"
              className="w-full max-w-[1400px]"
            />
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1020px) {
          .polygon-background-1 {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
          }
        }
      `}</style>
    </>
  );
}
