'use client';

import StatusSelector from "@/components/StatusSelector";
import { TableBody, TableCell, TableHeader, TableRow, Table } from "@/components/ui/table";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";
import { useState} from "react";

const StatusDetails: Record<string, { label: string; color: "red" | "green" }> = {
  "true": { label: "Healthy", color: "green" },
  "false": { label: "Danger", color: "red" },
};

const tableHeaders = [
  { label: "Username", key: "name" },
  { label: "Status", key: "status" },
  { label: "Login Date and Time", key: "loginDateTime" },
  { label: "Logout Date and Time", key: "logoutDateTime" },
];

interface userDataProps {
  name: string;
  status: boolean;
  loginTime: string;
  logoutTime: string;
}
const RealTimeAccessTable = ({ userData }: { userData: userDataProps[] }) => {
  const [warningTriggered, setWarningTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const pageSize = 12;

  const sanitizeInput = (input: string): string =>
    input.replace(/[<>]/g, "").trim();

  // Apply filter based on status
  // Combine filtering by status and search query
const filteredData = userData.filter((data) => {
  const matchesStatus =
    statusFilter === 'All' ||
    StatusDetails[String(data.status)].label.toLowerCase() === statusFilter.toLowerCase();

  const matchesSearch =
    data.name.toLowerCase().includes(searchQuery.toLowerCase());

  return matchesStatus && matchesSearch;
});


  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[55%] border border-gray-300 shadow-lg rounded-xl p-5 mx-auto bg-white h-[85%]">
      <Flex align="center" justify="between" className="mb-5 flex-col sm:flex-row">
        <p className="text-2xl font-bold">User Login/Logout Status</p>
        <input
            type="text"
            placeholder="Search the users…"
            className="bg-transparent outline-none w-[20rem] border border-gray-300 rounded px-3 text-sm py-1"
            value={searchQuery}
            onChange={(e) => {
                const inputValue = e.target.value;
                const sanitized = sanitizeInput(inputValue);
                setSearchQuery(sanitized);
                setWarningTriggered(/[<>]/.test(inputValue));
                setCurrentPage(1);
            }}
        />
        <StatusSelector
          placeholder="Filter By Status..."
          label="Status"
          items={[
            { value: 'All', name: 'All' },
            { value: 'Healthy', name: 'Healthy' },
            { value: 'Danger', name: 'Danger' }
          ]}
          onChange={setStatusFilter}
        />
      </Flex>
      {warningTriggered && (
                      <div className="w-full sm:w-auto ml-[19rem] mb-2">
                              <Badge color="yellow">Warning: Special characters like &lt; or &gt; are not allowed.</Badge>
                      </div>
                  )}
      
      <Table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100 border-b-2 border-gray-300">
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header.label} className="py-2 px-4 text-left font-medium">{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableHeaders.length} className="py-4 text-center">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            currentData.map((data) => (
              <TableRow key={data.name} className="even:bg-gray-50">
                <TableCell className="py-2 px-4 border-t border-gray-200">{data.name}</TableCell>
                <TableCell className="py-2 px-4 border-t border-gray-200">
                  <Badge color={StatusDetails[String(data.status)].color}>
                    {StatusDetails[String(data.status)].label}
                  </Badge>
                </TableCell>
                <TableCell className="py-2 px-4 border-t border-gray-200">{data.loginTime}</TableCell>
                <TableCell className="py-2 px-4 border-t border-gray-200">{data.logoutTime}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 mb-6 flex items-center justify-center space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
          >
            <DoubleArrowLeftIcon />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
          >
            <DoubleArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default RealTimeAccessTable;
