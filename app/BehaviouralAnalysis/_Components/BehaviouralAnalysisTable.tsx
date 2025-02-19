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

const tableHeaders = [
    { label: "User ID", key: "id" },
    { label: "User Name", key: "name" },
    { label: "IP status", key: "ip" },
    { label: "Location status", key: "location" },
    { label: "Request Amount", key: "request" },
];

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
    { id: 17, name: "Lily Clark", ip: "Danger", location: "Healthy", request: "Healthy" },
    { id: 18, name: "Mia Walker", ip: "Healthy", location: "Healthy", request: "Healthy" },
    { id: 19, name: "Nathan Lewis", ip: "Healthy", location: "Danger", request: "Danger" },
    { id: 20, name: "Olivia Young", ip: "Danger", location: "Healthy", request: "Healthy" },
];

const StatusDetails: Record<any, { label: string; color: "red" | "green" }> = {
    Healthy: { label: "Healthy", color: "green" },
    Danger: { label: "Danger", color: "red" },
};

const BehaviouralAnalysisTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState({
        ip: 'All',
        location: 'All',
        request: 'All',
    });

    const pageSize = 6;

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    
    const filteredData = tableData.filter((data) => {
        return (
            (statusFilter.ip === 'All' || data.ip === statusFilter.ip) &&
            (statusFilter.location === 'All' || data.location === statusFilter.location) &&
            (statusFilter.request === 'All' || data.request === statusFilter.request)
        );
    });

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
        <Box className="w-full sm:w-[65%] border border-gray-300 shadow-lg rounded-xl p-5 bg-white">
            <Flex align="center" justify="between" className="mb-4 flex-col sm:flex-row gap-3 sm:gap-4">
                <p className="text-xl font-bold">Behavioural Analysis Table</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <StatusSelector
                        placeholder="Filter By IP Status.."
                        label="IP Status"
                        items={[
                            { value: 'All', name: 'All' },
                            { value: 'Healthy', name: 'Healthy' },
                            { value: 'Danger', name: 'Danger' },
                        ]}
                        onChange={(value) => setStatusFilter((prev) => ({ ...prev, ip: value }))}
                    />
                    <StatusSelector
                        placeholder="Filter By Location Status.."
                        label="Location Status"
                        items={[
                            { value: 'All', name: 'All' },
                            { value: 'Healthy', name: 'Healthy' },
                            { value: 'Danger', name: 'Danger' },
                        ]}
                        onChange={(value) => setStatusFilter((prev) => ({ ...prev, location: value }))}
                    />
                    <StatusSelector
                        placeholder="Filter By Request Amount.."
                        label="Request Status"
                        items={[
                            { value: 'All', name: 'All' },
                            { value: 'Healthy', name: 'Healthy' },
                            { value: 'Danger', name: 'Danger' },
                        ]}
                        onChange={(value) => setStatusFilter((prev) => ({ ...prev, request: value }))}
                    />
                </div>
            </Flex>
            <Box>
                <Table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
                    <TableHeader className="bg-gray-100 border-b-2 border-gray-300">
                        <TableRow>
                            {tableHeaders.map((header) => (
                                <TableCell key={header.key} className="py-2 px-4 text-left font-medium">{header.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((data: any) => (
                            <TableRow key={data.id} className="even:bg-gray-50">
                                <TableCell className="py-2 px-4 border-t border-gray-200">{data.id}</TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">{data.name}</TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[data.ip].color}>
                                        {data.ip}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[data.location].color}>
                                        {data.location}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[data.request].color}>
                                        {data.request}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            {/* Pagination Controls */}
            <div className="mt-5 flex items-center justify-center space-x-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
                >
                    <DoubleArrowLeftIcon />
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
                >
                    <DoubleArrowRightIcon />
                </button>
            </div>
        </Box>
    );
};

export default BehaviouralAnalysisTable;
