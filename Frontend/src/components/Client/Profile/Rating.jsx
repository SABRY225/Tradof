import ButtonFelid from '@/UI/ButtonFelid'
import React from 'react'

export default function Rating() {
    return (
        <>
            <div className="flex justify-between items-center bg-[#ECE8FF] p-4 rounded-lg shadow-md px-10">
                <div className="flex space-x-24">
                    <div className="flex space-x-4">
                        <span className="text-lg font-bold text-main-color">Rating</span>
                        <span>1500 votes</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="text-lg font-bold text-main-color">Reviews</span>
                        <span>3000</span>
                    </div>
                </div>
                {/* <button className="bg-main-color text-white px-4 py-2 rounded-lg">Share your profile</button> */}
                <ButtonFelid
                    icon
                    text="Share your profile"
                    type="submit"
                    classes="text-[15px] px-[20px] py-[7px] bg-second-color "
                    onClick={() => alert("click")}
                // style={{ width: "154px" }}
                />
            </div>
        </>
    )
}
