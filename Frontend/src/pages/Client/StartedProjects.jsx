import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import PageTitle from "@/UI/PageTitle";
import { useAuth } from "@/context/AuthContext";
import { getStartedProjects } from "@/Util/Https/companyHttp";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Avatar } from "@mantine/core";
import { ProjectStatus } from "@/Util/status";

const ITEMS_PER_PAGE = 20;

const StartedProjects = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    user: { userId, token },
  } = useAuth();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["started-projects", userId, filter, searchQuery],
    queryFn: ({ pageParam = 1, signal }) =>
      getStartedProjects({
        id: userId,
        token,
        page: pageParam,
        pageSize: ITEMS_PER_PAGE,
        status: filter === "All" ? undefined : filter,
        search: searchQuery || undefined,
      }),
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.count / ITEMS_PER_PAGE);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const projects = data?.pages.flatMap((page) => page.items) || [];

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  console.log(projects);
  return (
    <div className="bg-background-color">
      <PageTitle
        title="Started Projects"
        subtitle="Projects that have been assigned to freelancers"
      />
      <div className="container max-w-screen-xl mx-auto w-full py-[30px] px-4">
        {/* Top Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-[16px] font-semibold">State:</div>
              <div className="flex gap-4">
                {["All", "Active", "Review", "Complete"].map((state) => (
                  <label
                    key={state}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={state}
                      checked={filter === state}
                      onChange={(e) => setFilter(e.target.value)}
                      className="accent-main-color"
                    />
                    <span className="text-[14px]">{state}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="relative w-full md:w-[300px]">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded px-3 py-2 pr-10 bg-transparent border border-[#D6D7D7] focus:outline-none focus:ring-2 focus:ring-main-color text-[14px]"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => {
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
              <div
                key={project?.id}
                className="bg-card-color py-[15px] px-[30px] rounded-lg shadow"
              >
                <div>
                  <div className="flex justify-between">
                    <div className="font-bold flex items-center">
                      <Avatar
                        src={project?.profileImageUrl}
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-[16px] font-bold ml-2">
                        <div>
                          {project?.firstName} {project?.lastName}
                        </div>
                        <div className="text-[13px] font-light">
                          {project?.email}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-md text-sm ${style}`}
                      >
                        {project.status?.statusName || project.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-[22px] font-bold mt-2">
                    {project?.title}
                  </div>
                  <div className="border border-main-color my-3"></div>
                  <div className="text-[15px]">
                    <div className="font-semibold mb-2">Project details</div>
                    <div className="font-light">{project?.description}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-[14px]">
                      <span className="font-semibold">Start Date:</span>{" "}
                      <span className="font-light">
                        {new Date(project?.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-[14px]">
                      <span className="font-semibold">Deadline:</span>{" "}
                      <span className="font-light">{project?.days} days</span>
                    </div>
                    <div className="text-[14px]">
                      <span className="font-semibold">Price:</span>{" "}
                      <span className="font-light">${project?.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {isFetchingNextPage && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-color mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartedProjects;
