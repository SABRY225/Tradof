import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Pagination,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
} from "@mui/material";
import { SearchIcon } from "lucide-react";
import PageTitle from "@/UI/PageTitle";
import Cookies from "js-cookie";
import { getStartedProjects } from "@/Util/Https/companyHttp";
import CustomButton from "@/UI/CustomButton";
import { Avatar } from "@mantine/core";


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

const StartedProjects = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");


  useEffect(() => {
    const FatchData = async () => {
      const data = await getStartedProjects({ id: userId, token });
      setData(data);
    };
    FatchData();
  }, [token, userId, data]);


  const filteredProjects = projectsData.filter(
    (project) =>
      (filter === "All" || project.status === filter) &&
      project.title.toLowerCase().includes(search.toLowerCase())
  );

  const displayedProjects = filteredProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  return (
    <>
      <PageTitle title="Started Project" subtitle="project has been assigned to freelancer" />
      <Box py={5} px={10}>
        <Typography variant="h5" gutterBottom  sx={{
              display:{md:"flex",xs:"none"}
            }}>
          State
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" >
          <RadioGroup
            row
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              display:{md:"flex",xs:"none"}
            }}
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
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            placeholder="Substring of project name"
            sx={{
              width: '65%', // يمكنك التحكم في العرض
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#6C63FF', // تغيير لون الحدود هنا
                },
                '&:hover fieldset': {
                  borderColor: '#6C63FF',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6C63FF', // تغيير لون الحدود عند التركيز
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={search} // ربط القيمة بالحالة
            onChange={(e) => setSearch(e.target.value)} // تحديث النص المدخل في البحث
          />
        </Box>
        <Box mt={3}>
          {displayedProjects.map((project) => (
            <div
            key={project?.id}
            className="bg-card-color py-4 px-4 sm:px-6 md:px-10 my-6 md:my-10 rounded-lg shadow w-full max-w-4xl mx-auto"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="text-[20px] font-bold flex items-start sm:items-center">
                  <Avatar />
                  <div className="text-[16px] font-bold ml-2">
                    <div>{project?.owner}</div>
                    <div className="text-[13px] font-light break-all">{project?.gmail}</div>
                  </div>
                </div>
          
                <Box mt={[1, 2]} textAlign="right">
                  <CustomButton
                    label={project.status}
                    color={statusColors[project.status]}
                    textColor="white"
                  />
                </Box>
              </div>
          
              <div className="text-[20px] sm:text-[22px] font-bold mt-4">{project?.title}</div>
          
              <div className="border border-main-color my-3"></div>
          
              <ul>
                <li className="text-[15px] font-semibold mb-4">
                  Offer details
                  <div className="font-light">{project?.description}</div>
                </li>
          
                <li className="text-[15px] font-semibold my-2 flex flex-wrap sm:flex-nowrap">
                  <span className="min-w-[100px]">Start at</span>
                  <span className="font-light">{project?.startDate}</span>
                </li>
          
                <li className="text-[15px] font-semibold my-2 flex flex-wrap sm:flex-nowrap">
                  <span className="min-w-[100px]">Deadline</span>
                  <span className="font-light">{project?.deadline}</span>
                </li>
          
                <li className="text-[15px] font-semibold my-2 flex flex-wrap sm:flex-nowrap">
                  <span className="min-w-[100px]">Price</span>
                  <span className="font-light">{project?.price}</span>
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
  );
};

export default StartedProjects;
