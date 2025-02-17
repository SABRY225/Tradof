import person from "../../../assets/images/1560a64114a9372e.jpg";
import { openPage } from "../../../assets/paths.js";
import { ProjectStatus } from "../../../Util/projectStatus";
const startProjects = [
  {
    id: 1,
    freelancer: {
      image: person,
      name: "Mohamed abdalrazek",
    },
    description: "Translation of an article about medical tools",
    startAt: "12/10/2015",
    deadlineByDays: 21,
    price: 50.25,
    status: ProjectStatus.ACTIVE,
  },
  {
    id: 2,
    freelancer: {
      image: person,
      name: "Mohamed abdalrazek",
    },
    description: "Translation of an article about medical tools",
    startAt: "12/10/2015",
    deadlineByDays: 21,
    price: 50.25,
    status: ProjectStatus.COMPLETED,
  },
  {
    id: 3,
    freelancer: {
      image: person,
      name: "Mohamed abdalrazek",
    },
    description: "Translation of an article about medical tools",
    startAt: "12/10/2015",
    deadlineByDays: 21,
    price: 50.25,
    status: ProjectStatus.INPROGRESS,
  },
];

export default function StartProject() {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h1 className="font-medium text-[18px]">Started Projects</h1>
        <img src={openPage} alt="" />
      </div>
      <ul className="space-y-[10px]">
        {startProjects.map((project) => {
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
            <li
              key={project.id}
              className="relative bg-white py-[10px] px-[30px] rounded-lg shadow"
            >
              <div className="flex items-center gap-3">
                <img
                  src={project.freelancer.image}
                  alt="freelancer image"
                  width={40}
                  className="rounded-full h-[40px] object-cover"
                />
                <p className="font-light">{project.freelancer.name}</p>
              </div>
              <div className="text-[18px] font-regular">
                {project.description}
              </div>
              <ul>
                <li className="text-[12px] font-semibold">
                  Start at:{" "}
                  <span className="font-light">{project.startAt}</span>
                </li>
                <li className="text-[12px] font-semibold">
                  Deadline:{" "}
                  <span className="font-light">
                    {project.deadlineByDays} day
                  </span>
                </li>
                <li className="text-[12px] font-semibold">
                  Price: <span className="font-light">${project.price}</span>
                </li>
              </ul>
              <div
                className={`absolute right-5 top-3 py-[5px] px-[20px] rounded-lg font-[500] text-[13px] ${style}`}
              >
                {project.status}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
