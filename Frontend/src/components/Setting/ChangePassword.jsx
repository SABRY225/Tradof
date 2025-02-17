import ButtonFelid from "@/UI/ButtonFelid";
import InputFelid from "@/UI/InputFelid";
import { useForm } from "react-hook-form";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 min-w-[350px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Change Password
      </h1>
      <div className="bg-card-color rounded-[8px] p-[30px]">
        <div className="flex justify-center md:justify-between flex-wrap">
          <InputFelid
            title="Current password"
            name="currentPassword"
            type="password"
            placeholder="enter current password"
            classes={commonClasses}
            control={control}
            errors={errors}
          />
          <InputFelid
            title="New password"
            name="password"
            type="password"
            placeholder="enter new password"
            classes={commonClasses}
            control={control}
            errors={errors}
          />
          <InputFelid
            title="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            classes={commonClasses}
            control={control}
            errors={errors}
          />
        </div>
        <ButtonFelid
          text="Save"
          type="submit"
          classes="m-auto text-[13px] rounded-full px-[30px] py-[7px] bg-second-color"
          onClick={() => alert("click")}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
