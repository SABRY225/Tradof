import { motion } from "motion/react";
import { ProjectStatus } from "@/Util/projectStatus";
import photo from "../../../assets/images/1560a64114a9372e.jpg";

const projects = [
  {
    id: 1,
    description: "Translation of an article about me sad dasad",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    startAt: "2024-10-15",
    deadlineByDays: "21",
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 2,
    description: "Translation of an article about me sad dasad",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    startAt: "2024-10-15",
    deadlineByDays: "21",
    status: ProjectStatus.COMPLETED,
  },
  {
    id: 3,
    description: "Translation of an article about me sad dasad",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    startAt: "2024-10-15",
    deadlineByDays: "21",
    status: ProjectStatus.INPROGRESS,
  },
  {
    id: 4,
    description: "Translation of an article about me sad dasad",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    startAt: "2024-10-15",
    deadlineByDays: "21",
    status: ProjectStatus.INPROGRESS,
  },
  {
    id: 5,
    description: "Translation of an article about me sad dasad",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    startAt: "2024-10-15",
    deadlineByDays: "21",
    status: ProjectStatus.INPROGRESS,
  },
  {
    id: 6,
    description: "Translation of an article about me sad dasad",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    startAt: "2024-10-15",
    deadlineByDays: "21",
    status: ProjectStatus.INPROGRESS,
  },
  {
    id: 7,
    description: "Translation of an article about me sad dasad",
    owner: {
      image: photo,
      name: "Mohamed Abdalrazek",
    },
    startAt: "2024-10-15",
    deadlineByDays: "21",
    status: ProjectStatus.INPROGRESS,
  },
];

export default function CurrentProjects({ classes }) {
  return (
    <motion.div
      initial={{ x: "-50rem" }}
      animate={{ x: "0" }}
      transition={{ type: "keyframes", duration: 0.8 }}
      className={classes}
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead className="bg-white border-b-[20px] border-background-color font-semibold text-[15px]">
            <th className="p-3">Projects</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Start at</th>
            <th className="p-3">Deadline</th>
            <th className="p-3 text-center">State</th>
          </thead>
          <tbody>
            {projects.map((project) => {
              let style = "";
              switch (project.status) {
                case ProjectStatus.ACTIVE:
                  style = "text-[#00A200] bg-[#C3FFC3]";
                  break;
                case ProjectStatus.INPROGRESS:
                  style = "text-[#A20000] bg-[#FFC3C3]";
                  break;
                case ProjectStatus.COMPLETED:
                  style = "text-[#A26A00] bg-[#FFEAC3]";
                  break;
              }
              return (
                <tr
                  key={project.id}
                  className="bg-white border-b-[8px] border-background-color"
                >
                  <td className="p-3 truncate max-w-[250px]">
                    {project.description}
                  </td>
                  <td className="flex gap-2 p-3 items-center">
                    <img
                      src={project.owner.image}
                      alt="photo"
                      width={30}
                      className="h-[30px] rounded-full object-cover"
                    />
                    <p className="text-[12px]">{project.owner.name}</p>
                  </td>
                  <td className="p-3 text-[13px]">{project.startAt}</td>
                  <td className="p-3 text-[13px]">
                    {project.deadlineByDays} days
                  </td>
                  <td className="p-3 w-[80px]">
                    <div
                      className={`w-[80px] text-center py-[5px] px-[8px] rounded-lg font-[500] text-[13px] ${style}`}
                    >
                      {project.status}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="controls flex justify-between text-main-color font-medium">
        <div className="cursor-pointer">Previous</div>
        <div className="cursor-pointer">Next</div>
      </div>
    </motion.div>
  );
}
