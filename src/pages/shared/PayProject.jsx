import { useState, useEffect } from "react";
import ProjectDetails from "@/components/shared/ProjectDetails";
import ButtonFelid from "@/UI/ButtonFelid";
import { getCompany } from "@/Util/Https/companyHttp";
import { getFreelancer } from "@/Util/Https/freelancerHttp";
import { fatchProjectDetailes, createProjectRating } from "@/Util/Https/http";
import Cookies from "js-cookie";
import PhoneInput from "react-phone-number-input";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { stare, emptyStare } from "@/assets/paths.js";
import { FadeLoader } from "react-spinners";
import { message } from "antd";

export default function PayProject() {
  const { project, userData } = useLoaderData();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    user: { token, role },
  } = useAuth();

  useEffect(() => {
    // Set initial rating and review based on user role
    if (role === "Freelancer" && project?.ratingFromFreelancer) {
      setRating(project.ratingFromFreelancer.ratingValue);
      setReview(project.ratingFromFreelancer.review);
    } else if (role === "CompanyAdmin" && project?.ratingFromCompany) {
      setRating(project.ratingFromCompany.ratingValue);
      setReview(project.ratingFromCompany.review);
    }
  }, [project, role]);

  console.log(project);
  const companyFiles = project?.files.filter(
    (file) => file.isFreelancerUpload === false
  );
  const freelancerFiles = project?.files.filter(
    (file) => file.isFreelancerUpload === true
  );

  const handleRatingSubmit = async () => {
    if (!review.trim()) {
      alert("Please write a review before submitting your rating");
      return;
    }

    try {
      setIsSubmitting(true);
      await createProjectRating({
        token,
        data: {
          ratingValue: rating,
          review: review.trim(),
          projectId: project?.id,
          ratedToId:
            role === "Freelancer" ? project?.companyId : project?.freelancerId,
          ratedById:
            role === "Freelancer" ? project?.freelancerId : project?.companyId,
        },
      });
      message.success("Rating and review submitted successfully!");
      // setReview("");
      // setRating(0);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      message.error(error?.message || "Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(project);

  return (
    <div className="bg-background-color">
      <div className="container max-w-screen-xl mx-auto w-full p-5 py-[30px] space-y-5">
        <header className="font-medium">
          <span className="text-main-color font-roboto-condensed">
            Dashboard /{" "}
          </span>
          Project Invoice /{" "}
          <span className="font-regular italic">{project?.name}</span>
        </header>
        <div className="space-y-[20px] bg-card-color rounded-[8px] px-[20px] py-[20px] shadow">
          <div className="flex flex-wrap md:grid grid-cols-[max-content_1fr_1fr] gap-2 items-center">
            <img
              src={userData?.profileImageUrl}
              alt="userData photo"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              {userData?.companyName ? (
                <>
                  <div className="flex gap-5 items-center font-poppins">
                    {"Company: " + userData?.companyName}
                  </div>
                  <div className="flex gap-5 items-center font-poppins text-[12px]">
                    {"Manager: " +
                      userData?.firstName +
                      " " +
                      userData?.lastName}
                  </div>
                </>
              ) : (
                <div className="flex gap-5 items-center font-poppins">
                  {userData?.firstName + " " + userData?.lastName}
                </div>
              )}

              <div className="flex gap-5 items-center font-poppins">
                {userData?.email}
              </div>
            </div>
            <div>
              <div className="flex gap-5 items-center font-poppins">
                <span>Phone:</span>
                <PhoneInput
                  international
                  className="custom-phone-input"
                  placeholder={userData?.phone}
                  value={userData?.phone}
                  disabled={true}
                  defaultCountry="US"
                />
              </div>
              <div className="flex gap-5 items-center font-poppins">
                <span>Country:</span>
                {userData?.countryName || userData?.companyAddress}
              </div>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex justify-center gap-[30px] border-t border-gray-200 pt-4 mt-4 bg-card-color rounded-[8px] px-[20px] py-[20px] shadow">
          <div>
            <h2 className="text-[15px] font-medium mb-3">Rate this Project</h2>
            <h1 className="font-medium font-roboto">
              You can add rate for{" "}
              {role === "Freelancer" ? "Company" : "Freelancer"}
            </h1>
            <p className="italic text-[12px] text-center">
              Please share with us your opinion about your dealings with the
              customer.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <button
                    key={starValue}
                    onClick={() => setRating(starValue)}
                    disabled={isSubmitting}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <img
                      src={starValue <= rating ? stare : emptyStare}
                      alt={`value-${starValue}`}
                      className="w-6 h-6"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-color resize-none text-[14px]"
              rows="3"
              disabled={isSubmitting}
            />
            <div className="flex gap-5 items-center">
              {((role === "Freelancer" && !project?.ratingFromFreelancer) ||
                (role === "CompanyAdmin" && !project?.ratingFromCompany)) && (
                <>
                  <button
                    onClick={handleRatingSubmit}
                    disabled={isSubmitting || rating === 0}
                    className={`px-4 py-2 rounded-md text-white font-medium transition-colors text-[14px] w-fit ${
                      isSubmitting || rating === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-main-color hover:bg-main-color/90"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Rating"}
                  </button>
                  {isSubmitting && (
                    <FadeLoader
                      color="#000"
                      cssOverride={{ width: "0px", height: "0px" }}
                      height={3}
                      width={3}
                      loading
                      margin={-11}
                      radius={15}
                      speedMultiplier={1}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <ProjectDetails
          project={project}
          projectFiles={companyFiles || []}
          translatedFiles={freelancerFiles || []}
          viewOnly={true}
          price={project?.price}
        />

        {/* <ButtonFelid
          text="Pay money"
          classes="bg-second-color px-10 py-2 font-medium m-auto"
        /> */}
      </div>
    </div>
  );
}

export const payProjectLoader = async ({ params }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const { projectId } = params;
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const projectData = await fatchProjectDetailes({ id: projectId, token });
    const person =
      role === "CompanyAdmin"
        ? await getFreelancer({
            id: projectData.freelancerId,
            token,
          })
        : await getCompany({
            id: projectData?.companyId,
            token,
          });
    return { project: projectData, userData: person };
  } catch (error) {
    console.error("Failed to fetch project:", error);
    throw new Response("Failed to load project data", { status: 500 });
  }
};
