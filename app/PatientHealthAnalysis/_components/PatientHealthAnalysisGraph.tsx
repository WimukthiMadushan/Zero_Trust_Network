"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Box, Flex } from "@radix-ui/themes";
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

const PatientHealthAnalysisGraph = ({ deviceData = [] }: PatientHealthAnalysisGraphProps) => {
    //console.log("Patient Health Data:", deviceData);

    const healthyCount = deviceData.filter((device: { health: boolean; }) => device.health === true).length;
    const dangerCount = deviceData.filter((device: { health: boolean; }) => device.health === false).length;
    console.log(healthyCount, dangerCount);

    const chartData = [
        { status: "Healthy", quantity: healthyCount, fill: "var(--color-healthy)"},
        { status: "Danger", quantity: dangerCount,fill: "var(--color-danger)" },
    ];


    return (
      <Card className="w-full max-w-xl p-4 mx-auto">
          <CardHeader>
            <Flex align="center" justify="between">
              <Box>
                <CardTitle>Summary Of the Patient Health Status</CardTitle>
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

export default PatientHealthAnalysisGraph