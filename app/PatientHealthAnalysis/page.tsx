'use client';
import { database } from '@/lib/firebase';
import { Flex } from '@radix-ui/themes';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import PatientHealthAnalysisTable from './_components/PatientHealthAnalysisTable';
import PatientHealthAnalysisGraph from './_components/PatientHealthAnalysisGraph';
import TableSkeleton from '@/components/TableSkelton';
import ChartSkelton from '@/components/ChartSkelton';

const PatientHealthAnalysis = () => {
  const [deviceData, setDeviceData] = useState<{ id: number; health: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const dbRef = ref(database, "component_3");
    
      setIsLoading(true);
      const unsubscribe = onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
    
            // Extract Patient Health Data
            const patientHealthData = data.Patient_health
              ? Object.keys(data.Patient_health).map((id) => ({
                  id: Number(id),
                  health: Boolean(data.Patient_health[id]),
                }))
              : [];
    
            setDeviceData(patientHealthData);
            //console.log("Fetched Device Data:", { patientHealthData, packetAnalysisData, current });
          } else {
            setDeviceData([]);
          }
      });
      
      setIsLoading(false);
    
        return () => unsubscribe();
      }, []);

  return (
    <Flex className="space-x-2 p-2 flex-col sm:flex-row sm:justify-center md:gap-2">
      {isLoading ? <TableSkeleton /> : <PatientHealthAnalysisTable deviceData={deviceData} />}
      {isLoading ? <ChartSkelton/> : <PatientHealthAnalysisGraph deviceData={deviceData} />}
    </Flex>
  )
}

export default PatientHealthAnalysis