import convertDateToCustomFormat from "@/Util/convertDate";
import { fatchProjectCard } from "@/Util/Https/http";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { Avatar, Box } from "@mui/material";

function OfferProjectCard({ offerProject }) {
  const { projectId } = useParams();
  const [project, setData] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const FatchData = async () => {
      const data = await fatchProjectCard({ id: projectId, token });
      setData(data);
    };
    FatchData();
  }, []);

  // console.log(offerProject);
  const ownerCard = {
    name: offerProject?.ownerName,
    email: offerProject?.ownerEmail,
    company: offerProject?.companyName,
    registeredAt: offerProject?.registeredAt,
    totalProjects: offerProject?.totalProjects,
    image: offerProject?.projectOwnerImage,
    openProjects: offerProject?.openProjects,
  };

  const projectDetails = {
    state: offerProject?.projectState,
    publicationDate: offerProject?.projectStartDate,
    budget: offerProject?.budget,
    duration: offerProject?.duration,
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
  return (
    <div>
      <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
        Project Card
      </h1>
      <div className="flex md:flex-col w-full shadow rounded-[8px] p-3 bg-card-color">
        <div className="flex-grow space-y-[20px] px-[10px] py-[10px] border-r-2 md:border-b-2 md:border-r-0 border-main-color">
          <h1 className="font-medium">Project owner</h1>
          <div className="flex space-x-3">
            <img
              src={ownerCard?.image}
              alt="profile photo"
              className="rounded-full object-cover h-12 w-12"
            />
            <div className="text-[15px]">
              <h1 className="italic">{ownerCard?.company}</h1>
              <p className="font-light">Owner: {ownerCard?.name}</p>
            </div>
          </div>
          <div className="pb-5">
            <table className="border-separate border-spacing-x-2 text-[15px]">
              <tr>
                <td>Work at/in</td>
                <td className="font-light">{ownerCard?.company}</td>
              </tr>
              <tr>
                <td>Registered at</td>
                <td className="font-light">{formattedDate}</td>
              </tr>
              <tr>
                <td>Total projects</td>
                <td className="font-light">{ownerCard?.totalProjects}</td>
              </tr>
              <tr>
                <td>Opening projects</td>
                <td className="font-light">{ownerCard?.openProjects}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="space-y-[20px]  px-[10px] py-[20px]">
          <h1 className="font-medium">Project details</h1>
          <div>
            <table className="border-separate border-spacing-x-2 text-[15px]">
              <tr>
                <td>Offer state</td>
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
                <td className="font-light">{`$${projectDetails?.budget?.minPrice} - $${projectDetails?.budget?.maxPrice}`}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td className="font-light">{`${duration?.week} Weeks, ${duration?.day} days`}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferProjectCard;
