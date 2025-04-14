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

const chartData = [
  { date: "2022-01-01", new: 450, complete: 300, active: 821, rejected: 654 },
  { date: "2024-02-01", new: 380, complete: 420, active: 45, rejected: 530 },
  { date: "2024-03-01", new: 520, complete: 120, active: 32, rejected: 410 },
  { date: "2024-04-01", new: 140, complete: 550, active: 500, rejected: 290 },
  { date: "2025-05-01", new: 600, complete: 350, active: 25, rejected: 310 },
  { date: "2023-06-01", new: 480, complete: 400, active: 40, rejected: 270 },
  { date: "2022-07-01", new: 510, complete: 380, active: 536, rejected: 295 },
  { date: "2024-08-01", new: 560, complete: 330, active: 48, rejected: 305 },
  { date: "2025-09-01", new: 430, complete: 500, active: 55, rejected: 280 },
  { date: "2024-10-01", new: 490, complete: 440, active: 160, rejected: 315 },
  { date: "2021-11-01", new: 530, complete: 460, active: 38, rejected: 325 },
  { date: "2020-12-01", new: 570, complete: 420, active: 590, rejected: 300 },
];

const chartConfig = {
  new: { label: "New", color: "#6E90FF" },
  complete: { label: "Complete", color: "#FABD5C" },
  active: { label: "Active", color: "#40D186" },
  rejected: { label: "Rejected", color: "#FF6669" },
};

const commonClasses =
  "text-[10px] text-center outline-none border-[1px] border-[#D6D7D7] rounded  w-[50px] focus:border-[#CC99FF] focus:ring-1 focus:ring-[#CC99FF]";

const OffersChart = ({ classes }) => {
  const [year, setYear] = useState("2024");
  const filteredData =
    chartData.filter((item) => item.date.startsWith(year)) || [];

  // console.log(filteredData);
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
          <ChartContainer config={chartConfig}>
            {filteredData?.length === 0 && (
              <p className="text-center">No Found data</p>
            )}
            {filteredData?.length > 0 && (
              <BarChart accessibilityLayer data={filteredData}>
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
                                    pj
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
