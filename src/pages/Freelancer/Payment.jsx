import { useState } from "react";

import ButtonFelid from "../../UI/ButtonFelid";

import Plus from "../../assets/icons/plus.svg";
import calender from "../../assets/icons/calender.svg";
import visa from "../../assets/icons/visa.svg";
export default function Payment() {
  const [addMethod, setAddMethod] = useState(false);
  const [methods, setMethods] = useState([
    {
      bankName: "Al Ahly",
      holdName: "Mohamed Abdalrazek",
      creditNumber: "1234 1234 1234 1234",
      expiryDate: "05/12",
      CVV: "289",
    },
  ]);
  return (
    <div className="mx-[60px] mt-[50px] max-w-full">
      <header className="flex justify-between items-center font-roboto-condensed">
        <div className="title">
          <p className="font-namdhinggo text-[35px] font-extrabold">
            Payment Methods
          </p>
          <p className="font-roboto-condensed font-medium">
            Edit or add Payment methods
          </p>
        </div>
        <ButtonFelid
          icon={Plus}
          text="Add payment"
          classes="flex-row-reverse bg-second-color px-[25px] py-[8px]"
          type="button"
          onClick={() => setAddMethod(!addMethod)}
        />
      </header>
      {addMethod && (
        <div className="card mt-[30px]">
          <h1 className="ml-2 text-[18px] italic pl-[20px] border-b border-main-color w-fit">
            Payment Method
          </h1>
          <div className="content flex gap-5 bg-card-color py-[20px] px-[40px] rounded-[8px]">
            <div className="credit relative bg-gradient-to-br from-[#CE5BEB] to-[#5B61EB]  w-[493px] h-[280px] text-white rounded-[17px] p-[30px] flex flex-col gap-5">
              <div className="absolute inset-0 before:content-[''] before:absolute before:top-[30px] before:right-[30px] before:w-[40px] before:h-[40px] before:bg-[#E2C0FF] before:rounded-full"></div>
              <div className="absolute inset-0 after:content-[''] after:absolute after:top-[30px] after:right-[50px] after:w-[40px] after:h-[40px] after:bg-[#B663FF] after:rounded-full"></div>
              <h2 className="font-chivo font-semibold text-[25px]">Al Ahly</h2>
              <p className="font-chivo font-semibold text-[25px] mt-auto">
                1234 1234 1234 1234
              </p>
              <div className="details flex justify-between">
                <p className="font-roboto-condensed font-semibold">
                  Mohamed Abdalrazek
                </p>
                <p className="font-roboto-condensed font-semibold">12/24</p>
              </div>
            </div>
            <div className="controls flex flex-col flex-grow">
              <div className="font-epilogue flex flex-col gap-1 text-[14px] text-left mb-[20px] max-w-[300px]">
                <label className="font-epilogue font-medium font-epilogue text-[14px] font-medium">
                  Card's Holder Name
                </label>
                <input
                  type="text"
                  disabled
                  value="Mohamed Abdalrazek"
                  className="font-epilogue h-[40px] rounded-[4px] py-[10px] px-[16px] bg-white text-[#212225] text-opacity-[30%]"
                />
              </div>
              <div className="font-epilogue flex flex-col gap-1 text-[14px] text-left mb-[20px] max-w-[300px]">
                <label className="font-epilogue font-medium font-epilogue text-[14px] font-medium">
                  Credit Card Number
                </label>
                <div className="flex gap-5 items-center w-full">
                  <input
                    type="text"
                    disabled
                    value="1234 1234 1234 1234"
                    className="font-epilogue h-[40px] rounded-[4px] py-[10px] px-[16px] bg-white text-[#212225] text-opacity-[30%]"
                  />
                  <img src={visa} alt="visa logo" />
                </div>
              </div>
              <div className="flex gap-[50px] items-end font-epilogue text-[14px] text-left mb-[20px] max-w-[300px]">
                <div className=" flex flex-col gap-1 ">
                  <label className="font-epilogue font-medium font-epilogue text-[14px] font-medium">
                    Expiry Date
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      disabled
                      value="05/24"
                      className="font-epilogue h-[40px] w-full rounded-[4px] py-[10px] pr-[40px] pl-[16px] bg-white text-[#212225] text-opacity-[30%] outline-none"
                    />
                    <img
                      src={calender}
                      alt=""
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px]"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  disabled
                  value="CCV"
                  className="font-epilogue h-[40px] rounded-[4px] py-[10px] px-[16px] bg-white text-[#212225] text-opacity-[30%] max-w-[100px]"
                />
              </div>
              <ButtonFelid
                text="Edit"
                classes="font-epilogue bg-second-color px-[40px] py-[5px] w-fit ml-auto"
              />
            </div>
          </div>
        </div>
      )}
      {methods.map((method) => {
        return (
          <div className="card mt-[30px]">
            <h1 className="ml-2 text-[18px] italic pl-[20px] border-b border-main-color w-fit">
              Payment Method
            </h1>
            <div className="content flex gap-5 bg-card-color py-[20px] px-[40px] rounded-[8px]">
              <div className="credit relative bg-gradient-to-br from-[#CE5BEB] to-[#5B61EB]  w-[493px] h-[280px] text-white rounded-[17px] p-[30px] flex flex-col gap-5">
                <div className="absolute inset-0 before:content-[''] before:absolute before:top-[30px] before:right-[30px] before:w-[40px] before:h-[40px] before:bg-[#E2C0FF] before:rounded-full"></div>
                <div className="absolute inset-0 after:content-[''] after:absolute after:top-[30px] after:right-[50px] after:w-[40px] after:h-[40px] after:bg-[#B663FF] after:rounded-full"></div>
                <h2 className="font-chivo font-semibold text-[25px]">
                  {method.bankName}
                </h2>
                <p className="font-chivo font-semibold text-[25px] mt-auto">
                  {method.creditNumber}
                </p>
                <div className="details flex justify-between">
                  <p className="font-roboto-condensed font-semibold">
                    {method.holdName}
                  </p>
                  <p className="font-roboto-condensed font-semibold">
                    {method.expiryDate}
                  </p>
                </div>
              </div>
              <div className="controls flex flex-col flex-grow">
                <div className="flex gap-5">
                  <div className="font-epilogue flex flex-col gap-1 text-[14px] text-left mb-[20px] max-w-[300px]">
                    <label className="font-epilogue font-medium font-epilogue text-[14px] font-medium">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={method.bankName}
                      className="font-epilogue h-[40px] rounded-[4px] py-[10px] px-[16px] bg-white text-[#212225] text-opacity-[30%]"
                    />
                  </div>
                  <div className="font-epilogue flex flex-col gap-1 text-[14px] text-left mb-[20px] max-w-[300px]">
                    <label className="font-epilogue font-medium font-epilogue text-[14px] font-medium">
                      Card's Holder Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={method.holdName}
                      className="font-epilogue h-[40px] rounded-[4px] py-[10px] px-[16px] bg-white text-[#212225] text-opacity-[30%]"
                    />
                  </div>
                </div>
                <div className="font-epilogue flex flex-col gap-1 text-[14px] text-left mb-[20px] max-w-[300px]">
                  <label className="font-epilogue font-medium font-epilogue text-[14px] font-medium">
                    Credit Card Number
                  </label>
                  <div className="flex gap-5 items-center w-full">
                    <input
                      type="text"
                      disabled
                      value={method.creditNumber}
                      className="font-epilogue h-[40px] rounded-[4px] py-[10px] px-[16px] bg-white text-[#212225] text-opacity-[30%]"
                    />
                    <img src={visa} alt="visa logo" />
                  </div>
                </div>
                <div className="flex gap-[50px] items-end font-epilogue text-[14px] text-left mb-[20px] max-w-[300px]">
                  <div className=" flex flex-col gap-1 ">
                    <label className="font-epilogue font-medium font-epilogue text-[14px] font-medium">
                      Expiry Date
                    </label>
                    <div className="relative w-full">
                      <input
                        type="text"
                        disabled
                        value={method.expiryDate}
                        className="font-epilogue h-[40px] w-full rounded-[4px] py-[10px] pr-[40px] pl-[16px] bg-white text-[#212225] text-opacity-[30%] outline-none"
                      />
                      <img
                        src={calender}
                        alt=""
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px]"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    disabled
                    value={method.CVV}
                    className="font-epilogue h-[40px] rounded-[4px] py-[10px] px-[16px] bg-white text-[#212225] text-opacity-[30%] max-w-[100px]"
                  />
                </div>
                <ButtonFelid
                  text="Edit"
                  classes="font-epilogue bg-second-color px-[40px] py-[5px] w-fit ml-auto"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
