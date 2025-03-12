'use client';
import StatusSelector from '@/components/StatusSelector';
import { Badge, Box, Flex } from '@radix-ui/themes';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useState } from 'react';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

// Define status details
const StatusDetails: Record<string, { label: string; color: "red" | "green" }> = {
    true: { label: "Healthy", color: "green" },
    false: { label: "Danger", color: "red" },
};

const PatientHealthAnalysis = ({ deviceData = [] }: any) => {
    console.log("Device Data:", deviceData);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All');

    const pageSize = 6;

    // Sort data (Descending order: -1, -2, -3)
    const sortedData = [...deviceData].sort((a, b) => b.id - a.id);

    // Filter based on status
    const filteredData =
        statusFilter === 'All'
            ? sortedData
            : sortedData.filter((device: any) => (device.health ? "Healthy" : "Danger") === statusFilter);

    // Pagination
    const itemCount = filteredData.length;
    const totalPages = Math.ceil(itemCount / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="mb-5 w-[55%] border border-gray-300 shadow-lg rounded-xl p-5 bg-white">
            <Flex align="center" justify="between" className="mb-5">
                <p className="text-2xl font-bold">Patient Analysis Table</p>
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

            <Table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
                <TableHeader className="bg-gray-100 border-b-2 border-gray-300">
                    <TableRow>
                        <TableCell className="py-2 px-4 text-left font-medium">Device ID</TableCell>
                        <TableCell className="py-2 px-4 text-left font-medium">Health Status</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.length > 0 ? (
                        currentData.map((device: any) => (
                            <TableRow key={device.id} className="even:bg-gray-50">
                                <TableCell className="py-2 px-4 border-t border-gray-200">{device.id}</TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[String(device.health)].color}>
                                        {device.health ? "Healthy" : "Danger"}
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

export default PatientHealthAnalysis;
