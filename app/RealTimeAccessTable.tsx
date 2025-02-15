'use client';

import { DatePickerDemo } from "@/components/DatePicker";
import Table from "@/components/Table";
import { Flex, Container } from "@radix-ui/themes";
import { useState } from "react";

interface DummyData {
  id: number;
  name: string;
  accessTime: string;
  status: string;
  removalTime: string;
  date: string;
}

interface TableHeader {
    label: string;
    key: string;
} 
   
const RealTimeAccessTable = ({ dummyData, tableHeaders }: { dummyData: DummyData[] , tableHeaders: TableHeader[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;
  const itemCount = dummyData.length;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = dummyData.slice(startIndex, endIndex);
  
  return (
    <Container mb="16" width="60%">
      <Flex align="center" justify="between" className="mb-4">
        <p className="text-2xl font-bold">Real Time Access Table</p>
        <DatePickerDemo />
      </Flex>
      <Table 
        dummyData={currentData} 
        tableHeaders={tableHeaders} 
        pageSize={pageSize} 
        currentPage={currentPage} 
        itemCount={itemCount} 
        onPageChange={onPageChange} 
      />
    </Container>
  );
};

export default RealTimeAccessTable;
