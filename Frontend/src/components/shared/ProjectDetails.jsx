import { files } from "@/assets/paths";
import ButtonFelid from "@/UI/ButtonFelid";

export default function ProjectDetails({ project, projectFiles }) {
  return (
    <div>
      <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
        Project details
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[20px] py-[20px]">
        <h1 className="text-[20px] font-medium relative before:content-[''] before:absolute before:bg-main-color before:w-4 before:h-[2px] before:rounded before:-left-[20px] before:top-1/2 before:-translate-y-1/2">
          {project?.name}
        </h1>
        <div className="font-roboto-condensed">
          <h2 className="text-main-color text-[13px] font-semibold">
            Description of project
          </h2>
          <p className="font-roboto-condensed">{project?.description}</p>
        </div>
        <div>
          <h1 className="text-main-color text-[13px] font-semibold">
            Language pair
          </h1>
          <p className="font-roboto-condensed">
            {project?.languageFrom.languageName} (
            {project?.languageFrom.countryName}) -{" "}
            {project?.languageTo.languageName} (
            {project?.languageTo.countryName})
          </p>
        </div>
        <div>
          <h1 className="text-main-color text-[13px] font-semibold">
            IETF tag
          </h1>
          <p className="font-roboto-condensed">
            {project?.languageFrom.languageCode}-
            {project?.languageFrom.countryCode} -{" "}
            {project?.languageTo.languageCode}-{project?.languageTo.countryCode}
          </p>
        </div>
        {projectFiles && (
          <div>
            <h1 className="text-main-color text-[13px] font-semibold">
              Attachment files
            </h1>
            <ButtonFelid
              text="Files"
              classes="bg-second-color px-5 py-[2px] font-regular flex flex-row-reverse"
              icon={files}
            />
          </div>
        )}
      </div>
    </div>
  );
}
