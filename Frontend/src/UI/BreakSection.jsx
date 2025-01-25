import React from 'react'

export default function BreakSection({text,label}) {
    return (
        <>
            <div className="w-full flex justify-center items-center my-12 px-32 gap-12">
                <div className="w-full h-[2px] bg-[#6c63ff]"></div>
                <div className="text-black flex flex-col items-center justify-center w-full">
                    <span className="font-bold text-4xl">{text}</span>
                    <span className="font-bold">
                        {label}
                    </span>
                </div>
                <div className="w-full h-[2px] bg-[#6c63ff]"></div>
            </div>
        </>
    )
}
