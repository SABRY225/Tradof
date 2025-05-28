import { search } from "@/assets/paths";
import PageTitle from "../../UI/PageTitle";
import Projects from "@/components/AvailableProjects/Projects";
import { Box } from "@mui/material";
import { Minus, Plus } from "lucide-react";
import Combobox from "../../components/ui/Combobox";
import { useEffect, useState, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getUnassignedProjects } from "@/Util/Https/freelancerHttp";
import { useInfiniteQuery } from "@tanstack/react-query";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const ITEMS_PER_PAGE = 20;

export default function AvailableProjects() {
  const [handleLanguage, setHandleLanguage] = useState([]);
  const { languages } = useLoaderData();
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
    queryKey: ["unassigned-projects", userId],
    queryFn: ({ pageParam = 1, signal }) =>
      getUnassignedProjects({
        signal,
        token,
        indexPage: pageParam,
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
  const totalCount = data?.pages[0]?.count || 0;

  useEffect(() => {
    if (languages) {
      let editing = languages.map((lang) => ({
        id: lang.id,
        name: `${lang.languageName}(${lang.countryName}) / ${lang.languageCode}(${lang.countryCode})`,
      }));
      setHandleLanguage(editing);
    }
  }, [languages]);

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

  return (
    <div className="bg-background-color">
      <PageTitle
        title="Available Projects"
        // subtitle="You can see all projects or search for the projects that suit you."
      />
      <div className="container max-w-screen-xl mx-auto w-full py-[30px] px-4">
        <div className="flex flex-col lg:flex-row gap-[20px]">
          <aside className="w-full lg:w-[400px] mt-16 p-4 lg:p-6 h-fit lg:sticky lg:top-20 border-r-0 lg:border-r-2 border-main-color border-dashed">
            <div className="mb-6 relative">
              <label
                htmlFor="project-search"
                className="absolute -top-2 left-3 bg-background-color px-1 text-xs z-10"
              >
                Search
              </label>
              <input
                id="project-search"
                type="text"
                placeholder="Substring of project name"
                className="text-sm w-full rounded px-3 py-2 pr-10 bg-transparent border border-[#D6D7D7] focus:outline-none focus:ring-2 focus:ring-main-color placeholder:text-[14px]"
              />
              <img
                src={search}
                alt="search"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
            <div className="text-[14px] mb-6">
              <h3 className="font-medium font-epilogue mb-2">Categories</h3>
              <ul className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`cat${i}`}
                      className="accent-main-color"
                    />
                    <label htmlFor={`cat${i}`} className="text-[14px]">
                      List Item
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Language Pair */}
            <div className="text-[14px] mb-6">
              <h1 className="font-medium font-epilogue">Language Pair </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full overflow-hidden">
                  {handleLanguage && (
                    <Combobox
                      List={handleLanguage}
                      initial="From language"
                      className="text-[12px]"
                    />
                  )}
                </div>
                <div className="w-full">
                  {handleLanguage && (
                    <Combobox
                      List={handleLanguage}
                      initial="To language"
                      className="text-[12px]"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="text-[14px] mb-6">
              <h3 className="font-medium font-epilogue mb-2">Delivery time</h3>
              <ul className="space-y-2">
                {[
                  "Less than 0 week",
                  "From 1 to 2 weeks",
                  "From 2 weeks to 3 month",
                  "From one month to three month",
                  "More than 3 months",
                ].map((label, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      id={`delivery${i}`}
                      className="peer accent-main-color"
                    />
                    <label
                      htmlFor={`delivery${i}`}
                      className="text-[14px] cursor-pointer"
                    >
                      {label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[14px] w-full">
              <h1 className="font-medium font-epilogue">Budget</h1>
              <div>
                <div className="relative w-full">
                  <input
                    type="number"
                    className={`w-full pr-10 ${commonClasses}`}
                    placeholder="Min budget ($)"
                  />
                  <button
                    type="button"
                    className="outlet-none absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {projects.map((project) => (
                <Projects key={project.id} project={project} />
              ))}
            </div>
            {isFetchingNextPage && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-color mx-auto"></div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
