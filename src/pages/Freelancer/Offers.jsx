import { useState, useEffect, useMemo } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PageTitle from "@/UI/PageTitle";
import { useAuth } from "@/Context/AuthContext";
import { fatchOffers } from "@/Util/Https/freelancerHttp";
import {
  calendar,
  grayBudget,
  timer,
  search,
  file,
  download,
  PDF,
  image,
  docs,
  xlsx,
  openPage,
} from "@/assets/paths";
import { useInfiniteQuery } from "@tanstack/react-query";
import { OfferStatus } from "@/Util/status";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const ITEMS_PER_PAGE = 20;

function Offers() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
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
    queryKey: ["offers", userId, filter],
    queryFn: ({ pageParam = 1, signal }) =>
      fatchOffers({
        userId,
        token,
        page: pageParam,
        pageSize: ITEMS_PER_PAGE,
        status: filter === "All" ? "" : OfferStatus[filter],
      }),
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.count / ITEMS_PER_PAGE);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const allOffers = data?.pages.flatMap((page) => page.items) || [];

  // Filter offers based on search query
  const filteredOffers = useMemo(() => {
    if (!searchQuery.trim()) return allOffers;

    const query = searchQuery.toLowerCase();
    return allOffers.filter((offer) => {
      return (
        offer.projecttitle?.toLowerCase().includes(query) ||
        offer.proposalDescription?.toLowerCase().includes(query) ||
        `${offer.companyFirstName} ${offer.companyLastName}`
          .toLowerCase()
          .includes(query) ||
        offer.companyEmail?.toLowerCase().includes(query) ||
        offer.offerPrice?.toString().includes(query) ||
        offer.days?.toString().includes(query)
      );
    });
  }, [allOffers, searchQuery]);

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

  const handleOpenOffer = (proposal) => {
    // console.log(proposal);
    navigate(`../project/add-offer/${proposal.projectId}`, {
      state: {
        proposal: {
          id: proposal.id,
          projecttitle: proposal.projecttitle,
          description: proposal.proposalDescription,
          budget: proposal.offerPrice,
          deadline: proposal.days,
          attachments: proposal.proposalAttachments,
          companyInfo: {
            id: proposal.companyId,
            name: `${proposal.companyFirstName} ${proposal.companyLastName}`,
            email: proposal.companyEmail,
            image: proposal.companyImage,
          },
          proposalStatus: proposal.proposalStatus,
        },
      },
    });
  };

  return (
    <div className="bg-background-color min-h-screen">
      <PageTitle title="Your Offers" subtitle="Follow your offers" />
      <div className="container max-w-screen-xl mx-auto w-full py-[30px] px-4">
        {/* Top Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-[16px] font-semibold">State:</div>
              <RadioGroup
                row
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex gap-4"
              >
                {["All", "Pending", "Accepted", "Declined", "Canceled"].map(
                  (state, index) => (
                    <FormControlLabel
                      key={state}
                      value={state}
                      control={<Radio />}
                      label={state}
                      className="text-[14px]"
                    />
                  )
                )}
              </RadioGroup>
            </div>
            <div className="relative w-full md:w-[300px]">
              <input
                type="text"
                placeholder="Search offers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded px-3 py-2 pr-10 bg-transparent border border-[#D6D7D7] focus:outline-none focus:ring-2 focus:ring-main-color text-[14px]"
              />
              <img
                src={search}
                alt="search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="text-center py-4">Loading offers...</div>
          ) : filteredOffers.length === 0 ? (
            <div className="text-center py-4 text-[20px] font-semibold text-gray-500">
              {searchQuery
                ? "No offers found matching your search"
                : "No offers found"}
            </div>
          ) : (
            filteredOffers.map((offer) => {
              let style = "";
              switch (+offer?.proposalStatus) {
                case +OfferStatus.Accepted:
                  style = "text-[#00A200] bg-[#C3FFC3]";
                  break;
                case +OfferStatus.Declined:
                  style = "text-[#545454] bg-[#fff]";
                  break;
                case +OfferStatus.Canceled:
                  style = "text-[#A20000] bg-[#FFC3C3]";
                  break;
                case +OfferStatus.Pending:
                  style = "text-[#ffa200] bg-[#fff9c3]";
                  break;
              }

              return (
                <div
                  key={offer?.id}
                  className="bg-card-color py-[15px] px-[30px] rounded-lg shadow"
                >
                  <div>
                    <div className="flex justify-between">
                      <div className="font-bold flex items-center">
                        <img
                          src={offer?.companyImage}
                          alt="company"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-[16px] font-bold ml-2">
                          <div>
                            {offer?.companyFirstName} {offer?.companyLastName}
                          </div>
                          <div className="text-[13px] font-light">
                            {offer?.companyEmail}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="mt-2">
                          <span
                            className={`px-3 py-1 rounded-md text-sm ${style}`}
                          >
                            {offer?.proposalStatus === 1
                              ? "Accepted"
                              : offer?.proposalStatus === 2
                              ? "Declined"
                              : offer?.proposalStatus === 3
                              ? "Canceled"
                              : "Pending"}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOpenOffer(offer)}
                          className="flex items-center gap-2 text-main-color hover:text-main-color/80 transition-colors"
                          title="Add Offer"
                        >
                          <img
                            src={openPage}
                            alt="view offers"
                            width={20}
                            className="cursor-pointer"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="text-[22px] font-bold mt-2">
                      {offer?.projecttitle}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <img src={timer} alt="time" width={15} />
                        <p className="text-gray-500 text-[12px]">
                          {new Date(offer.timePosted).toDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={grayBudget} alt="budget" width={15} />
                        <p className="text-gray-500 text-[12px]">
                          Price ${offer.offerPrice}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={calendar} alt="calendar" width={15} />
                        <p className="text-gray-500 text-[12px]">
                          Delivery time {offer.days} days
                        </p>
                      </div>
                    </div>
                    <div className="border border-main-color my-3"></div>
                    <div className="text-[15px]">
                      <div className="font-semibold mb-2">Offer details</div>
                      <div className="font-light">
                        {offer?.proposalDescription}
                      </div>
                    </div>
                    <div className="w-fit text-[15px] mt-2">
                      <div className="font-semibold mb-2">Attachment files</div>
                      <div className="flex items-center gap-2">
                        {offer?.proposalAttachments.length > 0 ? (
                          offer?.proposalAttachments.map((attachment) => {
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
                                key={attachment?.id}
                                className="relative cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    attachment?.attachmentUrl,
                                    "_blank"
                                  )
                                }
                              >
                                <img src={fileIcon} alt="file" />
                                <img
                                  src={download}
                                  alt="download"
                                  width={15}
                                  className="absolute bottom-0 right-[-5px]"
                                />
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-gray-500">No attachments</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {isFetchingNextPage && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-color mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Offers;
