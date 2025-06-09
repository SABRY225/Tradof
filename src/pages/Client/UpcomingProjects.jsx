import { useState, useEffect, useMemo } from "react";
import { blueOffers, openPage, rabash } from "@/assets/paths";
import PageTitle from "@/UI/PageTitle";
import { deleteProject, getUpcomingdProjects } from "@/Util/Https/companyHttp";
import { useAuth } from "@/Context/AuthContext";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { message, Modal } from "antd";

const ITEMS_PER_PAGE = 5;

function UpcomingProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    user: { userId, token },
  } = useAuth();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProject({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-upcoming-projects", userId]);
      message.success("Project Deleted Successfully");
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Failed to delete project"
      );
    },
  });

  const showDeleteConfirm = (projectId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this project?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteMutation.mutate(projectId);
      },
    });
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["upcoming-projects", userId],
    queryFn: ({ pageParam = 1 }) =>
      getUpcomingdProjects({
        id: userId,
        token,
        page: pageParam,
        pageSize: ITEMS_PER_PAGE,
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

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter((project) => {
      return project.name?.toLowerCase().includes(query);
    });
  }, [projects, searchQuery]);

  return (
    <div className="bg-background-color min-h-screen">
      <PageTitle
        title="Upcoming Projects"
        subtitle="Projects that haven't been assigned to freelancers"
      />
      <div className="container max-w-screen-xl mx-auto w-full py-[30px] px-4">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-[400px] flex gap-2">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded px-3 py-2 bg-transparent border border-[#D6D7D7] focus:outline-none focus:ring-2 focus:ring-main-color text-[14px]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.length === 0 && (
            <div className="text-center py-4 text-[20px] font-semibold text-gray-500">
              {searchQuery
                ? "No projects found matching your search"
                : "No projects found"}
            </div>
          )}
          {filteredProjects.map((project) => (
            <div
              key={project?.id}
              className="bg-card-color py-[15px] px-[30px] rounded-lg shadow"
            >
              <div>
                <div className="flex justify-between items-center">
                  <div className="text-[22px] font-bold">{project?.name}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-main-color">
                      <img src={blueOffers} alt="offers icon" width={20} />
                      <span className="text-[14px] font-medium">
                        {project?.numberOfOffers} Offers
                      </span>
                    </div>
                    <Link to={`/user/project/offer/${project.id}`}>
                      <img
                        src={openPage}
                        alt="view offers"
                        width={20}
                        className="cursor-pointer"
                      />
                    </Link>
                  </div>
                </div>
                <div className="border border-main-color my-3"></div>
                <div className="text-[15px]">
                  <div className="font-semibold mb-2">Project details</div>
                  <div className="font-light">{project?.description}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="text-[14px]">
                    <span className="font-semibold">Language Pair:</span>{" "}
                    <span className="font-light">
                      {project?.languageFrom?.languageName} (
                      {project?.languageFrom?.languageCode}) -{" "}
                      {project?.languageTo?.languageName} (
                      {project?.languageTo?.languageCode})
                    </span>
                  </div>
                  <div className="text-[14px]">
                    <span className="font-semibold">Category:</span>{" "}
                    <span className="font-light">
                      {project?.specialization?.name}
                    </span>
                  </div>
                  <div className="text-[14px]">
                    <span className="font-semibold">Delivery Time:</span>{" "}
                    <span className="font-light">{project?.days} days</span>
                  </div>
                  <div className="text-[14px]">
                    <span className="font-semibold">Budget:</span>{" "}
                    <span className="font-light">
                      {project?.minPrice} EGP - {project?.maxPrice} EGP
                    </span>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => showDeleteConfirm(project.id)}
                    className="flex items-center gap-2 text-[#FF3B30] hover:opacity-80 transition-opacity"
                  >
                    <img src={rabash} alt="delete" width={20} />
                    <span className="text-[14px] font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* No Results Message */}
          {!isLoading && projects.length === 0 && (
            <div className="text-center text-gray-500 py-8 text-lg mb-44">
              No projects found with that name.
            </div>
          )}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-color mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingProjects;
