import { Button, Modal, DatePicker, Select, message } from "antd";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  addLanguagePair,
  deleteLanguagePairs,
} from "@/Util/Https/freelancerHttp";
import { generateTranslationExam } from "@/Util/Https/http";
import { useAuth } from "@/Context/AuthContext";
import { FadeLoader } from "react-spinners";
import dayjs from "dayjs";
import { getAllLanguages, queryClient } from "@/Util/Https/http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpellCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function TranslationServices({ languagesPairs, isShared }) {
  const navigate = useNavigate();
  const [handleLanguage, setHandleLanguage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examDate, setExamDate] = useState(null);
  const { user } = useAuth();
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
    mutationFn: generateTranslationExam,
    onError: (error) => {
      console.log(error);
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Create exam successfully, check your email");
      clearErrors();
      setValue("languagePair", { from: "", to: "" });
      setIsModalOpen(false);
      navigate(".", { replace: true });
    },
  });

  const { mutate: deleteLang } = useMutation({
    mutationKey: ["languagePair"],
    mutationFn: deleteLanguagePairs,
    onError: (error) => {
      console.log(error);
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Delete language pair successfully");
      navigate(".", { replace: true });
    },
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

  const selectedFrom = watch("languagePair.from");
  const selectedTo = watch("languagePair.to");


  const handleDeleteLanguage = ({ pair }) => {
    deleteLang({
      pair,
      token: user?.token,
      id: user?.userId,
      email: user?.email,
    });
  };

  const handleGenerateExam = () => {
    if (!selectedFrom || !selectedTo) {
      message.error("Please select both languages");
      return;
    }
    if (!examDate) {
      message.error("Please select an exam date");
      return;
    }

    mutate({
      token: user?.token,
      freelancerId: user?.userId,
      initial: languages.find((lang) => lang.id === selectedFrom),
      target: languages.find((lang) => lang.id === selectedTo),
      email: user?.email,
      examDate: examDate.toISOString(),
    });
  };

  return (
    <>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Translation Services
      </h1>
      <div className="space-y-[!0px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="font-poppins min-w-full bg-white rounded-md overflow-auto">
            <thead className="bg-card-color">
              <tr className="text-main-color font-bold text-left">
                <th className="p-3 px-5">Languages pair</th>
                <th className="p-3 px-5" colSpan="2">
                  IETF Tag
                </th>
                <th>
                  {!isShared && (
                    <div className="flex justify-end">
                      <Button
                        type="default"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Add Language Pair
                      </Button>
                    </div>
                  )}
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
                    <div className="flex gap-2 items-center">
                      <div className="relative group">
                        <FontAwesomeIcon
                          icon={faSpellCheck}
                          color={pair.isExam ? "#f2a600" : "black"}
                        />
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-[10px] rounded px-2 py-1 -top-8 left-[0%] transform  whitespace-nowrap z-10">
                          {pair.isExam
                            ? `Completed Exam - Score: ${
                                pair?.examScore + "%" || "N/A"
                              }`
                            : "Not Completed Exam"}
                        </div>
                      </div>
                      {pair.from.lang}({pair.from.country}) - {pair.to.lang} (
                      {pair.to.country})
                    </div>
                  </td>
                  <td className="p-3 text-gray-500 w-[50%]">
                    {pair.from.langCode}-{pair.from.countryCode} -{" "}
                    {pair.to.langCode}-{pair.to.countryCode}
                  </td>
                  {!isShared && (
                    <td className="p-3 px-5 w-full">
                      <Button
                        type="text"
                        danger
                        onClick={() => handleDeleteLanguage({ pair })}
                        className="hover:bg-red-50 text-center"
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="Add Language Pair"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="space-y-4">
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Search From language"
            optionFilterProp="label"
            value={selectedFrom}
            onChange={(val) => {
              setValue("languagePair.from", val);
              clearErrors("languagePair.from");
            }}
            filterSort={(optionA, optionB) => {
              var _a, _b;
              return (
                (_a =
                  optionA === null || optionA === void 0
                    ? void 0
                    : optionA.label) !== null && _a !== void 0
                  ? _a
                  : ""
              )
                .toLowerCase()
                .localeCompare(
                  ((_b =
                    optionB === null || optionB === void 0
                      ? void 0
                      : optionB.label) !== null && _b !== void 0
                    ? _b
                    : ""
                  ).toLowerCase()
                );
            }}
            options={handleLanguage}
          />

          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Search To language"
            optionFilterProp="label"
            value={selectedTo}
            onChange={(val) => {
              setValue("languagePair.to", val);
              clearErrors("languagePair.to");
            }}
            filterSort={(optionA, optionB) => {
              var _a, _b;
              return (
                (_a =
                  optionA === null || optionA === void 0
                    ? void 0
                    : optionA.label) !== null && _a !== void 0
                  ? _a
                  : ""
              )
                .toLowerCase()
                .localeCompare(
                  ((_b =
                    optionB === null || optionB === void 0
                      ? void 0
                      : optionB.label) !== null && _b !== void 0
                    ? _b
                    : ""
                  ).toLowerCase()
                );
            }}
            options={handleLanguage}
          />

          <div>
            <DatePicker
              showTime
              style={{ width: "100%" }}
              placeholder="Select exam date"
              value={examDate}
              onChange={(date) => {
                if (date) {
                  setExamDate(date);
                } else {
                  setExamDate(null);
                }
              }}
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleGenerateExam}
              loading={isPending}
              className="bg-second-color"
            >
              Generate Exam
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
