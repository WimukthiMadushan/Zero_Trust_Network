'use client';

import StatusSelector from "@/components/StatusSelector";
import Table from "@/components/Table";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";

interface userLoginData {
  id: number;
  name: string;
  status: string;
}

interface TableHeader {
  label: string;
  key: string;
}

const RealTimeAccessTable = ({ userLoginData, tableHeaders }: { userLoginData: userLoginData[] , tableHeaders: TableHeader[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const pageSize = 6;

  const filteredData = statusFilter === 'All' ? userLoginData : userLoginData.filter((data) => data.status === statusFilter)
    
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="mb-5 w-[55%] border border-gray-300 shadow-lg rounded-xl p-5 bg-white">
      <Flex align="center" justify="between" className="mb-5">
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
      <Table 
        userLoginData={currentData} 
        tableHeaders={tableHeaders} 
        pageSize={pageSize} 
        currentPage={currentPage} 
        itemCount={filteredData.length}
        onPageChange={onPageChange} 
      />
    </div>
  );
};

export default RealTimeAccessTable;
