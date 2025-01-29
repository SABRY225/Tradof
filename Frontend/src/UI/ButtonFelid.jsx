import React from "react";

export default function ButtonFelid({ type, text, classes, ...prams }) {
  return (
    <>
      <button
        type={type}
        className={`
          font-roboto font-extrabold text-[16px] text-white rounded-[8px] 
          ${classes || ""}`}
        {...prams}
      >
        {text}
      </button>
    </>
  );
}
