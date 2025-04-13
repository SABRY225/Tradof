import convertDateToCustomFormat from '@/Util/convertDate';
import { fatchProjectCard } from '@/Util/Https/http';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from "../../assets/icons/logo.svg"
import { Avatar, Box } from '@mui/material';

function ProjectCard() {
  const { projectId } = useParams();
  const [project, setData] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const FatchData = async () => {
      const data = await fatchProjectCard({ id: projectId, token });
      setData(data);
    };
    FatchData();
  }, []);

  return (
    <Box className="mx-2">
      <Box className="text-[15px] font-roboto-condensed">Project card</Box>

      <Box className="bg-card-color py-[15px] px-[30px] mb-10 rounded-lg shadow">
        <Box>
          <Box className="font-medium mb-3">Project details</Box>
          <Box className="ml-5">
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Project state</Box>
              <Box className="ml-20 font-bold">{project?.projectState}</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Publication date</Box>
              <Box className="ml-20 font-light">{convertDateToCustomFormat(project?.projectStartDate)}</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Budget</Box>
              <Box className="ml-20 font-light">{project?.budget.minPrice}$ - {project?.budget.maxPrice}$</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Duration</Box>
              <Box className="ml-20 font-light">{project?.duration} Days</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Average Offers</Box>
              <Box className="ml-20 font-light">{project?.averageOffers}</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">No.of Offers</Box>
              <Box className="ml-20 font-light">{project?.numberOfOffers}</Box>
            </Box>
          </Box>
        </Box>

        <Box className="border border-main-color my-3"></Box>

        <Box>
          <Box className="font-medium mb-3">Project owner</Box>
          <Box className="ml-5">
            <Box className="flex justify-start items-center">
              <Avatar src={project?.projectOwnerImage} sx={{ width: 65, height: 65, mr: 2 }} />
              <Box>
                <Box className="font-bold">{project?.ownerName}</Box>
                <Box className="font-light text-sm">{project?.ownerEmail}</Box>
              </Box>
            </Box>
            <Box className="flex justify-start items-start mt-3">
              <Box className="font-light w-32">Company Name</Box>
              <Box className="ml-20 font-light">{project?.companyName}</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Registered at</Box>
              <Box className="ml-20 font-light">{convertDateToCustomFormat(project?.registeredAt)}</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Total projects</Box>
              <Box className="ml-20 font-light">{project?.totalProjects}</Box>
            </Box>
            <Box className="flex justify-start items-start">
              <Box className="font-light w-32">Opening projects</Box>
              <Box className="ml-20 font-light">{project?.openProjects}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectCard;
