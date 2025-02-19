import { Flex } from '@radix-ui/themes'
import React from 'react'
import BehaviouralAnalysisTable from './_Components/BehaviouralAnalysisTable'
import BehaviouralAnalysisSummaryBarGraph from './_Components/BehaviouralAnalysisSummaryBarGraph'

const BehaviouralAnalysisPage = () => {
  return (
    <Flex className="flex space-x-3 p-4">
      <BehaviouralAnalysisTable />
      <BehaviouralAnalysisSummaryBarGraph/>
    </Flex>
  )
}

export default BehaviouralAnalysisPage