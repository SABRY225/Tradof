import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import getLanguages from "@/Util/getLanguage";
import Combobox from "../../components/ui/Combobox";
import ButtonFelid from "@/UI/ButtonFelid";
import PageTitle from "../../UI/PageTitle";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const languages = getLanguages();

export default function CreateProject() {
  const [files, setFiles] = useState([]);
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    clearErrors,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      details: "",
      languagePair: {
        from: "",
        to: "",
      },
      budget: {
        max: "",
        min: "",
      },
      deliveryTime: "", // in days
      attachments: [], // URLs for attachments
    },
  });

  // Watch selected values
  const selectedFrom = watch("languagePair.from");
  const selectedTo = watch("languagePair.to");

  const onSubmit = (data) => {
    console.log(data);
    if (!data.languagePair.from) {
      setError("languagePair.from", {
        type: "manual",
        message: "Source language is required",
      });
    }
    if (!data.languagePair.to) {
      setError("languagePair.to", {
        type: "manual",
        message: "Target language is required",
      });
    }
    if (data.attachments.length === 0) {
      setError("attachments", {
        type: "manual",
        message: "At least one attachment file is required",
      });
    }
    console.log("Project Data:", data);
  };

  const handleBudgetChange = (type, field, value, setValue) => {
    const newValue = Math.max(
      0,
      Number(value) + (type === "increase" ? 1 : -1)
    );
    setValue(field, newValue);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setValue("attachments", [...files, ...selectedFiles]);
    clearErrors("attachments");
  };

  const handleOpenFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <>
      <PageTitle title="Create Project" />
      <div className="container max-w-screen-xl mx-auto p-4 w-full my-[30px]">
        <h1 className="text-[20px] italic border-b-2 border-main-color w-fit pl-5 ml-5">
          Project Information
        </h1>
        <form
          className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Project Title */}
          <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px]">
            <label className="font-medium font-epilogue">Project Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`max-w-[300px] ${commonClasses} ${
                errors.title
                  ? "bg-[#ffe7e7] border-[#FA9EA1] focus:border-[#FA9EA1] focus:ring-[#FA9EA1]"
                  : ""
              }`}
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="text-red-500 text-[12px]">{errors.title.message}</p>
            )}
          </div>

          {/* Project Details */}
          <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px]">
            <label className="font-medium font-epilogue">Project Details</label>
            <textarea
              {...register("details", { required: "Details are required" })}
              className={`max-w-full min-h-[200px] max-h-[300px] ${commonClasses} ${
                errors.title
                  ? "bg-[#ffe7e7] border-[#FA9EA1] focus:border-[#FA9EA1] focus:ring-[#FA9EA1]"
                  : ""
              }`}
              placeholder="Enter project details"
            />
            {errors.details && (
              <p className="text-red-500 text-[12px]">
                {errors.details.message}
              </p>
            )}
          </div>

          {/* Language Pair */}
          <div className="text-[14px]">
            <h1 className="font-medium font-epilogue">Language Pair </h1>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="max-w-[300px] md:w-full">
                {languages && (
                  <Combobox
                    List={languages}
                    initial="From language"
                    value={selectedFrom}
                    onChange={(val) => {
                      setValue("languagePair.from", val);
                      clearErrors("languagePair.from");
                    }}
                  />
                )}
                {errors.languagePair?.from && (
                  <p className="text-red-500 text-sm">
                    {errors.languagePair.from.message}
                  </p>
                )}
              </div>
              <div className="max-w-[300px] md:w-full">
                {languages && (
                  <Combobox
                    List={languages}
                    initial="To language"
                    value={selectedTo}
                    onChange={(val) => {
                      setValue("languagePair.to", val);
                      clearErrors("languagePair.to");
                    }}
                  />
                )}
                {errors.languagePair?.to && (
                  <p className="text-red-500 text-sm">
                    {errors.languagePair.to.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="text-[14px] w-full">
            <h1 className="font-medium font-epilogue">Budget</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col font-epilogue max-w-[300px] text-[14px] text-left">
                <div className="relative w-full">
                  <input
                    type="number"
                    {...register("budget.min", {
                      required: "Required",
                      min: 0,
                    })}
                    className={`w-full pr-10 ${commonClasses} ${
                      errors.budget?.min ? "bg-[#ffe7e7] border-[#FA9EA1]" : ""
                    }`}
                    placeholder="Min budget ($)"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleBudgetChange(
                        "decrease",
                        "budget.min",
                        watch("budget.min"),
                        setValue
                      )
                    }
                    className="outlet-none absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleBudgetChange(
                        "increase",
                        "budget.min",
                        watch("budget.min"),
                        setValue
                      )
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {errors.budget?.min && (
                  <p className="text-red-500 text-sm">
                    {errors.budget.min.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col font-epilogue max-w-[300px] text-[14px] text-left">
                <div className="relative w-full">
                  <input
                    type="number"
                    {...register("budget.max", {
                      required: "Required",
                      min: 0,
                    })}
                    className={`w-full pr-10 ${commonClasses} ${
                      errors.budget?.max ? "bg-[#ffe7e7] border-[#FA9EA1]" : ""
                    }`}
                    placeholder="Max budget ($)"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleBudgetChange(
                        "decrease",
                        "budget.max",
                        watch("budget.max"),
                        setValue
                      )
                    }
                    className="outlet-none absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleBudgetChange(
                        "increase",
                        "budget.max",
                        watch("budget.max"),
                        setValue
                      )
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {errors.budget?.max && (
                  <p className="text-red-500 text-sm">
                    {errors.budget.max.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px] max-w-[300px]">
            <label className="font-medium font-epilogue">
              Delivery Time (Days)
            </label>
            <div className="relative w-full">
              <input
                type="number"
                {...register("deliveryTime", {
                  required: "Required",
                  min: 0,
                })}
                className={`w-full pr-10 ${commonClasses} ${
                  errors.deliveryTime ? "bg-[#ffe7e7] border-[#FA9EA1]" : ""
                }`}
                placeholder="Days"
              />
              <button
                type="button"
                onClick={() =>
                  handleBudgetChange(
                    "decrease",
                    "deliveryTime",
                    watch("deliveryTime"),
                    setValue
                  )
                }
                className="outlet-none absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleBudgetChange(
                    "increase",
                    "deliveryTime",
                    watch("deliveryTime"),
                    setValue
                  )
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {errors.deliveryTime && (
              <p className="text-red-500 text-sm">
                {errors.deliveryTime.message}
              </p>
            )}
          </div>

          {/* Attachments */}
          <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px] max-w-[500px]">
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="font-medium font-epilogue flex items-center w-full cursor-pointer mb-2"
            >
              Attachments Files
              <Plus className="w-10 h-10 ml-auto bg-[#9BA6FA] p-2 rounded-full" />
            </label>
            <div className="max-h-[300px] overflow-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between my-1 py-2 px-3 border rounded-[5px] bg-gray-100"
                >
                  <button
                    type="button"
                    onClick={() => handleOpenFile(file)}
                    className="text-sm text-blue-500 underline truncate max-w-[80%] text-left"
                  >
                    {file.name}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFiles(files.filter((_, i) => i !== index))
                    }
                    className="text-red-500 text-sm"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
            {errors.attachments && (
              <p className="text-red-500 text-sm">
                {errors.attachments.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <ButtonFelid
            type="submit"
            classes="bg-second-color py-[10px] px-[50px] font-roboto-condensed text-[16px] text-medium m-auto"
            text="Create Project"
            // onClick={onSubmit}
          />
        </form>
      </div>
    </>
  );
}
