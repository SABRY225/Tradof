import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FadeLoader } from "react-spinners";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import ButtonFelid from "../UI/ButtonFelid";
import Loading from "./Loading";

import { useState } from "react";
import { restPassword, verifyEmail } from "@/Util/Https/http";
import { message } from "antd";

const felidStyle =
  "border-[#CC99FF] focus:outline-none focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

export default function SendOTP() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [otp, setOtp] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      const resetToken = encodeURIComponent(data?.resetToken);
      navigate(`../reset-password/${email}/${resetToken}`);
    },
    onError: (error) => {
      message.error(error?.message || "rest password failed!");
    },
  });

  const { mutate: resendOTP, isPending: sendOTPPending } = useMutation({
    mutationFn: restPassword,
    onSuccess: () => {
      message.success("OTP is sended");
    },
    onError: (error) => {
      message.error(error?.message || "rest password failed!");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (otp === "") {
      message.error("OTP is required");
      return;
    }
    mutate({ data: { email, otp } });
  };

  if (isPending) return <Loading />;
  return (
    <div className="rounded bg-[#fff] bg-opacity-[50%] backdrop-blur-[50px] p-[30px] md:p-[50px] font-roboto-condensed text-center shadow">
      <div className="title font-extrabold text-[40px] md:text-4xl">
        Verify your email address
      </div>
      <div className="subTitle max-w-[350px] text-[17px] font-light text-sm m-5">
        Enter OTP code here, sent to{" "}
        <span className="text-main-color font-semibold">{email}</span>
      </div>
      <div>
        <form onSubmit={onSubmit} className="flex flex-col items-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className={felidStyle} />
              <InputOTPSlot index={1} className={felidStyle} />
              <InputOTPSlot index={2} className={felidStyle} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className={felidStyle} />
              <InputOTPSlot index={4} className={felidStyle} />
              <InputOTPSlot index={5} className={felidStyle} />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex items-center justify-center gap-[40px] mt-[40px] m-auto">
            <div className="flex items-center justify-center gap-5">
              <button
                type="button"
                className="underline text-[12px]"
                onClick={() => resendOTP({ data: { email } })}
              >
                Send again
              </button>
              {sendOTPPending && (
                <FadeLoader
                  color="#000"
                  cssOverride={{ width: "0px", height: "0px" }}
                  height={3}
                  width={3}
                  loading
                  margin={-11}
                  radius={15}
                  speedMultiplier={1}
                />
              )}
            </div>
            <ButtonFelid
              text="Send"
              classes="px-[20px] py-[7px] bg-second-color"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
