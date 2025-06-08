import { AnimatePresence, motion } from "motion/react";
import { ProjectStatus } from "@/Util/status";
import photo from "../../../assets/images/1560a64114a9372e.jpg";
import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCurrentProjects } from "@/Util/Https/freelancerHttp";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export default function CurrentProjects({ classes }) {
  const {
    user: { userId, token },
  } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
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

  const { items = [], count = 0 } = data || {};
  // console.log(data);
  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter((project) =>
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // Sort projects
  const sortedAndFilteredProjects = useMemo(() => {
    let sortableItems = [...filteredProjects];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === "description") {
          return sortConfig.direction === "ascending"
            ? a.description.localeCompare(b.description)
            : b.description.localeCompare(a.description);
        }
        if (sortConfig.key === "owner") {
          const aName = `${a.firstName} ${a.lastName}`;
          const bName = `${b.firstName} ${b.lastName}`;
          return sortConfig.direction === "ascending"
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        }
        if (sortConfig.key === "startDate") {
          return sortConfig.direction === "ascending"
            ? new Date(a.startDate) - new Date(b.startDate)
            : new Date(b.startDate) - new Date(a.startDate);
        }
        if (sortConfig.key === "deadline") {
          const aDeadline = Math.floor(
            (new Date(a.endDate) - new Date(a.startDate)) /
              (1000 * 60 * 60 * 24)
          );
          const bDeadline = Math.floor(
            (new Date(b.endDate) - new Date(b.startDate)) /
              (1000 * 60 * 60 * 24)
          );
          return sortConfig.direction === "ascending"
            ? aDeadline - bDeadline
            : bDeadline - aDeadline;
        }
        if (sortConfig.key === "status") {
          return sortConfig.direction === "ascending"
            ? a.status.statusName.localeCompare(b.status.statusName)
            : b.status.statusName.localeCompare(a.status.statusName);
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredProjects, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 ml-1" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <motion.div
      initial={{ x: "-50rem" }}
      animate={{ x: "0" }}
      transition={{ type: "keyframes", duration: 0.8 }}
      className={classes}
    >
      {/* Search Bar */}
      <div className="mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color focus:border-transparent"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col text-[15px] overflow-x-auto custom-scrollbar">
        <div className="min-w-[600px] bg-white border-b-[20px] border-background-color font-semibold text-[15px] grid grid-cols-5">
          <div
            className="p-3 flex items-center cursor-pointer hover:text-main-color"
            onClick={() => requestSort("description")}
          >
            Projects {getSortIcon("description")}
          </div>
          <div
            className="p-3 flex items-center cursor-pointer hover:text-main-color"
            onClick={() => requestSort("owner")}
          >
            Owner {getSortIcon("owner")}
          </div>
          <div
            className="p-3 flex items-center cursor-pointer hover:text-main-color"
            onClick={() => requestSort("startDate")}
          >
            Start at {getSortIcon("startDate")}
          </div>
          <div
            className="p-3 flex items-center cursor-pointer hover:text-main-color"
            onClick={() => requestSort("deadline")}
          >
            Deadline {getSortIcon("deadline")}
          </div>
          <div
            className="p-3 flex items-center cursor-pointer hover:text-main-color"
            onClick={() => requestSort("status")}
          >
            State {getSortIcon("status")}
          </div>
        </div>

        <div className="min-w-[600px] overflow-y-auto max-h-[400px]">
          {isLoading ? (
            <div className="text-center py-4">Loading projects...</div>
          ) : sortedAndFilteredProjects.length === 0 ? (
            <div className="text-center py-4">
              {searchQuery
                ? "No projects found matching your search"
                : "Not started project yet..."}
            </div>
          ) : (
            sortedAndFilteredProjects.map((project, index) => {
              const startDate = new Date(project?.startDate);
              const endDate = new Date(project?.endDate);
              const deadlineByDays = Math.floor(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
              );

              const formatDate = (date) => {
                const d = new Date(date);
                const month = d.getMonth() + 1;
                const day = d.getDate();
                const year = d.getFullYear();
                return `${month < 10 ? "0" + month : month}/${
                  day < 10 ? "0" + day : day
                }/${year}`;
              };

              const formattedStartDate = formatDate(project?.startDate);

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
                case +ProjectStatus.Cancelled:
                  style = "text-[#000] bg-[#ddd]";
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
            })
          )}
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
