import { useAuth } from "@/Context/AuthContext";
import ButtonFelid from "@/UI/ButtonFelid";
import { askForReview } from "@/Util/Https/freelancerHttp";
import { ProjectStatus } from "@/Util/status";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRevalidator } from "react-router-dom";
import {
  finishProject,
  requestProjectCancellation,
} from "@/Util/Https/companyHttp";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EditOffer } from "@/Util/Https/freelancerHttp";
import { FadeLoader } from "react-spinners";

export default function ProjectCard({
  projectDetails,
  isCanceled,
  proposalId,
}) {
  const { revalidate } = useRevalidator();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    user: { userId, token, role },
  } = useAuth();

  const {
    mutate: requestReview,
    data,
    isPending: isReviewing,
  } = useMutation({
    mutationFn: askForReview,
    onMutate: () => {
      messageApi.loading({
        content: "Sending review request...",
        key: "review",
      });
    },
    onSuccess: (data) => {
      messageApi.success({
        content: "Review request sent successfully",
        key: "review",
        duration: 2.5,
      });
      revalidate();
    },
    onError: (error) => {
      messageApi.error({
        content: error?.message || "Error sending request",
        key: "review",
      });
    },
  });

  const { mutate: Finished, isPending: isFinishing } = useMutation({
    mutationFn: finishProject,
    onMutate: () => {
      messageApi.loading({ content: "Finishing project...", key: "finish" });
    },
    onSuccess: (data) => {
      messageApi.success({
        content: "Project finished successfully",
        key: "finish",
        duration: 2.5,
      });
      revalidate();
    },
    onError: (error) => {
      messageApi.error({
        content: error?.message || "Error sending request",
        key: "finish",
      });
    },
  });

  const { mutate: requestCancellation, isPending: isCancelling } = useMutation({
    mutationFn: requestProjectCancellation,
    onMutate: () => {
      messageApi.loading({
        content: "Sending cancellation request...",
        key: "cancel",
      });
    },
    onSuccess: () => {
      messageApi.success({
        content: "Cancellation request sent successfully",
        key: "cancel",
        duration: 2.5,
      });
      revalidate();
    },
    onError: (error) => {
      messageApi.error({
        content: error?.message || "Error sending cancellation request",
        key: "cancel",
      });
    },
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    newDuration: "",
    newPrice: "",
    proposalId: proposalId,
  });

  const { mutate: handleEditOffer, isPending: isEditing } = useMutation({
    mutationFn: EditOffer,
    onMutate: () => {
      messageApi.loading({ content: "Sending edit request...", key: "edit" });
    },
    onSuccess: () => {
      messageApi.success({
        content: "Edit request sent successfully",
        key: "edit",
        duration: 2.5,
      });
      setShowEditModal(false);
    },
    onError: (error) => {
      messageApi.error({ content: error.message, key: "edit" });
    },
  });

  const handleSubmitEdit = () => {
    if (!editData.newDuration || !editData.newPrice) {
      message.error("Please fill all fields");
      return;
    }
    handleEditOffer({
      data: editData,
      token: token,
    });
  };

  const isoString = projectDetails?.publicationDate;
  const date = new Date(isoString);
  const formattedDate = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const totalDays = projectDetails?.duration || 0;
  const duration = {
    week: Math.floor(totalDays / 7),
    day: Math.floor(totalDays) % 7,
  };
  const handleClick = () => {
    if (isCanceled) return;
    if (role === "Freelancer") {
      requestReview({
        projectId: projectDetails?.id,
        token,
        freelancerId: userId,
      });
    } else {
      Finished({
        token,
        id: projectDetails?.id,
      });
    }
  };
  let style = "";
  // console.log(projectDetails);
  switch (projectDetails?.state) {
    case "Active":
      style = "text-[#00A200]";
      break;
    case "Pending":
      style = "text-[#ffa200]";
      break;
    case "InProgress":
      style = "text-[#A20000]";
      break;
    case "OnReviewing":
      style = "text-[#007eff]";
      break;
    case "Finished":
      style = "text-[#A26A00]";
      break;
  }

  const handleCancellationRequest = () => {
    Modal.confirm({
      title: "Request Project Cancellation",
      icon: <ExclamationCircleOutlined />,
      content:
        "Are you sure you want to request cancellation for this project? This action will notify the freelancer.",
      okText: "Yes, Request Cancellation",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        requestCancellation({
          projectId: projectDetails?.id,
          token,
        });
      },
    });
  };

  // console.log(projectDetails);;
  return (
    <>
      {contextHolder}
      <div className=" flex-1 h-[100%]">
        <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
          Project card
        </h1>
        <div className="space-y-[20px] bg-card-color rounded-[8px] px-[10px] py-[20px]">
          <div className="border-b-2 border-main-color pb-5">
            <table className="border-separate border-spacing-x-2 text-[15px]">
              <tr>
                <td>Project state</td>
                <td className={`${style} font-semibold`}>
                  {projectDetails?.state}
                </td>
              </tr>
              <tr>
                <td>Publication date</td>
                <td className="font-light">{formattedDate}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td className="font-light">{`${projectDetails?.price}$`}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td className="font-light">{`${duration.week} Weeks, ${duration.day} days`}</td>
              </tr>
            </table>
            {role === "Freelancer" && projectDetails?.state === "Active" && (
              <Button
                className="text-center my-1 w-full"
                onClick={() => setShowEditModal(true)}
              >
                Send edit proposal request
              </Button>
            )}
          </div>
          <div>
            <h1 className="font-medium">Project Status</h1>
            <div className="flex w-[80%] m-auto justify-between my-5">
              <div className="step-one flex flex-col items-center space-y-1">
                <h1
                  className={`bg-main-color text-white rounded-full w-6 h-6 text-center ${
                    projectDetails?.state !== "Active" ? "bg-opacity-[0.5]" : ""
                  }`}
                >
                  1
                </h1>
                <h2 className="font-roboto-condensed">Active</h2>
              </div>
              <div className="bg-main-color mt-3 flex-1 h-[2px] rounded"></div>
              <div className="step-two flex flex-col items-center space-y-1">
                <h1
                  className={`bg-main-color text-white rounded-full w-6 h-6 text-center ${
                    projectDetails?.state !== "OnReviewing"
                      ? "bg-opacity-[0.5]"
                      : ""
                  }`}
                >
                  2
                </h1>
                <h2>Review</h2>
              </div>
              <div className="bg-main-color mt-3 flex-1 h-[2px] rounded"></div>
              <div className="step-three flex flex-col items-center space-y-1">
                <h1
                  className={`bg-main-color text-white rounded-full w-6 h-6 text-center ${
                    projectDetails?.state !== "Finished"
                      ? "bg-opacity-[0.5]"
                      : ""
                  }`}
                >
                  3
                </h1>
                <h2 className="font-roboto-condensed">Finish</h2>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              {!isCanceled && (
                <div className="flex items-center gap-3">
                  <ButtonFelid
                    text={
                      projectDetails?.state === "Active"
                        ? "Request a review"
                        : "Accept a project"
                    }
                    classes={`${
                      projectDetails?.state === "Active" &&
                      role === "CompanyAdmin"
                        ? "bg-gray-400 cursor-not-allowed"
                        : projectDetails?.state === "OnReviewing" &&
                          role === "Freelancer"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-second-color"
                    }  px-2 py-1 font-regular`}
                    onClick={handleClick}
                    disabled={
                      (projectDetails?.state === "Active" &&
                        role === "CompanyAdmin") ||
                      (projectDetails?.state === "OnReviewing" &&
                        role === "Freelancer")
                    }
                  />
                </div>
              )}
              {role === "CompanyAdmin" &&
                projectDetails?.state === "Active" && (
                  <ButtonFelid
                    text={
                      projectDetails?.cancellationRequested
                        ? "Request Cancellation Sent"
                        : "Request Cancellation"
                    }
                    classes="bg-red-500 hover:bg-red-600 px-2 py-1 font-regular"
                    onClick={handleCancellationRequest}
                    disable={
                      isCancelling || projectDetails?.cancellationRequested
                    }
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Proposal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Duration (Days)
                </label>
                <input
                  type="number"
                  value={editData.newDuration}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      newDuration: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Price ($)
                </label>
                <input
                  type="number"
                  value={editData.newPrice}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      newPrice: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded"
                  min="0"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitEdit}
                  disabled={isEditing}
                  className="px-4 py-2 bg-main-color text-white rounded"
                >
                  {isEditing ? "Sending..." : "Send Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
