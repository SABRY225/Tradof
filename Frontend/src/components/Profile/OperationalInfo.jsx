import ButtonFelid from "@/UI/ButtonFelid";
import {
  getAllLanguages,
  getAllSpecializations,
  queryClient,
} from "@/Util/Https/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Combobox from "../ui/Combobox";
import {
  addPreferredLanguage,
  addSpecialization,
  deletePreferredLanguage,
  deleteSpecialization,
} from "@/Util/Https/companyHttp";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function OperationalInfo({
  preferredLanguages,
  industriesServed,
  isShared,
}) {
  const { user } = useAuth() || {};
  const userId = user?.userId;
  const token = user?.token;

  const [handleLanguage, setHandleLanguage] = useState([]);
  const [preferredLang, setPreferredLang] = useState(null);
  const [specialization, setSpecialization] = useState(null);

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

  const { data: specializations } = useQuery({
    queryKey: ["specializations"],
    queryFn: getAllSpecializations,
  });

  const { mutate: addPreferLang, isPending } = useMutation({
    mutationKey: ["addPreferredLanguage"],
    mutationFn: addPreferredLanguage,
    onSuccess: () => {
      toast.success("adding preferred language successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["CompanyAdmin"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const { mutate: deletePreferLang, isLoading } = useMutation({
    mutationKey: ["deletePreferredLanguage"],
    mutationFn: deletePreferredLanguage,
    onSuccess: () => {
      toast.success("delete preferred language successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["CompanyAdmin"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const { mutate: addSpec, isPending: isPendingAddSpec } = useMutation({
    mutationKey: ["addSpecialization"],
    mutationFn: addSpecialization,
    onSuccess: () => {
      toast.success("Add Specialization Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["CompanyAdmin"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const { mutate: deleteSpec, isPending: isPendingDeleteSpec } = useMutation({
    mutationKey: ["deleteSpecialization"],
    mutationFn: deleteSpecialization,
    onSuccess: () => {
      toast.success("Delete Specialization Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["CompanyAdmin"] });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  useEffect(() => {
    if (languages) {
      let editing = languages.map((lang) => ({
        id: lang.id,
        name: `${lang.languageName}(${lang.countryName}) / ${lang.languageCode}(${lang.countryCode})`,
      }));
      setHandleLanguage(editing);
    }
  }, [languages]);

  const handleAddPreferredLanguage = () => {
    if (!preferredLang) return;
    if (preferredLanguages.find((lang) => lang.id === preferredLang)) {
      toast.success("preferred language is already exist", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }
    addPreferLang({ data: [preferredLang], id: userId, token });
    setPreferredLang(null);
  };

  const handleDeletePreferredLanguage = ({ id }) => {
    deletePreferLang({ data: [id], id: userId, token });
  };

  const handleAddSpecialization = () => {
    if (!specialization) return;
    if (industriesServed.find((temp) => temp.id === specialization)) {
      toast.success("Industries Served language is already exist", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }
    addSpec({ data: [specialization], id: userId, token });
    setSpecialization(null);
  };

  const handleDeleteSpecialization = ({ id }) => {
    deleteSpec({ data: [id], id: userId, token });
  };

  return (
    <>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Operational Info
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <div className="flex flex-col gap-5 items-center justify-between md:flex-row">
          <div className="max-w-[300px] md:w-full">
            {handleLanguage && (
              <Combobox
                List={handleLanguage}
                initial="language"
                value={preferredLang}
                onChange={(val) => {
                  setPreferredLang(val);
                }}
              />
            )}
          </div>
          <ButtonFelid
            text="Add new language"
            type="button"
            classes="font-semibold text-[13px] px-[18px] py-[5px] bg-second-color rounded-full"
            onClick={handleAddPreferredLanguage}
          />
        </div>
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
                key={language.id}
                className={`font-roboto-condensed ${
                  index === preferredLanguages.length - 1
                    ? ""
                    : "border-b-[3px]"
                }`}
              >
                <td className="p-3 px-5 w-[50%]">
                  {language.languageName} ({language.countryName})
                </td>
                <td className="p-3 text-gray-500 w-[50%]">
                  {language.languageCode}-{language.countryCode}
                </td>
                <td className="p-3 px-5">
                  <button
                    type="button"
                    className="text-red-500 font-semibold"
                    onClick={() =>
                      handleDeletePreferredLanguage({ id: language.id })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <div className="max-w-[300px] md:w-full">
            {specializations && (
              <Combobox
                List={specializations}
                initial="Select Specialization"
                value={specialization}
                onChange={(val) => {
                  setSpecialization(val);
                }}
              />
            )}
          </div>
          <ButtonFelid
            text="Add Industry Served"
            type="button"
            classes="font-semibold text-[13px] px-[18px] py-[5px] bg-second-color rounded-full"
            onClick={handleAddSpecialization}
          />
        </div>
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
                key={industry.id}
                className={`font-roboto-condensed ${
                  index === industriesServed.length - 1 ? "" : "border-b-[3px]"
                }`}
              >
                <td className="p-3 px-5 w-full">{industry.name}</td>
                <td className="p-3 px-5">
                  <button
                    type="button"
                    className="text-red-500 font-semibold"
                    onClick={() =>
                      handleDeleteSpecialization({ id: industry.id })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
