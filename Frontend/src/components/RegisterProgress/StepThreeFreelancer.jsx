import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import countries from "world-countries";

import camera from "../../assets/icons/camera.svg";
import person from "../../assets/icons/person.svg";
import InputFelid from "../../UI/InputFelid";
import container from "../../assets/icons/container.svg";


export default function StepThreeFreelancer({
  control,
  errors,
  currentPhoto,
  setCurrentPhoto,
  currentLanguagePairs,
  setCurrentLanguagePairs,
  currentSpecializations,
  setCurrentSpecializations,
}) {
  const [ctz, setCountries] = useState([]);
  const [languagesCountries, setLanguagesCountries] = useState([]);
  const [fromSelected, setFromSelected] = useState("");
  const [toSelected, setToSelected] = useState("");
  const [specializations, setSpecializations] = useState("");
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

  const onDeleteLanguagePair = ({ ietf }) => {
    setCurrentLanguagePairs((pref) =>
      pref.filter((lang) => lang.from !== ietf.from && lang.to !== ietf.to)
    );
  };

  const onAddLanguagePair = (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    if (fromSelected && toSelected) {
      if (
        currentLanguagePairs.find(
          (p) => p.from === fromSelected && p.to === toSelected
        )
      ) {
        alert("Language pair already selected");
        return;
      }
      setCurrentLanguagePairs((prev) => [
        ...prev,
        { from: fromSelected, to: toSelected },
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

      {/* Language Pair */}
      <div className="text-left mt-5 mb-5">
        <div className="flex justify-between heading items-center">
          <h2 className="font-poppins text-[14px]">Language pair</h2>
          <button
            className="bg-second-color text-[12px] text-white py-1 px-2 rounded font-roboto-condensed"
            onClick={() => setOpenModel((prev) => (prev !== 1 ? 1 : 0))}
          >
            {openModel !== 1 ? "New Language pair" : "Cancel"}
          </button>
        </div>
        {openModel === 1 && (
          <from
            className="flex gap-5 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-[50%]">
              <select
                value={fromSelected}
                onChange={(e) => setFromSelected(e.target.value)}
                className="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 appearance-none border p-2 w-full block px-4 py-2 shadow-sm focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              >
                <option value="">From</option>
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
            <div className="relative w-[50%]">
              <select
                value={toSelected}
                onChange={(e) => setToSelected(e.target.value)}
                className="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2  appearance-none border p-2 w-full block px-4 py-2 shadow-sm focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              >
                <option value="">To</option>
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
            <button className="text-[#f00]" onClick={onAddLanguagePair}>
              Add
            </button>
          </from>
        )}
        <table className="w-full mt-4">
          <thead className="text-main-color font-poppins text-[14px]">
            <tr>
              <th className="border border-border-color p-2">Language pair</th>
              <th className="border border-border-color p-2">IETF tag</th>
              <th className="border border-border-color p-2"></th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {languagesCountries.length &&
              currentLanguagePairs.map((pair, index) => {
                const rowClass = index % 2 !== 0 ? "" : "bg-[#F5F5FF]"; // If index is odd, apply bg color

                const from = languagesCountries.find(
                  (lang) => lang.langCode === pair.from
                );
                const to = languagesCountries.find(
                  (lang) => lang.langCode === pair.to
                );
                return (
                  <tr key={index} className={rowClass}>
                    <td className="border border-gray-200 p-2">
                      {`${from.language}(${from.country}) - ${to.language}(${to.country}) `}
                    </td>
                    <td className="border border-gray-200 p-2">{`${from.langCode}-${to.langCode}`}</td>
                    <td className="border border-gray-200 p-2">
                      <button
                        className="text-[#f00]"
                        onClick={() => onDeleteLanguagePair({ ietf: pair })}
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
      {/* Specializations */}
      <div className="text-left mt-5 mb-5">
        <div className="flex justify-between heading items-center">
          <h2 className="font-poppins text-[14px]">Specializations</h2>
          <button
            className="bg-second-color text-[12px] text-white py-1 px-2 rounded font-roboto-condensed"
            onClick={() => setOpenModel((prev) => (prev !== 2 ? 2 : 0))}
          >
            {openModel !== 2 ? "New Specializations" : "Cancel"}
          </button>
        </div>
        {openModel === 2 && (
          <from
            className="flex gap-5 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full">
              <InputFelid
                name="specializations"
                type="text"
                control={control}
                requires={["Username is required"]}
                classes="outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF] "
                placeholder="Specializations"
                errors={errors}
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
              />
            </div>
            <button
              className="text-[#f00]"
              onClick={() => {
                if (currentSpecializations.find((x) => x === specializations)) {
                  alert("Specializations already exist");
                  return;
                }
                setCurrentSpecializations((prev) => [...prev, specializations]); // Add to the list
                setSpecializations("");
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
                Specializations
              </th>
              <th className="border border-border-color p-2"></th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {currentSpecializations.map((ob, index) => {
              const rowClass = index % 2 !== 0 ? "" : "bg-[#F5F5FF]"; // If index is odd, apply bg color
              return (
                <tr key={ob} className={rowClass}>
                  <td className="border border-gray-200 p-2">{ob}</td>
                  <td className="border border-gray-200 p-2  max-w-[20px]">
                    <button
                      className="text-[#f00]"
                      onClick={() =>
                        setCurrentSpecializations((prev) =>
                          prev.filter((lst) => lst !== ob)
                        )
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
    </div>
  );
}
