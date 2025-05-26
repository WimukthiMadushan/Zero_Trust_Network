"use client";

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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

interface PatientHealthAnalysisGraphProps {
  deviceData?: { health: boolean }[];
}

const PatientHealthAnalysisGraph = ({
  deviceData = [],
}: PatientHealthAnalysisGraphProps) => {
  const healthyCount = deviceData.filter((device) => device.health === true).length;
  const dangerCount = deviceData.filter((device) => device.health === false).length;

  const chartData = [
    { status: "Healthy", quantity: healthyCount, fill: "var(--color-healthy)" },
    { status: "Danger", quantity: dangerCount, fill: "var(--color-danger)" },
  ];

  return (
    <Card className="w-full max-w-xl mx-auto h-[85%] bg-white flex flex-col">
      <CardHeader>
        <Flex align="center" justify="center">
          <CardTitle className="text-center w-full">
            Summary Of the Patient Health Status
          </CardTitle>
        </Flex>
      </CardHeader>

      <CardContent className="flex-grow flex items-end">
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            data={chartData}
            height={300}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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

export default PatientHealthAnalysisGraph;
