"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Flex } from "@radix-ui/themes";

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

interface DeviceMonitoringSummaryGraphProps {
  packetAnalysisData?: { status: boolean }[];
}

const DeviceMonitoringSummaryGraph = ({
  packetAnalysisData = [],
}: DeviceMonitoringSummaryGraphProps) => {
  const healthyCount = packetAnalysisData.filter((user) => user.status === true).length;
  const dangerCount = packetAnalysisData.filter((user) => user.status === false).length;

  const chartData = [
    { status: "Healthy", quantity: healthyCount, fill: "var(--color-healthy)" },
    { status: "Danger", quantity: dangerCount, fill: "var(--color-danger)" },
  ];

  return (
    <Card className="bg-white h-[80%] w-full max-w-xl mx-auto flex flex-col">
      <CardHeader>
        <Flex align="center" justify="center">
          <CardTitle className="text-center w-full">
            Summary Of the Network Packet Status
          </CardTitle>
        </Flex>
      </CardHeader>

      <CardContent className="flex-grow flex items-end">
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            height={300}
            data={chartData}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="quantity"
              strokeWidth={2}
              radius={8}
              barSize={55}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeviceMonitoringSummaryGraph;
