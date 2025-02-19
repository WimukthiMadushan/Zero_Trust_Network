'use client';

import StatusSelector from "@/components/StatusSelector";
import { TableBody, TableCell, TableHeader, TableRow, Table } from "@/components/ui/table";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";
import { useState } from "react";

const StatusDetails: Record<any, { label: string; color: "red" | "green" }> = {
  Healthy: { label: "Healthy", color: "green" },
  Danger: { label: "Danger", color: "red" },
};

const tableHeaders = [
  { label: "User ID", key: "id" },
  { label: "User Name", key: "name" },
  { label: "Status", key: "status" },
];

const peakTimeData = [
  { id: 1, name: "User 1", status: "Healthy" },
  { id: 2, name: "User 2", status: "Danger" },
  { id: 3, name: "User 3", status: "Healthy" },
  { id: 4, name: "User 4", status: "Danger" },
  { id: 5, name: "User 5", status: "Healthy" },
  { id: 6, name: "User 6", status: "Danger" },
  { id: 7, name: "User 7", status: "Healthy" },
  { id: 8, name: "User 8", status: "Danger" },
  { id: 9, name: "User 9", status: "Healthy" },
  { id: 10, name: "User 10", status: "Danger" },
  { id: 11, name: "User 11", status: "Healthy" },
  { id: 12, name: "User 12", status: "Danger" },  
  
];

const RealTimeAccessTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const pageSize = 6;

  const filteredData = statusFilter === 'All' ? peakTimeData : peakTimeData.filter((data) => data.status === statusFilter);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemCount = filteredData.length;
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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[55%] border border-gray-300 shadow-lg rounded-xl p-5 bg-white mx-auto">
      <Flex align="center" justify="between" className="mb-5 flex-col sm:flex-row">
        <p className="text-2xl font-bold">Peak Time Analysis Table</p>
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
            {tableHeaders.map((header: any) => (
              <TableCell key={header.label} className="py-2 px-4 text-left font-medium">{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((data: any) => (
            <TableRow key={data.id} className="even:bg-gray-50">
              <TableCell className="py-2 px-4 border-t border-gray-200">{data.id}</TableCell>
              <TableCell className="py-2 px-4 border-t border-gray-200">{data.name}</TableCell>
              <TableCell className="py-2 px-4 border-t border-gray-200">
                <Badge color={StatusDetails[data.status].color}>
                  {data.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 mb-6 flex items-center justify-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
        >
          <DoubleArrowLeftIcon />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
        >
          <DoubleArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default RealTimeAccessTable;
