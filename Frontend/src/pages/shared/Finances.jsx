import { useEffect, useState } from "react";
import PageTitle from "@/UI/PageTitle";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useAuth } from "@/context/AuthContext";
import { GetCompanyStatistics } from "@/Util/Https/companyHttp";
import { GetFreelancerStatistics } from "@/Util/Https/freelancerHttp";
import { search } from "@/assets/paths";

export default function Finances() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const {
    user: { userId, token, role },
  } = useAuth();

  useEffect(() => {
    const fetchStatistics = async () => {
      let data;
      if (role == "Freelancer") {
        data = await GetFreelancerStatistics({ freelancerId: userId, token });
      } else {
        data = await GetCompanyStatistics({ companyId: userId, token });
      }
      setStatistics(data.data);
    };
    fetchStatistics();
  }, []);
  // Mock data for transactions
  const transactions = [
    {
      id: 1,
      user: "Ahmed Nady Issa",
      status: "PAID",
      title: "Translation of an article about medical tools",
      date: "3 days ago",
      duration: "2 days",
      price: 50.0,
    },
    {
      id: 2,
      user: "Ahmed Nady Issa",
      status: "Pending",
      title: "Translation of an article about medical tools",
      date: "3 days ago",
      duration: "2 days",
      price: 50.0,
    },
    {
      id: 3,
      user: "Ahmed Nady Issa",
      status: "PAID",
      title: "Translation of an article about medical tools",
      date: "3 days ago",
      duration: "2 days",
      price: 50.0,
    },
    {
      id: 4,
      user: "Ahmed Nady Issa",
      status: "Pending",
      title: "Translation of an article about medical tools",
      date: "3 days ago",
      duration: "2 days",
      price: 50.0,
    },
    {
      id: 5,
      user: "Ahmed Nady Issa",
      status: "PAID",
      title: "Translation of an article about medical tools",
      date: "3 days ago",
      duration: "2 days",
      price: 50.0,
    },
    {
      id: 6,
      user: "Ahmed Nady Issa",
      status: "Pending",
      title: "Translation of an article about medical tools",
      date: "3 days ago",
      duration: "2 days",
      price: 50.0,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransactions =
    activeTab === 0
      ? transactions
      : transactions.filter(
          (t) => t.status === (activeTab === 1 ? "PAID" : "Pending")
        );

  return (
    <div className="bg-background-color">
      <PageTitle title="Your Finances" />
      <div className="container max-w-screen-xl mx-auto p-4 w-full mt-[30px]">
        <div className="space-y-[20px] rounded-[8px]">
          {/* Withdraw Button */}
          {role == "Freelancer" && (
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
                $ {statistics?.totalBalance}
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
                    ? `$ ${statistics?.availableBalance}`
                    : `$ ${statistics?.previousBalance}`}
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
                  $ {statistics?.pendingBalance}
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
                        transaction.status === "PAID" ? "#4caf50" : "#ff6b6b",
                      color: "white",
                      borderBottomLeftRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {transaction.status}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${transaction.user}&background=6c63ff&color=fff`}
                      alt={transaction.user}
                      sx={{ width: 36, height: 36, mr: 1.5 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 500, color: "#333" }}
                      >
                        {transaction.user}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        className="flex"
                      >
                        <p>Job Title</p>
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5 }}>
                    {transaction.title}
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
                        {transaction.date}
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
                        {transaction.duration}
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
                      ${transaction.price.toFixed(1)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={5}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#6c63ff",
                },
                "& .Mui-selected": {
                  bgcolor: "#6c63ff !important",
                  color: "white !important",
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
