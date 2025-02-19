import { Flex } from '@radix-ui/themes';
import React from 'react'
import DeviceMonitoringTable from './_components/DeviceMonitoringTable';
import DeviceMonitoringSummaryTable from './_components/DeviceMonitoringSummaryGraph';

const DeviceMonitoringPage = () => {
  return (
    <Flex className="flex space-x-3 p-4">
        <DeviceMonitoringTable/>
        <DeviceMonitoringSummaryTable/>
    </Flex>
  )
}

export default DeviceMonitoringPage;