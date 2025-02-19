"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

const chartData = [
  { loginType: "Total Healthy Logins", quantity: 45 },
  { loginType: "Total Unhealthy Logins", quantity: 5 },
];

const chartConfig = {
  devices: {
    label: "Devices",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

import { TooltipProps } from "recharts";
import { Flex, Box } from "@radix-ui/themes"

export default function Component({}) {
  return (
    <Card className="w-[700px] h-[405px]">
      <CardHeader>
        <Flex align="center" justify="between">
          <Box>
            <CardTitle>Summary Of the Login Status</CardTitle>
          </Box>
        </Flex>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="loginType" tickLine={false} tickMargin={5} axisLine={false} />
            <YAxis />
            <ChartTooltip cursor={false} content={<CustomTooltip active={undefined} payload={undefined} />} />
            <Bar dataKey="quantity" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function CustomTooltip({ active, payload }: TooltipProps<any, any>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-md p-2 text-xs border border-gray-200">
        <p className="font-semibold text-gray-700">{payload[0].payload.loginType}</p>
        <p className="text-gray-500">Quantity: <span className="font-medium text-black">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
}
