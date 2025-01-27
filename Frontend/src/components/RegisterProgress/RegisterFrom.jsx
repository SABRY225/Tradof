import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThreeFreelancer from "./StepThreeFreelancer";

import "../../styles/register.css";
import StepThreeCompany from "./StepThreeCompany";

// constants
const defaultLanguagePairs = [
  { from: "fr-FR", to: "en-US" },
  { from: "en-US", to: "sp-ES" },
];

export default function RegisterFrom() {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(0); // Store the previous step

  const [accountType, setAccountType] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [languagePair, setLanguagePair] = useState(defaultLanguagePairs);
  const [specializations, setSpecializations] = useState([
    "Medical",
    "Engineering",
  ]);
  const [preferredLanguage, setPreferredLanguage] =
    useState(defaultLanguagePairs);
  const [industriesServed, setIndustriesServed] = useState([
    "Medical",
    "Engineering",
  ]);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      username: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      specializations: "",
      jopTitle: "",
      location: "u",
    },
  });
  const formData = watch();
  const isStepIncreasing = step > prevStep;

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Registration Complete!");
  };

  const renderStep = () => {
    if (step === 1) return <StepOne Type={setAccountType} />;
    if (step === 2) return <StepTwo control={control} errors={errors} />;
    if (step === 3) {
      if (accountType === "freelancer")
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-2"
      >
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
              onClick={() => {
                setPrevStep(step);
                setStep((prev) => prev + 1);
              }}
              className="bg-second-color text-white px-4 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-second-color text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
