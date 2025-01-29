import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Password } from "@mui/icons-material";
import { Box } from "@mui/material";

import InputFelid from "../UI/InputFelid";
import ButtonFelid from "../UI/ButtonFelid";

export default function RestPassword() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      Password: "",
      confirmPassword: "",
    },
  });
  const formDate = watch();

  const onSubmit = () => {
    alert("Submitted");
  };

  return (
    <div className="max-w-[28%] rounded bg-[#fff] bg-opacity-[50%] backdrop-blur-[50px] p-[50px] font-roboto-condensed form-template text-center shadow">
      <div className="title font-extrabold text-[40px] md:text-4xl mb-[30px]">
        Reset your password
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
          <InputFelid
            title="Password"
            name="password"
            requires={["password required"]}
            placeholder="Enter your password"
            type="password"
            notes={[
              "Must be at least 8 characters, Does not contain your email address",
            ]}
            classes="text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            control={control}
            errors={errors}
          />
          <InputFelid
            title="Confirm Password"
            name="confirmPassword"
            requires={["Password must match is required"]}
            placeholder="Enter your password"
            type="password"
            notes={["Must match a password"]}
            classes="text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            control={control}
            errors={errors}
          />
          <ButtonFelid
            text="Save Password"
            classes="mt-[40px] px-[37px] py-[7px] bg-second-color"
            type="submit"
            // action={() => alert("click")}
            style={{}}
          />
        </form>
      </div>
    </div>
  );
}
