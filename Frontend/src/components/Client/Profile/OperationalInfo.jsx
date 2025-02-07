import React from 'react'

export default function OperationalInfo() {
    return (
        <>
            <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                Operational Info
            </h1>
            <form
                className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"

            >
                <div className="flex flex-col font-epilogue w-full text-[14px] text-left">
                    <div className="flex-col flex w-full gap-16 my-10">
                        <div>
                            <div className='flex justify-between text-main-color font-bold'>
                                <h3 className="font-bold">Preferred Languages</h3>
                                <h3 className="font-bold">IETF tag</h3>
                                <h3 className="font-bold"></h3>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm my-2 flex justify-between">
                                <span>English (United States) - French (France)</span>
                                <span className="text-gray-500">en-US → fr-FR</span>
                                <button className="text-red-500">Delete</button>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm my-2 flex justify-between">
                                <span>English (United States) - Spanish (Spain)</span>
                                <span className="text-gray-500">en-US → es-ES</span>
                                <button className="text-red-500">Delete</button>
                            </div>
                            <button className="bg-second-color text-white px-4 py-2 mt-4 rounded-lg">Add new language</button>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-bold text-main-color ">Industries Served</h3>
                            <div className="bg-white p-3 rounded-md shadow-sm my-2 flex justify-between">
                                <span>Medical</span>
                                <button className="text-red-500">Delete</button>
                            </div>
                            <div className="bg-white p-3 rounded-md shadow-sm my-2 flex justify-between">
                                <span>Engineering</span>
                                <button className="text-red-500">Delete</button>
                            </div>
                            <button className="bg-second-color text-white px-4 py-2 mt-4 rounded-lg">Add Industry Served</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
