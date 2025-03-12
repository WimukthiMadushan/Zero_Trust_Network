'use client';
import { Box, Flex } from '@radix-ui/themes';
import DeviceMonitoringTable from './_components/DeviceMonitoringTable';
import DeviceMonitoringSummaryTable from './_components/DeviceMonitoringSummaryGraph';
import React, { useState, useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import PatientHealthAnalysis from './_components/PatientHealthAnalysis';


const DeviceMonitoringPage = () => {
  const [deviceData, setDeviceData] = useState<{ id: string; health: boolean }[]>([]);
  const [packetAnalysis, setPacketAnalysis] = useState<{ packet: string; status: boolean }[]>([]);
  const [currentStatus, setCurrentStatus] = useState<boolean>(false);

  useEffect(() => {
    const dbRef = ref(database, "component_3");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Extract Patient Health Data
        const patientHealthData = data.Patient_health
          ? Object.keys(data.Patient_health).map((id) => ({
              id,
              health: Boolean(data.Patient_health[id]),
            }))
          : [];

        // Extract Packet Analysis Data
        const packetAnalysisData = data.packet_analysis
          ? Object.keys(data.packet_analysis)
              .filter((key) => key !== "current")
              .map((packet) => ({
                packet,
                status: Boolean(data.packet_analysis[packet]),
              }))
          : [];

        // Extract Current Status
        const current = data.packet_analysis?.current || false;

        setDeviceData(patientHealthData);
        setPacketAnalysis(packetAnalysisData);
        setCurrentStatus(current);

        //console.log("Fetched Device Data:", { patientHealthData, packetAnalysisData, current });
      } else {
        setDeviceData([]);
        setPacketAnalysis([]);
        setCurrentStatus(false);
      }
    });

    return () => unsubscribe();
  }, []);

 return (
  <Flex className="flex-1 pl-[4rem] gap-6">
    <div className="flex flex-1 space-x-6">
      <DeviceMonitoringTable packetAnalysisData={packetAnalysis} currentStatus={currentStatus} />
      <PatientHealthAnalysis deviceData={deviceData} />
    </div>

    <div className="flex-1">
      <DeviceMonitoringSummaryTable packetAnalysisData={packetAnalysis}/>
    </div>
  </Flex>
);

}

export default DeviceMonitoringPage;