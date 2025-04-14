import { useQuery } from "@tanstack/react-query";
import person from "../../../assets/images/1560a64114a9372e.jpg";
import { openPage } from "../../../assets/paths.js";
import { ProjectStatus } from "../../../Util/projectStatus";
import { getStartedProjects } from "@/Util/Https/companyHttp";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function StartProject() {
  const {
    user: { userId, token },
  } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["startProjects"],
    queryFn: () => getStartedProjects({ id: userId, token }),
  });
  const navigate = useNavigate();

  const { items } = data || [];
  if (isError) {
    console.error("Error fetching data:", error);
    toast.error("Error fetching data", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h1 className="font-medium text-[18px]">Started Projects</h1>
        <Link to="../project/start">
          <img src={openPage} alt="" />
        </Link>
      </div>
      {isLoading && <div className="text-center">Loading...</div>}
      <ul className="space-y-[10px]">
        {items &&
          items.map((project) => {
            let style = "";
            switch (+project?.status.statusValue) {
              case +ProjectStatus.Active:
                style = "text-[#00A200] bg-[#C3FFC3]";
                break;
              case +ProjectStatus.Pending:
                style = "text-[#ffa200] bg-[#fff9c3]";
                break;
              case +ProjectStatus.InProgress:
                style = "text-[#A20000] bg-[#FFC3C3]";
                break;
              case +ProjectStatus.OnReviewing:
                style = "text-[#007eff] bg-[#c3f3ff]";
                break;
              case +ProjectStatus.Finished:
                style = "text-[#A26A00] bg-[#FFEAC3]";
                break;
            }
            return (
              <li
                key={project.id}
                className="relative bg-white py-[10px] px-[30px] rounded-lg shadow"
                onClick={() => navigate(`../project/${project.id}`)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={project?.freelancerProfileImageUrl}
                    alt="freelancer image"
                    width={40}
                    className="rounded-full h-[40px] object-cover"
                  />
                  <p className="font-light">
                    {project?.freelancerFirstName +
                      " " +
                      project?.freelancerLastName}
                  </p>
                </div>
                <div className="text-[18px] font-regular">
                  {project?.description}
                </div>
                <ul>
                  <li className="text-[12px] font-semibold">
                    Start at:{" "}
                    <span className="font-light">{project?.startDate}</span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Deadline:{" "}
                    <span className="font-light">{project?.days} day</span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Price:{" "}
                    <span className="font-light">
                      ${project?.minPrice + " - " + project?.maxPrice}
                    </span>
                  </li>
                </ul>
                <div
                  className={`absolute right-5 top-3 py-[5px] px-[20px] rounded-lg font-[500] text-[13px] ${style}`}
                >
                  {project?.status.statusName}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
