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
        className="polygon-background-1 z-[-1] absolute bg-[#6c63ff] h-screen md:w-full w-[92vh] md:flex items-center justify-center"
        style={{
          clipPath: "polygon(0px 30%, 100% 1%, 100% 100%, 0px 100%)",
        }}
      ></div>
      <div
        {...prams}
        className="min-h-screen flex flex-col lg:flex-row md:justify-around items-center md:mx-[140px] pt-[150px]"
      >
        <div className="hidden lg:block font-roboto-condensed text-white">
          <div className=" font-roboto-condensed font-regular text-[18px] my-[20px] max-w-[500px]">
            <h3 className="font-roboto-condensed font-extrabold text-[40px] transform scale-y-80">
              Download Our App Now
            </h3>
            Enjoy a smoother and easier translation experience on mobile.
            Download our app today.
          </div>
          <div className="flex gap-[40px] my-[40px]">
            <div className="border-2 border-[#fff]/40 rounded-[10px] flex gap-5 items-center justify-center text-center px-[20px] max-w-[180px] max-h-[50px]">
              <img src={GooglePlay} alt="google paly" width="20px" />
              <p className="font-roboto-condensed text-[15px]">
                Download on Google Play
              </p>
            </div>
            <div className="border-2 border-[#fff]/40 rounded-[10px] flex gap-5 items-center justify-center text-center px-[20px] max-w-[180px] max-h-[50px]">
              <img src={iphone} alt="google paly" width="20px" />
              <p className="font-roboto-condensed text-[15px]">
                Download on App Store
              </p>
            </div>
          </div>
          <div className="team flex flex-wrap max-w-[300px] gap-[30px]">
            <img src={team} alt="" width="50px" />
            <img src={team} alt="" width="50px" />
            <img src={team} alt="" width="50px" />
            <img src={team} alt="" width="50px" />
            <img src={team} alt="" width="50px" />
            <img src={team} alt="" width="50px" />
            <img src={team} alt="" width="50px" />
            <img src={team} alt="" width="50px" />
          </div>
        </div>
        <form
          className="flex-grow w-[380px] flex flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="relative font-roboto-condensed font-semibold md:text-[40px] text-[30px] text-white text-center my-[15px]">
            Contact technical support
            <div className="w-full relative bg-second-color before:absolute before:content-[''] before:w-1/2 before:h-1 before:bg-second-color before:rounded before:bottom-[-15px] before:right-[22%] "></div>
          </h2>
          <div className="input-control flex flex-col text-black mt-[20px]">
            <label className="font-medium text-white">Email</label>
            <InputFelid
              // title="Email Address"
              name="email"
              errors={errors}
              control={control}
              placeholder="enter email address"
              type="text"
              classes="min-w-[450px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            />
          </div>
          <div className="input-control flex flex-col text-black my-[30px]">
            <label className="font-medium text-white">Message</label>
            <InputFelid
              // title="Email Address"
              name="message"
              errors={errors}
              control={control}
              placeholder="enter your message"
              type="textarea"
              classes="min-w-[450px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            />
          </div>
          <ButtonFelid
            text="Send"
            type="submit"
            classes="text-[18px] py-[8px] bg-second-color min-w-[450px]"
            onClick={() => alert("click")}
            // style={{ width: "154px" }}
          />
        </form>
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
