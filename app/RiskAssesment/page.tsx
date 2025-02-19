'use client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Callout, Card, Flex, Text } from '@radix-ui/themes';
import { ShieldCheck, Skull } from 'lucide-react';
import React, { useState } from 'react';

const RiskAssesmentPage = () => {
  const [summary, setSummary] = useState({
    malicious: false,
    probalility_risk_level: 90,
    summary: "Malicious activity detected. The risk level is high with large probability",
  });

  return (
    <Box maxWidth="50rem" className="mx-auto mt-5">
      <Card className="p-6 flex justify-center shadow-lg rounded-lg">
        <Box>
          <Text as="div" size="4" mb="4" className="font-bold">
            Summary of the Risk
          </Text>
          
          <Callout.Root color={summary.malicious ? 'red' : 'green'}>
            <Flex gapX='2'>
              <Callout.Icon>
                {summary.malicious ? <Skull color="red" /> : <ShieldCheck color="green" />}
              </Callout.Icon>
              <Callout.Text>
                {summary.summary}
              </Callout.Text>
            </Flex>
            <Flex align="center" justify="start" className="mt-4 text-sm ml-1" gapX='2'>
              <InfoCircledIcon/>
              <Text as="div">
                  Risk Probability: <strong>{summary.probalility_risk_level}%</strong>
              </Text>
            </Flex>   
          </Callout.Root> 
        </Box>
      </Card>
    </Box>
  );
};

export default RiskAssesmentPage;
