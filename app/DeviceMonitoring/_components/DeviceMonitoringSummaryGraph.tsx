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

const dummyData = [
    { id: "001", status: "Healthy" },
    { id: "002", status: "Danger" },
    { id: "003", status: "Healthy" },
    { id: "004", status: "Danger" },
    { id: "005", status: "Healthy" },
    { id: "006", status: "Danger" },
    { id: "007", status: "Healthy" },
    { id: "008", status: "Danger" },
    { id: "009", status: "Healthy" },
    { id: "010", status: "Danger" },
    { id: "011", status: "Healthy" },
    { id: "012", status: "Danger" },
    { id: "013", status: "Healthy" },
    { id: "014", status: "Danger" },
    { id: "015", status: "Healthy" },
    { id: "016", status: "Danger" },
    { id: "017", status: "Healthy" },
    { id: "018", status: "Danger" },
    { id: "019", status: "Healthy" },
    { id: "020", status: "Danger" },
];

const healthyCount = dummyData.filter(user => user.status === "Healthy").length;
const dangerCount = dummyData.filter(user => user.status === "Danger").length;

const chartData = [
  { status: "Healthy", quantity: healthyCount, fill: "var(--color-healthy)"},
  { status: "Danger", quantity: dangerCount,fill: "var(--color-danger)" },
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
  

const DeviceMonitoringSummaryGraph = () => {
    return (
        <Card className="w-[700px] h-[405px]">
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