import OfferProjectCard from "@/components/Client/OfferProjectCard";
import FormAddOffer from "@/components/Freelancer/FormAddOffer";
import ProjectDetails from "@/components/shared/ProjectDetails";
import { useLoaderData } from "react-router-dom";

function AddOffer() {
  const { project, projectCard } = useLoaderData();

  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px]">
        <header className="font-medium mb-5">
          <span className="text-main-color font-roboto-condensed">
            Project /{" "}
          </span>
          Add Offer /{" "}
          <span className="font-regular italic">{project?.name}</span>
        </header>

        <div className="flex flex-col-reverse md:grid grid-cols-[repeat(11,1fr)] gap-[20px] ">
          <div className="col-start-1 col-end-9 space-y-[10px]">
            <ProjectDetails project={project} />
            <FormAddOffer />
          </div>
          <div className="col-start-9 col-end-12">
            <OfferProjectCard offerProject={projectCard} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddOffer;
