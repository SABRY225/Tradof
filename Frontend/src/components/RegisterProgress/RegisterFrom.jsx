import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThreeFreelancer from "./StepThreeFreelancer";

import "../../styles/register.css";
import StepThreeCompany from "./StepThreeCompany";
import { useMutation } from "@tanstack/react-query";
import { registerCompanies, registerFreelancers } from "../../Util/http";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading";

// constants
const defaultLanguagePairs = [
  {
    from: { id: 2, name: "English", code: "en" },
    to: { id: 5, name: "French", code: "fr" },
  },
];

export default function RegisterFrom() {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(0); // Store the previous step
  const [stepOneData, setStepOneData] = useState({
    accountType: null,
    acceptPolicy: false,
    errors: [],
  });
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [languagePair, setLanguagePair] = useState(defaultLanguagePairs);
  const [specializations, setSpecializations] = useState([]);
  const [preferredLanguage, setPreferredLanguage] = useState([
    { id: 2, name: "English", code: "en" },
  ]);
  const [industriesServed, setIndustriesServed] = useState([]);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      jopTitle: "",
      location: "",
    },
  });
  const { mutate: registerFreelancer, isPending: Loading1 } = useMutation({
    mutationFn: registerFreelancers,
    onSuccess: () => navigate("/confirm-email"),
    onError: (error) => {
      console.error("Mutation Error:", error);
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0], // Show the first error message for each field
          });
        });
      } else {
        setError("general", {
          type: "server",
          message: error.message || "Something went wrong. Please try again.",
        });
      }
    },
  });
  const { mutate: registerCompany, isPending: Loading2 } = useMutation({
    mutationFn: registerCompanies,
    onSuccess: () => navigate("/confirm-email"),
    onError: (error) => {
      console.error("Mutation Error:", error);
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages[0], // Show the first error message for each field
          });
        });
      } else {
        setError("general", {
          type: "server",
          message: error.message || "Something went wrong. Please try again.",
        });
      }
    },
  });
  const stepTwoData = watch();
  const isStepIncreasing = step > prevStep;

  const nextStep = () => {
    if (step == 1) {
      if (stepOneData.accountType === null) {
        setStepOneData((prev) => ({
          ...prev,
          errors: ["Must Choose account type"],
        }));
        return;
      }
      if (stepOneData.acceptPolicy === false) {
        setStepOneData((prev) => ({
          ...prev,
          errors: ["You must accept policy"],
        }));
        return;
      }
    } else {
      let hasError = false;
      if (!stepTwoData.firstName.trim()) {
        setError("firstName", {
          type: "manual",
          message: "First name is required.",
        });
        hasError = true;
      } else clearErrors("firstName");

      if (!stepTwoData.lastName.trim()) {
        setError("lastName", {
          type: "manual",
          message: "Last name is required.",
        });
        hasError = true;
      } else clearErrors("lastName");

      const phoneRegex = /^\+?[1-9]\d{6,14}$/;
      if (!stepTwoData.phoneNumber.trim()) {
        setError("phoneNumber", {
          type: "manual",
          message: "Phone number is required.",
        });
        hasError = true;
      } else if (!phoneRegex.test(stepTwoData.phoneNumber)) {
        setError("phoneNumber", {
          type: "manual",
          message: "Phone number must be 10-15 digits.",
        });
        hasError = true;
      } else clearErrors("phoneNumber");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!stepTwoData.email.trim()) {
        setError("email", { type: "manual", message: "Email is required." });
        hasError = true;
      } else if (!emailRegex.test(stepTwoData.email)) {
        setError("email", { type: "manual", message: "Invalid email format." });
        hasError = true;
      } else clearErrors("email");

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      if (!stepTwoData.password.trim()) {
        setError("password", {
          type: "manual",
          message: "Password is required.",
        });
        hasError = true;
      } else if (stepTwoData.password.length < 6) {
        setError("password", {
          type: "manual",
          message: "Password must be at least 6 characters long.",
        });
        hasError = true;
      } else if (!passwordRegex.test(stepTwoData.password)) {
        setError("password", {
          type: "manual",
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
        hasError = true;
      } else {
        clearErrors("password");
      }

      if (!stepTwoData.confirmPassword.trim()) {
        setError("confirmPassword", {
          type: "manual",
          message: "Please confirm your password.",
        });
        hasError = true;
      } else if (stepTwoData.password !== stepTwoData.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match.",
        });
        hasError = true;
      } else clearErrors("confirmPassword");

      if (hasError) return;
    }
    setPrevStep(step);
    setStep((prev) => prev + 1);
  };
  const onSendData = (e) => {
    e.preventDefault();
    if (stepOneData.accountType === "freelancer") {
      const freelancerData = {
        email: stepTwoData.email.trim(),
        password: stepTwoData.password.trim(),
        firstName: stepTwoData.firstName.trim(),
        lastName: stepTwoData.lastName.trim(),
        countryId: +stepTwoData.country,
        phoneNumber: stepTwoData.phoneNumber.trim(),
        specializationIds: specializations.map(
          (specialization) => specialization.id
        ),
        languagePairs: languagePair.map((lang) => ({
          languageFromId: lang.from.id,
          languageToId: lang.to.id,
        })),
        profileImageUrl: currentPhoto.trim(),
      };
      registerFreelancer({ data: freelancerData });
    } else {
      const companyData = {
        email: stepTwoData.email.trim(),
        password: stepTwoData.password.trim(),
        firstName: stepTwoData.firstName.trim(),
        lastName: stepTwoData.lastName.trim(),
        companyAddress: stepTwoData.location.trim(),
        jobTitle: stepTwoData.jopTitle.trim(),
        countryId: +stepTwoData.country,
        phoneNumber: stepTwoData.phoneNumber.trim(),
        specializationIds: industriesServed.map((industries) => industries.id),
        preferredLanguageIds: preferredLanguage.map((lang) => lang.id),
        profileImageUrl: currentPhoto.trim(),
      };
      registerCompany({ data: companyData });
    }
  };

  const renderStep = () => {
    if (step === 1) return <StepOne data={stepOneData} edit={setStepOneData} />;
    if (step === 2) return <StepTwo control={control} errors={errors} />;
    if (step === 3) {
      if (stepOneData.accountType === "freelancer")
        return (
          <StepThreeFreelancer
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
            currentLanguagePairs={languagePair}
            setCurrentLanguagePairs={setLanguagePair}
            currentSpecializations={specializations}
            setCurrentSpecializations={setSpecializations}
            control={control}
            errors={errors}
          />
        );
      else
        return (
          <StepThreeCompany
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
            currentPreferredLanguage={preferredLanguage}
            setCurrentPreferredLanguage={setPreferredLanguage}
            currentIndustriesServed={industriesServed}
            setCurrentIndustriesServed={setIndustriesServed}
            control={control}
            errors={errors}
          />
        );
    }
  };

  console.log(Loading1);
  if (Loading1 || Loading2) return <Loading />;

  return (
    <div
      className="flex gap-5 flex-col bg-[#fff] max-w-lg mx-auto p-10 rounded text-center font-roboto-condensed"
      style={{ margin: "min(2rem, 10%)" }}
    >
      <div className="title flex gap-4 flex-col">
        <h1 className="font-bold text-3xl">Registration Form</h1>
        <div className="text-customGray font-poppins">
          Please fill out this form with the required information
        </div>
      </div>

      <form className="flex flex-col gap-5 mt-2" onSubmit={onSendData}>
        <ul className="steps-progress flex w-full justify-around font-poppins">
          <p className="line z-[0]"></p>
          <motion.p
            className="line z-[0] bg-[#FF6F61]"
            initial={{
              width: 0,
              left: isStepIncreasing
                ? `${[0, 15, 50][step - 1]}%`
                : `${[50, 85, 50][step - 1]}%`,
            }}
            key={step}
            animate={{
              width: [
                `0%`,
                `${[5, 15, 15][step - 1]}%`,
                `${[10, 33, 33][step - 1]}%`,
                `${[5, 15, 15][step - 1]}%`,
                `0%`,
              ],
              left: isStepIncreasing
                ? [
                    `${[0, 15, 50][step - 1]}%`,
                    `${[7, 17, 55][step - 1]}%`,
                    `${[15, 50, 85, 100][step - 1]}%`,
                  ]
                : [
                    `${[50, 85, 50][step - 1]}%`,
                    `${[17, 55, 55][step - 1]}%`,
                    `${[15, 50, 85, 100][step - 1]}%`,
                  ],
            }}
            transition={{ duration: 1, type: "keyframes" }}
            style={{ height: "2px", backgroundColor: "#FF6F61" }}
          />
          {[1, 2, 3].map((item) => (
            <li
              key={item}
              className="flex flex-col items-center text-center z-[1]"
            >
              <motion.div
                key={step} // Trigger animation on step change
                initial={{
                  borderColor: "#D4D4D8",
                  backgroundColor: "#fff",
                  color: "#000",
                }} // Initial state (non-active step)
                animate={{
                  borderColor: step === item ? "#FF6F61" : "#D4D4D8", // Apply the active step color
                  backgroundColor: step === item ? "#FF6F61" : "#fff", // Apply active step background
                  color: step === item ? "#fff" : "#000", // Change text color based on active step
                }}
                transition={{
                  duration: 0.5, // Transition time for the color change
                  delay: 0.5, // Delay the animation by 1 second
                }}
                className="step border rounded-full w-7 h-7 flex items-center justify-center mb-2"
                // style={stepStyles(item)}
              >
                {item}
              </motion.div>
              <div
                className="sub-title text-customGray text-sm max-w-[6rem]"
                style={{ color: step === item ? "#000" : "#C8C8D0" }}
              >
                {item === 1 && "Account Type"}
                {item === 2 && "Personal Information"}
                {item === 3 && "Profile Data"}
              </div>
            </li>
          ))}
        </ul>

        {renderStep()}

        <div className="mt-4 flex justify-end gap-5 font-poppins text-[14px]">
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                setPrevStep(step);
                setStep((prev) => prev - 1);
              }}
              className="text-customGray px-4 py-2 rounded"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-second-color text-white px-4 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-second-color text-white px-4 py-2 rounded"
              // onClick={onSendData}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
