import ButtonFelid from "@/UI/ButtonFelid";
import React from "react";

export default function OperationalInfo({
  preferredLanguages,
  industriesServed,
}) {
  return (
    <>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Operational Info
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <table className="font-poppins min-w-full bg-white rounded-md overflow-auto">
          <thead className="bg-card-color">
            <tr className="text-main-color font-bold text-left">
              <th className="p-3 px-5">Preferred Languages</th>
              <th className="p-3 px-5" colSpan="2">
                IETF Tag
              </th>
            </tr>
          </thead>
          <tbody>
            {preferredLanguages.map((language, index) => (
              <tr
                key={index}
                className={`font-roboto-condensed ${
                  index === preferredLanguages.length - 1
                    ? ""
                    : "border-b-[3px]"
                }`}
              >
                <td className="p-3 px-5 w-[50%]">
                  {language.lang} ({language.country})
                </td>
                <td className="p-3 text-gray-500 w-[50%]">
                  {language.langCode}-{language.countryCode}
                </td>
                <td className="p-3 px-5">
                  <button className="text-red-500 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="font-poppins min-w-full bg-white rounded-md overflow-auto">
          <thead className="bg-card-color">
            <tr className="text-main-color font-bold text-left">
              <th className="p-3 px-5" colSpan="2">
                Industries Served
              </th>
            </tr>
          </thead>
          <tbody>
            {industriesServed.map((industry, index) => (
              <tr
                key={index}
                className={`font-roboto-condensed ${
                  index === industriesServed.length - 1 ? "" : "border-b-[3px]"
                }`}
              >
                <td className="p-3 px-5 w-full">{industry}</td>
                <td className="p-3 px-5">
                  <button className="text-red-500 font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="controls flex flex-col md:flex-row gap-5 justify-end">
          <ButtonFelid
            text="Add new language"
            type="button"
            classes="font-semibold text-[13px] px-[18px] py-[5px] bg-second-color rounded-full"
          />
          <ButtonFelid
            text="Add Industry Served"
            type="button"
            classes="font-semibold text-[13px] px-[18px] py-[5px] bg-second-color rounded-full"
          />
        </div>
      </div>
    </>
  );
}
