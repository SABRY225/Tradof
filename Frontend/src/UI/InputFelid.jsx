import { useState } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import container from "../assets/icons/container.svg";

export default function InputFelid({
  title,
  name,
  requires,
  classes,
  control,
  errors,
  notes,
  placeholder,
  type,
  options, // For dropdown options like countries
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="font-epilogue text-[14px] text-left mb-[20px]">
      <label className="font-medium">{title}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: requires }}
        render={({ field }) => (
          <>
            {type === "phone" && (
              <PhoneInput
                {...field}
                international
                className="custom-phone-input"
                placeholder={placeholder}
                defaultCountry="US" // Default country can be set here
              />
            )}
            {type === "password" && (
              <div className="relative">
                <input
                  {...field}
                  type={showPassword ? "text" : "password"} // Toggle between password and text type
                  className={`custom-input ${classes}`}
                  placeholder={placeholder}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <span className="text-[#8000FF] border-b border-[#8000FF]">
                      Hide
                    </span>
                  ) : (
                    <span className="text-[#8000FF] border-b border-[#8000FF]">
                      Show
                    </span>
                  )}
                </button>
              </div>
            )}
            {type === "select" && options && (
              <div className="relative w-full">
                <select
                  {...field}
                  className={`appearance-none border p-2 w-full block px-4 py-2 shadow-sm ${classes}`}
                >
                  <option value="">{placeholder}</option>
                  {options.map((option, index) => (
                    <option
                      key={index}
                      value={option.id}
                      className="text-black"
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <img src={container} alt="arrow" />
                </div>
              </div>
            )}

            {type === "textarea" && (
              <textarea
                {...field}
                className={`border rounded p-2 w-full ${classes || ""}`}
                placeholder={placeholder}
              />
            )}
            {type === "text" && (
              <input
                {...field}
                type={type}
                className={classes}
                placeholder={placeholder}
                {...props}
              />
            )}
          </>
        )}
      />
      {notes && <p className="mt-[5px] text-[#141414] text-[12px]">{notes} </p>}
      {errors[`${name}`] && (
        <p className="text-red-500 text-[12px]">{errors[`${name}`].message}</p>
      )}
    </div>
  );
}
