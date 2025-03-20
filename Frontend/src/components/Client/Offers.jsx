import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Pagination,
  TextField,
} from "@mui/material";
import { fatchCurrentOffers } from "@/Util/Https/companyHttp";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import convertDateToCustomFormat from "@/Util/convertDate";
import ButtonFelid from "@/UI/ButtonFelid";
import { files } from "@/assets/paths";
import ButtonFelidRej from "@/UI/ButtonFelidRej";

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [budget, setBudget] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { projectId } = useParams();
  const token = Cookies.get("token");

  useEffect(() => {
    fetchOffers();
  }, [page, budget]);

  const fetchOffers = async () => {
    try {
      const response = await fatchCurrentOffers({ PageIndex: page, ProjectId: projectId, token });
      console.log(response);

      setOffers(response.items);
      setTotalPages(response.pageSize);
    } catch (error) {
      console.error("Error fetching offers", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom mb={4}>
        Current Offers
      </Typography>
      <Box display="flex">
        <Box display="flex" gap={2} mr={2}>
          <TextField
            type="number"
            label="Budget"
            variant="outlined"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            sx={{ width: "250px" }}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          {offers.map((offer, index) => (
            <Card key={index} sx={{ width: "1100px", p: 2, background: "#E5E5FF" }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar />
                <Typography variant="h6" className="font-light" ml={2}>Mohamed Abdalrazek</Typography>
              </Box>
              <CardContent>
                <Typography variant="body1">{offer.proposalDescription}</Typography>
                <Typography variant="subtitle2" mt={1} >
                  <span className="font-bold w-80 mr-14">Delivery time</span>
                  <span className="font-light">{convertDateToCustomFormat(offer.timePosted)}</span>
                </Typography>
                <Typography variant="subtitle2">
                  <span className="font-bold w-80 mr-24" >Budget</span>
                  <span className="font-light">${offer.offerPrice}</span>
                </Typography>

                <Box mt={2} display="flex" justifyContent="space-between" alignItems="end">
                  <Box>
                    <div className="font-bold mb-1" >Attachment files</div>
                    <ButtonFelid
                      icon={files}
                      text="Files"
                      type="submit"
                      classes="rounded text-[15px] px-[30px] py-[7px] bg-second-color m-auto md:m-0"
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-around" width={250}>
                    <ButtonFelid
                      text="Accept"
                      type="submit"
                      classes=" rounded-[0px] text-[15px] px-[30px] py-[7px] bg-second-color m-auto md:m-0"
                    />
                    <ButtonFelidRej                        
                      text="Reject"
                      type="submit"
                      classes=" rounded-[0px] text-[15px] px-[30px] py-[7px]  m-auto md:m-0"/>
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

export default OffersPage;
