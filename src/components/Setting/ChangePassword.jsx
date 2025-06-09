import { useAuth } from "@/Context/AuthContext";
import ButtonFelid from "@/UI/ButtonFelid";
import InputFelid from "@/UI/InputFelid";
import { changesPassword as ChangeCompany } from "@/Util/Https/companyHttp";
import { changesPassword as ChangeFreelancer } from "@/Util/Https/freelancerHttp";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FadeLoader } from "react-spinners";
import { message } from "antd";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 min-w-[350px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const ChangePassword = () => {
  const {
    user: { userId, token, role },
  } = useAuth();
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["password"],
    mutationFn: role === "CompanyMedia" ? ChangeCompany : ChangeFreelancer,
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Change password Successfully");
    },
  });

  const handleChangePassword = () => {
    if (errors.password || errors.currentPassword || errors.confirmPassword) {
      return;
    }
    if (getValues("password") !== getValues("confirmPassword")) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    mutate({
      data: {
        currentPassword: getValues("currentPassword"),
        newPassword: getValues("password"),
        confirmPassword: getValues("confirmPassword"),
      },
      id: userId,
      token,
    });
  };

  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="bg-card-color rounded-[8px] p-[30px]"
      >
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
        <div className="flex items-center w-fit gap-4 m-auto">
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
            classes="m-auto text-[13px] rounded-full px-[30px] py-[7px] bg-second-color"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
