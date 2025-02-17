import { camera, person } from "../../assets/paths.js";
import ButtonFelid from "@/UI/ButtonFelid";
import { Controller, useForm } from "react-hook-form";
import InputFelid from "@/UI/InputFelid";
import Combobox from "../ui/Combobox";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "@/Util/http";

const commonClasses =
  "min-w-[300px] text-[16px] outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

export default function EditProfile({ profileData }) {
  const { data: countries } = useQuery({
    queryKey: ["counters"],
    queryFn: getAllCountries,
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: profileData.image,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      location: profileData.location,
      country: profileData.country,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // Create a preview URL
      setImageURL(url);
    }
  };

  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Edit Profile
      </h1>
      <form className="flex flex-col bg-card-color rounded-[8px] p-[30px]">
        <div className="flex flex-col-reverse md:flex-row gap-5 justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[50px]">
            <InputFelid
              title="First name"
              name="firstName"
              requires={["first name cannot be empty"]}
              type="text"
              classes={commonClasses}
              control={control}
              errors={errors}
            />
            <InputFelid
              title="Last name"
              name="lastName"
              requires={["last name cannot be empty"]}
              type="text"
              classes={commonClasses}
              control={control}
              errors={errors}
            />
            <InputFelid
              title="Email address"
              name="email"
              requires={["email cannot be empty"]}
              type="text"
              classes={commonClasses}
              control={control}
              errors={errors}
            />
            <InputFelid
              title="Phone number"
              name="phone"
              requires={["phone cannot be empty"]}
              type="phone"
              classes={commonClasses}
              control={control}
              errors={errors}
            />
            <InputFelid
              title="Location"
              name="location"
              requires={["location cannot be empty"]}
              type="text"
              classes={commonClasses}
              control={control}
              errors={errors}
            />
            {countries && (
              <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px]">
                <label className="font-medium">Country</label>
                <Combobox
                  List={countries}
                  initial="Country"
                  value={watch("country")}
                  onChange={(val) => {
                    console.log(val);
                    setValue("country", val);
                    clearErrors("country");
                  }}
                />
              </div>
            )}
          </div>
          <div className="relative rounded-full w-fit m-auto md:m-0">
            <div className="relative">
              <img
                src={camera}
                alt="camera icon"
                className="absolute w-8 bottom-2 right-2 bg-white rounded-full p-1 shadow"
              />
              <img
                src={watch("image")}
                width={140}
                alt="Profile"
                className="border-4 border-white object-cover h-[140px] rounded-full shadow-md"
              />
            </div>
            <Controller
              name="image"
              control={control}
              rules={{ required: "Photo required" }}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    console.log(file);
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setValue("image", imageUrl); // Store file in react-hook-form
                    }
                  }}
                />
              )}
            />
          </div>
        </div>
        <ButtonFelid
          text="Save"
          type="submit"
          classes="text-[12px] px-[30px] py-[7px] bg-second-color rounded-full m-auto"
          onClick={() => alert("click")}
        />
      </form>
    </div>
  );
}
