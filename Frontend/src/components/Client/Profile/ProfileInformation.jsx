import React from 'react'
import ButtonFelid from '@/UI/ButtonFelid'
import ProfileImage from '../../../assets/images/prof2.jpeg'
import ProfileIcon from '../../../assets/images/image.png'

export default function ProfileInformation() {
    const commonClasses =
        "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";
        
    return (
        <>
            <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                Profile Information
            </h1>
            <form
                className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"

            >
                <div className="flex flex-col font-epilogue text-[14px] text-left mb-[20px]">
                    <div className="flex items-center space-x-6">
                        <div className="w-[150px] h-[150px] relative">
                            <img
                                src={ProfileImage}
                                alt="Profile"
                                width={150}
                                height={150}
                                className="rounded-full border-4 border-white"
                            />
                            <img
                                src={ProfileIcon}
                                alt="Profile"
                                width={45}
                                className="bg-white cursor-pointer rounded-full border-4 border-white absolute bottom-0 right-0 transform translate-x-1/5 translate-y-1/5"
                                onClick={() => alert("click")}
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">Ahmed Nady</h3>
                            <p className="text-gray-600">Software Engineer</p>
                            <p className="text-gray-500">Eastern European Time (EET), Cairo UTC +3</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col font-epilogue w-full text-[14px] text-left">
                    <div className="flex w-full sm:gap-36 gap-12 my-10">
                        <div className='flex flex-col '>
                            <label htmlFor="first_name">first name</label>
                            <input
                                type="text"
                                className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                value={"Ahmed "}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="last_name">last name</label>
                            <input
                                type="text"
                                className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                value={"Nady "}
                            />
                        </div>

                    </div>
                    <div className="flex w-full sm:space-x-36 space-x-12">
                        <div className='flex flex-col'>
                            <label htmlFor="first_name">Job title</label>
                            <input
                                type="text"
                                value={"Software Engineer "}
                                className={`w-[270px] sm:pr-10 ${commonClasses}`}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="last_name">User name</label>
                            <input
                                type="text"
                                className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                value={"Nadyy"}
                            />
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}
