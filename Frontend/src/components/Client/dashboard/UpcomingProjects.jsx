import { useMutation, useQuery } from "@tanstack/react-query";
import { openPage, blueOffers, rabash } from "../../../assets/paths.js";
import { useAuth } from "@/context/AuthContext.jsx";
import {
  deleteProject,
  getUpcomingdProjects,
} from "@/Util/Https/companyHttp.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { queryClient } from "@/Util/Https/http.js";

export default function UpcomingProject() {
  const {
    user: { userId, token },
  } = useAuth();
  const navigate = useNavigate();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["upcomingProject"],
    queryFn: () => getUpcomingdProjects({ id: userId, token }),
  });
  const { mutate: handelDeleteProject, isPending } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onSuccess: (data) => {
      toast.success("Project deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Refetch the projects after deletion
      queryClient.invalidateQueries(["upcomingProject"]);
      queryClient.refetchQueries(["upcomingProject"]);

    },
  });
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
  const handleDelete = (id) => {
    handelDeleteProject({ id, token });
  };

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h1 className="font-medium text-[18px]">Incoming Projects</h1>
        <Link to="../project/upcoming">
          <img src={openPage} alt="" />
        </Link>
      </div>
      {isLoading && <div className="text-center">Loading...</div>}

      <ul className="space-y-[10px]">
        {data &&
          data?.slice(0,5).map((project) => {
            return (
              <li
                key={project.id}
                className="flex bg-white py-[10px] px-[30px] rounded-lg shadow"
                onClick={() => navigate(`../project/offer/${project.id}`)}
              >
                <div>
                  <div className="text-[18px] font-regular">
                    {project?.description}
                  </div>
                  <ul>
                    <li className="text-[12px] font-semibold">
                      Language pair:{" "}
                      <span className="font-light">
                        {project?.languageFrom.languageName} (
                        {project?.languageFrom.countryName})-
                        {project?.languageTo.languageName} (
                        {project?.languageTo.countryName}) /{" "}
                        {project?.languageFrom.languageCode} (
                        {project?.languageFrom.countryCode})-
                        {project?.languageTo.languageCode} (
                        {project?.languageTo.languageCode})
                      </span>
                    </li>
                    <li className="text-[12px] font-semibold">
                      Specialization:{" "}
                      <span className="font-light">
                        {project?.specialization.name}
                      </span>
                    </li>
                    <li className="text-[12px] font-semibold">
                      Delivery time:{" "}
                      <span className="font-light">${project?.days} days</span>
                    </li>
                    <li className="text-[12px] font-semibold">
                      Budget:{" "}
                      <span className="font-light">
                        ${project?.minPrice} - ${project?.maxPrice}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col ml-auto justify-between items-end">
                  <div className="py-[5px] px-[20px] rounded-lg font-[500] text-[13px] text-main-color flex">
                    <img
                      src={blueOffers}
                      alt="offers icon"
                      width={15}
                      className="mr-1"
                    />{" "}
                    {project?.numberOfOffers} Offers
                  </div>
                  <button
                    type="button"
                    className="py-[5px] px-[20px] rounded-lg font-[500] text-[13px] text-[#FF3B30] flex"
                    onClick={() => handleDelete(project.id)}
                    disabled={isPending}
                    style={{
                      cursor: isPending ? "not-allowed" : "pointer",
                      opacity: isPending ? 0.5 : 1,
                    }}
                  >
                    <img
                      src={rabash}
                      alt="offers icon"
                      width={15}
                      className="mr-1"
                    />
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
