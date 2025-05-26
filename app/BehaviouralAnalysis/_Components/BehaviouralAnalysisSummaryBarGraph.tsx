"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Flex } from "@radix-ui/themes";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type DataProps = {
    data: { name: string; ip_address: boolean; request: boolean }[];
};

const countStatuses = (data: DataProps["data"], key: keyof DataProps["data"][0]) => {
    return data.reduce(
        (acc, row) => {
            if (row[key]) {
                acc.healthy += 1;
            } else {
                acc.danger += 1;
            }
            return acc;
        },
        { healthy: 0, danger: 0 }
    );
};

const BehaviouralAnalysisSummaryBarGraph: React.FC<DataProps> = ({ data }) => {
    const chartData = [
        { status: "IP Status", healthy: countStatuses(data, "ip_address").healthy, danger: countStatuses(data, "ip_address").danger },
        { status: "Request Status", healthy: countStatuses(data, "request").healthy, danger: countStatuses(data, "request").danger },
    ];

    const chartConfig = {
        healthy: {
            label: "Healthy",
            color: "hsl(var(--chart-2))",
        },
        danger: {
            label: "Danger",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <Card className="w-full max-w-xl p-4 mx-auto bg-white h-[85%] flex flex-col">
          <CardHeader>
            <Flex align="center" justify="center" className="flex-col gap-2">
              <CardTitle>Bar Chart - Status Summary</CardTitle>
              <CardDescription>Total count for IP, and Request Status</CardDescription>
            </Flex>
          </CardHeader>
          
          <CardContent className="flex-grow flex items-end">
            <ChartContainer config={chartConfig} className="w-full">
              <BarChart
                data={chartData}
                height={300} // ✅ Ensures bars have a bottom starting point
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="status"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="healthy" fill="hsl(var(--chart-2))" radius={4} barSize={55} />
                <Bar dataKey="danger" fill="hsl(var(--chart-1))" radius={4} barSize={55} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      );
      
};

export default BehaviouralAnalysisSummaryBarGraph;
