import React from 'react'
import LinkedinIcon from '../../../assets/images/linkedin.png';
import FacebookIcon from '../../../assets/images/gmail.png';
import GmailIcon from '../../../assets/images/gmail.png';
import ButtonFelid from '@/UI/ButtonFelid';

export default function SocialMedia() {

    const commonClasses =
    "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

    return (
        <>
        <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                    Social Media
                </h1>
                <form
                    className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"

                >
                    <div className="flex md:flex-row flex-col justify-between items-center font-epilogue sm:pr-9 w-full text-[14px] text-left">
                        <div className="grid grid-cols-2 sm:gap-36 gap-12 my-10">
                            <div className="flex items-center ">
                                <div className="flex flex-col items-center">
                                    <div className="w-[25px] h-[25px]"></div>
                                    <img src={LinkedinIcon} alt="LinkedIn" width={25} className="mr-2" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="linkedin">Linked in</label>
                                    <input
                                        type="text"
                                        className={`w-[270px] pr-10 ${commonClasses}`}
                                        placeholder='link'
                                    />
                                </div>
                            </div>
                            <div className="flex items-center ">
                                <div className="flex flex-col items-center">
                                    <div className="w-[25px] h-[25px]"></div>
                                    <img src={FacebookIcon} alt="Facebook" width={25} className="mr-2" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="facebook">Facebook</label>
                                    <input
                                        type="text"
                                        className={`w-[270px] pr-10 ${commonClasses}`}
                                        placeholder='link'
                                    />
                                </div>
                            </div>
                            <div className="flex items-center ">
                                <div className="flex flex-col items-center">
                                    <div className="w-[25px] h-[25px]"></div>
                                    <img src={GmailIcon} alt="Gmail" width={25} className="mr-2" />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="gmail">Gmail</label>
                                    <input
                                        type="text"
                                        className={`w-[270px] pr-10 ${commonClasses}`}
                                        placeholder='link'
                                    />
                                </div>
                            </div>



                        </div>
                        <ButtonFelid
                            text="save"
                            type="submit"
                            classes="text-[15px] px-[10px] sm:w-[154px] w-full py-[7px] bg-second-color "
                            onClick={() => alert("click")}
                        // style={{ width: "154px" }}
                        />
                    </div>
                </form>
        </>
    )
}
