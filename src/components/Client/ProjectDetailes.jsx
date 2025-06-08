
import { files } from '@/assets/paths';
import ButtonFelid from '@/UI/ButtonFelid';
function ProjectDetailes({project,role}) {
    return (
        <div className='mx-2'>
            <div className='text-[15px] font-roboto-condensed'>Project Details</div>
            <div
                className=" bg-card-color py-[15px] px-[30px] mb-10 pb- rounded-lg shadow"
            >
                <div>
                    <div className="flex justify-between mb-5">
                        <div className="text-[28px] font-roboto-condensed">
                            {project?.name}
                        </div>
                    </div>
                    <ul>
                        <li className="text-[12px] font-semibold mb-10">
                            <div className='text-[20px] font-bold text-main-color'>Description Of Project{" "}</div>
                            <div className="font-regular text-[14px]">{project?.description} </div>
                        </li>
                        <li className="text-[12px] font-semibold flex items-start justify-start mb-10">
                            <div className='flex-1'>
                                <div className='text-[20px] font-bold text-main-color'>Language pair </div>
                                <span className="font-light text-[14px]">
                                    {project?.languageFrom.languageName} ({project?.languageFrom.countryName}) -
                                    {project?.languageTo.languageName} ({project?.languageTo.countryName})
                                </span>
                            </div >
                            <div className='flex-1'>
                                <div className='text-[20px] font-bold text-main-color'>IETF tag </div>
                                <span className="font-light text-[14px]">
                                    {project?.languageFrom.languageCode} ({project?.languageFrom.countryCode}) -
                                    {project?.languageTo.languageCode} ({project?.languageTo.countryCode})
                                </span>
                            </div>
                        </li>
                        {role=="Freelancer"?<></>:<>
                            <li className="text-[20px] font-semibold flex items-start justify-start">
                            <div className='flex-1'>
                                <div className='text-[20px] font-bold text-main-color mb-5'>Attachment files </div>
                                <ButtonFelid
                                icon={files}
                                    text="Files"
                                    type="submit"
                                    classes="rounded text-[15px] px-[30px] py-[7px] bg-second-color m-auto md:m-0"
                                />
                            </div >
                        </li>
                        </>}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailes
