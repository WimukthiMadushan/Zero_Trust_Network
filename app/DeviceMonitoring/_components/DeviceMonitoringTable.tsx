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

import React, { useState } from 'react'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

const tableHeaders = [
    { label: "Packet ID", key: "id" },
    { label: "Status", key: "status" },
];

const tableData = [
        { id: "001", status: "Healthy" },
        { id: "002", status: "Danger" },
        { id: "003", status: "Healthy" },
        { id: "004", status: "Danger" },
        { id: "005", status: "Healthy" },
        { id: "006", status: "Danger" },
        { id: "007", status: "Healthy" },
        { id: "008", status: "Danger" },
        { id: "009", status: "Healthy" },
        { id: "010", status: "Danger" },
        { id: "011", status: "Healthy" },
        { id: "012", status: "Danger" },
        { id: "013", status: "Healthy" },
        { id: "014", status: "Danger" },
        { id: "015", status: "Healthy" },
        { id: "016", status: "Danger" },
        { id: "017", status: "Healthy" },
        { id: "018", status: "Danger" },
        { id: "019", status: "Healthy" },
        { id: "020", status: "Danger" },
    
];

const StatusDetails: Record<any, { label: string; color: "red" | "green" }> = {
    Healthy: { label: "Healthy", color: "green" },
    Danger: { label: "Danger", color: "red" },
};

const DeviceMonitoringTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('All');

    const pageSize = 6;

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredData = statusFilter === 'All' ? tableData : tableData.filter((data) => data.status === statusFilter);

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
        <div className="mb-5 w-[55%] border border-gray-300 shadow-lg rounded-xl p-5 bg-white">
            <Flex align="center" justify="between" className="mb-5">
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
                                <TableCell className="py-2 px-4 border-t border-gray-200">
                                    <Badge color={StatusDetails[data.status].color}>
                                        {data.status}
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
                    className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300">
                    <DoubleArrowLeftIcon/>
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages} 
                    className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300">
                    <DoubleArrowRightIcon/>
                </button>
            </div>
        </div>
    );
}

export default DeviceMonitoringTable;
