import React from "react";

export default function ButtonFelid({
  as = "button",
  icon,
  type,
  text,
  classes,
  ...props
}) {
  const Component = as;

  return (
    <>
      <Component
        type={type}
        className={`flex gap-1 justify-center items-center font-roboto font-extrabold text-[16px] text-white rounded-[8px] 
          ${classes || ""}`}
        {...props}
      >
        {icon && <img src={icon} className="w-[24px] h-[24px]" />}
        {text}
      </Component>
    </>
  );
}
