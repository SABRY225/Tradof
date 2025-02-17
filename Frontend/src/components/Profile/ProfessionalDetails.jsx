import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function ProfessionalDetails({ professionalDetails }) {
  return (
    <>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Professional Details
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <div className="flex gap-5">
          <h1 className="text-gray-500">CV</h1>
          <motion.div whileHover={{ borderBottom: "2px solid #3b82f6" }}>
            <Link
              to={`/${professionalDetails.cv}`}
              download={professionalDetails.cv}
              className="text-blue-500"
            >
              {professionalDetails.cv}
            </Link>
          </motion.div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-gray-500">Certifications</h1>
          <ul className="flex flex-col gap-2 list-decimal">
            {professionalDetails.certifications.map((certification, index) => (
              <motion.li
                key={index}
                whileHover={{ borderBottom: "2px solid #3b82f6" }}
                className="w-fit"
              >
                <Link
                  to={`/${certification}`}
                  download={certification}
                  className="text-blue-500"
                >
                  {certification}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
