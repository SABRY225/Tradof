import React from 'react'

export default function BreakSection({id,text,label}) {
    return (
        <>
            <div id={id} className="w-full flex justify-between items-center my-10 lg:px-32 px-16 gap-12">
                <div className="md:w-full md:h-[2px]  md:p-0 p-2 bg-[#6c63ff] rounded-full md:rounded-none"></div>
                <div className="text-black flex flex-col items-center justify-center w-full">
                    <span className="font-bold md:text-4xl text-xl">{text}</span>
                    <span className="font-bold md:text-base text-xs">
                        {label}
                    </span>
                </div>
                <div className="md:w-full md:h-[2px]  md:p-0 p-2  bg-[#6c63ff] rounded-full md:rounded-none"></div>
            </div>
        </>
    )
}
