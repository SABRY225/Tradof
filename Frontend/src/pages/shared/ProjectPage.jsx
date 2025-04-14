import ProjectOwnerCard from "@/components/shared/ProjectOwnerCard";
import ProjectCard from "../../components/shared/ProjectCard";
import ProjectDetails from "@/components/shared/ProjectDetails";
import Workspace from "@/components/shared/ProjectWorkspace";
import Chatting from "@/components/shared/ProjectChatting";
import { fatchProjectCard, fatchProjectDetailes } from "@/Util/Https/http";
import Cookies from "js-cookie";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProjectPage() {
  const {
    user: { userId },
  } = useAuth();
  const { project, projectCard } = useLoaderData();

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


  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px]">
        <header className="font-medium mb-5">
          <span className="text-main-color font-roboto-condensed">
            Dashboard /{" "}
          </span>
          Project / <span className="font-regular italic">{project?.name}</span>
        </header>
        <div className="grid grid-cols-[repeat(11,1fr)] gap-x-[20px]">
          <div className="col-start-1 col-end-12 lg:col-start-1 lg:col-end-4 row-start-1 row-end-6">
            <div className="flex flex-col md:flex-row lg:flex-col justify-between gap-5 h-[100%]">
              <ProjectOwnerCard ownerCard={ownerCard} />
              <ProjectCard projectDetails={projectDetails} />
            </div>
          </div>
          <div className="col-start-1 col-end-12 lg:col-start-4 lg:col-end-9 row-start-6 lg:row-start-1 row-end-6">
            <ProjectDetails project={project} />
            <Workspace files={project?.files || []} projectId={project?.id} />
          </div>
          <div className="col-start-1 lg:col-start-9 col-end-12 row-start-12 lg:row-start-1">
            <Chatting
              projectId={project.id}
              senderId={userId}
              freelancerId={project?.freelancerId}
              companyId={project?.companyId}
              freelancerEmail={project?.freelancerEmail}
              companyEmail={projectCard?.ownerEmail}
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
