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
  { id: 1, name: "User 1", status: "Healthy" },
  { id: 2, name: "User 2", status: "Danger" },
  { id: 3, name: "User 3", status: "Healthy" },
  { id: 4, name: "User 4", status: "Danger" },
  { id: 5, name: "User 5", status: "Healthy" },
  { id: 6, name: "User 6", status: "Danger" },
  { id: 7, name: "User 7", status: "Healthy" },
  { id: 8, name: "User 8", status: "Danger" },
  { id: 9, name: "User 9", status: "Healthy" },
  { id: 10, name: "User 10", status: "Danger" },
  { id: 11, name: "User 11", status: "Healthy" },
  { id: 12, name: "User 12", status: "Danger" },
  { id: 13, name: "User 13", status: "Healthy" },
  { id: 14, name: "User 14", status: "Danger" },
  { id: 15, name: "User 15", status: "Healthy" },
  { id: 16, name: "User 16", status: "Danger" },
  { id: 17, name: "User 17", status: "Healthy" },
  { id: 18, name: "User 18", status: "Danger" },
  { id: 19, name: "User 19", status: "Healthy" },
];

const healthyCount = dummyData.filter(user => user.status === "Healthy").length;
const dangerCount = dummyData.filter(user => user.status === "Danger").length;

const chartData = [
  { status: "Healthy", quantity: healthyCount, fill: "var(--color-healthy)" },
  { status: "Danger", quantity: dangerCount, fill: "var(--color-danger)" },
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

export default function Component() {
  return (
    <Card className="w-full max-w-xl p-4 mx-auto">
      <CardHeader>
        <Flex align="center" justify="between">
          <Box>
            <CardTitle>Summary Of the Login Status</CardTitle>
          </Box>
        </Flex>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart height={300} data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="quantity" strokeWidth={2} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
