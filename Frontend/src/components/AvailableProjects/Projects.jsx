import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Pagination,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Cookies from "js-cookie";
// import convertDateToCustomFormat from "@/Util/convertDate";
import ButtonFelid from "@/UI/ButtonFelid";
import {
  clock,
  group_light2,
  group_list,
  person,
  plus,
  timer,
} from "@/assets/paths";
import { fatchProjects } from "@/Util/Https/freelancerHttp";
import { SearchIcon } from "lucide-react";
import Loading from "@/pages/Loading";
import { Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import getTimeAgo from "@/Util/getTime";
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
const Projects = ({ key, project }) => {
  const navigate = useNavigate();

  return (
    <div key={key} className="mt-8">
      <div className="px-5 flex items-center justify-end mb-[-15px]">
        <h1 className="mr-3 text-[15px]">
          {project?.firstName} {project?.lastName}
        </h1>
        <img
          src={project?.profileImageUrl || person}
          alt="profile photo"
          className="w-12 h-12 border-2 border-second-color rounded-full object-cover bg-white text-[8px]"
        />
      </div>
      <div className="w-[900px] max-w-full mx-auto px-6 py-3 bg-card-color rounded-lg">
        <div className="font-medium text-[20px] font-roboto-condensed border-b border-main-color pb-2">
          {project?.name}
        </div>
        <div className="pt-2">
          <p>{project?.description}</p>
          <div className="mt-3 flex justify-between items-center">
            <ButtonFelid
              icon={plus}
              text="Add Offer"
              type="submit"
              classes="bg-main-color px-5 py-1 text-[12px] font-roboto-condensed font-semibold"
              onClick={() => navigate(`../add-offer/${project?.id}`)}
            />

            <div className="flex justify-around items-center gap-3">
              <div className="bottom-4 right-4 flex gap-2">
                <img src={group_light2} alt="icon" width={15} />
                <p className="text-gray-500 text-[12px]">
                  {project?.numberOfOffers} Offers
                </p>
              </div>
              <div className="bottom-4 right-4 flex gap-2">
                <img src={timer} alt="icon" width={15} />
                <p className="text-gray-500 text-[12px]">
                  {getTimeAgo(project?.creationDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
