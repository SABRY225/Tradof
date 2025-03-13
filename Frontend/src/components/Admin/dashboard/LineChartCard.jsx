import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { motion } from "motion/react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useRef, useState } from "react";

const chartConfig = {
  companies: {
    label: "Companies",
    color: "#08C2FF",
  },
  freelancer: {
    label: "Freelancers",
    color: "#4A3AFF",
  },
  projects: {
    label: "Projects",
    color: "#C893FD",
  },
};

const CustomDot = (props) => {
  const { cx, cy, stroke, payload } = props;

  return (
    <circle cx={cx} cy={cy} r={8} fill="#fff" stroke={stroke} strokeWidth={2} />
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="p-2 bg-black text-white border rounded shadow-lg text-black">
      <p className="font-bold">{payload[0].payload.month}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className="w-1 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span>
            {entry.name === "projects.number"
              ? `projects: ${entry.payload.projects.number}/$${entry.payload.projects.cost}`
              : `${entry.name} : ${entry.value}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export function LineChartCard({ data, classes }) {
  const [filter, setFilter] = useState("yearly");
  const getMaxValue = ({data}) => {
    return Math.max(
      ...data.map((d) => Math.max(d.companies, d.freelancer, d.projects.number))
    ) + 50;
  };

  return (
    <div
      className={`overflow-x-auto custom-scrollbar bg-white p-[30px] rounded-lg shadow-lg h-max ${classes}`}
    >
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <h1 className="font-bold text-[20px] font-poppins">Website states</h1>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <span className="block bg-[#08C2FF] w-2 h-2 rounded-full"></span>
            Companies
          </div>
          <div className="flex items-center gap-2">
            <span className="block bg-[#4A3AFF] w-2 h-2 rounded-full"></span>
            Freelancers
          </div>
          <div className="flex items-center gap-2">
            <span className="block bg-[#C893FD] w-2 h-2 rounded-full"></span>
            Projects
          </div>
        </div>
        <div className="relative ml-auto md:ml-0 filters bg-[#F8F8FF] py-[10px] px-[20px] rounded-full flex gap-[30px] w-max">
          <motion.div
            layoutId="filter"
            transition={{ type: "keyframes", stiffness: 300, damping: 20 }}
            className={`absolute z-[0] bg-[#1E1B39] w-[75px] h-full rounded-full top-0 ${
              filter === "weekly"
                ? "left-0"
                : filter === "yearly"
                ? "right-0"
                : "left-[4.5rem]"
            }`}
          ></motion.div>
          <button
            type="button"
            className={`z-[1] text-[12px] ${
              filter === "weekly" ? "text-white" : "text-black"
            }`}
            onClick={() => setFilter("weekly")}
          >
            Weekly
          </button>
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
      <div className="min-w-[800px]">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              type="category"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              type="number"
              domain={[0, getMaxValue({data})]} // Scale from 0 to max number in the dataset
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Line
              dataKey="companies"
              type="linear"
              stroke="var(--color-companies)"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="freelancer"
              type="linear"
              stroke="var(--color-freelancer)"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="projects.number"
              type="linear"
              stroke="var(--color-projects)"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
