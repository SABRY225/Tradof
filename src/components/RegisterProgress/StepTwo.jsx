import InputFelid from "../../UI/InputFelid";

export default function StepTwo({ control, errors }) {
  const inputFields = [
    {
      title: "First Name",
      name: "firstName",
      type: "text",
      requires: ["First name is required"],
      placeholder: "enter first name",
    },
    {
      title: "Last Name",
      name: "lastName",
      type: "text",
      requires: ["Last name is required"],
      placeholder: "enter last name",
    },
    {
      title: "Phone Number",
      name: "phoneNumber",
      type: "phone",
      requires: ["Phone number is required"],
      placeholder: "(+20) 1030 666 109",
    },
    {
      title: "Email Address",
      name: "email",
      type: "text",
      requires: ["Email Address is required"],
      placeholder: "example@gmail.com",
    },
    {
      title: "Password",
      name: "password",
      type: "password",
      requires: ["password is required"],
      
    },
    {
      title: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      requires: ["Password must match is required"],
    },
  ];

  const commonClasses =
    "outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

  return (
    <div>
      {inputFields.map((field, index) => (
        <InputFelid
          key={index}
          {...field}
          control={control}
          errors={errors}
          classes={commonClasses}
        />
      ))}
    </div>
  );
}
