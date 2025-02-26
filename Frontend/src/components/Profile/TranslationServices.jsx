import ButtonFelid from "@/UI/ButtonFelid";
import { getAllLanguages, queryClient } from "@/Util/Https/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Combobox from "../ui/Combobox";
import { toast } from "react-toastify";
import {
  addLanguagePair,
  deleteLanguagePairs,
} from "@/Util/Https/freelancerHttp";
import { useAuth } from "@/context/AuthContext";
import { FadeLoader } from "react-spinners";

export default function TranslationServices({ languagesPairs }) {
  const [handleLanguage, setHandleLanguage] = useState([]);
  const {
    user: { userId, token },
  } = useAuth();
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    clearErrors,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      languagePair: {
        from: "",
        to: "",
      },
    },
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

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["languagePair"],
    mutationFn: addLanguagePair,
    onError: (error) => {
      console.log(error);
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
    onSuccess: () => {
      clearErrors();
      setValue("languagePair", { from: "", to: "" });
      queryClient.invalidateQueries({ queryKey: ["freelancer"] });
    },
  });

  const { mutate: deleteLang } = useMutation({
    mutationKey: ["languagePair"],
    mutationFn: deleteLanguagePairs,
    onError: (error) => {
      console.log(error);
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
    onSuccess: () => {
      toast.success("Delete language pair successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["freelancer"] });
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

  const selectedFrom = watch("languagePair.from");
  const selectedTo = watch("languagePair.to");
  // console.log(languages);
  const handleAddLanguage = () => {
    if (selectedFrom && selectedTo) {
      console.log(selectedFrom, selectedTo);
      mutate({
        data: [{ languageFromId: selectedFrom, languageToId: selectedTo }],
        token,
        id: userId,
      });
    } else {
      toast.error("Must be select both languages pair", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const handleDeleteLanguage = ({ id }) => {
    deleteLang({ data: [id], token, id: userId });
  };

  // console.log(data);
  return (
    <>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Translation Services
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <div className="controls flex flex-col md:flex-row gap-5 justify-end">
          {/* Language Pair */}
          <div className="grid md:grid-cols-2 gap-4 flex-1">
            <div className="max-w-[300px] md:w-full">
              {handleLanguage && (
                <Combobox
                  List={handleLanguage}
                  initial="From language"
                  value={selectedFrom}
                  onChange={(val) => {
                    setValue("languagePair.from", val);
                    clearErrors("languagePair.from");
                  }}
                />
              )}
              {errors.languagePair?.from && (
                <p className="text-red-500 text-sm">
                  {errors.languagePair.from.message}
                </p>
              )}
            </div>
            <div className="max-w-[300px] md:w-full">
              {handleLanguage && (
                <Combobox
                  List={handleLanguage}
                  initial="To language"
                  value={selectedTo}
                  onChange={(val) => {
                    setValue("languagePair.to", val);
                    clearErrors("languagePair.to");
                  }}
                />
              )}
              {errors.languagePair?.to && (
                <p className="text-red-500 text-sm">
                  {errors.languagePair.to.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isPending && (
              <FadeLoader
                color="#000"
                cssOverride={{ width: "0px", height: "0px" }}
                height={3}
                width={3}
                loading
                margin={-11}
                radius={15}
                speedMultiplier={1}
              />
            )}
            <ButtonFelid
              text="Add new language pair"
              type="button"
              classes="font-semibold text-[13px] px-[18px] py-[5px] bg-second-color rounded-full"
              onClick={handleAddLanguage}
            />
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="font-poppins min-w-full bg-white rounded-md overflow-auto">
            <thead className="bg-card-color">
              <tr className="text-main-color font-bold text-left">
                <th className="p-3 px-5">Languages pair</th>
                <th className="p-3 px-5" colSpan="2">
                  IETF Tag
                </th>
              </tr>
            </thead>
            <tbody>
              {languagesPairs.map((pair, index) => (
                <tr
                  key={pair.id}
                  className={`font-roboto-condensed ${
                    index === languagesPairs.length - 1 ? "" : "border-b-[3px]"
                  }`}
                >
                  <td className="p-3 px-5 w-[50%]">
                    {pair.from.lang}({pair.from.country}) - {pair.to.lang} (
                    {pair.to.country})
                  </td>
                  <td className="p-3 text-gray-500 w-[50%]">
                    {pair.from.langCode}-{pair.from.countryCode} -{" "}
                    {pair.to.langCode}-{pair.to.countryCode}
                  </td>
                  <td className="p-3 px-5">
                    <button
                      type="button"
                      className="text-red-500 font-semibold"
                      onClick={() => handleDeleteLanguage({ id: pair.id })}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
