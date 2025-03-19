'use client';
import React from 'react'
import RealTimeAccessTable from "./_components/RealTimeAccessTable";
import BarChart from "./_components/BarChart";
import { Flex } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { database } from "./../../lib/firebase"; 
import { ref, onValue } from "firebase/database";

const PeakTimeAnalysis = () => {
    const [userData, setUserData] = useState<
  { name: string; status: boolean; loginTime: string; logoutTime: string }[]
>([]);

useEffect(() => {
  const dbRef = ref(database, "component_1");

  const unsubscribe = onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const formattedData = Object.entries(data).map(([username, userInfo]: any) => ({
        name: username,
        status: userInfo.status || false,
        loginTime: userInfo.loginTime || "",
        logoutTime: userInfo.logoutTime || "",
      }));
      setUserData(formattedData);
      console.log(formattedData);
    } else {
      setUserData([]);
    }
  });

  return () => unsubscribe();
}, []);

    
    return (
      <Flex className="space-x-2 p-2 flex-col sm:flex-row sm:justify-center md:gap-2">
        <RealTimeAccessTable userData={ userData } />
        <BarChart userData={ userData }/>
      </Flex>
    );
}

export default PeakTimeAnalysis