'use client';

import StatusSelector from "@/components/StatusSelector";
import { TableBody, TableCell, TableHeader, TableRow, Table } from "@/components/ui/table";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { AlertDialog, Badge, Flex } from "@radix-ui/themes";
import { useState} from "react";
import AddUserPopup from "./AddUserPopup ";
import { ref, remove } from "firebase/database";
import { database } from "@/lib/firebase";

const StatusDetails: Record<string, { label: string; color: "red" | "green" }> = {
  "true": { label: "Healthy", color: "green" },
  "false": { label: "Danger", color: "red" },
};

const tableHeaders = [
  { label: "Username", key: "name" },
  { label: "Status", key: "status" },
  { label: "Login Date and Time", key: "loginDateTime" },
  { label: "Logout Date and Time", key: "logoutDateTime" },
  { label: "Actions", key: "actions" }
];

interface userDataProps {
  name: string;
  status: boolean;
  loginTime: string;
  logoutTime: string;
}
const RealTimeAccessTable = ({ userData, onAddUser, isAdmin, }: { userData: userDataProps[], onAddUser: () => void; isAdmin: boolean }) => {
  const [warningTriggered, setWarningTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
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
  
const confirmDeleteUser = (username: string) => {
  setUserToDelete(username);
  setOpenDialog(true);
};

const handleConfirmDelete = async () => {
  if (userToDelete) {
    const userRef = ref(database, `component_1/${userToDelete}`);
    await remove(userRef);
    onAddUser();
    setUserToDelete(null);
    setOpenDialog(false);
  }
};


  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleDeleteUser = async (username: string) => {
    if (!window.confirm(`Are you sure you want to delete "${username}"?`)) return;

    const userRef = ref(database, `component_1/${username}`);
    await remove(userRef);
    onAddUser();
  };

  return (
    <><div className="w-full border border-gray-300 shadow-lg rounded-xl p-5 mx-auto bg-white h-[85%]">
      <Flex align="center" justify="between" className="mb-4">
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
          } } />
        <StatusSelector
          placeholder="Filter By Status..."
          label="Status"
          items={[
            { value: 'All', name: 'All' },
            { value: 'Healthy', name: 'Healthy' },
            { value: 'Danger', name: 'Danger' }
          ]}
          onChange={setStatusFilter} />
        {isAdmin && <AddUserPopup onAdd={onAddUser} /> }
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
              (header.key !== 'actions' || isAdmin) && (
                <TableCell key={header.label} className="py-2 px-4 text-left font-medium">
                  {header.label}
                </TableCell>
              )
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
                {isAdmin && (
                  <TableCell className="py-2 px-4 border-t border-gray-200">
                    <button
                      onClick={() => confirmDeleteUser(data.name)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </TableCell>
                )}
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
    <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
    <AlertDialog.Content className="fixed z-50 left-1/2 top-1/2 w-[90%] max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out animate-fade-in">
        <AlertDialog.Title className="text-lg font-bold mb-2">Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description className="mb-4 text-sm text-gray-600">
          Are you sure you want to delete user <strong>{userToDelete}</strong>? This action cannot be undone.
        </AlertDialog.Description>
        <div className="flex justify-end space-x-3">
          <AlertDialog.Cancel>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action >
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Confirm
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>

  );
};

export default RealTimeAccessTable;
