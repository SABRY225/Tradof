import { useAuth } from "@/context/AuthContext";
import {
  addCV,
  addSpecialization,
  deleteSpecialization,
} from "@/Util/Https/freelancerHttp";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { message } from "antd";
import Combobox from "../ui/Combobox";
import { closeWhite } from "../../assets/paths";
import { getAllSpecializations, queryClient } from "@/Util/Https/http";

export default function ProfessionalDetails({ professionalDetails, isShared }) {
  const { user } = useAuth() || {};
  const userId = user?.userId;
  const token = user?.token;

  const [CV, setCV] = useState(professionalDetails.cv);
  const [specialization, setSpecialization] = useState(null);
  const { data: specializations } = useQuery({
    queryKey: ["specializations"],
    queryFn: getAllSpecializations,
  });

  const { mutate: addSpec, isPending: isPendingSpec } = useMutation({
    mutationKey: ["addSpecialization"],
    mutationFn: addSpecialization,
    onSuccess: () => {
      message.success("Add Specialization Successfully");
      queryClient.invalidateQueries({ queryKey: ["freelancer"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { mutate: deleteSpec, isPending: isPendingDeleteSpec } = useMutation({
    mutationKey: ["deleteSpecialization"],
    mutationFn: deleteSpecialization,
    onSuccess: () => {
      message.success("Delete Specialization Successfully");
      queryClient.invalidateQueries({ queryKey: ["freelancer"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["AddCV"],
    mutationFn: addCV,
    onSuccess: () => {
      message.success("Add/Edit CV Successfully");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    mutate({ data: { file: selectedFile }, id: userId, token });
    setCV(URL.createObjectURL(selectedFile));
  };

  const handleAddSpecialization = () => {
    if (specialization) {
      console.log(
        professionalDetails.certifications.find(
          (temp) => temp.id === specialization
        )
      );
      if (
        professionalDetails.certifications.find(
          (temp) => temp.id === specialization
        )
      ) {
        message.success("Specialization already exist");
        return;
      }
      addSpec({ data: [specialization], id: userId, token });
      setSpecialization(null);
    }
  };

  const handleDeleteSpecialization = ({ id }) => {
    deleteSpec({ data: [id], id: userId, token });
  };

  return (
    <>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Professional Details
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <div className="flex gap-5">
          <h1 className="">CV</h1>
          <div className="flex gap-3 justify-between w-full">
            {CV && (
              <Link to={CV} target="_blank" className="text-blue-500">
                Download CV
              </Link>
            )}
            {!isShared && (
              <div className="flex items-center gap-5">
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
                <label
                  htmlFor="cv"
                  className="cursor-pointer bg-second-color text-white px-3 py-1 rounded-lg text-sm font-poppins"
                >
                  {CV ? "Edit" : "Upload"}
                </label>
                <input
                  type="file"
                  name="cv"
                  id="cv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="">Specializations</h1>
          {!isShared && (
            <div className="flex gap-5  items-center max-w-[400px] ">
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
              <button
                type="button"
                className="text-white bg-second-color rounded-md px-2"
                onClick={handleAddSpecialization}
              >
                Add
              </button>
            </div>
          )}

          <ul className="flex gap-2">
            {professionalDetails.certifications.map((certification, index) => (
              <li
                key={certification.id}
                className="flex w-fit bg-second-color text-white px-2 rounded-sm"
              >
                <span>{certification.name}</span>
                {!isShared && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteSpecialization({ id: certification.id })
                    }
                  >
                    <img src={closeWhite} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
