"use client";
import { database } from "@/lib/firebase";
import { Box, Callout, Card, Flex, Text } from "@radix-ui/themes";
import { onValue, ref } from "firebase/database";
import { ShieldCheck, Skull } from "lucide-react";
import React, { useState, useEffect } from "react";

const RiskAssesmentPage = () => {
  const [report, setReport] = useState<{
    malicious: boolean;
    entries: { query: string; answer: string | number }[];
    summary?: string;
  }>({
    malicious: false,
    entries: [],
    summary: "",
  });
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const dbRef = ref(database, "component_4");
    setIsLoading(true);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // 1) Define the exact top-level keys in order
        const topLevelKeys = [
          "How_would_the_actor_do_it__What_would_they_do_",
          "How_would_the_information_asset_s_security_requirements_be_breached_",
          "What_is_the_actor_s_reason_for_it_",
          "What_would_be_the_resulting_effect_on_the_information_asset_",
          "Who_would_exploit_the_area_of_concern_or_threat_"
        ];

        // 2) Build entries array
        const entries: { query: string; answer: string | number }[] = [];

        // Add top-level Q&A
        topLevelKeys.forEach((key) => {
          if (data[key]) {
            entries.push({
              query: data[key].query,
              answer: data[key].answer
            });
          }
        });

        // Add steps Q&A
        const stepsObj = data.steps || {};
        Object.values(stepsObj).forEach((step) => {
          entries.push({
            query: (step as { query: string; answer: string | number }).query,
            answer: (step as { query: string; answer: string | number }).answer
          });
        });

        entries.push({
          query: "Summary File",
          answer: data.summary
        });

        setReport({
          malicious: data.malicious || false,
          entries,
          summary: data.summary || "",
        });

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
    <Box maxWidth="60rem" className="mx-auto mt-8 py-8 px-6">
      {/* Summary */}
      <Card className="p-6 mb-8 shadow-lg rounded-lg">
        <Text size="5" className="font-bold text-center mb-4">
          Threat Analysis Report
        </Text>

        <Callout.Root color={report.malicious ? "red" : "green"}>
          <Flex gapX="3" align="center">
            <Callout.Icon>
              {report.malicious ? <Skull color="red" /> : <ShieldCheck color="green" />}
            </Callout.Icon>
            {/* Optionally, could display a summary here if wanted */}
          </Flex>
          <Box className="mt-2 text-center">
            <Text size="4">{report.summary}</Text>
          </Box>
        </Callout.Root>
      </Card>

      {/* Detailed Q&A Table */}
      <Card className="p-6 shadow rounded-lg space-y-4">
        <Text size="4" className="font-semibold mb-4">
          Detailed Q&A
        </Text>

        <Box className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b py-3 px-4 text-left bg-gray-100 font-semibold">Question</th>
                <th className="border-b py-3 px-4 text-left bg-gray-100 font-semibold">Answer</th>
              </tr>
            </thead>
            <tbody>
              {report.entries.map((row, idx) => (
                <tr key={idx} className={`transition-colors hover:bg-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="py-3 px-4 align-top">
                    <Text className="font-medium">{row.query}</Text>
                  </td>
                  <td className="py-3 px-4 align-top">
                    <Text>{row.answer}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
