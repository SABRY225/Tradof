import { useAuth } from "@/context/AuthContext";
import ButtonFelid from "@/UI/ButtonFelid";
import { reviewRequest } from "@/Util/Https/freelancerHttp";
import { useMutation } from "@tanstack/react-query";

export default function ProjectCard({ projectDetails }) {
  const {
    user: { token },
  } = useAuth();
  const {
    mutate: requestReview,
    data,
    isPending,
  } = useMutation({
    mutationFn: reviewRequest,
    onSuccess: (data) => {
      console.log("Request sent successfully", data);
    },
    onError: (error) => {
      console.error("Error sending request", error);
    },
  });
  const isoString = projectDetails?.publicationDate;
  const date = new Date(isoString);
  const formattedDate = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const totalDays = projectDetails?.duration || 0;
  const duration = {
    week: Math.floor(totalDays / 7),
    day: Math.floor(totalDays) % 7,
  };
  const handleClick = () => {
    requestReview({ id: projectDetails?.id, token });
  };
  return (
    <div className=" flex-1 h-[100%]">
      <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
        Project card
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[10px] py-[20px]">
        <div className="border-b-2 border-main-color pb-5">
          <table className="border-separate border-spacing-x-2 text-[15px]">
            <tr>
              <td>Project state</td>
              <td
                className={`${
                  projectDetails?.state === "accept"
                    ? "text-green-500"
                    : "text-second-color"
                } font-semibold`}
              >
                {projectDetails?.state}
              </td>
            </tr>
            <tr>
              <td>Publication date</td>
              <td className="font-light">{formattedDate}</td>
            </tr>
            <tr>
              <td>Budget</td>
              <td className="font-light">{`$${projectDetails?.budget.minPrice} - $${projectDetails?.budget.maxPrice}`}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td className="font-light">{`${duration.week} Weeks, ${duration.day} days`}</td>
            </tr>
          </table>
        </div>
        <div>
          <h1 className="font-medium">Project Status</h1>
          <div className="flex w-[80%] m-auto justify-between my-5">
            <div className="step-one flex flex-col items-center space-y-1">
              <h1 className="bg-main-color text-white rounded-full w-6 h-6 text-center">
                1
              </h1>
              <h2 className="font-roboto-condensed">Work</h2>
            </div>
            <div className="bg-main-color mt-3 flex-1 h-[2px] rounded"></div>
            <div className="step-two flex flex-col items-center space-y-1">
              <h1 className="bg-main-color text-white rounded-full w-6 h-6 text-center bg-opacity-[0.5]">
                2
              </h1>
              <h2>Review</h2>
            </div>
            <div className="bg-main-color mt-3 flex-1 h-[2px] rounded"></div>
            <div className="step-three flex flex-col items-center space-y-1">
              <h1 className="bg-main-color text-white rounded-full w-6 h-6 text-center bg-opacity-[0.5]">
                3
              </h1>
              <h2 className="font-roboto-condensed">Finish</h2>
            </div>
          </div>
          <ButtonFelid
            text="Request a review"
            classes="bg-second-color px-2 py-1 font-regular m-auto"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
