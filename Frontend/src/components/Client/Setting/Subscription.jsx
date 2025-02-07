import React, { useState } from 'react'

export default function Subscription() {

    return (
        <>
            <div className="my-10">
                {/* Subscription Plan */}
                <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                    Subscription Plan
                </h1>
                <div className="rounded-lg mb-6 ">
                    <div className="flex justify-between items-center">
                        <div className="bg-card-color w-3/4 p-3 rounded-lg">
                            <p className='flex gap-32 font-bold '>
                                Your plan: <span className="italic">1 YEAR</span>
                            </p>
                            <p className='flex gap-16 font-bold '>
                                Subscription price:{" "}
                                <span className="font-bold italic">500 EUR</span>{" "}
                                <span className="text-gray-500 text-sm">40 EUR per month</span>
                            </p>
                        </div>
                        <div className="bg-card-color w-1/4 flex p-2 ml-4 rounded-lg justify-between px-2">
                            <p className="text-sm font-semibold">Ramming Time</p>
                            <p className="text-lg flex justify-between">
                                <span className='flex flex-col'> <span className="font-bold ">0</span> Year </span>
                                <span className='w-[1.5px] mx-2 h-full bg-main-color'></span>
                                <span className='flex flex-col'> <span className="font-bold ">15</span> Week </span>
                                <span className='w-[1.5px] mx-2 h-full bg-main-color'></span>
                                <span className='flex flex-col'> <span className="font-bold ">105</span> Day </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
