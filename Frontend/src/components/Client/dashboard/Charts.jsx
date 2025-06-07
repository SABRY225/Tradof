import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { companyChart } from "@/Util/Https/companyHttp";
import { useAuth } from "@/context/AuthContext";

// const data = [
//   { date: "Jan", projects: 0, cost: 0 },
//   { date: "Jan", projects: 0, cost: 0 },
//   { date: "Jan 03", projects: 5, cost: 15000 },
//   { date: "Jan 04", projects: 0, cost: 0 },
//   { date: "Jan 20", projects: 10, cost: 28000 },
//   { date: "Feb 05", projects: 7, cost: 22000 },
//   { date: "Feb 22", projects: 15, cost: 45000 },
//   { date: "Mar 10", projects: 12, cost: 36000 },
//   { date: "Mar 28", projects: 18, cost: 54000 },
//   { date: "Apr 02", projects: 14, cost: 42000 },
//   { date: "Apr 18", projects: 20, cost: 60000 },
//   { date: "May 05", projects: 25, cost: 75000 },
//   { date: "May 25", projects: 22, cost: 66000 },
//   { date: "Jun 12", projects: 28, cost: 84000 },
//   { date: "Jun 30", projects: 24, cost: 72000 },
//   { date: "Jul 15", projects: 30, cost: 90000 },
//   { date: "Jul 28", projects: 27, cost: 81000 },
//   { date: "Aug 10", projects: 35, cost: 105000 },
//   { date: "Aug 24", projects: 12, cost: 96000 },
//   { date: "Sep 02", projects: 40, cost: 120000 },
//   { date: "Sep 22", projects: 38, cost: 114000 },
//   { date: "Oct 07", projects: 15, cost: 135000 },
//   { date: "Oct 25", projects: 42, cost: 126000 },
//   { date: "Nov 08", projects: 50, cost: 150000 },
//   { date: "Nov 30", projects: 4, cost: 144000 },
//   { date: "Dec 12", projects: 55, cost: 165000 },
//   { date: "Dec 27", projects: 23, cost: 159000 },
//   { date: "Dec 31", projects: 0, cost: 0 },
// ];

const month = (i) =>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][i - 1];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-black p-2 px-4 rounded-lg text-center">
        <div className="text-[#E5E5EF] text-[11px]">
          {item.payload.projects} projects
        </div>
        <div className="text-white text-[13px]">${item.payload.cost}</div>
      </div>
    );
  }
  return null;
};

const Charts = ({ classes }) => {
  const {
    user: { userId, token },
  } = useAuth();
  const [filter, setFilter] = useState("yearly");
  const {
    data: projects,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["company project chart", filter],
    queryFn: ({ signal }) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = filter === "monthly" ? now.getMonth() : "";
      return companyChart({
        signal,
        id: userId,
        token,
        year,
        month,
      });
    },
    enabled: Boolean(filter), // This ensures the query is enabled when filter is set
    cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
    staleTime: 1000 * 60 * 1, // Data becomes stale after 1 minute
    refetchOnWindowFocus: false, // Do not refetch the data when the window is focused
  });
  const scrollRef = useRef(null);

  // console.log(projects);

  const data = projects
    ? filter === "yearly"
      ? projects.map(({ key, count, totalCost }) => ({
          date: month(key),
          projects: count,
          cost: totalCost,
        }))
      : projects?.map(({ key, count, totalCost }) => {
          // Create a new date based on the key (day) and the current month
          const date = new Date();
          const chosenMonth = filter === "monthly" ? new Date().getMonth() : 0; // Adjust if you have a specific month to use
          date.setMonth(chosenMonth);
          date.setDate(key); // Set the key as the day of the month

          const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
          }).format(date);

          return {
            date: formattedDate, // You can format the date as needed
            projects: count,
            cost: totalCost,
          };
        })
    : [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth; // Move to right end
    }
    refetch();
  }, [filter]);
  return (
    <div
      className={`bg-white p-[30px] rounded-lg shadow-lg min-h-[500px] max-w-screen flex-grow overflow-x-auto custom-scrollbar ${classes}`}
    >
      <div className="flex justify-between">
        <h1 className="text-[#9291A5] text-[16px]">Number of projects</h1>
        <div className="relative filters bg-[#F8F8FF] py-[10px] px-[20px] rounded-full flex gap-[30px]">
          <motion.div
            layoutId="filter"
            transition={{ type: "keyframes", stiffness: 300, damping: 20 }}
            className={`absolute z-[0] bg-[#1E1B39] w-[75px] h-full rounded-full top-0 ${
              filter === "monthly" ? "left-0" : "right-0"
            }`}
          ></motion.div>
          <button
            type="button"
            className={`z-[1] text-[12px] ${
              filter === "monthly" ? "text-white" : "text-black"
            }`}
            onClick={() => setFilter("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`z-[1] text-[12px] ${
              filter === "yearly" ? "text-white" : "text-black"
            }`}
            onClick={() => setFilter("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="min-w-[600px] md:max-w-full">
        <ResponsiveContainer width="100%" height={550}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#4A3AFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4A3AFF" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="15 3" vertical={false} />
            <XAxis dataKey="date" tickMargin={10} />
            <YAxis tickMargin={15} orientation="right" />
            <Tooltip
              content={<CustomTooltip />}
              animationDuration={500}
              cursor={{
                stroke: "#B6B0FF",
                strokeWidth: 2,
                strokeDasharray: "10 0",
              }}
            />

            <Area
              type="monotone"
              dataKey="projects"
              stroke="#4A3AFF"
              fill="url(#colorProjects)"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: "#6c63ff" }}
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
