import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getIncomeStatistics } from "@/Util/Https/adminHttp";
import { useAuth } from "@/context/AuthContext";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  finances: {
    label: "Finances",
    color: "#6D3AFF",
  },
};

export default function Chart({ classes }) {
  const {
    user: { token },
  } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["statisticChart"],
    queryFn: ({ signal }) => getIncomeStatistics({ signal, token }),
  });
  const chartData = data
    ? data.map(({ month, totalIncome }) => ({
        month: monthNames[month - 1],
        finances: totalIncome,
      }))
    : [];
  // console.log(chartData);
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <div
        className={`min-w-[600px] max-h-fit bg-white rounded-lg flex flex-grow ${classes}`}
      >
        <Card className="w-full">
          <CardHeader>
            <CardDescription>Total</CardDescription>
            <CardTitle>Finances</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <p className="text-center">Loading...</p>}
            {!isLoading && !isError && (
              <ChartContainer config={chartConfig} className="w-full h-[400px]">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  height={400}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid
                    stroke="#Ddd"
                    strokeDasharray="15 5"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis tickLine={true} axisLine={true} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar></Bar>
                  <Bar
                    dataKey="finances"
                    fill="var(--color-finances)"
                    radius={5}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                  <Bar></Bar>
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
