import { useAuth } from "@/context/AuthContext";
import ButtonFelid from "@/UI/ButtonFelid";
import { askForReview } from "@/Util/Https/freelancerHttp";
import { ProjectStatus } from "@/Util/status";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router-dom";
import {
  finishProject,
  requestProjectCancellation,
} from "@/Util/Https/companyHttp";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function ProjectCard({ projectDetails, isCanceled }) {
  const { revalidate } = useRevalidator();

  const {
    user: { userId, token, role },
  } = useAuth();
  const {
    mutate: requestReview,
    data,
    isPending,
  } = useMutation({
    mutationFn: askForReview,
    onSuccess: (data) => {
      toast.success("Send review request successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      revalidate();
    },
    onError: (error) => {
      toast.error(error?.message || "Error sending request", {
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

  const { mutate: Finished, isPending: isFinishing } = useMutation({
    mutationFn: finishProject,
    onSuccess: (data) => {
      toast.success("Project finished successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      revalidate();
    },
    onError: (error) => {
      toast.error(error?.message || "Error sending request", {
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

  const { mutate: requestCancellation, isPending: isCancelling } = useMutation({
    mutationFn: requestProjectCancellation,
    onSuccess: () => {
      toast.success("Cancellation request sent successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      revalidate();
    },
    onError: (error) => {
      toast.error(error?.message || "Error sending cancellation request", {
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

  return (
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
              <td>Budget</td>
              <td className="font-light">{`${projectDetails?.budget.minPrice} EGP - ${projectDetails?.budget.maxPrice} EGP`}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td className="font-light">{`${duration.week} Weeks, ${duration.day} days`}</td>
            </tr>
          </table>
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
                  projectDetails?.state !== "Finished" ? "bg-opacity-[0.5]" : ""
                }`}
              >
                3
              </h1>
              <h2 className="font-roboto-condensed">Finish</h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            {!isCanceled && (
              <ButtonFelid
                text={
                  projectDetails?.state === "Active"
                    ? "Request a review"
                    : "Accept a project"
                }
                classes={`${
                  projectDetails?.state === "Active" && role === "CompanyAdmin"
                    ? "bg-gray-400 cursor-not-allowed"
                    : projectDetails?.state === "OnReviewing" &&
                      role === "Freelancer"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-second-color"
                }  px-2 py-1 font-regular`}
                onClick={handleClick}
                disable={
                  (projectDetails?.state === "Active" &&
                    role === "CompanyAdmin") ||
                  (projectDetails?.state === "OnReviewing" &&
                    role === "Freelancer")
                }
              />
            )}
            {role === "CompanyAdmin" && projectDetails?.state === "Active" && (
              <ButtonFelid
                text={
                  projectDetails?.cancellationRequested
                    ? "Request Cancellation Sent"
                    : "Request Cancellation"
                }
                classes="bg-red-500 hover:bg-red-600 px-2 py-1 font-regular"
                onClick={handleCancellationRequest}
                disable={isCancelling || projectDetails?.cancellationRequested}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
