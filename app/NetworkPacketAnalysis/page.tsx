'use client';
import { database } from '@/lib/firebase';
import { Flex } from '@radix-ui/themes';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import DeviceMonitoringTable from './_components/DeviceMonitoringTable';
import DeviceMonitoringSummaryTable from './_components/DeviceMonitoringSummaryGraph';
import TableSkeleton from '@/components/TableSkelton';
import ChartSkelton from '@/components/ChartSkelton';

const NetworkPacketAnalysis = () => {
  const [packetAnalysis, setPacketAnalysis] = useState<{ packet: number; status: boolean }[]>([]);
  const [currentStatus, setCurrentStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const dbRef = ref(database, "component_3");
    
    setIsLoading(true);
      
    const unsubscribe = onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
    
            // Extract Packet Analysis Data
            const packetAnalysisData = data.packet_analysis
              ? Object.keys(data.packet_analysis)
                  .filter((key) => key !== "current")
                  .map((packet) => ({
                    packet: Number(packet),
                    status: Boolean(data.packet_analysis[packet]),
                  }))
              : [];
    
            // Extract Current Status
            const current = data.packet_analysis?.current || false;
    
            setPacketAnalysis(packetAnalysisData);
            setCurrentStatus(current);
    
          } else {
            setPacketAnalysis([]);
            setCurrentStatus(false);
          }
        });
    setIsLoading(false);
        return () => unsubscribe();
      }, []);

  return (
    <Flex className="space-x-2 p-2 flex-col sm:flex-row sm:justify-center md:gap-2">
      {isLoading ? <TableSkeleton /> : <DeviceMonitoringTable packetAnalysisData={packetAnalysis} currentStatus={currentStatus} />}
      {isLoading ? <ChartSkelton /> : <DeviceMonitoringSummaryTable packetAnalysisData={packetAnalysis}/>}   
  </Flex>
  )
}

export default NetworkPacketAnalysis