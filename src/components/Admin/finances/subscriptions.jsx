import { useState } from "react";
import photo from "../../../assets/images/1560a64114a9372e.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAuth } from "@/Context/AuthContext";
import { getAllSubscriptions } from "@/Util/Https/adminHttp";
import Pagination from "@/UI/Pagination";

const ITEMS_PER_PAGE = 10;

const getPageNumbers = (total, current) => {
  const range = [];
  const delta = 2;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
};

export default function Subscriptions() {
  const {
    user: { token },
  } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: ({ signal }) => getAllSubscriptions({ signal, token }),
  });
  const [currentPage, setCurrentPage] = useState(1);

  const users = data ? data : [];
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  
  return (
    <div>
      <h1 className="font-medium text-[22px] font-roboto-condensed mb-3">
        Subscriptions plans
      </h1>
      <div>
        <div className="space-y-2 overflow-y-hidden overflow-x-auto">
          {isLoading && <p className="text-center">Loading...</p>}
          <AnimatePresence mode="wait">
            {paginatedUsers.map((user) => {
              const startSub = dayjs(user?.startSub); // replace with your actual date
              const today = dayjs();

              const diffDays = today.diff(startSub, "day");
              return (
                <motion.div
                  key={user?._id} // or unique id
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-full md:min-w-[1000px] flex flex-wrap md:flex-nowrap items-center bg-white px-6 py-2 gap-4 border-b rounded-md shadow-md"
                >
                  <div className="flex items-center gap-2 w-full md:w-1/5">
                    <img
                      src={user?.company.profileImageUrl}
                      alt="photo"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h1 className="font-roboto-condensed break-words">
                        {user?.company.firstName + " " + user?.company.lastName}
                      </h1>
                    </div>
                  </div>
                  <div className="px-2 font-roboto-condensed w-full md:w-1/5 break-words">
                    {user?.company.role}
                  </div>
                  <div className="px-2 font-roboto-condensed w-full md:w-1/5 break-words">
                    {user?.company.email}
                  </div>
                  <div
                    className={`px-2 font-roboto-condensed w-full md:w-1/5 break-words text-center font-semibold ${
                      user?.status === "accepted"
                        ? "text-[#3DCF3D]"
                        : "text-[#A26A00]"
                    }`}
                  >
                    {user?.status}
                  </div>
                  <div className="w-full md:w-1/5 flex flex-row justify-between gap-1 md:gap-1 px-2 break-words">
                    <span className="text-main-color font-semibold">
                      {user?.packageId.name}
                    </span>
                    <div className="font-roboto-condensed flex gap-1 md:gap-2">
                      <span className="font-semibold">
                        {user?.packageId.durationInMonths * 30 - diffDays}
                      </span>{" "}
                      day
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          length={users.length}
        />
        {/* <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {getPageNumbers(totalPages, currentPage).map((page, i) =>
            page === "..." ? (
              <span key={i} className="px-3 py-1 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-main-color text-white"
                    : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
}
