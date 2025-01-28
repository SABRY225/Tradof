import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import countries from "world-countries";

import camera from "../../assets/icons/camera.svg";
import person from "../../assets/icons/person.svg";
import InputFelid from "../../UI/InputFelid";
import container from "../../assets/icons/container.svg";
export default function StepThreeCompany({
  control,
  errors,
  currentPhoto,
  setCurrentPhoto,
  currentPreferredLanguage,
  setCurrentPreferredLanguage,
  currentIndustriesServed,
  setCurrentIndustriesServed,
}) {
  const [ctz, setCountries] = useState([]);
  const [languagesCountries, setLanguagesCountries] = useState([]);
  const [preferred, setPreferred] = useState("");
  const [industriesServed, setIndustriesServed] = useState("");
  const [openModel, setOpenModel] = useState(0);
  useEffect(() => {
    const data = [];
    const countryDate = [];
    countries.forEach((country) => {
      const countryName = country.name.common;
      const languages = country.languages;
      if (languages) {
        Object.entries(languages).forEach(([code, language]) => {
          const countryCode = country.cca2
            .toLowerCase()
            .slice(0, 2)
            .toUpperCase();

          const langCode = `${
            code.length === 2 ? code : code.slice(0, 2).toLowerCase()
          }-${countryCode.toUpperCase()}`; // Generate language code (e.g., 'en-US')

          // Add language and country info to the data array
          data.push({
            language: language,
            country: countryName,
            langCode: langCode,
          });
          countryDate.push({
            id: country.cca2,
            name: countryName,
          });
        });
      }
    });
    // Set the state with the gathered data
    setLanguagesCountries(data);
    setCountries(countryDate);
  }, []);

  const onDeletePreferredLanguage = ({ ietf }) => {
    setCurrentPreferredLanguage((pref) =>
      pref.filter((lang) => lang.from !== ietf.from && lang.to !== ietf.to)
    );
  };

  const onAddPreferredLanguage = (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    if (preferred) {
      if (
        currentPreferredLanguage.find(
          (p) => p.from === preferred 
        )
      ) {
        alert("Language pair already selected");
      }
      setCurrentPreferredLanguage((prev) => [
        ...prev,
        { from: preferred },
      ]);
      setFromSelected("");
      setToSelected("");
    } else {
      console.log("Please select both From and To languages");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center font-epilogue text-[14px] text-left mb-4">
        <label className="text-[14px] mr-2">
          Add personal photo / Company logo
        </label>
        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="images flex relative w-full h-full">
            <img
              src={camera}
              alt="camera icon"
              className="absolute w-7 bottom-0 right-0 bg-white rounded-full p-1 shadow"
            />
            <img
              src={currentPhoto || person}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Photo required" }}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(event) => {
                  const file = event.target.files[0]; // Get the uploaded file
                  if (file) {
                    const imageURL = URL.createObjectURL(file); // Generate a preview URL
                    setCurrentPhoto(imageURL); // Update the preview state
                  }
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Jop title */}
      <InputFelid
        title="Job title"
        name="jopTitle"
        requires={true}
        control={control}
        classes="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF] "
        errors={errors}
        type="text"
        placeholder="Pharmaceutical company"
      />
      {/* Country */}
      <InputFelid
        title="Country"
        name="country"
        requires={true}
        control={control}
        classes="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF] "
        errors={errors}
        type="select"
        options={ctz}
        placeholder="Country"
      />
      {/* location */}
      <InputFelid
        title="Location"
        name="location"
        requires={true}
        control={control}
        classes="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF] "
        errors={errors}
        type="select"
        options={ctz}
        placeholder="location"
      />

      {/* Preferred Languages */}
      <div className="text-left mt-5 mb-5">
        <div className="flex justify-between heading items-center">
          <h2 className="font-poppins text-[14px]">Preferred Languages</h2>
          <button
            className="bg-second-color text-[12px] text-white py-1 px-2 rounded font-roboto-condensed"
            onClick={() => setOpenModel((prev) => (prev !== 1 ? 1 : 0))}
          >
            {openModel !== 1 ? "New Preferred Languages" : "Cancel"}
          </button>
        </div>
        {openModel === 1 && (
          <from
            className="flex gap-5 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <select
                value={preferred}
                onChange={(e) => setPreferred(e.target.value)}
                className="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 appearance-none border p-2 w-full block px-4 py-2 shadow-sm focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              >
                <option value="">Language</option>
                {languagesCountries.map((option, index) => (
                  <option
                    key={index}
                    value={option.langCode}
                    className="text-black"
                  >
                    {`${option.language} (${option.country}) / ${option.langCode}`}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <img src={container} alt="arrow" />
              </div>
            </div>
            <button className="text-[#f00]" onClick={onAddPreferredLanguage}>
              Add
            </button>
          </from>
        )}
        <table className="w-full mt-4">
          <thead className="text-main-color font-poppins text-[14px]">
            <tr>
              <th className="border border-border-color p-2">
                Preferred Languages
              </th>
              <th className="border border-border-color p-2">IETF tag</th>
              <th className="border border-border-color p-2"></th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {languagesCountries.length &&
              currentPreferredLanguage.map((pair, index) => {
                const rowClass = index % 2 !== 0 ? "" : "bg-[#F5F5FF]"; // If index is odd, apply bg color
                const lang = languagesCountries.find(
                  (lang) => lang.langCode === pair.from
                );
                return (
                  <tr key={index} className={rowClass}>
                    <td className="border border-gray-200 p-2">
                      {`${lang.language}(${lang.country})`}
                    </td>
                    <td className="border border-gray-200 p-2">{`${lang.langCode}`}</td>
                    <td className="border border-gray-200 p-2">
                      <button
                        className="text-[#f00]"
                        onClick={() =>
                          onDeletePreferredLanguage({ ietf: pair })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* Industries Served */}
      <div className="text-left mt-5 mb-5">
        <div className="flex justify-between heading items-center">
          <h2 className="font-poppins text-[14px]">Industries Served</h2>
          <button
            className="bg-second-color text-[12px] text-white py-1 px-2 rounded font-roboto-condensed"
            onClick={() => setOpenModel((prev) => (prev !== 2 ? 2 : 0))}
          >
            {openModel !== 2 ? "New Industries Served" : "Cancel"}
          </button>
        </div>
        {openModel === 2 && (
          <from
            className="flex gap-5 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full">
              <InputFelid
                name="industriesServed"
                type="text"
                control={control}
                requires={["Username is required"]}
                classes="outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF] "
                placeholder="Industries Served"
                errors={errors}
                value={industriesServed}
                onChange={(e) => setIndustriesServed(e.target.value)}
              />
            </div>
            <button
              className="text-[#f00]"
              onClick={() => {
                if (currentIndustriesServed.find((x) => x === industriesServed)) {
                  alert("Specializations already exist");
                  return;
                }
                setCurrentIndustriesServed((prev) => [...prev, industriesServed]); // Add to the list
                setIndustriesServed("");
              }}
            >
              Add
            </button>
          </from>
        )}
        <table className="w-full mt-4">
          <thead className="text-main-color font-poppins text-[14px]">
            <tr>
              <th className="border border-border-color p-2">
                Industries Served
              </th>
              <th className="border border-border-color p-2"></th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {currentIndustriesServed.map((ob, index) => {
              const rowClass = index % 2 !== 0 ? "" : "bg-[#F5F5FF]"; // If index is odd, apply bg color
              return (
                <tr key={ob} className={rowClass}>
                  <td className="border border-gray-200 p-2">{ob}</td>
                  <td className="border border-gray-200 p-2  max-w-[20px]">
                    <button
                      className="text-[#f00]"
                      onClick={() =>
                        setCurrentIndustriesServed((prev) =>
                          prev.filter((lst) => lst !== ob)
                        )
                      }
                      onC
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
