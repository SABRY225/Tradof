import photo from "../../../assets/images/1560a64114a9372e.jpg";
import {
  timer,
  grayOffers,
  grayBudget,
  whitePlus,
  openPage,
} from "../../../assets/paths.js";
import { motion } from "motion/react";

const projects = [
  {
    id: 1,
    description: "Translation of an article about medical tools",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    age: 4,
    offers: 16,
    budget: {
      min: 50,
      max: 100,
    },
  },
  {
    id: 1,
    description: "Translation of an article about medical tools",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    age: 4,
    offers: 16,
    budget: {
      min: 50,
      max: 100,
    },
  },
  {
    id: 2,
    description: "Translation of an article about medical tools",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    age: 3,
    offers: 16,
    budget: {
      min: 50,
      max: 100,
    },
  },
  {
    id: 4,
    description: "Translation of an article about medical tools",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    age: 5,
    offers: 16,
    budget: {
      min: 50,
      max: 100,
    },
  },
];

export default function DiscoverProject() {
  return (
    <motion.div initial={{ x: "-50rem" }} animate={{ x: "0rem" }}
    transition={{type:"keyframes" , duration:0.8}}>
      <h1 className="flex justify-between font-semibold text-[20px]">
        Discover more projects
        <button type="button">
          <img src={openPage} alt="" />
        </button>
      </h1>
      {projects.map((project) => (
        <div
          key={project.id}
          className="my-2 shadow-md relative p-[15px] px-[25px] space-y-[10px] bg-white rounded-lg font-roboto-condensed"
        >
          <div className="font-roboto-condensed text-[20px]">
            {project.description}
          </div>
          <div className="flex items-center gap-2">
            <img
              src={project.owner.image}
              alt="photo"
              width={30}
              className="h-[30px] rounded-full object-cover"
            />
            <p className="text-[12px]  font-roboto-condensed">
              {project.owner.name}
            </p>
          </div>
          <div className="flex gap-[30px]">
            <div className="flex gap-2">
              <img src={timer} alt="icon" width={15} />
              <p className="text-gray-500 text-[12px]">
                {project.age} minutes age
              </p>
            </div>
            <div className="flex gap-2">
              <img src={grayOffers} alt="icon" width={15} />
              <p className="text-gray-500 text-[12px]">
                {project.offers} offers
              </p>
            </div>
            <div className="flex gap-2">
              <img src={grayBudget} alt="icon" width={15} />
              <p className="text-gray-500 text-[12px]">
                ${project.budget.min} - ${project.budget.max}
              </p>
            </div>
          </div>
          <div className="flex gap-3 absolute bottom-5 right-5 bg-main-color p-1 px-3 rounded-md text-white font-roboto-condensed text-[13px]">
            <img src={whitePlus} alt="icon" width={12} />
            Add Offer
          </div>
        </div>
      ))}
    </motion.div>
  );
}
