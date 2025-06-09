import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import EmployeeTable from "./EmployeeTable";
import ButtonFelid from "@/UI/ButtonFelid";
import InputFelid from "@/UI/InputFelid";
import { getAllCountries, queryClient } from "@/Util/Https/http";
import Combobox from "../ui/Combobox";
import { upperarrow } from "../../assets/paths";
import { useAuth } from "@/Context/AuthContext";
import { addEmployeeToCompany } from "@/Util/Https/companyHttp";
import { message } from "antd";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const permissions = [
  { id: "Adminstrator", name: "Admin starter" },
  // { id: "SeniorProject", name: "Senior Project" },
  // { id: "SeniorProjectManager", name: "Senior Project Manager" },
  { id: "FinanceManager", name: "Finance Manager" },
  { id: "ProjectManager", name: "Project Manager" },
];

export default function CompanyEmployees({ employees }) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    user: { userId, token },
  } = useAuth();
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["addEmployee"],
    mutationFn: addEmployeeToCompany,
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Add Employee Successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
  const { data: countries } = useQuery({
    queryKey: ["counters"],
    queryFn: getAllCountries,
  });
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      jopTitle: "",
      email: "",
      password: "",
      phone: "",
      country: "",
      permissions: "",
    },
  });
  const fromData = watch();
  const addEmployees = () => {
    if (!fromData.country) {
      setError("country", { message: "Country is required" });
      return;
    }
    if (!fromData.permissions) {
      setError("permissions", { message: "Permissions is required" });
      return;
    }
    const data = {
      firstName: fromData.firstName,
      lastName: fromData.lastName,
      jobTitle: fromData.jopTitle,
      email: fromData.email,
      password: fromData.password,
      phoneNumber: fromData.phone,
      countryId: fromData.country,
      groupName: fromData.permissions,
      companyId: userId,
    };

    mutate({ data, token });
  };

  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Company Employees
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] p-[30px]">
        <button
          type="button"
          className="flex justify-between px-4 py-2 rounded-md border-b-[2px] border-[#CBC9C9] w-full"
          onClick={() => setIsVisible(!isVisible)}
        >
          Add employee in company
          <motion.img
            layout
            animate={{ rotate: isVisible ? 180 : 0 }} // Animate rotation
            transition={{ duration: 0.3 }} // Smooth transition
            src={upperarrow}
            alt="icon"
          />
        </button>
        <AnimatePresence>
          {isVisible && (
            <motion.form
              onSubmit={handleSubmit(addEmployees)}
              initial={{ opacity: 0, y: -20 }} // Start hidden
              animate={{ opacity: 1, y: 0 }} // Animate to visible
              exit={{ opacity: 0, y: -20 }} // Smoothly hide when toggled off
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between font-epilogue"
            >
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-24 gap-y-5">
                <InputFelid
                  title="First Name"
                  name="firstName"
                  type="text"
                  requires="First name is required"
                  placeholder="enter employee first name"
                  classes={commonClasses}
                  control={control}
                  errors={errors}
                />
                <InputFelid
                  title="Last Name"
                  name="lastName"
                  type="text"
                  requires="Last name is required"
                  placeholder="enter employee last name"
                  classes={commonClasses}
                  control={control}
                  errors={errors}
                />
                <InputFelid
                  title="Jop title"
                  name="jopTitle"
                  type="text"
                  requires="Jop title is required"
                  placeholder="enter employee jop title"
                  classes={commonClasses}
                  control={control}
                  errors={errors}
                />
                <InputFelid
                  title="Email address"
                  name="email"
                  type="text"
                  requires="Email is required"
                  placeholder="enter employee email"
                  classes={commonClasses}
                  control={control}
                  errors={errors}
                />
                <InputFelid
                  title="Password"
                  name="password"
                  type="password"
                  requires="Password is required"
                  placeholder="enter employee password"
                  classes={commonClasses}
                  control={control}
                  errors={errors}
                />
                <InputFelid
                  title="Phone Number"
                  name="phone"
                  type="phone"
                  requires="Phone number is required"
                  placeholder="enter employee phone number"
                  classes={commonClasses}
                  control={control}
                  errors={errors}
                />
                <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px]">
                  <label className="font-medium">Country</label>
                  {countries && (
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
                  )}
                  {errors.country && (
                    <p className="text-red-500 text-[12px]">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px]">
                  <label className="font-medium">Permissions</label>
                  <Combobox
                    List={permissions}
                    initial="Accesses"
                    value={watch("permissions")}
                    onChange={(val) => {
                      setValue("permissions", val);
                      clearErrors("permissions");
                    }}
                  />
                  {errors.permissions && (
                    <p className="text-red-500 text-[12px]">
                      {errors.permissions.message}
                    </p>
                  )}
                </div>
              </div>
              <ButtonFelid
                text="Add"
                type="submit"
                classes="m-auto text-[13px] px-[30px] py-[7px] bg-second-color rounded-full"
                // onClick={() => alert("click")}
              />
            </motion.form>
          )}
        </AnimatePresence>
        <EmployeeTable employees={employees} />
      </div>
    </div>
  );
}
