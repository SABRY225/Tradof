import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import ButtonFelid from "@/UI/ButtonFelid";
import { useAuth } from "@/context/AuthContext";
import { message } from "antd";
import { FadeLoader } from "react-spinners";
import { AddOffer } from "@/Util/Https/freelancerHttp";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { OfferStatus } from "@/Util/status";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

export default function FormAddOffer() {
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const proposalData = location.state?.proposal;
  const {
    user: { token },
  } = useAuth();
  const { projectId } = useParams();
  const isFormDisabled = proposalData?.proposalStatus !== (null || undefined);

  console.log(proposalData, isFormDisabled);
  const { mutate: HandleOffer, isPending } = useMutation({
    mutationKey: ["AddOffer"],
    mutationFn: proposalData ? null : AddOffer,
    onMutate: () => {
      messageApi.loading({
        content: "Sending offer...",
        key: "createOffer",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      messageApi.success({
        content: proposalData
          ? "Edit Offer Successfully"
          : "Create Offer Successfully",
        key: "createOffer",
        duration: 2.5,
      });
      if (!proposalData) navigate("/user/offers");
    },
    onError: (error) => {
      messageApi.error({
        content: error?.message || "Error creating offer",
        key: "createOffer",
      });
    },
  });

  const [files, setFiles] = useState([]);
  const {
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: proposalData?.description || "",
      offerPrice: proposalData?.budget || "",
      Days: proposalData?.deadline || "",
      attachments: [],
    },
  });

  // Set initial values when proposalData is available
  useEffect(() => {
    if (proposalData) {
      setValue("details", proposalData.description);
      setValue("offerPrice", proposalData.budget);
      setValue("Days", proposalData.deadline);

      // Handle attachments if they exist
      if (proposalData.attachments?.length > 0) {
        // Convert attachment URLs to File objects
        Promise.all(
          proposalData.attachments.map(async (attachment) => {
            try {
              const response = await fetch(attachment.attachmentUrl);
              const blob = await response.blob();
              return new File(
                [blob],
                attachment.attachmentUrl.split("/").pop(),
                { type: blob.type }
              );
            } catch (error) {
              console.error("Error loading attachment:", error);
              return null;
            }
          })
        ).then((fileObjects) => {
          const validFiles = fileObjects.filter((file) => file !== null);
          setFiles(validFiles);
          setValue("attachments", validFiles);
        });
      }
    }
  }, [proposalData, setValue]);

  const onSubmit = (data) => {
    if (!data.details) {
      setError("details", {
        type: "manual",
        message: "Proposal Description is required",
      });
    }
    if (!data.offerPrice) {
      setError("offerPrice", {
        type: "manual",
        message: "Offer Price is required",
      });
    }
    if (!data.Days) {
      setError("Days", {
        type: "manual",
        message: "Days is required",
      });
    }

    const submitData = new FormData();
    submitData.append("projectId", projectId);
    submitData.append("proposalDescription", data.details);
    submitData.append("Days", data.Days);
    submitData.append("offerPrice", data.offerPrice);

    if (proposalData) {
      submitData.append("id", proposalData.id);
    }

    if (data.attachments?.length) {
      data.attachments.forEach((file) => {
        submitData.append("proposalAttachments", file);
      });
    }
    HandleOffer({ data: submitData, token });
  };

  const handleBudgetChange = (type, field, value) => {
    const newValue = Math.max(
      0,
      Number(value) + (type === "increase" ? 1 : -1)
    );
    setSendRequest(true);
    setValue(field, newValue);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...selectedFiles];
      setValue("attachments", newFiles);
      return newFiles;
    });
    clearErrors("attachments");
  };

  // Add new function to handle direct input changes
  const handleDirectInputChange = (field, value) => {
    setValue(field, value);
  };

  const handleOpenFile = (file) => {
    if (file instanceof File) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } else if (file.attachmentUrl) {
      window.open(file.attachmentUrl, "_blank");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="container max-w-screen-xl mx-auto w-full">
        <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
          {proposalData ? "Edit Offer" : "Add an Offer now"}
        </h1>
        <form
          className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Budget */}
          <div className="text-[14px] w-full">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col font-epilogue max-w-[300px] text-[14px] text-left">
                <label className="font-medium font-epilogue">Offer price</label>
                <div className="relative w-full">
                  <input
                    type="number"
                    {...register("offerPrice", {
                      required: "Required",
                      min: 0,
                      onChange: (e) =>
                        handleDirectInputChange("offerPrice", e.target.value),
                    })}
                    className={`w-full pr-10 ${commonClasses} ${
                      errors.offerPrice ? "bg-[#ffe7e7] border-[#FA9EA1]" : ""
                    } ${
                      isFormDisabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder="25 (EGP)"
                    disabled={isFormDisabled}
                  />
                  {!isFormDisabled && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleBudgetChange(
                            "decrease",
                            "offerPrice",
                            watch("offerPrice")
                          )
                        }
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleBudgetChange(
                            "increase",
                            "offerPrice",
                            watch("offerPrice")
                          )
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                {errors.offerPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.offerPrice.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col font-epilogue text-[14px] text-left max-w-[300px]">
                <label className="font-medium font-epilogue">
                  Delivery Time (Days)
                </label>
                <div className="relative w-full">
                  <input
                    type="number"
                    {...register("Days", {
                      required: "Required",
                      min: 1,
                      onChange: (e) =>
                        handleDirectInputChange("Days", e.target.value),
                    })}
                    className={`w-full pr-10 ${commonClasses} ${
                      errors.Days ? "bg-[#ffe7e7] border-[#FA9EA1]" : ""
                    } ${
                      isFormDisabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder="Days"
                    disabled={isFormDisabled}
                  />
                  {!isFormDisabled && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleBudgetChange("decrease", "Days", watch("Days"))
                        }
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleBudgetChange("increase", "Days", watch("Days"))
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px]">
            <label className="font-medium font-epilogue">Offer details</label>
            <textarea
              {...register("details", { required: "Details are required" })}
              className={`max-w-full min-h-[200px] max-h-[300px] ${commonClasses} ${
                isFormDisabled ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              placeholder="Write details of your offer"
              disabled={isFormDisabled}
            />
          </div>

          {/* Attachments */}
          <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px] max-w-[500px]">
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              disabled={isFormDisabled}
            />
            <label
              htmlFor="file-upload"
              className={`font-medium font-epilogue flex items-center w-full cursor-pointer mb-2 ${
                isFormDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Attachments Files
              {!isFormDisabled && (
                <Plus className="w-10 h-10 ml-auto bg-[#9BA6FA] p-2 rounded-full" />
              )}
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
                    {file.name || file.attachmentUrl?.split("/").pop()}
                  </button>
                  {!isFormDisabled && (
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
                  )}
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
            {!isFormDisabled && (
              <ButtonFelid
                type="submit"
                classes="bg-second-color py-[10px] px-[50px] font-roboto-condensed text-[16px] text-medium m-auto"
                text={proposalData ? "Edit Offer" : "Add Offer"}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
