import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Password } from "@mui/icons-material";
import { Box } from "@mui/material";

import InputFelid from "../UI/InputFelid";
import ButtonFelid from "../UI/ButtonFelid";

export default function Login() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formDate = watch();

  const onSubmit = () => {
    alert("Submitted");
  };

  return (
    <div className="rounded bg-[#fff] bg-opacity-[50%] backdrop-blur-[50px] p-[50px] font-roboto-condensed form-template text-center shadow">
      <div className="title font-extrabold text-[40px] md:text-4xl mb-3">
        Login to your account
      </div>
      <div className="subTitle text-[17px] font-light text-sm m-5">
        Don’t have an account?{" "}
        <Link className="text-[#6C63FF] font-regular" to="/sign-up">
          Sign Up
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFelid
            title="Email"
            name="email"
            requires={["Email required"]}
            placeholder="Enter your email address"
            type="text"
            classes="text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            control={control}
            errors={errors}
          />
          <InputFelid
            title="Password"
            name="password"
            type="password"
            control={control}
            errors={errors}
            placeholder="Enter your password"
            requires={["password is required"]}
            classes="text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
          />
          <>
            <div className="text-left border-b border-black w-fit">
              <Link to="send-otp">Forgot Password?</Link>
            </div>
          </>
          <ButtonFelid
            text="Log in"
            classes="mt-[40px] px-[60px] py-[7px] bg-second-color"
            type="submit"
            // action={() => alert("click")}
            style={{}}
          />
        </form>
      </div>
    </div>
  );
}
