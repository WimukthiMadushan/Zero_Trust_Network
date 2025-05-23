'use client';
import StatusSelector from '@/components/StatusSelector';
import { Badge, Callout, Flex } from '@radix-ui/themes';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useState } from 'react'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { ShieldCheck, Skull } from 'lucide-react';

const tableHeaders = [
    { label: "Packet", key: "packet" },
    { label: "Status", key: "status" },
];

const StatusDetails: Record<string, { label: string; color: "red" | "green" }> = {
    true: { label: "Healthy", color: "green" },
    false: { label: "Danger", color: "red" },
};

interface DeviceMonitoringTableProps {
    packetAnalysisData?: PacketAnalysisItem[];
    currentStatus: boolean;
}

interface PacketAnalysisItem {
    packet: number;
    status: boolean;
}

const DeviceMonitoringTable = ({ packetAnalysisData = [], currentStatus }: DeviceMonitoringTableProps) => {
    //console.log("Packet Analysis Data:", packetAnalysisData);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All');

    const pageSize = 4;

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    const formattedData = packetAnalysisData.map((data: PacketAnalysisItem) => ({
        packet: data.packet,
        status: data.status ? "Healthy" : "Danger",
    }));

    const sortedData = formattedData.sort((a: { packet: number; }, b: { packet: number; }) => {
        return b.packet - a.packet;
    });

    const filteredData =
        statusFilter === 'All'
            ? sortedData
            : sortedData.filter((data: { status: string }) => data.status === statusFilter);

    const itemCount = filteredData.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(itemCount / pageSize);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[55%] border border-gray-300 shadow-lg rounded-xl p-5 bg-white mx-auto">
            <Flex align="center" justify="between" className="mb-5 flex-col sm:flex-row">
                <p className="text-2xl font-bold">Network Packets Analysis Table</p>
                <StatusSelector
                    placeholder="Filter By Status.."
                    label="Status"
                    items={[
                        { value: 'All', name: 'All' },
                        { value: 'Healthy', name: 'Healthy' },
                        { value: 'Danger', name: 'Danger' }
                    ]}
                    onChange={setStatusFilter}
                />
            </Flex>

            {/* Risk Assessment Callout */}
            <Callout.Root color={currentStatus ? "green" : "red"} className="mb-5">
                <Callout.Icon>
                    {currentStatus ? <ShieldCheck color="green" /> : <Skull color="red" />}
                </Callout.Icon>
                <Callout.Text>
                    Current Packet is <strong>{currentStatus ? "Healthy" : "Danger"}</strong>
                </Callout.Text>
            </Callout.Root>

                <Table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
                    <TableHeader className="bg-gray-100 border-b-2 border-gray-300">
                        <TableRow>
                            {tableHeaders.map((header) => (
                                <TableCell key={header.key} className="py-2 px-4 text-left font-medium">
                                    {header.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((data: { packet: number; status: string }) => (
                                <TableRow key={data.packet} className="even:bg-gray-50">
                                    <TableCell className="py-2 px-4 border-t border-gray-200">{data.packet}</TableCell>
                                    <TableCell className="py-2 px-4 border-t border-gray-200">
                                        <Badge color={StatusDetails[String(data.status === "Healthy")].color}>
                                            {data.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} className="py-2 px-4 text-center text-gray-500">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-5 flex items-center justify-center space-x-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300">
                    <DoubleArrowLeftIcon />
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300">
                    <DoubleArrowRightIcon />
                </button>
            </div>
            )}  
        </div>
    );
};

export default DeviceMonitoringTable;
