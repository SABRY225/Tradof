import { AnimatePresence, motion } from "motion/react";
import { ProjectStatus } from "@/Util/status";
import photo from "../../../assets/images/1560a64114a9372e.jpg";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCurrentProjects } from "@/Util/Https/freelancerHttp";
import { useNavigate } from "react-router-dom";

export default function CurrentProjects({ classes }) {
  const {
    user: { userId, token },
  } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const projectsPerPage = 10;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["projects", userId, currentPage],
    queryFn: ({ signal }) =>
      getCurrentProjects({
        signal,
        token,
        freelancerId: userId,
        pageIndex: currentPage,
        pageSize: projectsPerPage,
      }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
  console.log(data);
  const { items = [], count = 0 } = data || {};

  // const currentProjects = items.slice(
  //   currentPage * projectsPerPage,
  //   (currentPage + 1) * projectsPerPage
  // );

  const nextPage = () => {
    if (currentPage * projectsPerPage < count) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <motion.div
      initial={{ x: "-50rem" }}
      animate={{ x: "0" }}
      transition={{ type: "keyframes", duration: 0.8 }}
      className={classes}
    >
      <div className="flex flex-col text-[15px] overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px] bg-white border-b-[20px] border-background-color font-semibold text-[15px] grid grid-cols-5">
          <div className="p-3">Projects</div>
          <div className="p-3">Owner</div>
          <div className="p-3">Start at</div>
          <div className="p-3">Deadline</div>
          <div className="p-3">State</div>
        </div>

        <div className="min-w-[600px] overflow-y-auto max-h-[400px]">
          {count === 0 && (
            <div className="text-center">Not started project yet...</div>
          )}

          {items.map((project, index) => {
            const startDate = new Date(project?.startDate);
            const endDate = new Date(project?.endDate);
            const deadlineByDays = Math.floor(
              (endDate - startDate) / (1000 * 60 * 60 * 24)
            );

            const formatDate = (date) => {
              const d = new Date(date);
              const month = d.getMonth() + 1; // Months are 0-indexed, so add 1
              const day = d.getDate();
              const year = d.getFullYear();
              return `${month < 10 ? "0" + month : month}/${
                day < 10 ? "0" + day : day
              }/${year}`;
            };
            console.log(project?.startDate);
            const formattedStartDate = formatDate(project?.startDate);
            // const formattedEndDate = formatDate(project?.endDate);

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
              <motion.div
                key={project.id}
                onClick={() =>
                  +project?.status.statusValue === 4
                    ? navigate(`../project/pay/${project.id}`)
                    : navigate(`../project/${project.id}`)
                }
                className="bg-white border-b-[8px] border-background-color grid grid-cols-5 items-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Add staggered delay for animation effect
              >
                <div className="p-3 truncate max-w-[250px] ">
                  {project?.description}
                </div>
                <div className="flex gap-2 p-3 items-center">
                  <img
                    src={project?.profileImageUrl}
                    alt="photo"
                    width={30}
                    className="h-[30px] rounded-full object-cover"
                  />
                  <p className="text-[12px]">
                    {project?.firstName + " " + project?.lastName}
                  </p>
                </div>
                <div className="p-3 text-[13px]">{formattedStartDate}</div>
                <div className="p-3 text-[13px]">{deadlineByDays} days</div>
                <div className="p-3 w-[80px]">
                  <div
                    className={`w-[100px] text-center rounded font-[500] text-[13px] ${style}`}
                  >
                    {project?.status.statusName}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="controls flex justify-between text-main-color font-medium">
        <div
          className={`cursor-pointer ${
            currentPage === 1 ? "text-gray-400" : ""
          }`}
          onClick={prevPage}
        >
          Previous
        </div>
        <div
          className={`cursor-pointer ${
            currentPage * projectsPerPage >= count ? "text-gray-400" : ""
          }`}
          onClick={nextPage}
        >
          Next
        </div>
      </div>
    </motion.div>
  );
}
