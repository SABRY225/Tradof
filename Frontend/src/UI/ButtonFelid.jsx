import React from "react";

export default function ButtonFelid({ icon, type, text, classes, ...prams }) {
  return (
    <>
      <button
        type={type}
        className={`
          flex gap-1 justify-center items-center font-roboto font-extrabold text-[16px] text-white rounded-[8px] 
          ${classes || ""}`}
        {...prams}
      >
        {text}
        {icon && <img src={icon} />}
      </button>
    </>
  );
}
