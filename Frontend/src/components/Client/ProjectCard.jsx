
import convertDateToCustomFormat from '@/Util/convertDate';
import { fatchProjectCard } from '@/Util/Https/http';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <div className='mx-2'>
            <div className='text-[15px] font-roboto-condensed'>Project card</div>
            <div className="bg-card-color py-[15px] px-[30px] mb-10 rounded-lg shadow">
              <div>
                <div className='font-medium mb-3'>Project details</div>
                <div className='ml-5'>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Project state </div> <div className='ml-20 font-bold'>{project?.projectState}</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Publication date </div> <div className='ml-20 font-light'>{convertDateToCustomFormat(project?.projectStartDate) }</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Budget </div> <div className='ml-20 font-light'>{project?.budget.minPrice}$ - {project?.budget.maxPrice}$</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Duration </div> <div className='ml-20 font-light'>{project?.duration} Days</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Average Offers </div> <div className='ml-20 font-light'>{project?.averageOffers}</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>No.of Offers </div> <div className='ml-20 font-light'>{project?.numberOfOffers}</div></div>
                </div>
              </div>
              <div className="border border-main-color my-3"></div>
              <div>
                <div className='font-medium mb-3'>Project owner</div>
                <div className='ml-5'>
                  <div className='flex justify-start items-start'>
                    <img src={project?.owner?.profilePicture} alt={project?.owner?.name} width={50} className='rounded-full' />
                    <div>
                      <div className='font-bold'>{project?.ownerName}</div>
                      <div className='font-light text-sm'>{project?.ownerEmail}</div>
                    </div>
                  </div>
                  <div className='flex justify-start items-start mt-3'><div className='font-light w-32'>Company Name</div> <div className='ml-20 font-light'>{project?.companyName }</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Registered at </div> <div className='ml-20 font-light'>{convertDateToCustomFormat(project?.registeredAt) }</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Total projects </div> <div className='ml-20 font-light'>{project?.totalProjects}</div></div>
                  <div className='flex justify-start items-start'><div className='font-light w-32'>Opening projects </div> <div className='ml-20 font-light'>{project?.openProjects}</div></div>
                </div>
              </div>
            </div>
        </div>
    )
}


export default ProjectCard