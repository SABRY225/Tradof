// import React from 'react'
// import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.jpeg'
import Button from '../UI/Button'

export default function Navbar() {
    const btnStyle = {
        text: 'text-white',
        bg: 'bg-[#ff6f61]',
        font: 'font-medium',
        rounded: 'rounded-lg',
        textSm: 'text-sm',
        px: 'px-4',
        py: 'py-2',
    }

    return (
        <>
            <nav className="bg-white dark:bg-[#6c63ff] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="w-12" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tradof</span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button> */}
                        <Button 
                        text="Get started"
                        action={''}
                        style={btnStyle}
                        />
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#6c63ff] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#6c63ff] dark:bg-gray-800 md:dark:bg-[#6c63ff] dark:border-[#6c63ff]">
                            <li>
                                <a href="#" className="block py-2 px-3 text-white md:text-white md:p-0 md:dark:text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-white md:text-white md:p-0 md:dark:text-white" >Plans</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-white md:text-white md:p-0 md:dark:text-white">Features</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-white md:text-white md:p-0 md:dark:text-white">Rated</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-white md:text-white md:p-0 md:dark:text-white">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
