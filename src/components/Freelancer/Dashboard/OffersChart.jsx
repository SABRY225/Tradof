import React, { useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getOffersChart } from "@/Util/Https/freelancerHttp";
import { FadeLoader } from "react-spinners";
import { message } from "antd";

const transform = ({ key, statusCounts }, year = 2022) => ({
  date: `${year}-${String(key).padStart(2, "0")}`,
  pending: statusCounts.Pending || 0,
  accepted: statusCounts.Accepted || 0,
  canceled: statusCounts.Canceled || 0,
  declined: statusCounts.Declined || 0,
});

const chartConfig = {
  pending: { label: "Pending", color: "#6E90FF" },
  accepted: { label: "Accepted", color: "#FABD5C" },
  canceled: { label: "Canceled", color: "#40D186" },
  declined: { label: "Declined", color: "#FF6669" },
};

const commonClasses =
  "text-[10px] text-center outline-none border-[1px] border-[#D6D7D7] rounded  w-[50px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const OffersChart = ({ classes }) => {
  const {
    user: { token },
  } = useAuth();
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["offerChart", year],
    queryFn: ({ signal }) => getOffersChart({ signal, token, year: +year }),
    staleTime: 1000 * 60 * 60, // 1 hour - data stays fresh
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours - cached in memory
  });

  if (isError) {
    message.error(error.message || "Something wrong happen");
  }
  const handleData = data ? data.map((item) => transform(item, +year)) : [];
  console.log(handleData, year);
  return (
    <div
      className={`max-h-fit bg-card-color rounded-lg flex flex-grow ${classes}`}
    >
      <Card className="w-full ">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Offers Chart</CardTitle>
            <CardDescription>
              Show offers status and its numbers
            </CardDescription>
          </div>
          <input
            type="text"
            onChange={(e) => setYear(e.target.value)}
            value={year}
            className={commonClasses}
          />
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center">
              <FadeLoader
                color="#000"
                cssOverride={{ width: "0px", height: "0px" }}
                height={3}
                width={3}
                loading
                margin={-11}
                radius={15}
                speedMultiplier={1}
              />
            </div>
          )}
          <ChartContainer config={chartConfig}>
            {!isLoading && handleData?.length === 0 && (
              <p className="text-center">No Found data</p>
            )}
            {handleData?.length > 0 && (
              <BarChart accessibilityLayer data={handleData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval={0} // Ensures all labels are shown
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                    })
                  }
                />
                {Object.keys(chartConfig).map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={`var(--color-${key})`}
                    radius={
                      index === Object.keys(chartConfig).length - 1
                        ? [4, 4, 0, 0]
                        : 0
                    }
                  />
                ))}
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      hideLabel
                      className="w-[180px] md:w-[100px]"
                      formatter={(value, name, item, index, label) => {
                        const month = new Date(label.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                          }
                        );
                        return (
                          <>
                            {index === 0 && (
                              <div className="m-auto basis-full text-center pt-1.5 text-xs font-medium text-foreground">
                                {month}
                              </div>
                            )}
                            <div
                              className="h-3 w-1 shrink-0 rounded-[2px] bg-[--color-bg]"
                              style={{ "--color-bg": `var(--color-${name})` }}
                            />
                            {chartConfig[name]?.label || name}
                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                              {value}
                              <span className="font-normal text-muted-foreground">
                                pj
                              </span>
                            </div>
                            {index === 3 && (
                              <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                Total
                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                  {item.payload.new + item.payload.complete}
                                  <span className="font-normal text-muted-foreground">
                                    p
                                  </span>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      }}
                    />
                  }
                  cursor={false}
                  defaultIndex={1}
                />
              </BarChart>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffersChart;
