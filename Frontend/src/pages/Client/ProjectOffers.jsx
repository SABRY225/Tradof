import { useAuth } from "@/context/AuthContext";
import {  useLoaderData } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ProjectDetails from "@/components/shared/ProjectDetails";
import OfferProjectCard from "@/components/Client/OfferProjectCard";
import { Loader } from "@mantine/core";
import OffersPage from "@/components/Client/Offers";


function ProjectOffers() {
  const {
    user: { role },
  } = useAuth();
  const loaderData = useLoaderData();
  const project = loaderData?.project;
  const projectCard = loaderData?.projectCard;

  console.log(projectCard);
  if (!project || !projectCard) {
    return <Loader />;
  }
  const companyFiles = project?.files.filter(
    (file) => file.isFreelancerUpload === false
  );
  
  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px]">
        <header className="font-medium mb-5">
          <span className="text-main-color font-roboto-condensed">
            Projects /{" "}
          </span>
          Offers / <span className="font-regular italic">{project?.name}</span>
        </header>

        <div className="flex flex-col-reverse lg:grid grid-cols-[repeat(11,1fr)] gap-[20px]">
          <div className="col-start-1 col-end-12 lg:col-start-1 lg:col-end-9 row-start-1 row-end-6">
            <ProjectDetails project={project} projectFiles={companyFiles} />
          </div>
          <div className="col-start-1 col-end-12 lg:col-start-9 lg:col-end-12 row-start-6 lg:row-start-1 row-end-6">
            <OfferProjectCard offerProject={projectCard} />
          </div>
        </div>

        <div className="pl-5 md:pl-10">
          <OffersPage />
        </div>
      </div>
    </div>
  );
}
export default ProjectOffers;
