'use client';

import { Flex } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { database } from './../../lib/firebase';
import { ref, onValue } from 'firebase/database';
import BehaviouralAnalysisTable from './_Components/BehaviouralAnalysisTable';
import BehaviouralAnalysisSummaryBarGraph from './_Components/BehaviouralAnalysisSummaryBarGraph';

const BehaviouralAnalysisPage = () => {
  const [userData, setUserData] = useState<
    { name: string; ip_address: boolean; location: boolean; request: boolean }[]
  >([]);

  // Fetch Data from Firebase
  useEffect(() => {
    const dbRef = ref(database, "component_2");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((username) => ({
          name: username,
          ip_address: Boolean(data[username].ip_adress), 
          location: Boolean(data[username].location),   
          request: Boolean(data[username].request), 
        }));
        setUserData(formattedData);
        console.log("Fetched Data:", formattedData);
      } else {
        setUserData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Flex className="flex space-x-3 p-4">
      <BehaviouralAnalysisTable data={userData} />
      <BehaviouralAnalysisSummaryBarGraph data={userData} />
    </Flex>
  );
};

export default BehaviouralAnalysisPage;
