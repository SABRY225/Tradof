import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThreeFreelancer from "./StepThreeFreelancer";

import "../../styles/register.css";
import StepThreeCompany from "./StepThreeCompany";
import { useMutation } from "@tanstack/react-query";
import {
  generateMultipleTranslationExams,
  registerCompanies,
  registerFreelancers,
} from "../../Util/Https/http";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading";
import { message } from "antd";
import {
  StepOneValidator,
  StepThreeCompanyValidator,
  StepThreeFreelancerValidator,
  StepTwoValidator,
} from "@/Util/registerValidate";

// constants
const defaultLanguagePairs = [
  {
    from: {
      id: 1,
      languageName: "Afar",
      languageCode: "aa",
      countryName: "Djibouti",
      countryCode: "DJ",
    },
    to: {
      id: 104,
      languageName: "English",
      languageCode: "en",
      countryName: "Barbados",
      countryCode: "BB",
    },
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
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [languagePair, setLanguagePair] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [preferredLanguage, setPreferredLanguage] = useState([]);
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
      companyName: "",
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
    onSuccess: async () => {
      if (languagePair.length > 0) {
        try {
          const examResponse = await generateMultipleTranslationExams({
            // token: registerResponse.data.token, // Use the token from registration response
            languagePairs: languagePair,
            email: stepTwoData.email.trim(),
          });

          if (examResponse) {
            message.success("Registration successful and exams generated!");
          }
        } catch (examError) {
          control.error(
            "Registration successful but failed to generate exams. Please try generating exams later."
          );
          throw new Error(
            "Registration successful but failed to generate exams. Please try generating exams later."
          );
        }
      }
      navigate("../confirm-email");
    },
    onError: (error) => {
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          message.error(messages[0]);
          setError(field, {
            type: "server",
            message: messages[0], // Show the first error message for each field
          });
        });
      } else {
        message.error(error?.message);
        setError(error.felid || "general", {
          type: "server",
          message: error.message || "Something went wrong. Please try again.",
        });
      }
    },
  });
  const { mutate: registerCompany, isPending: Loading2 } = useMutation({
    mutationFn: registerCompanies,
    onSuccess: () => navigate("../confirm-email"),
    onError: (error) => {
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          message.error(messages[0]);
          setError(field, {
            type: "server",
            message: messages[0], // Show the first error message for each field
          });
        });
      } else {
        message.error(error?.message);
        setError(error.felid || "general", {
          type: "server",
          message: error.message || "Something went wrong. Please try again.",
        });
      }
    },
  });
  const stepTwoData = watch();
  const isStepIncreasing = step > prevStep;

  const nextStep = () => {
    clearErrors();
    if (step == 1) {
      let errors = StepOneValidator({ stepOneData });
      if (errors.length > 0) {
        setStepOneData((prev) => ({
          ...prev,
          errors: errors,
        }));
        return;
      }
    } else {
      let errors = StepTwoValidator({ stepTwoData });
      if (errors.length > 0) {
        errors.forEach((error) => {
          setError(error.felid, { type: "manual", message: error.message });
        });
        return;
      }
    }
    setPrevStep(step);
    setStep((prev) => prev + 1);
  };

  const onSendData = async (e) => {
    e.preventDefault();
    if (stepOneData.accountType === "freelancer") {
      const hasError = StepThreeFreelancerValidator({
        stepThreeData: {
          currentPhoto,
          country: stepTwoData.country,
          specializations,
          languagePair,
        },
      });
      if (hasError !== "") {
        message.error(hasError);
        return;
      }

      try {
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

        // If registration is successful, generate exams for all language pairs
      } catch (error) {
        if (error.errors) {
          Object.entries(error.errors).forEach(([field, messages]) => {
            message.error(messages[0]);
            setError(field, {
              type: "server",
              message: messages[0],
            });
          });
        } else {
          message.error(error?.message);
          setError(error.felid || "general", {
            type: "server",
            message: error.message || "Something went wrong. Please try again.",
          });
        }
      }
    } else {
      const hasError = StepThreeCompanyValidator({
        stepThreeData: {
          currentPhoto,
          companyName: stepTwoData.companyName,
          country: stepTwoData.country,
          location: stepTwoData.location,
          jopTitle: stepTwoData.jopTitle,
          industriesServed,
          preferredLanguage,
        },
      });
      if (hasError !== "") {
        message.error(hasError);
        return;
      }
      const companyData = {
        companyName: stepTwoData.companyName.trim(),
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
        <div className="font-poppins text-[13px]">
          Do you have an account?{" "}
          <Link className="text-[#6C63FF] font-semibold" to="../">
            Sign In
          </Link>
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
            <div
              onClick={() => {
                setPrevStep(step);
                setStep((prev) => prev - 1);
              }}
              className="text-customGray px-4 py-2 rounded cursor-pointer"
            >
              Previous
            </div>
          )}
          {step < 3 ? (
            <div
              onClick={nextStep}
              className="bg-second-color text-white px-4 py-2 rounded cursor-pointer"
            >
              Next
            </div>
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
