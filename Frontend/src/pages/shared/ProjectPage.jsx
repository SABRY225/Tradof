import ProjectOwnerCard from "@/components/shared/ProjectOwnerCard";
import ProjectCard from "../../components/shared/ProjectCard";
import ProjectDetails from "@/components/shared/ProjectDetails";
import Workspace from "@/components/shared/ProjectWorkspace";
import Chatting from "@/components/shared/ProjectChatting";
import { fatchProjectCard, fatchProjectDetailes } from "@/Util/Https/http";
import {
  acceptProjectCancellation,
  rejectProjectCancellation,
} from "@/Util/Https/freelancerHttp";
import Cookies from "js-cookie";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Alert, Button, Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectPayment from "@/components/shared/ProjectPayment";

export default function ProjectPage() {
  const {
    user: { userId, token, role },
  } = useAuth();
  const { project, projectCard } = useLoaderData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handleAcceptCancellation, isPending: isAccepting } =
    useMutation({
      mutationFn: () =>
        acceptProjectCancellation({ projectId: project?.id, token }),
      onSuccess: () => {
        toast.success("Project cancellation accepted successfully");
        queryClient.invalidateQueries({ queryKey: ["project", project?.id] });
        navigate("/user/dashboard");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to accept cancellation");
      },
    });

  const { mutate: handleRejectCancellation, isPending: isRejecting } =
    useMutation({
      mutationFn: () =>
        rejectProjectCancellation({ projectId: project?.id, token }),
      onSuccess: () => {
        toast.success("Project cancellation rejected successfully");
        queryClient.invalidateQueries({ queryKey: ["project", project?.id] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to reject cancellation");
      },
    });

  const showConfirmModal = (action) => {
    Modal.confirm({
      title: `Confirm ${action} Cancellation`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to ${action.toLowerCase()} the project cancellation request?`,
      okText: `Yes, ${action}`,
      okType: action === "Accept" ? "primary" : "danger",
      cancelText: "Cancel",
      onOk() {
        if (action === "Accept") {
          handleAcceptCancellation();
        } else {
          handleRejectCancellation();
        }
      },
    });
  };

  if (projectCard?.projectState === "Finished") {
    navigate(`../pay/${project?.id}`);
    return null;
  }

  console.log(project);

  const ownerCard = {
    name: projectCard?.ownerName,
    email: projectCard?.ownerEmail,
    company: projectCard?.companyName,
    registeredAt: projectCard?.registeredAt,
    totalProjects: projectCard?.totalProjects,
    image: projectCard?.projectOwnerImage,
    openProjects: projectCard?.openProjects,
  };

  const projectDetails = {
    id: project?.id,
    state: projectCard?.projectState,
    publicationDate: projectCard?.projectStartDate,
    budget: projectCard?.budget,
    duration: projectCard?.duration,
  };
  const freelancerFiles = project?.files.filter(
    (file) => file.isFreelancerUpload === true
  );
  // console.log(project);
  const companyFiles = project?.files.filter(
    (file) => file.isFreelancerUpload === false
  );

  return (
    <div className="bg-background-color">
      {/* Hidden button that gets auto-clicked */}
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px]">
        <header className="font-medium mb-5">
          <span className="text-main-color font-roboto-condensed">
            Dashboard /{" "}
          </span>
          Project / <span className="font-regular italic">{project?.name}</span>
        </header>
        {project?.cancellationAccepted && (
          <Alert
            className="my-3"
            message="The Project is canceled"
            type="warning"
            showIcon
          />
        )}
        {project?.cancellationRequested && !project?.cancellationAccepted && role === "Freelancer" && (
          <Alert
            className="my-5"
            message="Cancellation request"
            description="Project Owner request to cancel this project, and you can Accept or Reject this request."
            type="info"
            action={
              <Space direction="vertical">
                <Button
                  size="small"
                  type="primary"
                  loading={isAccepting}
                  onClick={() => showConfirmModal("Accept")}
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  danger
                  ghost
                  loading={isRejecting}
                  onClick={() => showConfirmModal("Reject")}
                >
                  Reject
                </Button>
              </Space>
            }
            closable
          />
        )}

        <div className="grid grid-cols-[repeat(11,1fr)] gap-x-[20px]">
          <div className="col-start-1 col-end-12 lg:col-start-1 lg:col-end-4 row-start-1 row-end-6">
            <div className="flex flex-col md:flex-row lg:flex-col justify-between gap-5 h-[100%]">
              <ProjectOwnerCard ownerCard={ownerCard} />
              <ProjectPayment budget={project?.price} deliveryTime={project?.days} freelancerId={project?.freelancerId} statusProject={project?.status}/>
              <ProjectCard
                projectDetails={projectDetails}
                isCanceled={project.cancellationAccepted}
              />
              
            </div>
          </div>
          <div className="col-start-1 col-end-12 lg:col-start-4 lg:col-end-9 row-start-6 lg:row-start-1 row-end-6">
            <ProjectDetails
              project={project}
              projectFiles={companyFiles || []}
              isCanceled={project.cancellationAccepted}
            />
            <Workspace
              files={freelancerFiles || []}
              projectId={project?.id}
              isCanceled={project.cancellationAccepted}
            />
          </div>
          <div className="col-start-1 lg:col-start-9 col-end-12 row-start-12 lg:row-start-1">
            <Chatting
              projectId={project.id}
              senderId={userId}
              freelancerId={project?.freelancerId}
              companyId={project?.companyId}
              freelancerEmail={project?.freelancerEmail}
              companyEmail={projectCard?.ownerEmail}
              isCanceled={project.cancellationAccepted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const projectLoader = async ({ params }) => {
  const token = Cookies.get("token");
  const { projectId } = params;
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const projectData = await fatchProjectDetailes({ id: projectId, token });
    const projectCardData = await fatchProjectCard({ id: projectId, token });
    return { project: projectData, projectCard: projectCardData };
  } catch (error) {
    console.error("Failed to fetch project:", error);
    throw new Response("Failed to load project data", { status: 500 });
  }
};
