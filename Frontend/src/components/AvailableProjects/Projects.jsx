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
} from "@mui/material";
import Cookies from "js-cookie";
// import convertDateToCustomFormat from "@/Util/convertDate";
import ButtonFelid from "@/UI/ButtonFelid";
import { clock, group_light2, group_list, plus } from "@/assets/paths";
import { fatchProjects } from "@/Util/Https/freelancerHttp";
import { SearchIcon } from "lucide-react";

const Projects = () => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [budget, setBudget] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const token = Cookies.get("token");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOffers();
  }, [page, budget]);

  const fetchOffers = async () => {
    try {
      const response = await fatchProjects({ token });
      console.log(response);

      setOffers(response.items);
      setTotalPages(response.pageSize);
    } catch (error) {
      console.error("Error fetching offers", error);
    }
  };
  const [categories, setCategories] = useState([false, false, false, false]);
  const [deliveryTime, setDeliveryTime] = useState('Less than a week');

  const handleCategoryChange = (index) => {
    const newCategories = [...categories];
    newCategories[index] = !newCategories[index];
    setCategories(newCategories);
  };

  return (
    <Box p={3}>
      <Box display="flex">
        <Box >
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            placeholder="Substring of project name"
            sx={{
              width: '80%', // يمكنك التحكم في العرض
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
     <div className="container mx-auto p-4 max-w-2xl space-y-6">
      {/* Categories Section */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Categories</h2>
        {categories.map((checked, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCategoryChange(index)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>List Item</span>
          </div>
        ))}
      </div>

      {/* Language Pair Section */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Language pair</h2>
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">From</th>
              <th className="border p-2">To Select Text</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2"></td>
              <td className="border p-2">French</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Delivery Time Section */}
      <div className="mb-3">
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
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
          <TextField
            type="number"
            label="Budget"
            variant="outlined"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            sx={{ width: "80%" }}
          />

        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          {offers.map((offer, index) => (
            <Card key={index} sx={{ width: "1100px", px: 5, py: 2, background: "#E5E5FF" }}>
              <Box display="flex " alignItems="center" justifyContent="space-between" mb={1}>
                <Box display="flex " alignItems="center">
                  <Typography variant="h6" className="font-light" mr={2}>{offer.name}</Typography>
                </Box>
                <Box display="flex " alignItems="center" >
                  <Typography variant="h6" className="font-light" mr={2}>{offer.firstName}{" "}{offer.lastName}</Typography>
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

                <Box mt={3} display="flex" justifyContent="space-between" alignItems="end">
                  <Box>
                    <ButtonFelid
                      icon={plus}
                      text="Add Offer"
                      type="submit"
                      classes="rounded text-[15px] px-[30px] py-[7px] bg-main-color m-auto md:m-0"
                      onClick={() => console.log("Add offer clicked")}
                    />
                  </Box>
                  <Box display="flex" justifyItems={"center"} justifyContent={"space-around"} width={250}>
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
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
      </Box>
    </Box>
  );
};

export default Projects;

