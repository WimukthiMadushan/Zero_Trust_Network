"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const tableData = [
    { id: 1, name: "John Doe", ip: "Healthy", location: "Healthy", request: "Healthy" },
    { id: 2, name: "Jane Doe", ip: "Healthy", location: "Danger", request: "Healthy" },
    { id: 3, name: "John Doe", ip: "Danger", location: "Healthy", request: "Danger" },
    { id: 4, name: "Jane Doe", ip: "Healthy", location: "Danger", request: "Healthy" },
    { id: 5, name: "John Doe", ip: "Danger", location: "Healthy", request: "Healthy" },
    { id: 6, name: "Jane Doe", ip: "Healthy", location: "Healthy", request: "Danger" },
    { id: 7, name: "Mark Smith", ip: "Healthy", location: "Healthy", request: "Healthy" },
    { id: 8, name: "Alice Brown", ip: "Danger", location: "Healthy", request: "Healthy" },
    { id: 9, name: "Bob Johnson", ip: "Healthy", location: "Danger", request: "Healthy" },
    { id: 10, name: "Charlie White", ip: "Healthy", location: "Healthy", request: "Danger" },
    { id: 11, name: "Eve Davis", ip: "Danger", location: "Healthy", request: "Healthy" },
    { id: 12, name: "Frank Moore", ip: "Healthy", location: "Danger", request: "Healthy" },
    { id: 13, name: "Grace Wilson", ip: "Healthy", location: "Healthy", request: "Healthy" },
    { id: 14, name: "Hank Lee", ip: "Danger", location: "Healthy", request: "Danger" },
    { id: 15, name: "Isla Scott", ip: "Healthy", location: "Healthy", request: "Danger" },
    { id: 16, name: "Jake Harris", ip: "Healthy", location: "Danger", request: "Healthy" },
];

const countStatuses = (data: any[], key: string) => {
    return data.reduce(
        (acc: any, row: any) => {
            if (row[key] === "Healthy") {
                acc.healthy += 1;
            } else if (row[key] === "Danger") {
                acc.danger += 1;
            }
            return acc;
        },
        { healthy: 0, danger: 0 }
    );
};

const chartData = [
    { status: "IP Status", healthy: countStatuses(tableData, "ip").healthy, danger: countStatuses(tableData, "ip").danger },
    { status: "Location Status", healthy: countStatuses(tableData, "location").healthy, danger: countStatuses(tableData, "location").danger },
    { status: "Request Status", healthy: countStatuses(tableData, "request").healthy, danger: countStatuses(tableData, "request").danger },
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

    const BehaviouralAnalysisSummaryBarGraph = () => {
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
                                tickFormatter={(value) => value}
                            />
                            <YAxis />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                        <Bar dataKey="healthy" fill="var(--color-healthy)" radius={4} />
                        <Bar dataKey="danger" fill="var(--color-danger)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default BehaviouralAnalysisSummaryBarGraph;
