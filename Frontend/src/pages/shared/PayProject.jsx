import ProjectDetails from "@/components/shared/ProjectDetails";
import { fatchProjectDetailes } from "@/Util/Https/http";
import Cookies from "js-cookie";
import { useLoaderData } from "react-router-dom";

export default function PayProject() {
  const { project } = useLoaderData();
  console.log(project);

  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px]">
        <header className="font-medium mb-5">
          <span className="text-main-color font-roboto-condensed">
            Dashboard /{" "}
          </span>
          Project Invoice /{" "}
          <span className="font-regular italic">{project?.name}</span>
        </header>
        <ProjectDetails project={project} projectFiles={true} />
      </div>
    </div>
  );
}

export const payProjectLoader = async ({ params }) => {
  const token = Cookies.get("token");
  const { projectId } = params;
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const projectData = await fatchProjectDetailes({ id: projectId, token });
    return { project: projectData };
  } catch (error) {
    console.error("Failed to fetch project:", error);
    throw new Response("Failed to load project data", { status: 500 });
  }
};
