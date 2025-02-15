import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";

const StatusDetails: Record<any, { label: string; color: "red" | "gray" }> = {
  Active: { label: "Active", color: "red" },
  Inactive: { label: "Inactive", color: "gray" },
};

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomTable = ({
  dummyData,
  tableHeaders,
  itemCount,
  pageSize,
  currentPage,
  onPageChange
}: { 
  dummyData: any, 
  tableHeaders: any, 
  itemCount: number, 
  pageSize: number, 
  currentPage: number,
  onPageChange: (page: number) => void
}) => {

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
    <div>
      <Table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100 border-b-2 border-gray-300">
          <TableRow>
            {tableHeaders.map((header: any) => (
              <TableCell key={header.label} className="py-2 px-4 text-left font-medium">{header.label}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((data: any) => (
            <TableRow key={data.id} className="even:bg-gray-50">
              <TableCell className="py-2 px-4 border-t border-gray-200">{data.id}</TableCell>
              <TableCell className="py-2 px-4 border-t border-gray-200">{data.name}</TableCell>
              <TableCell className="py-2 px-4 border-t border-gray-200">{data.accessTime}</TableCell>
              <TableCell className="py-2 px-4 border-t border-gray-200">
                <Badge color={StatusDetails[data.status].color}>
                  {data.status}
                </Badge>
              </TableCell>
              <TableCell className="py-2 px-4 border-t border-gray-200">{data.removalTime}</TableCell>
              <TableCell className="py-2 px-4 border-t border-gray-200">{data.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300">
          <DoubleArrowLeftIcon/>
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300">
          <DoubleArrowRightIcon/>
        </button>
      </div>
    </div>
  );
};

export default CustomTable;
