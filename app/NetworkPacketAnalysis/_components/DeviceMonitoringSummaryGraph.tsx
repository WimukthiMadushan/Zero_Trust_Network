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
import { Flex, Box } from "@radix-ui/themes";

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

const DeviceMonitoringSummaryGraph = ({ packetAnalysisData = [] }: DeviceMonitoringSummaryGraphProps) => {
  //console.log("Packet Analysis Data:", packetAnalysisData);
  const healthyCount = packetAnalysisData.filter((user: { status: boolean; }) => user.status === true).length;
  const dangerCount = packetAnalysisData.filter((user: { status: boolean; }) => user.status === false).length;

  const chartData = [
  { status: "Healthy", quantity: healthyCount, fill: "var(--color-healthy)"},
  { status: "Danger", quantity: dangerCount,fill: "var(--color-danger)" },
];
    return (
        <Card className="w-[700px] h-[420px]">
          <CardHeader>
            <Flex align="center" justify="between">
              <Box>
                <CardTitle>Summary Of the Network Packet Status</CardTitle>
              </Box>
            </Flex>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
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
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      );
}

export default DeviceMonitoringSummaryGraph