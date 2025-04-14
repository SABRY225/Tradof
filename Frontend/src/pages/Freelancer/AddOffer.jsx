import ProjectCard from "@/components/Client/ProjectCard";
import ProjectDetailes from "@/components/Client/ProjectDetailes";
import FormAddOffer from "@/components/Freelancer/FormAddOffer";
import { useAuth } from "@/context/AuthContext";
import { fatchProjectDetailes } from "@/Util/Https/http";
import { Typography } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AddOffer() {
  const {
    user: { role },
  } = useAuth();
  const { projectId } = useParams();
  const [project, setData] = useState(null);
  const token = Cookies.get("token");
  console.log(token);
  console.log(projectId);

  useEffect(() => {
    const FatchData = async () => {
      const data = await fatchProjectDetailes({ id: projectId, token });
      console.log(data);

      setData(data);
    };
    FatchData();
  }, []);

  return (
    <>
      <div className="flex pl-5 pt-5 md:pl-10 md:pt-7 flex-wrap">
        <Typography variant="h6" className="text-main-color font-bold">
          {role == "Freelancer" ? `Project /` : `Dashboard /`}
          &nbsp;&nbsp;
        </Typography>

        <Typography variant="h6" className="font-bold">
          {role == "Freelancer" ? `Add Offer /` : `Projects /`}
        </Typography>
        <Typography
          className="font-light italic text-content-disabled"
          variant="h6"
        >
          {project?.name}
        </Typography>
      </div>

      <div className="flex flex-col md:flex-row py-5 px-5 md:px-8 gap-5">
        <div className="w-full md:w-8/12">
          <ProjectDetailes project={project} role={role} />
        </div>
        <div className="w-full md:w-4/12">
          <ProjectCard />
        </div>
      </div>

      <div>
        <FormAddOffer />
      </div>
    </>
  );
}
export default AddOffer;
