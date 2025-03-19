"use client";
import { database } from "@/lib/firebase";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Callout, Card, Flex, Text } from "@radix-ui/themes";
import { onValue, ref } from "firebase/database";
import { ShieldCheck, Skull } from "lucide-react";
import React, { useState, useEffect } from "react";

const RiskAssesmentPage = () => {
  const [summary, setSummary] = useState({
    malicious: false,
    probability_risk_level: 0,
    summary: "No risk detected.",
  });
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const dbRef = ref(database, "component_4");
    setIsLoading(true);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSummary({
          malicious: data.malicious || false,
          probability_risk_level: data.probability_risk_level || 0,
          summary: data.summary || "No risk data available.",
        });
        console.log("Fetched Risk Assessment Data:", data);
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (isLoading) {
    return (
      <Box maxWidth="50rem" className="mx-auto mt-5">
        <SkeletonLoader />
      </Box>
    );
  }

  return (
    <Box maxWidth="50rem" className="mx-auto mt-5">
      <Card className="p-6 flex justify-center shadow-lg rounded-lg">
        <Box>
          <Text as="div" size="4" mb="4" className="font-bold text-center">
            Summary of the Risk
          </Text>

          <Callout.Root color={summary.malicious ? "red" : "green"}>
            <Flex gapX="2">
              <Callout.Icon>
                {summary.malicious ? <Skull color="red" /> : <ShieldCheck color="green" />}
              </Callout.Icon>
              <Callout.Text>{summary.summary}</Callout.Text>
            </Flex>
            <Flex align="center" justify="start" className="mt-4 text-sm ml-1" gapX="2">
              <InfoCircledIcon />
              <Text as="div">
                Risk Probability: <strong>{summary.probability_risk_level}%</strong>
              </Text>
            </Flex>
          </Callout.Root>
        </Box>
      </Card>
    </Box>
  );
};

// Skeleton loader component for loading state
const SkeletonLoader = () => (
  <Box className="space-y-4">
    <Box className="h-6 bg-gray-300 rounded-md w-32" />
    <Box className="h-8 bg-gray-300 rounded-md w-64" />
    <Box className="h-8 bg-gray-300 rounded-md w-48" />
  </Box>
);

export default RiskAssesmentPage;
