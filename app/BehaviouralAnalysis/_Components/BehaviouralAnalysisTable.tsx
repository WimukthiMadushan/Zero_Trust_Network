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
    { label: "User Name", key: "name" },
    { label: "IP status", key: "ip" },
    { label: "Location status", key: "location" },
    { label: "Request Amount", key: "request" },
];

const StatusDetails: Record<string, { label: string; color: "red" | "green" }> = {
    Healthy: { label: "Healthy", color: "green" },
    Danger: { label: "Danger", color: "red" },
};

type DataProps = {
    data: { name: string; ip_address: boolean; location: boolean; request: boolean }[];
};

const BehaviouralAnalysisTable: React.FC<DataProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState({
        ip: 'All',
        location: 'All',
        request: 'All',
    });

    const pageSize = 6;

    // Convert boolean values to "Healthy" or "Danger"
    const transformedData = data.map(user => ({
        name: user.name,
        ip: user.ip_address ? "Healthy" : "Danger",
        location: user.location ? "Healthy" : "Danger",
        request: user.request ? "Healthy" : "Danger",
    }));

    // Filtering logic
    const filteredData = transformedData.filter(user => {
        return (
            (statusFilter.ip === 'All' || user.ip === statusFilter.ip) &&
            (statusFilter.location === 'All' || user.location === statusFilter.location) &&
            (statusFilter.request === 'All' || user.request === statusFilter.request)
        );
    });

    const itemCount = filteredData.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(itemCount / pageSize);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
                        onChange={(value) => setStatusFilter(prev => ({ ...prev, ip: value }))}
                    />
                    <StatusSelector
                        placeholder="Filter By Location Status.."
                        label="Location Status"
                        items={[
                            { value: 'All', name: 'All' },
                            { value: 'Healthy', name: 'Healthy' },
                            { value: 'Danger', name: 'Danger' },
                        ]}
                        onChange={(value) => setStatusFilter(prev => ({ ...prev, location: value }))}
                    />
                    <StatusSelector
                        placeholder="Filter By Request Amount.."
                        label="Request Status"
                        items={[
                            { value: 'All', name: 'All' },
                            { value: 'Healthy', name: 'Healthy' },
                            { value: 'Danger', name: 'Danger' },
                        ]}
                        onChange={(value) => setStatusFilter(prev => ({ ...prev, request: value }))}
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
                        {currentData.map((user, index) => (
                            <TableRow key={index} className="even:bg-gray-50">
                                <TableCell className="py-2 px-4 border-t border-gray-200">{user.name}</TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[user.ip].color}>
                                        {user.ip}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[user.location].color}>
                                        {user.location}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[user.request].color}>
                                        {user.request}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            {/* Pagination Controls */}
            {totalPages > 1 && (
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
            </div>)}
            
        </Box>
    );
};

export default BehaviouralAnalysisTable;
