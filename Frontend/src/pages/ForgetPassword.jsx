import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Password } from "@mui/icons-material";
import { Box } from "@mui/material";

import InputFelid from "../UI/InputFelid";
import ButtonFelid from "../UI/ButtonFelid";

export default function ForgetPassword() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const formDate = watch();

  const onSubmit = () => {
    alert("Submitted");
    navigate("../reset-password/:email");
  };

  return (
    <div className="max-w-[28%] rounded bg-[#fff] bg-opacity-[50%] backdrop-blur-[50px] p-[50px] font-roboto-condensed form-template text-center shadow">
      <div className="title font-extrabold text-[40px] md:text-4xl mb-3">
        Reset your password
      </div>
      <div className="subTitle text-[17px] font-light text-sm m-5">
        To reset your password, enter your email below and submit. An email will
        be sent to you with instructions about how to complete the process.
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFelid
            title="Email Address"
            name="email"
            requires={["Email required"]}
            placeholder="Enter your email address"
            type="text"
            classes="text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            control={control}
            errors={errors}
          />
          <ButtonFelid
            text="Reset Password"
            classes="mt-[40px] px-[20px] py-[7px] bg-second-color"
            type="submit"
            // action={() => alert("click")}
            style={{}}
          />
        </form>
      </div>
    </div>
  );
}
