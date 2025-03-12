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

  useEffect(() => {
    const dbRef = ref(database, "component_4");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSummary({
          malicious: data.malicious || false,
          probability_risk_level: data.probalility_risk_level || 0, 
          summary: data.summary || "No risk data available.",
        });
        console.log("Fetched Risk Assessment Data:", data);
      }
    });

    return () => unsubscribe();
  }, []);

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

export default RiskAssesmentPage;
