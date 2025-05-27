'use client';
import { database } from '@/lib/firebase';
import { Flex } from '@radix-ui/themes';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import PatientHealthAnalysisTable from './_components/PatientHealthAnalysisTable';
import PatientHealthAnalysisGraph from './_components/PatientHealthAnalysisGraph';
import TableSkeleton from '@/components/TableSkelton';
import ChartSkelton from '@/components/ChartSkelton';

interface VitalsData {
  body_temperature: number;
  heart_rate: number;
  spo2: number;
  health_status: boolean;
  hr_prediction: string;
  svc_prediction: string;
}

interface PatientData {
  id: string;
  health: boolean;
  vitals: VitalsData | null;
}

const PatientHealthAnalysis = () => {
  const [deviceData, setDeviceData] = useState<PatientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dbRef = ref(database, "component_3");
  
    setIsLoading(true);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
  
        const patientHealth = data.Patient_health || {};
  
        const patientList: PatientData[] = Object.keys(patientHealth)
          .filter((key) => !key.includes("_vitals")) // Only IDs
          .map((id) => {
            const vitalsKey = `${id}_vitals`;
            const vitals = patientHealth[vitalsKey] ?? null;
  
            return {
              id,
              health: Boolean(patientHealth[id]),
              vitals,
            };
          });
  
        setDeviceData(patientList);
        console.log("Patient Data:", patientList);
      } else {
        setDeviceData([]);
      }
  
      setIsLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <Flex className="flex space-x-3 p-4 bg-hero-gradient h-[100vh]">
      {isLoading ? <TableSkeleton /> : <PatientHealthAnalysisTable deviceData={deviceData} />}
      {isLoading ? <ChartSkelton/> : <PatientHealthAnalysisGraph deviceData={deviceData} />}
    </Flex>
  )
}

export default PatientHealthAnalysis