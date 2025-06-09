import { useAuth } from "@/context/AuthContext";
import person from "../../assets/images/1560a64114a9372e.jpg";
import { stare, emptyStare } from "../../assets/paths.js";

export default function ProjectOwnerCard({ ownerCard }) {
  const {
    user: { role },
  } = useAuth();
  const isoString = ownerCard?.registeredAt;
  const date = new Date(isoString);
  const formattedDate = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  console.log(role);
  return (
    <div className="flex-1 h-[100%]">
      <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
        Project owner
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[10px] py-[20px]">
        <div className="flex space-x-3">
          <img
            src={ownerCard?.image}
            alt="profile photo"
            className="rounded-full object-cover h-12 w-12"
          />
          <div className="text-[15px]">
            <h1 className="italic">{ownerCard?.company}</h1>
            <p className="font-light">Owner: {ownerCard?.name}</p>
          </div>
        </div>
        <div>
          <table className="border-separate border-spacing-x-2 text-[15px]">
            <tr>
              <td>Work at/in</td>
              <td className="font-light">{ownerCard?.company}</td>
            </tr>
            <tr>
              <td>Registered at</td>
              <td className="font-light">{formattedDate}</td>
            </tr>
            <tr>
              <td>Total projects</td>
              <td className="font-light">{ownerCard?.totalProjects}</td>
            </tr>
            <tr>
              <td>Opening projects</td>
              <td className="font-light">{ownerCard?.openProjects}</td>
            </tr>
          </table>
        </div>
        {/* <div className="flex flex-col items-center space-y-2">
          <h1 className="font-medium font-roboto">
            You can add rate for{" "}
            {role === "Freelancer" ? "Company" : "Freelancer"}
          </h1>
          <div className="flex space-x-2">
            <img src={stare} alt="value-1" />
            <img src={stare} alt="value-2" />
            <img src={stare} alt="value-3" />
            <img src={stare} alt="value-4" />
            <img src={emptyStare} alt="value-5" />
          </div>
          <p className="italic text-[12px] w-[90%] text-center">
            Please share with us your opinion about your dealings with the
            customer.
          </p>
        </div> */}
      </div>
    </div>
  );
}
