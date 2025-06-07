import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import camera from "../../assets/icons/camera.svg";
import person from "../../assets/icons/person.svg";
import InputFelid from "../../UI/InputFelid";
import container from "../../assets/icons/container.svg";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCountries,
  getAllLanguages,
  getAllSpecializations,
} from "../../Util/Https/http";

import { DatePicker, Input, message, Select } from "antd";

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
  const [specializations, setSpecializations] = useState(null);
  const [openModel, setOpenModel] = useState(0);
  const [handleLanguage, setHandleLanguage] = useState([]);
  const [examDate, setExamDate] = useState(null);

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

  useEffect(() => {
    if (languages) {
      let editing = languages.map((lang) => ({
        value: lang.id,
        label: `${lang.languageName}(${lang.countryName}) / ${lang.languageCode}(${lang.countryCode})`,
      }));
      setHandleLanguage(editing);
    }
  }, [languages]);

  const onDeleteLanguagePair = ({ ietf }) => {
    setCurrentLanguagePairs((pref) =>
      pref.filter(
        (lang) => lang.from.id !== ietf.from.id && lang.to.id !== ietf.to.id
      )
    );
  };

  const handleAddLanguagePair = (event) => {
    event.preventDefault();
    if (!fromSelected || !toSelected) {
      message.error("Please select both From and To languages");
      return;
    }

    // Check for duplicates
    if (
      currentLanguagePairs.find(
        (p) => p.from.id === fromSelected && p.to.id === toSelected
      )
    ) {
      message.error("This language pair already exists");
      return;
    }

    const newPair = {
      from: languages.find((lang) => lang.id === fromSelected),
      to: languages.find((lang) => lang.id === toSelected),
      examDate: examDate,
    };

    setCurrentLanguagePairs((prev) => [...prev, newPair]);
    setFromSelected("");
    setToSelected("");
    setExamDate(null);
    setOpenModel(0);
  };

  const onAddSpecialization = (e) => {
    e.preventDefault();
    console.log(specializations);
    if (!specializations) {
      return;
    }
    if (currentSpecializations.find((x) => x.id === specializations)) {
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
            className="text-second-color py-1 px-2 rounded font-roboto-condensed"
            onClick={() => setOpenModel((prev) => (prev !== 1 ? 1 : 0))}
            type="button"
          >
            <PlusCircleOutlined />
          </button>
        </div>
        {openModel === 1 && (
          <form className="w-full space-y-3" onSubmit={handleAddLanguagePair}>
            <Select
              showSearch
              variant="underlined"
              style={{ width: "100%" }}
              placeholder="Search From language"
              optionFilterProp="label"
              value={fromSelected}
              onChange={(val) => setFromSelected(val)}
              filterSort={(optionA, optionB) => {
                return (optionA?.label || "")
                  .toLowerCase()
                  .localeCompare((optionB?.label || "").toLowerCase());
              }}
              options={handleLanguage}
            />
            <Select
              showSearch
              variant="underlined"
              style={{ width: "100%" }}
              placeholder="Search to language"
              optionFilterProp="label"
              value={toSelected}
              onChange={(val) => setToSelected(val)}
              filterSort={(optionA, optionB) => {
                return (optionA?.label || "")
                  .toLowerCase()
                  .localeCompare((optionB?.label || "").toLowerCase());
              }}
              options={handleLanguage}
            />
            <div className="flex gap-3">
              <DatePicker
                showTime
                className="flex-1"
                variant="underlined"
                placeholder="Exam date"
                value={examDate}
                onChange={(value) => setExamDate(value)}
              />
              <button
                type="button"
                onClick={handleAddLanguagePair}
                className="bg-second-color text-[13px] text-white py-1 px-2 rounded-lg font-medium transition-colors duration-200"
              >
                Add Pair
              </button>
            </div>
          </form>
        )}
        <table className="w-full mt-4">
          <tbody className="text-[14px]">
            {currentLanguagePairs.map((lang, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="border-b border-blue-400 bg-gray-50 text-[10px] p-1 w-full">
                      {`${lang.from.languageName}(${lang.from.countryName}) - ${lang.to.languageName}(${lang.from.countryName})`}
                    </div>
                  </td>
                  <td>
                    <div className="border-b border-blue-400 bg-gray-50 text-[10px] p-1 w-full">
                      {`${lang.from.languageCode}(${lang.from.countryCode}) - ${lang.to.languageCode}(${lang.to.countryCode})`}
                    </div>
                  </td>
                  <td>
                    <div className="border-b border-blue-400 bg-gray-50 text-[10px] p-1 w-full">
                      {lang.examDate
                        ? lang.examDate.format("YYYY-MM-DD HH:mm")
                        : "No date set"}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="text-[#f00] text-[12px]"
                      onClick={() => onDeleteLanguagePair({ ietf: lang })}
                    >
                      <MinusCircleOutlined />
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
            className="text-second-color py-1 px-2 rounded font-roboto-condensed"
            onClick={() => setOpenModel((prev) => (prev !== 2 ? 2 : 0))}
            type="button"
          >
            <PlusCircleOutlined />
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
            <button
              className="bg-second-color text-[13px] text-white py-1 px-2 rounded-lg font-medium transition-colors duration-200"
              onClick={onAddSpecialization}
            >
              Add
            </button>
          </form>
        )}
        <table className="w-full mt-4">
          <tbody className="text-[14px]">
            {currentSpecializations.map((option, index) => {
              return (
                <tr key={option.id}>
                  <td>
                    <div className="border-b border-blue-400 bg-gray-50 text-[10px] p-1 w-full">
                      {option.name}
                    </div>
                  </td>
                  <td>
                    <button
                      className="text-[#f00] text-[12px] text-center w-full"
                      onClick={() =>
                        setCurrentSpecializations((prev) =>
                          prev.filter((lst) => lst.id !== option.id)
                        )
                      }
                    >
                      <MinusCircleOutlined />
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
