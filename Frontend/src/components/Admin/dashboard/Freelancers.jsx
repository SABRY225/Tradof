import { openPage } from "@/assets/paths";
import photo from "../../../assets/images/1560a64114a9372e.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Freelancers({ freelancers = [] }) {
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(7);
  const displayedFreelancers = freelancers.slice(0, displayCount);
  const hasMore = displayCount < freelancers.length;

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + 7);
  };

  const truncateText = (text, maxLength = 15) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h1 className="font-medium text-[18px]">Freelancers</h1>
        <img
          src={openPage}
          alt="View all freelancers"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/admin/freelancers")}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Phone</th>
                <th className="px-6 py-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {displayedFreelancers.map((freelancer) => (
                <tr
                  key={freelancer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={photo}
                        alt="person photo"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div>
                        <p
                          className="font-roboto-condensed truncate max-w-[200px]"
                          title={`${freelancer.firstName} ${freelancer.lastName}`}
                        >
                          {truncateText(
                            `${freelancer.firstName} ${freelancer.lastName}`
                          )}
                        </p>
                        <p className="font-epilogue italic text-gray-400 text-[12px]">
                          Freelancer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="font-roboto-condensed truncate max-w-[300px]"
                      title={freelancer.email}
                    >
                      {truncateText(freelancer.email, 40)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-epilogue text-main-color font-semibold text-[13px]">
                      {freelancer.phoneNumber}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-epilogue font-semibold cursor-pointer text-red-600 hover:text-red-700">
                      Block
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {hasMore && (
        <button
          onClick={handleShowMore}
          className="w-full mt-4 py-2 text-main-color font-semibold hover:bg-gray-50 rounded-md transition-colors"
        >
          Show More
        </button>
      )}
    </div>
  );
}
