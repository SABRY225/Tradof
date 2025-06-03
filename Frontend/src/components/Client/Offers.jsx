import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import {
  fatchCurrentOffers,
  Acceptproposal,
  Denyproposal,
  deleteProject,
} from "@/Util/Https/companyHttp";
import { useNavigate, useParams } from "react-router-dom";
import convertDateToCustomFormat from "@/Util/convertDate";
import ButtonFelid from "@/UI/ButtonFelid";
import { docs, download, file, image, PDF, search, xlsx } from "@/assets/paths";
import ButtonFelidRej from "@/UI/ButtonFelidRej";
import { useAuth } from "@/context/AuthContext";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const commonClasses =
  "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const ITEMS_PER_PAGE = 20;

const OffersPage = () => {
  const { user } = useAuth();
  const token = user?.token;
  const navigate = useNavigate();
  const [budget, setBudget] = useState(0);
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["offers", projectId, budget],
    queryFn: ({ pageParam = 1 }) =>
      fatchCurrentOffers({
        PageIndex: pageParam,
        ProjectId: projectId,
        token,
        budget: budget,
        pageSize: ITEMS_PER_PAGE,
      }),
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.count / ITEMS_PER_PAGE);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: ({ proposalId }) =>
      Acceptproposal({
        projectId,
        proposalId,
        token,
      }),
    onSuccess: () => {
      toast.success("Proposal accepted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries(["offers", projectId]);
      navigate(`/user/project/${projectId}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to accept proposal", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const denyMutation = useMutation({
    mutationFn: ({ proposalId }) =>
      Denyproposal({
        projectId,
        proposalId,
        token,
      }),
    onSuccess: () => {
      toast.success("Proposal denied successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries(["offers", projectId]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to deny proposal", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: () => deleteProject({ id: projectId, token }),
    onSuccess: () => {
      toast.success("Project deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      navigate("/user/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const offers = data?.pages.flatMap((page) => page.items) || [];

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

  const handleBudgetChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setBudget(value);
  };

  const handleBudgetIncrement = (e) => {
    e.preventDefault();
    const newValue = Number(budget) + 1;
    setBudget(newValue);
  };

  const handleBudgetDecrement = (e) => {
    e.preventDefault();
    const newValue = Math.max(0, Number(budget) - 1);
    setBudget(newValue);
  };

  const handleAcceptProposal = (proposalId) => {
    acceptMutation.mutate({ proposalId });
  };

  const handleDenyProposal = (proposalId) => {
    denyMutation.mutate({ proposalId });
  };

  const handleDeleteProject = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this project?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This action cannot be undone. All project data will be permanently deleted.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deleteProjectMutation.mutate();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-color mx-auto"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  console.log(offers);

  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full py-[30px] px-4">
        <div className="flex flex-col lg:flex-row gap-[20px]">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-[350px] p-4 lg:p-6 h-fit lg:sticky lg:top-20 border-r-0 lg:border-r-2 border-main-color border-dashed">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Project Options</h2>
              <ButtonFelidRej
                text="Delete Project"
                type="button"
                onClick={handleDeleteProject}
                disabled={deleteProjectMutation.isLoading}
                classes="text-[12px] font-medium px-[15px] py-[5px]"
              />
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="offer-search"
                className="absolute -top-2 left-3 bg-background-color px-1 text-xs z-10"
              >
                Search
              </label>
              <input
                id="offer-search"
                type="text"
                placeholder="Search offers..."
                className="text-sm w-full rounded px-3 py-2 pr-10 bg-transparent border border-[#D6D7D7] focus:outline-none focus:ring-2 focus:ring-main-color placeholder:text-[14px]"
              />
              <img
                src={search}
                alt="search"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>

            {/* Delivery Time Filter */}
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

            {/* Budget Filter */}
            <div className="text-[14px] w-full">
              <h1 className="font-medium font-epilogue">Budget</h1>
              <div>
                <div className="relative w-full">
                  <input
                    type="number"
                    value={budget}
                    onChange={handleBudgetChange}
                    className={`w-full pr-10 ${commonClasses}`}
                    placeholder="Min budget ($)"
                    min="0"
                  />
                  <button
                    type="button"
                    onClick={handleBudgetDecrement}
                    className="outlet-none absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleBudgetIncrement}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-main-color"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Offers List */}
          <main className="flex-1">
            <div className="grid grid-cols-1 gap-4">
              {offers.map((offer, index) => (
                <div key={offer.id || index}>
                  <div className="flex items-center gap-2 mb-[-15px] ml-[10px]">
                    <img
                      src={offer?.freelancerImageUrl}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover bg-white border border-second-color"
                    />
                    <div className="text-[16px] font-roboto-condensed">
                      <div>{offer?.freelancerName}</div>
                    </div>
                  </div>
                  <div className="bg-card-color rounded-lg p-[20px] ">
                    <div className="font-light">
                      {offer?.proposalDescription}
                    </div>
                    <div className="w-full h-[2px] bg-main-color mt-2"></div>
                    <div className="flex flex-col gap-1 mt-4">
                      <div className="text-[13px]">
                        <span className="font-semibold">Delivery Time:</span>{" "}
                        <span className="font-light">{offer?.days} days</span>
                      </div>
                      <div className="text-[13px]">
                        <span className="font-semibold">Budget:</span>{" "}
                        <span className="font-light">${offer.offerPrice}</span>
                      </div>

                      <div className="w-fit text-[13px]">
                        <div className="font-semibold">Attachment files</div>
                        <div className="flex items-center gap-2">
                          {offer?.proposalAttachments.length > 0 ? (
                            offer?.proposalAttachments.map(
                              (attachment, index) => {
                                const fileExtension = attachment?.attachmentUrl
                                  .split(".")
                                  .pop()
                                  .toLowerCase();
                                let fileIcon = file;

                                if (fileExtension === "pdf") {
                                  fileIcon = PDF;
                                } else if (
                                  ["jpg", "jpeg", "png", "gif"].includes(
                                    fileExtension
                                  )
                                ) {
                                  fileIcon = image;
                                } else if (
                                  ["doc", "docx"].includes(fileExtension)
                                ) {
                                  fileIcon = docs;
                                } else if (
                                  ["xls", "xlsx"].includes(fileExtension)
                                ) {
                                  fileIcon = xlsx;
                                }

                                return (
                                  <div
                                    key={attachment?.id || index}
                                    className="relative cursor-pointer"
                                    onClick={() =>
                                      window.open(
                                        attachment?.attachmentUrl,
                                        "_blank"
                                      )
                                    }
                                  >
                                    <img src={fileIcon} alt="file" width={18} />
                                    <img
                                      src={download}
                                      alt="download"
                                      width={13}
                                      className="absolute bottom-0 right-[-5px]"
                                    />
                                  </div>
                                );
                              }
                            )
                          ) : (
                            <div className="text-gray-500">No attachments</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4 gap-4">
                      <ButtonFelid
                        text="Accept"
                        type="button"
                        onClick={() => handleAcceptProposal(offer.id)}
                        disabled={
                          acceptMutation.isLoading || denyMutation.isLoading
                        }
                        classes="text-[10px] font-medium px-[10px] py-[5px] bg-second-color"
                      />
                      <ButtonFelidRej
                        text="Reject"
                        type="button"
                        onClick={() => handleDenyProposal(offer.id)}
                        disabled={
                          acceptMutation.isLoading || denyMutation.isLoading
                        }
                        classes="text-[10px] font-medium px-[10px] py-[5px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {offers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No offers found
              </div>
            )}

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
};

export default OffersPage;
