import React from "react";

export default function BreakSection({ text, label }) {
  return (
    <>
      <div className="font-roboto-condensed w-full flex justify-center items-center px-[170px] gap-10">
        <div className="flex-grow h-[3px] bg-[#6c63ff]"></div>
        <div className="text-black flex flex-col items-center justify-center w-fit">
          <span className="font-extrabold text-[56px]">{text}</span>
          <span className="font-medium text-[28px]">{label}</span>
        </div>
        <div className="flex-grow h-[3px] bg-[#6c63ff]"></div>
      </div>
    </>
  );
}
