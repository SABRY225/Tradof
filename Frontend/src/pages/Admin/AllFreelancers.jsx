import { useQuery } from "@tanstack/react-query";
import { getFreelancersAndCompanies } from "@/Util/Https/adminHttp";
import { useAuth } from "@/context/AuthContext";
import photo from "../../assets/images/1560a64114a9372e.jpg";
import { useNavigate } from "react-router-dom";

export default function AllFreelancers() {
  const navigate = useNavigate();
  const {
    user: { token },
  } = useAuth();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getFreelancersAndCompanies({ token }),
  });

  const freelancers = users?.filter((user) => user.role === "Freelancer") || [];

  const truncateText = (text, maxLength = 15) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-background-color min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">All Freelancers</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Back to Dashboard
          </button>
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
                {freelancers.map((freelancer) => (
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
      </div>
    </div>
  );
}
