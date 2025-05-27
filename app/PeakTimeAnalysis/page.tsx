'use client';

import React, { useEffect, useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { ref, onValue } from 'firebase/database';
import { database } from '../../lib/firebase';

import RealTimeAccessTable from './_components/RealTimeAccessTable';
import BarChart from './_components/BarChart';
import ChartSkeleton from '../../components/ChartSkelton';
import TableSkeleton from '../../components/TableSkelton';

const PeakTimeAnalysis = () => {
  const [userData, setUserData] = useState<
    { name: string; status: boolean; loginTime: string; logoutTime: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    const dbRef = ref(database, 'component_1');
    setIsLoading(true);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.entries(data).map(
          ([username, userInfo]: [string, any]) => ({
            name: username,
            status: userInfo?.status ?? false,
            loginTime: userInfo?.loginTime ?? '',
            logoutTime: userInfo?.logoutTime ?? '',
          })
        );
        setUserData(formattedData);
        console.log(formattedData);
      } else {
        setUserData([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddUser = () => { 
    console.log("Add User Clicked");
  }

  return (
      <Flex className="flex space-x-3 p-4 bg-hero-gradient h-[100vh]">
      {isLoading ? <TableSkeleton /> : <RealTimeAccessTable userData={userData} onAddUser={handleAddUser} isAdmin={ userRole === "admin"? true: false } />}
        {isLoading ? <ChartSkeleton /> : <BarChart userData={userData} />}
      </Flex>
  );
};

export default PeakTimeAnalysis;
