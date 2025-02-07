import React from 'react'
import EmployeeTable from './EmployeeTable'
import ButtonFelid from '@/UI/ButtonFelid';


export default function CompanyEmployees() {

    const commonClasses =
    "font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";


    return (
        <>
            <h1 className="text-[20px] italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
                Company Employees
            </h1>
            <form
                className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]"

            >
                <div className="flex flex-col justify-between font-epilogue sm:pr-9 w-full text-[14px] text-left">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-24 gap-y-5 my-10">
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">First name</label>
                            <input
                                type="text"
                                className={`w-full  ${commonClasses}`}
                                placeholder='link'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">Last name</label>
                            <input
                                type="text"
                                className={`w-full  ${commonClasses}`}
                                placeholder='link'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">Jop Title</label>
                            <input
                                type="text"
                                className={`w-full  ${commonClasses}`}
                                placeholder='link'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">Email</label>
                            <input
                                type="email"
                                className={`w-full  ${commonClasses}`}
                                placeholder='dev.ahmed.nady@gmail.com'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">Password</label>
                            <input
                                type="password"
                                className={`w-full  ${commonClasses}`}
                                placeholder='password'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">Phone number</label>
                            <input
                                type="tel"
                                className={`w-full  ${commonClasses}`}
                                placeholder='20 1023536355'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">City</label>
                            <select
                                className={`w-full ${commonClasses}`}
                                placeholder='select city'
                            >
                                <option value="cairo">Cairo</option>
                                <option value="alex">Alex</option>
                                <option value="giza">Giza</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">Country</label>
                            <select
                                className={`w-full ${commonClasses}`}
                                placeholder='select country'
                            >
                                <option value="egypt">Egypt</option>
                                <option value="usa">USA</option>
                                <option value="canada">Canada</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="linkedin">Permissions</label>
                            <select
                                className={`w-full ${commonClasses}`}
                                placeholder='select permission'
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>



                    </div>
                    <div className='flex justify-center'>
                        <ButtonFelid
                            text="Add"
                            type="submit"
                            classes="text-[15px] px-[10px] sm:w-[154px] w-full py-[7px] bg-second-color "
                            onClick={() => alert("click")}
                        // style={{ width: "154px" }}
                        />
                    </div>
                    <EmployeeTable />
                </div>
            </form>
        </>
    )
}
