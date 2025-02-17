import React from "react";
import ButtonFelid from "@/UI/ButtonFelid";
import { useForm } from "react-hook-form";
import InputFelid from "@/UI/InputFelid";
import { facebook, linkedin, gmail } from "../../assets/paths.js";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-[250px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";
export default function SocialMedia({ socialMedia }) {
  const {
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      facebook: socialMedia.facebook,
      linkedin: socialMedia.linkedin,
      gmail: socialMedia.gmail,
    },
  });
  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Social Media
      </h1>
      <form className="space-y-[20px] bg-card-color rounded-[8px] p-[30px]">
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
          <ButtonFelid
            text="Save"
            type="submit"
            classes="rounded-full text-[15px] px-[30px] py-[7px] bg-second-color m-auto md:m-0"
            onClick={() => alert("click")}
          />
        </div>
      </form>
    </div>
  );
}
