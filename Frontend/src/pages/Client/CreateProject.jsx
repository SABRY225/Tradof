import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import Combobox from "../../components/ui/Combobox";
import ButtonFelid from "@/UI/ButtonFelid";
import PageTitle from "../../UI/PageTitle";
import { getAllLanguages, getAllSpecializations } from "@/Util/Https/http";
import { createProject } from "@/Util/Https/companyHttp";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

export default function CreateProject() {
  const {
    user: { userId, token },
  } = useAuth();
  const [handleLanguage, setHandleLanguage] = useState([]);
  const {
    data: languages,
    isError: isErrorLanguages,
    error: errorLanguages,
    isLoading: isLoadingLanguages,
  } = useQuery({
    queryKey: ["Languages"],
    queryFn: getAllLanguages,
    staleTime: 10000,
  });
  const { data: specializations } = useQuery({
    queryKey: ["specializations"],
    queryFn: getAllSpecializations,
  });

  const {
    mutate: create,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["CreateProject"],
    mutationFn: createProject,
    onError: (error) => {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
    onSuccess: () => {
      toast.success("Create Project Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

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
      specializationId: null,
    },
  });

  useEffect(() => {
    if (languages) {
      let editing = languages.map((lang) => ({
        id: lang.id,
        name: `${lang.languageName}(${lang.countryName}) / ${lang.languageCode}(${lang.countryCode})`,
      }));
      setHandleLanguage(editing);
    }
  }, [languages]);

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
      return null;

    }
    if (!data.languagePair.to) {
      setError("languagePair.to", {
        type: "manual",
        message: "Target language is required",
      });
      return null;
    }
    if (data.attachments.length === 0) {
      setError("attachments", {
        type: "manual",
        message: "At least one attachment file is required",
      });
      return null;
    }
    console.log(+data.budget.min , +data.budget.max);
    if (+data.budget.min > +data.budget.max) {
      setError("budget.min", {
        type: "manual",
        message: "Minimum budget must be less than or equal maximum budget",
      });
      setError("budget.max", {
        type: "manual",
        message: "Maximum budget must be greater than or equal minimum budget",
      });
      return null;
    }
    if (data.specializationId === null) {
      setError("specializationId", {
        type: "manual",
        message: "specialization is required",
      });
      return null;
    }
    const submitData = new FormData();

    submitData.append("name", data.title);
    submitData.append("description", data.details);
    submitData.append("languageFromId", data.languagePair.from);
    submitData.append("languageToId", data.languagePair.to);
    submitData.append("minPrice", data.budget.min);
    submitData.append("maxPrice", data.budget.max);
    submitData.append("days", data.deliveryTime);
    submitData.append("specializationId", data.specializationId);

    // Append each file individually
    if (data.attachments?.length) {
      data.attachments.forEach((file) => {
        submitData.append("files", file); // or "files[]" if the backend expects an array
      });
    }

    // Send the request
    create({ data: submitData, id: userId, token });
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
    console.log("Files:", [...files, ...selectedFiles]);
    setValue("attachments", [...files, ...selectedFiles]);
    clearErrors("attachments");
  };

  const handleOpenFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <div className="bg-background-color">
      <PageTitle title="Create Project" />
      <div className="container max-w-screen-xl mx-auto p-4 w-full mt-[30px]">
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
                {handleLanguage && (
                  <Combobox
                    List={handleLanguage}
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
                {handleLanguage && (
                  <Combobox
                    List={handleLanguage}
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
          <div className="grid md:grid-cols-2 gap-4 items-center">
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
            <div className="max-w-[300px]">
              {specializations && (
                <Combobox
                  List={specializations}
                  initial="Select Specialization"
                  value={watch("specializationId")}
                  onChange={(val) => {
                    setValue("specializationId", val);
                    clearErrors("specializationId");
                  }}
                />
              )}
              {errors.specializationId && (
                <p className="text-red-500 text-sm">
                  {errors.specializationId.message}
                </p>
              )}
            </div>
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
                    onClick={() => {
                      setFiles(files.filter((_, i) => i !== index));
                      setValue(
                        "attachments",
                        files.filter((_, i) => i !== index)
                      );
                      clearErrors("attachments");
                    }}
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
          <div className="flex w-fit m-auto items-center gap-5 justify-center">
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
              type="submit"
              classes="bg-second-color py-[10px] px-[50px] font-roboto-condensed text-[16px] text-medium m-auto"
              text="Create Project"
              // onClick={onSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export const basicDataLoader = async () => {
  try {
    const languages = await getAllLanguages();
    const specializations = await getAllSpecializations();
    return { languages, specializations };
  } catch (error) {
    console.error("Failed to fetch languages and specializations:", error);
    throw new Response("Failed to load languages and specializations", {
      status: 500,
    });
  }
};
