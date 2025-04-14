import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Pagination,
  FormControlLabel,
  Radio,
  RadioGroup,
  Avatar
} from "@mui/material";
import PageTitle from "@/UI/PageTitle";
import Cookies from "js-cookie";
import CustomButton from "@/UI/CustomButton";
import { fatchOffers } from "@/Util/Https/freelancerHttp";
import { calendar, calender, grayBudget, timer } from "@/assets/paths";

const projectsData = [
  {
    id: 1,
    owner: "Mohamed abdalrazek",
    gmail: "Mohamedabdalrazek@gmail.com",
    title: "Translation of an article about medical tools",
    description:
      "Translation of an article about medical tools,Translation of an article about medical tools,Translation of an article about medical tools",
    startDate: "12/12/2024",
    deadline: "3 weeks",
    price: "$39.15",
    status: "Active",
  },
  {
    id: 2,
    owner: "Mohamed abdalrazek",
    gmail: "Mohamedabdalrazek@gmail.com",
    title: "Translation of an article about medical tools",
    description:
      "Translation of an article about medical tools,Translation of an article about medical tools,Translation of an article about medical tools",
    startDate: "12/12/2024",
    deadline: "3 weeks",
    price: "$50.25",
    status: "Complete",
  },
  {
    id: 3,
    owner: "Mohamed abdalrazek",
    gmail: "Mohamedabdalrazek@gmail.com",
    title: "Translation of an article about medical tools",
    description:
      "Translation of an article about medical tools,Translation of an article about medical tools,Translation of an article about medical tools",
    startDate: "12/12/2024",
    deadline: "3 weeks",
    price: "$30.25",
    status: "Review",
  },
];

const statusColors = {
  Active: "#3DCF3D",
  Complete: "#FF9500",
  "Review": "#6C63FF",
};
function Offers() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
  
  
    useEffect(() => {
      const FatchData = async () => {
        const data = await fatchOffers({ userId, token });
        console.log(data);
        
        setData(data.items);
      };
      FatchData();
    }, []);
  
  
    const filteredProjects = projectsData.filter(
      (project) =>
        (filter === "All" || project.status === filter) &&
        project.title.toLowerCase().includes(search.toLowerCase())
    );
  
    const displayedProjects = data.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  
    useEffect(() => {
      setPage(1);
    }, [filter, search]);
  
  return (
    <>
    <PageTitle title="Your Offers" subtitle="Follow your offers" />
    <Box py={5} px={10}>
        {/* <Typography variant="h5" gutterBottom>
          State
        </Typography> */}
        {/* <Box display="flex" alignItems="center" justifyContent="space-between">
          <RadioGroup
            row
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {["All", "Active", "Review", "Complete"].map((state) => (
              <FormControlLabel
                key={state}
                value={state}
                control={<Radio />}
                label={state}
              />
            ))}
          </RadioGroup>
        </Box> */}
        <Box mt={3}>
          {displayedProjects.map((project) => (
            <div
              key={project?.id}
              className=" bg-card-color py-[15px] px-[30px] mx-10 my-10 rounded-lg shadow"
            >
              <div>
                <div className="flex justify-between">
                  <div className=" font-bold flex items-center">
                    <Avatar src={project?.companyImage} sx={{ width: 60, height: 60 }}/>
                    <div className="text-[16px] font-bold ml-2">
                      <div >{project?.companyFirstName+" "+project?.companyLastName}</div>
                      <div className="text-[13px] font-light ">{project?.companyEmail}</div>
                    </div>
                  </div>

                  {/* <Box mt={2} textAlign="right">
                    <CustomButton label={project.status} color={statusColors[project.status]} textColor="white" />
                  </Box> */}
                </div>
                <div className="text-[22px] font-bold mt-2">
                  {project?.projecttitle}
                </div>
                          <div className="flex flex-col md:flex-row md:gap-[30px] mt-2">
                            <div className="flex gap-2">
                              <img src={timer} alt="icon" width={15} />
                              <p className="text-gray-500 text-[12px]">
                                {new Date(project.timePosted).toDateString()} 
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <img src={grayBudget} alt="icon" width={15} />
                              <p className="text-gray-500 text-[12px]">
                                {project.offerPrice} 
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <img src={calendar} alt="icon" width={15}  />
                              <p className="text-gray-500 text-[12px]">
                                Delivery time {project.days} days
                              </p>
                            </div>
                          </div>
                <div className="border border-main-color my-3"></div>
                <ul>
                  <li className="text-[15px] font-semibold mb-5">
                    Offer details{" "}
                    <div className="font-light">{project?.proposalDescription}</div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(filteredProjects.length / itemsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Box>
      </Box>
      
    </>
  )
}

export default Offers
