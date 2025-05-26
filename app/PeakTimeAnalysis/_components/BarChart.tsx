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
import { Flex} from "@radix-ui/themes";


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

interface userDataProps {
  name: string;
  status: boolean;
}

export default function Component({ userData }: { userData: userDataProps[] }) {

  const healthyCount = userData.filter(user => String(user.status) === 'true').length;
  const dangerCount = userData.filter(user => String(user.status) === 'false').length;
  

  //console.log(userData)
  //console.log(healthyCount, dangerCount)

  const chartData = [
  { status: "Healthy", quantity: healthyCount, fill: "var(--color-healthy)" },
  { status: "Danger", quantity: dangerCount, fill: "var(--color-danger)" },
  ];

  return (
    <Card className="w-full max-w-xl p-4 mx-auto bg-white h-[85%] flex flex-col">
<CardHeader>
  <Flex align="center" justify="center">
    <CardTitle>Summary Of the Login Status</CardTitle>
  </Flex>
</CardHeader>
  
  <CardContent className="flex-grow flex items-end">
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart width={500} height={350} data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="status"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="quantity" strokeWidth={2} radius={5} barSize={55} />
      </BarChart>
    </ChartContainer>
  </CardContent>
</Card>

  );
}
