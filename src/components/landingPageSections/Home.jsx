import { motion } from "motion/react";
import image_1 from "../../assets/images/landing-1.png";
import { useNavigate } from "react-router-dom";
import ButtonFelid from "@/UI/ButtonFelid";
import Magnet from "../ui/Magnet";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div id="Home" className="relative overflow-hidden">
        <motion.div
          initial={{ y: "-300rem" }}
          animate={{ y: "0" }}
          transition={{ type: "keyframes", duration: 1 }}
          className="hidden polygon-background-2-2 z-[-1] absolute bg-[#d2d4f6] h-full w-full md:flex items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 40%, 0% 95%)",
          }}
        ></motion.div>
        <motion.div
          initial={{ y: "-300rem" }}
          animate={{ y: "0" }}
          transition={{ type: "keyframes", duration: 1.3 }}
          className="polygon-background-1-1 z-[-1] absolute bg-[#6c63ff] h-full w-full md:flex items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 93%)",
          }}
        ></motion.div>

        <div className="container max-w-screen-xl w-full flex py-28 md:bg-inherit">
          <motion.div
            initial={{ x: "-500rem" }}
            animate={{ x: "0" }}
            transition={{ type: "keyframes", duration: 1.2 }}
            className="flex flex-col gap-[50px] lg:items-start items-center m-auto lg:px-36 px-12 max-w-[700px] lg:max-w-full"
          >
            <div className="top flex flex-col transform scale-y-[1.2]">
              <h1 className="text-[60px] font-bold">
                <span className="text-black">Welcome to</span>{" "}
                <span className="text-white">Tradof</span>
              </h1>
              <p className="text-[#fff] opacity-[60%] font-semibold m-auto ml-5">
                Your Trusted Partner in Language Translation
              </p>
            </div>
            <p className="text-justify text-lg text-white capitalize">
              we understand that communication is at the heart of every
              successful business. Whether you're expanding into new markets,
              building relationships with international clients, or sharing your
              brand story, language should never be a barrier. That's where we
              come in.
            </p>
            <Magnet padding={200} disabled={false} magnetStrength={10}>
              <ButtonFelid
                type="button"
                text="Get Start"
                classes="text-[15px] px-[20px] py-[10px] bg-second-color"
                onClick={() => navigate("/auth")}
                style={{ width: "170px" }}
              />
            </Magnet>
          </motion.div>

          <motion.div
            className="hidden lg:block w-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              initial={{ x: "500rem" }}
              animate={{ x: "0" }}
              transition={{ type: "keyframes", duration: 1.2 }}
              src={image_1}
              alt="Translation Service"
              className="hidden lg:block w-full max-w-[1400px]"
            />
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1020px) {
          .polygon-background-1-1 {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
          }
          .polygon-background-2-2 {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
          }
        }
        @media (max-width: 768px) {
          .polygon-background-1-1 {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
          }
          .polygon-background-2-2 {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) !important;
          }
        }
        @media (min-width: 1021px) {
          .polygon-background-1-1 {
            clip-path: polygon(0 0, 100% 0, 100% 30%, 0 93%) !important;
          }
          .polygon-background-2-2 {
            clip-path: polygon(0 0, 100% 0, 100% 40%, 0% 95%) !important;
          }
        }
      `}</style>
    </>
  );
}
