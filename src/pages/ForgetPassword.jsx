import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import InputFelid from "../UI/InputFelid";
import ButtonFelid from "../UI/ButtonFelid";
import { useMutation } from "@tanstack/react-query";
import { restPassword } from "@/Util/Https/http";
import Loading from "./Loading";
import { message } from "antd";

export default function ForgetPassword() {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
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
  const { mutate, isPending } = useMutation({
    mutationFn: restPassword,
    onMutate: () => {
      messageApi.loading({
        content: "Sending rest password request...",
        key: "restPassword",
      });
    },
    onSuccess: () => {
      navigate(`../send-otp/${watch("email")}`);
    },
    onError: (error) => {
      messageApi.error({
        content: error?.message || "rest password failed!",
        key: "restPassword",
      });
    },
  });

  const formDate = watch();

  const onSubmit = () => {
    mutate({ data: formDate });
  };
  if (isPending) return <Loading />;
  return (
    <>
      {contextHolder}
      <div className="rounded bg-[#fff] bg-opacity-[50%] backdrop-blur-[50px] p-[30px] md:p-[50px] font-roboto-condensed text-center shadow">
        <div className="title font-extrabold text-[40px] md:text-4xl">
          Reset your password
        </div>
        <div className="subTitle max-w-[350px] text-[17px] font-light text-sm m-5">
          To reset your password, enter your email below and submit. An email
          will be sent to you with instructions about how to complete the
          process.
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputFelid
              title="Email Address"
              name="email"
              requires={["Email required"]}
              placeholder="Enter your email address"
              type="text"
              classes="min-w-[300px] text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              control={control}
              errors={errors}
            />
            <ButtonFelid
              text="Reset Password"
              classes="mt-[40px] m-auto px-[20px] py-[7px] bg-second-color"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
}
