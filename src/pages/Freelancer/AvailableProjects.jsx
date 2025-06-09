import { search } from "@/assets/paths";
import PageTitle from "../../UI/PageTitle";
import Projects from "@/components/AvailableProjects/Projects";
import { Box } from "@mui/material";
import { Minus, Plus } from "lucide-react";
import Combobox from "../../components/ui/Combobox";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getUnassignedProjects } from "@/Util/Https/freelancerHttp";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllSpecializations } from "@/Util/Https/http";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const ITEMS_PER_PAGE = 20;

const DELIVERY_TIME_OPTIONS = [
  { label: "Less than 0 week", value: 0 },
  { label: "From 1 to 2 weeks", value: 14 },
  { label: "From 2 weeks to 3 month", value: 90 },
  { label: "From one month to three month", value: 90 },
  { label: "More than 3 months", value: 90 },
];

export default function AvailableProjects() {
  const [handleLanguage, setHandleLanguage] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState();
  const [selectedLanguages, setSelectedLanguages] = useState({
    languageFromId: undefined,
    languageToId: undefined,
  });
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState();
  const [selectedBudget, setSelectedBudget] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { languages } = useLoaderData();
  const {
    user: { userId, token },
  } = useAuth();

  const { data: specializations, isLoading: isLoadingSpecializations } =
    useQuery({
      queryKey: ["specializations"],
      queryFn: getAllSpecializations,
    });

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "unassigned-projects",
      userId,
      selectedSpecialization,
      selectedLanguages,
      selectedDeliveryTime,
      selectedBudget,
    ],
    queryFn: ({ pageParam = 1, signal }) =>
      getUnassignedProjects({
        signal,
        token,
        filter: {
          indexPage: pageParam,
          pageSize: ITEMS_PER_PAGE,
          specializationId: selectedSpecialization,
          languageFromId: selectedLanguages?.languageFromId,
          languageToId: selectedLanguages?.languageToId,
          deliveryTimeInDays: selectedDeliveryTime,
          budget: selectedBudget,
        },
      }),
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.count / ITEMS_PER_PAGE);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // console.log(data);
  const allProjects = data?.pages.flatMap((page) => page.items) || [];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      if (
        searchQuery &&
        !project.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [allProjects, searchQuery]);

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

  const handleBudgetChange = (type, value) => {
    const newValue = Math.max(
      0,
      Number(value) + (type === "increase" ? 1 : -1)
    );
    setSelectedBudget(newValue);
  };

  return (
    <div className="bg-background-color">
      <PageTitle title="Available Projects" />
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img
                src={search}
                alt="search"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
            <div className="text-[14px] mb-6">
              <h3 className="font-medium font-epilogue mb-2">
                Specializations
              </h3>
              <ul className="space-y-2">
                {isLoadingSpecializations ? (
                  <li className="text-center">Loading specializations...</li>
                ) : (
                  specializations?.map((spec) => (
                    <li key={spec.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`spec${spec.id}`}
                        className="accent-main-color"
                        checked={selectedSpecialization === spec.id}
                        onChange={() => setSelectedSpecialization(spec.id)}
                      />
                      <label htmlFor={`spec${spec.id}`} className="text-[14px]">
                        {spec.name}
                      </label>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Language Pair */}
            <div className="text-[14px] mb-6">
              <h1 className="font-medium font-epilogue">Language Pair </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full overflow-hidden">
                  {handleLanguage && (
                    <Combobox
                      List={[
                        { id: undefined, name: "From language" },
                        ...handleLanguage,
                      ]}
                      initial="From language"
                      className="text-[12px]"
                      value={selectedLanguages?.languageFromId}
                      onChange={(fromId) =>
                        setSelectedLanguages((prev) => ({
                          ...prev,
                          languageFromId: fromId,
                        }))
                      }
                    />
                  )}
                </div>
                <div className="w-full">
                  {handleLanguage && (
                    <Combobox
                      List={[
                        { id: undefined, name: "To language" },
                        ...handleLanguage,
                      ]}
                      initial="To language"
                      className="text-[12px]"
                      value={selectedLanguages?.languageToId}
                      onChange={(toId) =>
                        setSelectedLanguages((prev) => ({
                          ...prev,
                          languageToId: toId,
                        }))
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="text-[14px] mb-6">
              <h3 className="font-medium font-epilogue mb-2">Delivery time</h3>
              <ul className="space-y-2">
                {DELIVERY_TIME_OPTIONS.map((option, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      id={`delivery-${i}`}
                      className="peer accent-main-color"
                      checked={selectedDeliveryTime === option.value}
                      onChange={() => setSelectedDeliveryTime(option.value)}
                    />
                    <label
                      htmlFor={`delivery-${i}`}
                      className="text-[14px] cursor-pointer"
                    >
                      {option.label}
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
                    value={selectedBudget || ""}
                    onChange={(e) => setSelectedBudget(Number(e.target.value))}
                  />
                  <button
                    type="button"
                    className="outlet-none absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                    onClick={() =>
                      handleBudgetChange("decrease", selectedBudget || 0)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                    onClick={() =>
                      handleBudgetChange("increase", selectedBudget)
                    }
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
              {filteredProjects.map((project) => (
                <Projects key={project.id} project={project} />
              ))}
              {filteredProjects.length === 0 && <div className="text-[20px] font-bold text-gray-500 text-center mt-[50px]">Not found projects</div>}
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
