import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify"; // Import toast

import { loginUser, signByGoogle } from "@/Util/Https/http";
import { useAuth } from "@/Context/AuthContext";

import InputFelid from "../UI/InputFelid";
import ButtonFelid from "../UI/ButtonFelid";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { googleColor } from "@/assets/paths";
import { GetCurrentSubscription } from "@/Util/Https/companyHttp";

export default function Login() {
  const { user, login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { mutate, data, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
  
      login({
        userId: data.userId,
        role: data.role,
        token: data.token,
        refreshToken: data.refreshToken,
        refreshToken: data.refreshToken,
      });
  
      try {
        if(data.role=="CompanyAdmin"){
          await GetCurrentSubscription({
            companyId: data.userId,
            token: data.token,
          });
        }
        // بعد التأكد من الاشتراك، نوجّه
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
  
      } catch (err) {
        // لو مفيش اشتراك أو فيه Error، يتوجه لاختيار الخطة
        console.error("Subscription error:", err);
        navigate("/select-plan");
      }
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
    mutate: signGoogle,
    data: googleData,
    isPending: googlePending,
  } = useMutation({
    mutationFn: signByGoogle,
    onSuccess: (data) => {
      console.log("Google login data:", data);
     
      // navigate("/user/dashboard");
    },
    onError: (error) => {
      toast.error(error?.message || "Google login failed!", {
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

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/user/dashboard");
    }
  }, []);

  const formData = watch();

  const onSubmit = () => {
    // console.log(formData);
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
        <Link className="text-[#6C63FF] font-semibold" to="sign-up">
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
          <div className="text-left border-b border-black w-fit">
            <Link to="forget-password">Forgot Password?</Link>
          </div>
          <div className="flex items-center mt-[40px]">
            <ButtonFelid
              text="Log in"
              classes="px-[60px] py-[7px] bg-second-color m-auto"
              type="submit"
            />
            <button
              type="button"
              onClick={() => signGoogle()}
              className="h-fit w-fit mx-auto flex rounded py-1 px-2 gap-2 font-medium"
            >
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <img src={googleColor} alt="google color" className="w-5 " />
              </div>
              <p className="border-b-2 border-black">Sign in with Google</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
