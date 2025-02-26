import React from "react";
import ButtonFelid from "@/UI/ButtonFelid";
import { useForm } from "react-hook-form";
import InputFelid from "@/UI/InputFelid";
import { facebook, linkedin, gmail } from "../../assets/paths.js";
import { useMutation } from "@tanstack/react-query";
import { editSocialMedia as CompanyMedia } from "@/Util/Https/companyHttp.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { editSocialMedia as FreelancerMedia } from "@/Util/Https/freelancerHttp.js";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-[250px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";
export default function SocialMedia({ socialMedia }) {
  const {
    user: { role, userId, token },
  } = useAuth();
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["socialMedia"],
    mutationFn: role === "CompanyMedia" ? CompanyMedia : FreelancerMedia,
    onError: (error) => {
      const firstErrorMessage =
        Object.values(error.errors)?.[0]?.[0] || "An error occurred";
      toast.error(firstErrorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
    onSuccess: () => {
      toast.success("Edit Social Media Successfully", {
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
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facebook: socialMedia.find((media) => media?.platformType === "Facebook")
        ?.link,
      linkedin: socialMedia.find((media) => media?.platformType === "LinkedIn")
        ?.link,
      gmail: socialMedia.find((media) => media?.platformType === "Gmail")?.link,
    },
  });
  const fromData = watch();
  const handleEditSocialMedia = () => {
    // console.log(fromData);
    const data = [
      {
        platformType: "Facebook",
        link: fromData.facebook,
      },
      {
        platformType: "LinkedIn",
        link: fromData.linkedin,
      },
      {
        platformType: "Gmail",
        link: fromData.gmail,
      },
    ];
    mutate({ data, id: userId, token });
  };

  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Social Media
      </h1>
      <form
        onSubmit={handleSubmit(handleEditSocialMedia)}
        className="space-y-[20px] bg-card-color rounded-[8px] p-[30px]"
      >
        <div className="flex md:flex-row flex-col justify-between md:items-end">
          <div className="grid grid-col md:grid-cols-2 gap-x-[50px] w-fit m-auto md:m-0">
            <InputFelid
              title="Facebook"
              name="facebook"
              type="text"
              placeholder="facebook link"
              icon={facebook}
              classes={commonClasses}
              control={control}
              errors={errors}
            />
            <InputFelid
              title="LinkedIn"
              name="linkedin"
              type="text"
              placeholder="linkedin link"
              icon={linkedin}
              classes={commonClasses}
              control={control}
              errors={errors}
            />
            <InputFelid
              title="Gmail"
              name="gmail"
              type="text"
              placeholder="gmail link"
              icon={gmail}
              classes={commonClasses}
              control={control}
              errors={errors}
            />
          </div>
          <div className="flex items-center gap-5">
            {isPending && (
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
            <ButtonFelid
              text="Save"
              type="submit"
              classes="rounded-full text-[15px] px-[30px] py-[7px] bg-second-color m-auto md:m-0"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
