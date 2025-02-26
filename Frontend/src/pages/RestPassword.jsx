import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import InputFelid from "../UI/InputFelid";
import ButtonFelid from "../UI/ButtonFelid";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/Util/Https/http";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { Password } from "@mui/icons-material";

export default function RestPassword() {
  const { email, resetToken } = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("change password successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      navigate("/auth");
    },
    onError: (error) => {
      toast.error(error?.message || "change password failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  });
  const formDate = watch();
  const decodedToken = decodeURIComponent(resetToken);

  const onSubmit = () => {
    let hasError = false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!formDate.password.trim()) {
      setError("password", {
        type: "manual",
        message: "Password is required.",
      });
      hasError = true;
    } else if (formDate.password.length < 6) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 6 characters long.",
      });
      hasError = true;
    } else if (!passwordRegex.test(formDate.password)) {
      setError("password", {
        type: "manual",
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
      hasError = true;
    } else {
      clearErrors("password");
    }
    if (!formDate.confirmPassword.trim()) {
      setError("confirmPassword", {
        type: "manual",
        message: "Please confirm your password.",
      });
      hasError = true;
    } else if (formDate.password !== formDate.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      hasError = true;
    } else clearErrors("confirmPassword");
    if (hasError) return;
    console.log(email, decodedToken, formDate.password);
    mutate({
      data: {
        email,
        token: decodedToken,
        newPassword: formDate.password,
        confirmPassword: formDate.confirmPassword,
      },
    });
  };

  if (isPending) return <Loading />;

  return (
    <div className="rounded bg-[#fff] bg-opacity-[50%] backdrop-blur-[50px] p-[30px] md:p-[50px] font-roboto-condensed text-center shadow">
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
            classes="disable text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            control={control}
            errors={errors}
            disabled
          />
          <InputFelid
            title="Password"
            name="password"
            requires={["password required"]}
            placeholder="Enter your password"
            type="password"
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
            classes="text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
            control={control}
            errors={errors}
          />
          <ButtonFelid
            text="Save Password"
            classes="mt-[40px] m-auto px-[37px] py-[7px] bg-second-color"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
