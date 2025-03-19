import { TableBody, TableCell, TableHeader, TableRow, Table } from '@/components/ui/table';
import { Skeleton } from '@radix-ui/themes';

const TableSkeleton = () => {
  return (
    <Table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
      <TableHeader className="bg-gray-100 border-b-2 border-gray-300">
        <TableRow>
          <TableCell className="py-2 px-4">
            <Skeleton className="w-full h-6 bg-gray-300 rounded-md" />
          </TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index} className="even:bg-gray-50">
            <TableCell className="py-2 px-4 border-t border-gray-200">
              <Skeleton className="w-full h-6 bg-gray-300 rounded-md" />
            </TableCell>
            <TableCell className="py-2 px-4 border-t border-gray-200">
              <Skeleton className="w-full h-6 bg-gray-300 rounded-md" />
            </TableCell>
            <TableCell className="py-2 px-4 border-t border-gray-200">
              <Skeleton className="w-full h-6 bg-gray-300 rounded-md" />
            </TableCell>
            <TableCell className="py-2 px-4 border-t border-gray-200">
              <Skeleton className="w-full h-6 bg-gray-300 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
