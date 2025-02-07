import ButtonFelid from "@/UI/ButtonFelid";
import React, { useState } from "react";

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });


    return (
        <div>
            {/* Change Password */}
            <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                Change Password
            </h1>
            <div className="bg-card-color p-4 rounded-lg flex items-center justify-between mb-6 px-10">
                <div className="grid grid-cols-1 w-2/3 md:grid-cols-2 gap-4 mt-4">
                    {["current", "new", "confirm"].map((type) => (
                        <div key={type} className="flex flex-col">
                            <label className="text-sm font-medium capitalize">
                                {type} password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword[type] ? "text" : "password"}
                                    value={passwords[type]}
                                    onChange={(e) =>
                                        setPasswords({ ...passwords, [type]: e.target.value })
                                    }
                                    className="p-2 w-full border rounded-md focus:outline-none"
                                />
                                <button
                                    className="absolute right-2 top-2 text-purple-600 text-sm"
                                    onClick={() =>
                                        setShowPassword((prev) => ({
                                            ...prev,
                                            [type]: !prev[type],
                                        }))
                                    }
                                >
                                    {showPassword[type] ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <ButtonFelid
                    text="save"
                    type="submit"
                    classes=" text-[15px] rounded-full px-[10px] w-[104px] h-[30px] py-[7px] bg-second-color "
                    onClick={() => alert("click")}
                // style={{ width: "154px" }}
                />
            </div>
        </div>
    );
};

export default ChangePassword;
