"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type DataProps = {
    data: { name: string; ip_address: boolean; location: boolean; request: boolean }[];
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
        { status: "Location Status", healthy: countStatuses(data, "location").healthy, danger: countStatuses(data, "location").danger },
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
        <Card className="w-[40%]">
            <CardHeader>
                <CardTitle>Bar Chart - Status Summary</CardTitle>
                <CardDescription>Total count for IP, Location, and Request Status</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
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
                        <Bar dataKey="healthy" fill="hsl(var(--chart-2))" radius={4} />
                        <Bar dataKey="danger" fill="hsl(var(--chart-1))" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default BehaviouralAnalysisSummaryBarGraph;
