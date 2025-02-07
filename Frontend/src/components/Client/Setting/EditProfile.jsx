import React from 'react'
import UserSettings from "@/components/Client/Setting/ChangePassword";
import ProfileImage from '../../../assets/images/prof2.jpeg'
import ProfileIcon from '../../../assets/images/image.png'
import ButtonFelid from '@/UI/ButtonFelid';
export default function EditProfile() {

    const commonClasses =
        "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

    return (
        <>
                <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                    Edit Profile
                </h1>
                <form
                    className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"
                >
                    <div className='md:flex sm:px-10 sm:py-0'>
                        <div className="flex flex-col font-epilogue w-full text-[14px] text-left md:mb-0 mb-10">
                            <div className="flex w-full sm:gap-36 gap-12">
                                <div className='flex flex-col '>
                                    <label htmlFor="first_name">first name</label>
                                    <input
                                        type="text"
                                        className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                        placeholder={"Ahmed "}
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="last_name">last name</label>
                                    <input
                                        type="text"
                                        className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                        placeholder={"Nady "}
                                    />
                                </div>

                            </div>
                            <div className="flex w-full sm:space-x-36  my-10 space-x-12">
                                <div className='flex flex-col'>
                                    <label htmlFor="first_name">Email</label>
                                    <input
                                        type="text"
                                        placeholder={"dev.ahmed.nady@gmail.com"}
                                        className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="last_name">Number</label>
                                    <input
                                        type="text"
                                        className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                        placeholder={"01023536355"}
                                    />
                                </div>

                            </div>
                            <div className="flex w-full sm:space-x-36 space-x-12">
                                <div className='flex flex-col'>
                                    <label htmlFor="city">City</label>
                                    <select
                                        id="city"
                                        className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                        placeholder={"Software Engineer "}
                                    >
                                        <option>Please select your city</option>
                                        <option>Cairo</option>
                                        <option>Alex</option>
                                        <option>Giza</option>
                                    </select>
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="country">Country</label>
                                    <select
                                        id="country"
                                        className={`w-[270px] sm:pr-10 ${commonClasses}`}
                                        placeholder={"Nadyy"}
                                    >
                                        <option>Please select your country</option>
                                        <option>Egypt</option>
                                        <option>USA</option>
                                        <option>Canada</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col justify-between font-epilogue text-[14px] text-left mb-[20px]">
                            <div className="w-[150px] h-[150px] relative md:mb-0 mb-10">
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
                            <ButtonFelid
                                text="save"
                                type="submit"
                                classes="text-[15px] px-[10px] py-[7px] bg-second-color "
                                onClick={() => alert("click")}
                            />
                        </div>
                    </div>
                </form>
        </>
    )
}
