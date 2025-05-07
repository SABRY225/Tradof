import ProjectDetails from "@/components/shared/ProjectDetails";
import ButtonFelid from "@/UI/ButtonFelid";
import { getCompany } from "@/Util/Https/companyHttp";
import { getFreelancer } from "@/Util/Https/freelancerHttp";
import { fatchProjectDetailes } from "@/Util/Https/http";
import Cookies from "js-cookie";
import PhoneInput from "react-phone-number-input";

import { useLoaderData } from "react-router-dom";

export default function PayProject() {
  const { project, userData } = useLoaderData();
  console.log(project, userData);
  const companyFiles = project?.files.filter(
    (file) => file.isFreelancerUpload === false
  );
  const freelancerFiles = project?.files.filter(
    (file) => file.isFreelancerUpload === true
  );
  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px] space-y-5">
        <header className="font-medium">
          <span className="text-main-color font-roboto-condensed">
            Dashboard /{" "}
          </span>
          Project Invoice /{" "}
          <span className="font-regular italic">{project?.name}</span>
        </header>
        <div className="space-y-[20px] bg-card-color rounded-[8px] px-[20px] py-[20px] shadow">
          <div className="flex flex-wrap md:grid grid-cols-[max-content_1fr_1fr] gap-2 items-center">
            <img
              src={userData?.profileImageUrl}
              alt="userData photo"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              {userData?.companyName ? (
                <>
                  <div className="flex gap-5 items-center font-poppins">
                    {"Company: " + userData?.companyName}
                  </div>
                  <div className="flex gap-5 items-center font-poppins text-[12px]">
                    {"Manager: " +
                      userData?.firstName +
                      " " +
                      userData?.lastName}
                  </div>
                </>
              ) : (
                <div className="flex gap-5 items-center font-poppins">
                  {userData?.firstName + " " + userData?.lastName}
                </div>
              )}

              <div className="flex gap-5 items-center font-poppins">
                {userData?.email}
              </div>
            </div>
            <div>
              <div className="flex gap-5 items-center font-poppins">
                <span>Phone:</span>
                <PhoneInput
                  international
                  className="custom-phone-input"
                  placeholder={userData?.phone}
                  value={userData?.phone}
                  disabled={true}
                  defaultCountry="US" // Default country can be set here
                />
              </div>
              <div className="flex gap-5 items-center font-poppins">
                <span>Country:</span>
                {userData?.countryName || userData?.companyAddress}
              </div>
            </div>
          </div>
        </div>
        <ProjectDetails
          project={project}
          projectFiles={companyFiles || []}
          translatedFiles={freelancerFiles || []}
          viewOnly={true}
          // price={project?.price}
        />
        <ButtonFelid
          text="Pay money"
          classes="bg-second-color px-10 py-2 font-medium m-auto"
        />
      </div>
    </div>
  );
}

export const payProjectLoader = async ({ params }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const { projectId } = params;
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const projectData = await fatchProjectDetailes({ id: projectId, token });
    const person =
      role === "Freelancer"
        ? await getFreelancer({
            id: projectData.freelancerId,
            token,
          })
        : await getCompany({
            id: projectData?.companyId,
            token,
          });
    return { project: projectData, userData: person };
  } catch (error) {
    console.error("Failed to fetch project:", error);
    throw new Response("Failed to load project data", { status: 500 });
  }
};
