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
  MenuItem
} from "@mui/material";
import Cookies from "js-cookie";
// import convertDateToCustomFormat from "@/Util/convertDate";
import ButtonFelid from "@/UI/ButtonFelid";
import { clock, group_light2, group_list, plus } from "@/assets/paths";
import { fatchProjects } from "@/Util/Https/freelancerHttp";
import { SearchIcon } from "lucide-react";
import Loading from "@/pages/Loading";
import { Paper } from "@mantine/core";
import { getAllLanguages, getAllSpecializations } from "@/Util/Https/http";
import { useNavigate } from "react-router-dom";
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [page, setPage] = useState(1);
  const [budget, setBudget] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const token = Cookies.get("token");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchOffers();
    fetchAllSpecializations();
    fetchAllLanguages();
  }, [page, budget]);

  const fetchOffers = async () => {
    try {
      const response = await fatchProjects({ token });
      console.log(response);

      setProjects(response.items);
      setTotalPages(response.pageSize);
    } catch (error) {
      console.error("Error fetching offers", error);
    }
  };

  const fetchAllSpecializations = async () => {
    try {
      const response = await getAllSpecializations({ token });
      setSpecializations(response)
    } catch (error) {
      console.error("Error fetching offers", error);
    }
  };
  const fetchAllLanguages = async () => {
    try {
      const response = await getAllLanguages({ token });
      setLanguages(response)
    } catch (error) {
      console.error("Error fetching offers", error);
    }
  };

  const [deliveryTime, setDeliveryTime] = useState('Less than a week');


const handleAddOffer = (id) => {
  navigate(`/user/project/add-offer/${id}`)
};
  return (
    <Box mt={8}>
      <Box sx={{
        display: { md: "flex", xs: "flex-col" }
      }}>
        {projects.length > 0 ? (
          <>
            <Box className="border-r-0 md:border-r-4 md:border-dashed md:border-[#6C63FF] mx-3 px-14">
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                placeholder="Substring of project name"
                sx={{
                  width: '100%', // يمكنك التحكم في العرض
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
                  marginBottom: "1rem"
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

              <Box
              >
                {/* Categories Section */}
                <Box sx={{
                   mt: 4,
                   display: { md: "block", xs: "none" }
                }}>
                  <h2 className="text-lg font-semibold mt-7">Categories</h2>
                  {specializations.map((checked, index) => (
                    <div key={index} className="flex items-center space-x-2 my-3">
                      <input
                        type="checkbox"
                        // checked={checked}
                        // onChange={() => handleCategoryChange(index)}
                        className="form-checkbox h-4 w-4 text-blue-600 "
                      />
                      <span>{checked.name}</span>
                    </div>
                  ))}
                </Box>

                {/* Language Pair Section */}
                <Box sx={{
                   mt: 4,
                   display: { md: "block", xs: "none" }
                }}>
                  <h2 className="text-lg font-semibold">Language pair </h2>
                  <div className="mt-5 flex justify-center   items-center">

                    <TextField
                      id="outlined-select-currency"
                      select
                      label="From"
                      sx={{
                        mr: 2,
                        width: "150px"
                      }}
                      helperText="From language"
                    >
                      {languages.map((option) => (
                        <MenuItem key={option.languageCode} value={option.languageCode}>
                        {option.languageName} ({option.countryName})
                      </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="To"
                      helperText="To language"
                      sx={{
                        width: "150px"
                      }}
                    >
                     {languages.map((option) => (
                        <MenuItem key={option.languageCode} value={option.languageCode}>
                        {option.languageName} ({option.countryName})
                      </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </Box>


                {/* Delivery Time Section */}
                <Box sx={{
                  mt: 4,
                  display: { md: "block", xs: "none" }
                }}>
                  <h2 className="text-lg font-semibold">Delivery time</h2>
                  {[
                    'Less than a week',
                    'From 1 to 2 weeks',
                    'From 2 weeks to a month',
                    'From one month to three month',
                    'More than 3 months',
                  ].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="deliveryTime"
                        checked={deliveryTime === option}
                        onChange={() => setDeliveryTime(option)}
                        className="form-radio h-4 w-4 text-blue-600 my-3"
                      />
                      <span>{option}</span>
                    </div>
                  ))}
                </Box>
              </Box>

              <TextField
                type="number"
                label="Budget"
                variant="outlined"

                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                sx={{  mt: 4 ,display: { md: "block", xs: "none" }}}
              />

            </Box>

            <Box display="flex" flexDirection="column" gap={2} sx={{
              m:{md:"0rem",xs:"1rem"},
              ml:{md:"2rem"},

            }}>
              {projects.map((offer, index) => (
                <Card key={index} sx={{
                  width: "900px", // القيمة الأصلية
                  maxWidth: '100%', // لجعل البطاقة لا تتجاوز عرض الحاوية
                  mx: 'auto',      // لتوسيط البطاقة أفقيًا
                  px: 5,
                  py: 2,
                  background: "#E5E5FF",
                  // أنماط للشاشات الصغيرة (أقل من 600 بكسل عرضًا)
                  '@media (max-width: 600px)': {
                    px: 2, // تقليل الحشو الأفقي
                  },
                  // أنماط للشاشات المتوسطة (بين 600 و 960 بكسل عرضًا)
                  '@media (min-width: 600px) and (max-width: 960px)': {
                    px: 3, // حشو أفقي متوسط
                  },
                }}>
                  <Box display="flex " alignItems="center" justifyContent="space-between" mb={1}>
                    <Box display="flex " alignItems="center">
                      <Typography variant="h6" className="font-light" mr={2}>{offer.name}</Typography>
                    </Box>
                    <Box alignItems="center" sx={{
                      display:{md:"flex",xs:"none"}
                    }} >
                      <Typography  className="font-light" mr={2} >{offer.firstName}{" "}{offer.lastName}</Typography>
                      <Avatar src={offer.profileImageUrl} sx={{ width: 60, height: 60 }} />
                    </Box >
                  
                  </Box>
                  <div className="border border-[#CCCCCC] my-1"></div>
                  <CardContent style={{
                    marginLeft: "-1rem"
                  }}>
                    <Typography >
                      {offer.description}
                    </Typography>

                    <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <ButtonFelid
                          icon={plus}
                          text="Add Offer"
                          type="submit"
                          classes="rounded text-[15px] px-[30px] py-[7px] bg-main-color m-auto md:m-0"
                          onClick={() => handleAddOffer(offer.id)}
                        />
                      </Box>
                      <Box  sx={{
                           display:"flex",
                           justifyContent:"space-around",
                           justifyItems:"center",
                           width:{md:250,xs:190}
                           }} >
                        <Box display={"flex"} justifyContent={"space-between"} width={100}>
                          <Typography>
                            <img src={group_light2} alt={group_list} width={25} />
                          </Typography>
                          <Typography className="text-[#808080] ">
                            {offer.numberOfOffers}
                          </Typography>
                          <Typography className="text-[#808080] ">
                            Offers
                          </Typography>
                        </Box>
                        <Box display={"flex"} justifyItems={"center"} justifyContent={"space-between"} width={70}>
                          <Typography>
                            <img src={clock} alt={group_list} width={25} />
                          </Typography>
                          <Typography className="text-[#808080] ">
                            {new Date(offer.startDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        ) : (<Loading />)}

      </Box>
      <Box display="flex" justifyContent="center" mt={3} mb={5}>
        <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
      </Box>
    </Box>
  );
};

export default Projects;

