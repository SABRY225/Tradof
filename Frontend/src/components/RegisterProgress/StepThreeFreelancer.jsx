import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import camera from "../../assets/icons/camera.svg";
import person from "../../assets/icons/person.svg";
import InputFelid from "../../UI/InputFelid";
import container from "../../assets/icons/container.svg";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCountries,
  getAllLanguages,
  getAllSpecializations,
} from "../../Util/http";

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
  const [fromSelected, setFromSelected] = useState("");
  const [toSelected, setToSelected] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [openModel, setOpenModel] = useState(0);
  const {
    data: countries,
    isError: isErrorCountries,
    error: errorCountries,
    isLoading: isLoadingCountries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: 10000,
  });
  const {
    data: languages,
    isError: isErrorLanguages,
    error: errorLanguages,
    isLoading: isLoadingLanguages,
  } = useQuery({
    queryKey: ["Languages"],
    queryFn: getAllLanguages,
    staleTime: 10000,
  });
  const {
    data: specialization,
    isError: isErrorSpecialization,
    error: errorSpecialization,
    isLoading: isLoadingSpecialization,
  } = useQuery({
    queryKey: ["specialization"],
    queryFn: getAllSpecializations,
    staleTime: 10000,
  });

  const onDeleteLanguagePair = ({ ietf }) => {
    setCurrentLanguagePairs((pref) =>
      pref.filter(
        (lang) => lang.from.id !== ietf.from.id && lang.to.id !== ietf.to.id
      )
    );
  };

  const onAddLanguagePair = (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    if (fromSelected && toSelected) {
      if (
        currentLanguagePairs.find(
          (p) => p.from.id === fromSelected && p.to.id === toSelected
        )
      ) {
        alert("Language pair already selected");
        return;
      }
      setCurrentLanguagePairs((prev) => [
        ...prev,
        {
          from: languages.find((lang) => lang.id === fromSelected),
          to: languages.find((lang) => lang.id === toSelected),
        },
      ]);
      setFromSelected("");
      setToSelected("");
    } else {
      console.log("Please select both From and To languages");
    }
  };

  const onAddSpecialization = (e) => {
    e.preventDefault();
    if (currentSpecializations.find((x) => x.id === specializations)) {
      alert("Specializations already exist");
      return;
    }
    setCurrentSpecializations((prev) => [
      ...prev,
      specialization.find((option) => option.id === +specializations),
    ]); // Add to the list
    setSpecializations("");
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
      {countries && (
        <InputFelid
          title="Country"
          name="country"
          requires={true}
          control={control}
          classes="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF] "
          errors={errors}
          type="select"
          options={countries}
          placeholder="Country"
        />
      )}

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
          <form
            className="flex gap-5 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-[50%]">
              <select
                value={fromSelected}
                onChange={(e) => setFromSelected(+e.target.value)}
                className="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 appearance-none border p-2 w-full block px-4 py-2 shadow-sm focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              >
                <option value="">From</option>
                {languages.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className="text-black"
                  >
                    {`${option.name} / ${option.code}`}
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
                onChange={(e) => setToSelected(+e.target.value)}
                className="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2  appearance-none border p-2 w-full block px-4 py-2 shadow-sm focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              >
                <option value="">To</option>
                {languages.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className="text-black"
                  >
                    {`${option.name} / ${option.code}`}
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
          </form>
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
            {currentLanguagePairs.map((lang, index) => {
              const rowClass = index % 2 !== 0 ? "" : "bg-[#F5F5FF]"; // If index is odd, apply bg color
              return (
                <tr key={index} className={rowClass}>
                  <td className="border border-gray-200 p-2">
                    {`${lang.from.name} - ${lang.to.name}`}
                  </td>
                  <td className="border border-gray-200 p-2">{`${lang.from.code}-${lang.to.code}`}</td>
                  <td className="border border-gray-200 p-2">
                    <button
                      className="text-[#f00]"
                      onClick={() => onDeleteLanguagePair({ ietf: lang })}
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
          <form
            className="flex gap-5 mt-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full">
              <select
                value={specializations}
                onChange={(e) => setSpecializations(+e.target.value)}
                className="outline-none border-[1px] border-[#D6D7D7] text-customGray focus:text-black rounded p-2 appearance-none border p-2 w-full block px-4 py-2 shadow-sm focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              >
                <option value="">Specializations</option>
                {specialization.map((option) => (
                  <option
                    key={option.id}
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
            <button className="text-[#f00]" onClick={onAddSpecialization}>
              Add
            </button>
          </form>
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
            {currentSpecializations.map((option, index) => {
              const rowClass = index % 2 !== 0 ? "" : "bg-[#F5F5FF]"; // If index is odd, apply bg color
              return (
                <tr key={option.id} className={rowClass}>
                  <td className="border border-gray-200 p-2">{option.name}</td>
                  <td className="border border-gray-200 p-2  max-w-[20px]">
                    <button
                      className="text-[#f00]"
                      onClick={() =>
                        setCurrentSpecializations((prev) =>
                          prev.filter((lst) => lst.id !== option.id)
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
