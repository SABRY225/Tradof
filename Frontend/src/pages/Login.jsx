import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify"; // Import toast

import { loginUser } from "@/Util/http";
import { useAuth } from "@/Context/AuthContext";

import InputFelid from "../UI/InputFelid";
import ButtonFelid from "../UI/ButtonFelid";
import Loading from "./Loading";
import { useState } from "react";

export default function Login() {
  const { user, login } = useAuth();
  const [error, setError] = useState(null);
  const { mutate, data, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // ✅ Store token in HTTP-only cookie (backend should handle this securely)
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      // console.log(data);
      // // ✅ Store user data in local state (Avoid storing token in localStorage!)
      login({ userId: data.userId, role: data.role });

      window.location.href = "/dashboard"; // Redirect after login
    },
    onError: (error) => {
      toast.error(error?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setError(error.message);
    },
  });

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

  const formData = watch();

  const onSubmit = () => {
    console.log(formData);
    mutate({ data: formData });
  };

  if (isPending) return <Loading />;

  return (
    <div className="rounded bg-[#fff] bg-opacity-[50%] backdrop-blur-[50px] p-[30px] md:p-[50px]  font-roboto-condensed text-center shadow">
      <div className="title font-extrabold text-[40px] md:text-4xl">
        Login to your account
      </div>
      <div className="subTitle text-[17px] font-light text-sm m-5">
        Don't have an account?{" "}
        <Link className="text-[#6C63FF] font-semibold" to="/sign-up">
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
            classes="min-w-[300px] text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
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
            classes="min-w-[300px] text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
          />
          <>
            <div className="text-left border-b border-black w-fit">
              <Link to="forget-password">Forgot Password?</Link>
            </div>
          </>
          <ButtonFelid
            text="Log in"
            classes="mt-[40px] px-[60px] py-[7px] bg-second-color m-auto"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
