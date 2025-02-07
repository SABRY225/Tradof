import React from 'react'

export default function ContactInfo() {
    const commonClasses =
        "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";
        
    return (
        <>
            <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                Contact Info
            </h1>
            <form
                className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"

            >
                <div className="flex flex-col font-epilogue w-full text-[14px] text-left">
                    <div className="flex w-full sm:gap-36 gap-12 my-10">
                        <div className='flex flex-col '>
                            <label htmlFor="first_name">Email address</label>
                            <input
                                type="text"
                                className={`w-[270px] pr-10 ${commonClasses}`}
                                value={"dev.ahmed.nady@gmail.com "}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="last_name">Phone number</label>
                            <input
                                type="number"
                                className={`w-[270px] pr-10 ${commonClasses}`}
                                value={"01023536355"}
                            />
                        </div>

                    </div>
                    <div className="flex w-full space-x-36">
                        <div className='flex flex-col '>
                            <label htmlFor="first_name">Location</label>
                            <input
                                type="text"
                                value={"Cairo"}
                                className={`w-[270px] pr-10 ${commonClasses}`}
                            />
                        </div>


                    </div>
                </div>
            </form>
        </>
    )
}
