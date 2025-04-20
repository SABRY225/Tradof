import { useAuth } from "@/context/AuthContext";
import photo from "../../../assets/images/1560a64114a9372e.jpg";
import {
  timer,
  grayOffers,
  grayBudget,
  whitePlus,
  openPage,
} from "../../../assets/paths.js";
import { motion } from "motion/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUnassignedProjects } from "@/Util/Https/freelancerHttp";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/pages/Loading";
import Pagination from "@/UI/Pagination";

const getTimeAgo = (creationDate) => {
  const now = new Date();
  const created = new Date(creationDate);
  const diffMs = now - created;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffDays < 1) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  if (diffDays < 30)
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  if (diffDays < 365)
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
};

const ITEMS_PER_PAGE = 5;
export default function DiscoverProject({ classes }) {
  const {
    user: { userId, token },
  } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["unassigned-projects", userId, currentPage],
    queryFn: ({ signal }) =>
      getUnassignedProjects({
        signal,
        token,
        indexPage: currentPage,
        pageSize: ITEMS_PER_PAGE,
      }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { items = [], count = 0 } = data || {};

  // console.log(items);
  return (
    <motion.div
      initial={{ x: "-50rem" }}
      animate={{ x: "0rem" }}
      transition={{ type: "keyframes", duration: 0.8 }}
      className={classes}
    >
      <h1 className="flex justify-between font-semibold text-[20px]">
        Discover more projects
        <Link to="../project/available">
          <img src={openPage} alt="" />
        </Link>
      </h1>
      {isLoading && (
        <div className="text-center font-medium text-[20px] bg-white w-1/2 mx-auto py-2 rounded-md shadow">
          Loading...
        </div>
      )}
      {!isLoading && count === 0 && (
        <div className="text-center font-medium text-[20px] bg-white w-1/2 mx-auto py-2 rounded-md shadow">
          Not found projects.
        </div>
      )}
      {items.map((project) => (
        <div
          key={project.id}
          className="my-2 shadow-md relative p-[15px] px-[25px] space-y-[10px] bg-white rounded-lg font-roboto-condensed"
        >
          <div className="font-roboto-condensed text-[20px]">
            {project?.description}
          </div>
          <div className="flex items-center gap-2">
            <img
              src={project?.profileImageUrl}
              alt="photo"
              width={30}
              className="h-[30px] rounded-full object-cover"
            />
            <p className="text-[12px]  font-roboto-condensed">
              {project?.firstName + " " + project?.lastName}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:gap-[30px]">
            <div className="flex gap-2">
              <img src={timer} alt="icon" width={15} />
              <p className="text-gray-500 text-[12px]">
                {getTimeAgo(project?.creationDate)}
              </p>
            </div>
            <div className="flex gap-2">
              <img src={grayOffers} alt="icon" width={15} />
              <p className="text-gray-500 text-[12px]">
                {project?.numberOfOffers} offers
              </p>
            </div>
            <div className="flex gap-2">
              <img src={grayBudget} alt="icon" width={15} />
              <p className="text-gray-500 text-[12px]">
                ${project?.minPrice} - ${project?.maxPrice}
              </p>
            </div>
          </div>
          <Link to={`../project/add-offer/${project?.id}`}>
            <div className="flex gap-3 absolute bottom-5 right-5 bg-main-color p-1 px-3 rounded-md text-white font-roboto-condensed text-[13px]">
              <img src={whitePlus} alt="icon" width={12} />
              Add Offer
            </div>
          </Link>
        </div>
      ))}
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        length={count}
      />
    </motion.div>
  );
}
