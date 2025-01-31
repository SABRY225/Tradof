import { Email } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import InputFelid from "../../UI/InputFelid";
import ButtonFelid from "../../UI/ButtonFelid";
import GooglePlay from "../../assets/icons/googlePlay.svg";
import iphone from "../../assets/icons/iphone.svg";
import team from "../../assets/icons/team.svg";

export default function ContactUs({ ...prams }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
  });
  const formData = watch();

  return (
    <>
      <div
        className="hidden polygon-background-2 z-[-1] absolute bg-[#d2d4f6] h-screen md:w-full w-[92vh] md:flex items-center justify-center "
        style={{
          clipPath: "polygon(0px 20%, 100% 0, 100% 100%, 0% 100%)",
        }}
      ></div>
      <div
        className="hidden polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-screen md:w-full w-[92vh] md:flex items-center justify-center"
        style={{
          clipPath: "polygon(0px 30%, 100% 1%, 100% 100%, 0px 100%)",
        }}
      ></div>
      <div
        {...prams}
        className="bg-[#6c63ff] md:bg-transparent h-screen flex flex-col md:flex-row md:justify-around text-center justify-center items-center gap-10 md:mx-[140px] pt-[150px] "
      >
        <div className="font-roboto-condensed text-white">
          <h3 className="font-roboto-condensed font-extrabold text-[40px] transform scale-y-80">
            Download Our App Now
          </h3>
          <div className="font-roboto-condensed font-regular text-[18px] my-[20px] max-w-[500px]">
            Enjoy a smoother and easier translation experience on mobile.
            Download our app today.
          </div>
          <div className="apps flex gap-[40px] my-[40px]">
            <div className="cursor-pointer border-[3px] border-[#fff]/40 rounded-[10px] flex gap-5 items-center justify-center text-center py-[10px] px-[25px] max-w-[280px]">
              <img src={GooglePlay} alt="google paly" />
              <p className="font-roboto-condensed w-fit">
                Download on Google Play
              </p>
            </div>
            <div className="cursor-pointer border-[3px] border-[#fff]/40 rounded-[10px] flex gap-5 items-center justify-center text-center py-[10px] px-[25px] max-w-[280px]">
              <img src={iphone} alt="iphone paly" />
              <p className="font-roboto-condensed">Download on App Store</p>
            </div>
          </div>
          <div className="team flex flex-wrap md:w-[50%] gap-[30px]">
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
          </div>
        </div>
        <form className="flex-grow w-[380px] flex flex-col items-center">
          <h2 className="relative font-semibold md:text-[40px] text-[30px] text-white text-center my-[15px]">
            Contact technical support
            <div className="w-full relative bg-second-color before:absolute before:content-[''] before:w-1/2 before:h-1 before:bg-second-color before:rounded before:bottom-[-15px] before:right-[22%] "></div>
          </h2>
          <div className="input-control flex flex-col text-black mt-[20px]">
            <label className="font-medium text-[20px] text-white">Email</label>
            <input
              type="email"
              className="outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-[500px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              placeholder="Enter your email address"
            />
          </div>
          <div className="input-control flex flex-col text-black my-[40px]">
            <label className="font-medium text-[20px] text-white">Message</label>
            <textarea
              className="outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-[500px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              placeholder="Enter your message"
            />
          </div>
          <ButtonFelid
            text="Send"
            type="submit"
            classes="text-[20px] px-[20px] py-[7px] bg-second-color w-[500px]"
            onClick={() => alert("click")}
            // style={{ width: "154px" }}
          />
        </form>
      </div>
    </>
  );
}
