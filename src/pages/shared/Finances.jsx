import { useEffect, useState } from "react";
import PageTitle from "@/UI/PageTitle";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useAuth } from "@/context/AuthContext";
import { GetCompanyProjectsFinancials, GetCompanyStatistics } from "@/Util/Https/companyHttp";
import { GetFreelancerProjectsFinancials, GetFreelancerStatistics } from "@/Util/Https/freelancerHttp";
import { search } from "@/assets/paths";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function Finances() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const {
    user: { userId, token, role },
  } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        let data;
        let data2;
        if (role === "Freelancer") {
          data = await GetFreelancerStatistics({ freelancerId: userId, token });
          data2 = await GetFreelancerProjectsFinancials({ token });
          console.log("true");

        } else {
          data = await GetCompanyStatistics({ companyId: userId, token });
          data2 = await GetCompanyProjectsFinancials({ token });
        }
        setStatistics(data.data);
        setTransactions(data2.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransactions = transactions
    .filter((t) => {
      if (activeTab === 1) return t.paymentStatus === "paid";
      if (activeTab === 2) return t.paymentStatus === "pending";
      return true;
    })
    .filter((t) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        t?.user?.firstName?.toLowerCase().includes(searchLower) ||
        t?.user?.lastName?.toLowerCase().includes(searchLower) ||
        t?.prjectData?.name?.toLowerCase().includes(searchLower)
      );
    });


  if (loading) return <p>
    <Loading />
  </p>;
  console.log(filteredTransactions);

  return (
    <div className="bg-background-color">
      <PageTitle title="Your Finances" />
      <div className="container max-w-screen-xl mx-auto p-4 w-full mt-[30px]">
        <div className="space-y-[20px] rounded-[8px]">
          {/* Withdraw Button */}
          {role == "Freelancer" && statistics?.availableBalance > 100 && (
            <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-start" }}>
              <Button
                variant="contained"
                startIcon={<AttachMoneyIcon />}
                sx={{
                  bgcolor: "#6c63ff",
                  "&:hover": { bgcolor: "#5a52d5" },
                  borderRadius: "4px",
                  textTransform: "none",
                  px: 2,
                  py: 0.75,
                  fontSize: "0.875rem",
                }}
                onClick={() => Navigate(`/user/withdraw-profits/${statistics?.availableBalance}`)}
              >
                Withdraw Profits
              </Button>
            </Box>
          )}

          {/* Balance Card */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#6c63ff",
              color: "white",
              borderRadius: "8px",
              overflow: "hidden",
              mb: 3,
            }}
          >
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
                Total balance
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {statistics?.totalBalance} EGP
              </Typography>
            </Box>

            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: "#E5E5FF",
                  color: "#333",
                  borderRight: "2px solid #6C63FF",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  {role == "Freelancer"
                    ? "Available balance"
                    : "Previous Amounts"}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {role == "Freelancer"
                    ? ` ${statistics?.availableBalance} EGP`
                    : ` ${statistics?.previousBalance} EGP`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: "#E5E5FF",
                  color: "#333",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  Pending Amounts
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {statistics?.pendingBalance} EGP
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Search and Tabs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 5,
            }}
          >
            <div className="relative w-[300px]">
              <input
                type="text"
                placeholder="Search transactions"
                value={searchQuery}
                onChange={handleSearchChange}
                className="font-epilogue outline-none border-[1px] border-[#D6D7D7] rounded p-2 w-full focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]"
              />
              <img
                src={search}
                alt=""
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  minWidth: "auto",
                  px: 2,
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "#666",
                },
                "& .Mui-selected": {
                  color:
                    activeTab === 1
                      ? "#4caf50"
                      : activeTab === 2
                        ? "#ff6b6b"
                        : "#6c63ff",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor:
                    activeTab === 1
                      ? "#4caf50"
                      : activeTab === 2
                        ? "#ff6b6b"
                        : "#6c63ff",
                },
              }}
              className="sm:ml-0 ml-4"
            >
              <Tab label="All" />
              <Tab label="Paid" />
              <Tab label="Pending" />
            </Tabs>
          </Box>

          {/* Transactions List */}
          <Grid container spacing={3}>
            {filteredTransactions.map((transaction) => (
              <Grid item xs={12} md={6} key={transaction.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "8px",
                    border: "1px solid #eaeaea",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Status indicator */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      px: 2,
                      py: 0.5,
                      bgcolor:
                        transaction.paymentStatus === "paid" ? "#4caf50" : "#ff6b6b",
                      color: "white",
                      borderBottomLeftRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {transaction.paymentStatus === "paid" ? "PAID" : "Pending"}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Avatar
                      src={transaction.user.profileImageUrl}
                      alt={transaction.user}
                      sx={{ width: 36, height: 36, mr: 1.5 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 500, color: "#333" }}
                      >
                        {transaction.user.firstName}{" "}{transaction.user.lastName}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5 }}>
                    {transaction.prjectData.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        Posted:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {new Date(transaction.prjectData.posted).toDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        Delivery time:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {transaction.prjectData.deliveryTime}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#6c63ff",
                      px: 3,
                      py: 0.1,
                      width: "100%",
                      borderRadius: "4px",
                      display: "inline-block",
                      fontSize: "0.75rem",
                      mb: 1,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Offer price
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {`${transaction.prjectData.depoistPrice} EGP`}
                    </Typography>

                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

        </div>
      </div>
    </div>
  );
}
