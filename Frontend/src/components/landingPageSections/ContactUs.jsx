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
        className="polygon-background-2 z-[-1] absolute bg-[#d2d4f6] h-screen md:w-full w-[92vh] flex items-center justify-center "
        style={{
          clipPath: "polygon(0px 20%, 100% 0, 100% 100%, 0% 100%)",
        }}
      ></div>
      <div
        className="polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-screen md:w-full w-[92vh] flex items-center justify-center"
        style={{
          clipPath: "polygon(0px 30%, 100% 1%, 100% 100%, 0px 100%)",
        }}
      ></div>
      <div
        {...prams}
        className="h-screen flex justify-around items-center gap-5 mx-[170px] pt-[150px]"
      >
        <div className="font-roboto-condensed text-white">
          <h3 className="font-roboto-condensed font-extrabold text-[55px] transform scale-y-110">
            Download Our App Now
          </h3>
          <div className="font-roboto-condensed font-regular text-[22px] my-[30px] max-w-[500px]">
            Enjoy a smoother and easier translation experience on mobile.
            Download our app today.
          </div>
          <div className="apps flex gap-[80px] my-[50px]">
            <div className="border-[3px] border-[#fff]/40 rounded-[10px] flex gap-5 items-center justify-center text-center py-[10px] px-[35px] max-w-[250px]">
              <img src={GooglePlay} alt="google paly" />
              <p className="font-roboto-condensed w-fit">
                Download on Google Play
              </p>
            </div>
            <div className="border-[3px] border-[#fff]/40 rounded-[10px] flex gap-5 items-center justify-center text-center py-[10px] px-[35px] max-w-[250px]">
              <img src={iphone} alt="iphone paly" />
              <p className="font-roboto-condensed">Download on App Store</p>
            </div>
          </div>
          <div className="team flex flex-wrap w-[50%] gap-[30px]">
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
            <img src={team} alt="" />
          </div>
        </div>
        <form className="flex-grow w-[440px] flex flex-col items-center">
          <h2 className="relative font-semibold text-[40px] text-white text-center my-[75px]">
            Contact technical support
            <div className="w-full relative bg-second-color before:absolute before:content-[''] before:w-1/2 before:h-1 before:bg-second-color before:rounded before:bottom-[-15px] before:right-[22%] "></div>
          </h2>
          <div className="input-control flex flex-col gap-4 text-white my-[20px]">
            <label className="font-medium text-[20px]">Email</label>
            <input
              type="email"
              className="outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-[500px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              placeholder="Enter your email address"
            />
          </div>
          <div className="input-control input-control flex flex-col gap-4 text-white my-[40px]">
            <label className="font-medium text-[20px]">Message</label>
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
