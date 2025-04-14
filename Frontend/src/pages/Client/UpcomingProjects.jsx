import { blueOffers, openPage, rabash } from "@/assets/paths";
import PageTitle from "@/UI/PageTitle";
import { deleteProject, getUpcomingdProjects } from "@/Util/Https/companyHttp";
import { Height } from "@mui/icons-material";
import { Box, Container, InputAdornment, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function UpcomingProjects() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const FatchData = async () => {
      const data = await getUpcomingdProjects({ id: userId, token });
      console.log(data);
      
      setData(data.items);
    };
    FatchData();
  }, []);

  const filteredProjects = data.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteProject({id, token});
      // setData(data.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      {/* <PageTitle title="Upcoming Project" subtitle="Project hasn’t been assigned to freelancer" /> */}
      <PageTitle title="Upcoming Project"  />
      {/* {filteredProjects?<Box sx={{
        // margin:"250px"
      }}>
        <FadeLoader 
      color="#000"
      height={5}
      width={5}
      loading
      margin={-1}
      // radius={15}
      // speedMultiplier={1}
      />
      </Box>:""} */}
      <Container className='pt-14'>
      <div className="flex justify-around items-center  ">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          placeholder="Substring of project name"
          sx={{
            width: {md:'65%',xs:"90%"}, // يمكنك التحكم في العرض
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
          value={searchQuery} // ربط القيمة بالحالة
          onChange={(e) => setSearchQuery(e.target.value)} // تحديث النص المدخل في البحث
        />
      </div>
      
        {filteredProjects.length === 0 ? (
          <p className="text-center my-28 font-bold text-3xl text-main-color">No Projects Found</p> // في حالة عدم وجود مشاريع تطابق البحث
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className=" bg-card-color py-[15px] px-[30px]  my-10 rounded-lg shadow"
            >
              <div>
                <div className="flex justify-between">
                  <div className="md:text-[22px] font-bold">
                    {project?.name}
                  </div>
                  <Box className="py-[5px] px-[20px] rounded-lg font-[500] text-main-color items-center" sx={{
                    display:{md:"flex",xs:"none"}
                  }}>
                    <div><img
                      src={blueOffers}
                      alt="offers icon"
                      width={23}
                      className="mr-1"
                    /></div>
                    <Box sx={{
                      fontSize:21
                    }}>{project?.numberOfOffers} Offers</Box>
                    <Link to={`/user/project/offer/${project.id}`} className="mx-5">
                      <img src={openPage} alt="" width={23} />
                    </Link>
                  </Box>
                </div>
                <div className="border border-main-color my-3"></div>
                <ul>
                  <li className="text-[12px] font-semibold mb-5">
                    Project details:{" "}
                    <div className="font-regular">{project?.description}</div>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Language pair:{" "}
                    <span className="font-light">
                      {project.languageFrom.languageName} (
                      {project.languageFrom.languageCode}){" "}
                      - {project.languageTo.languageName} (
                      {project.languageTo.languageCode})
                    </span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Category:{" "}
                    <span className="font-light">{project?.specialization.name}</span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Delivery time:{" "}
                    <span className="font-light">{project?.days} days</span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Budget:{" "}
                    <span className="font-light">
                      $ {project?.minPrice} - $ {project?.maxPrice}
                    </span>
                  </li>
                </ul>
              </div>
              <Box className="flex flex-row ml-auto  items-end" sx={{
                mt:{md:"2rem",xs:"1rem"},
                justifyContent:{md:"end",xs:"space-around"}
              }}>
              <Box className="py-[5px] px-[20px] rounded-lg font-[500] text-main-color items-center" sx={{
                    display:{md:"none",xs:"flex"}
                  }}>
                    <div><img
                      src={blueOffers}
                      alt="offers icon"
                      width={17}
                      className="mr-1"
                    /></div>
                    <Box sx={{
                      fontSize:17
                    }}>{project?.numberOfOffers} Offers</Box>
                    <Link to={`/user/project/offer/${project.id}`} className="mx-5">
                      <img src={openPage} alt={openPage} width={17} />
                    </Link>
                  </Box>
              <button
                  type="button"
                  className="py-[5px] px-[20px] rounded-lg font-[500] text-[20px] text-[#FF3B30] flex"
                  onClick={() => handleDelete(project.id)}
                >
                  <img
                    src={rabash}
                    alt="offers icon"
                    width={20}
                    className="mr-1"
                  />
                  Delete
                </button>
              </Box>
            </div>
          ))
        )}
      </Container>
      
    </>
  );
}

export default UpcomingProjects;
