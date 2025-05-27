"use client";

import { database } from "@/lib/firebase";
import { Box, Callout, Card, Flex, Text, Button } from "@radix-ui/themes";
import { onValue, ref } from "firebase/database";
import { ShieldCheck, Skull } from "lucide-react";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const RiskAssesmentPage = () => {
  const [report, setReport] = useState<{
    malicious: boolean;
    entries: { query: string; answer: string | number }[];
    summary?: string;
    riskEvaluation?: string;
  }>({
    malicious: false,
    entries: [],
    summary: "",
    riskEvaluation: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dbRef = ref(database, "component_4");
    setIsLoading(true);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const riskEvaluationAnswer = data.steps.risk_evaluation?.answer || "N/A";
        const topLevelKeys = [
          "How_would_the_actor_do_it__What_would_they_do_",
          "How_would_the_information_asset_s_security_requirements_be_breached_",
          "What_is_the_actor_s_reason_for_it_",
          "What_would_be_the_resulting_effect_on_the_information_asset_",
          "Who_would_exploit_the_area_of_concern_or_threat_",
        ];

        const entries: { query: string; answer: string | number }[] = [];

        topLevelKeys.forEach((key) => {
          if (data[key]) {
            entries.push({
              query: data[key].query,
              answer: data[key].answer,
            });
          }
        });

        const stepsObj = data.steps || {};
        Object.values(stepsObj).forEach((step) => {
          entries.push({
            query: (step as { query: string; answer: string | number }).query,
            answer: (step as { query: string; answer: string | number }).answer,
          });
        });

        setReport({
          malicious: data.malicious || false,
          entries,
          summary: data.summary || "",
          riskEvaluation: riskEvaluationAnswer, 
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Threat Analysis Report", 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(report.malicious ? "red" : "green");
    doc.text(`Malicious: ${report.malicious ? "Yes" : "No"}`, 20, 30);

    doc.setTextColor(0);
    let y = 40;

    report.entries.forEach((entry, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${entry.query}`, 20, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(`${entry.answer}`, 170);
      doc.text(lines, 25, y);
      y += lines.length * 6 + 4;
    });

    doc.save("threat-analysis-report.pdf");
  };

  if (isLoading) {
    return (
      <Box maxWidth="50rem" className="mx-auto mt-5">
        <SkeletonLoader />
      </Box>
    );
  }

  return (
    <div className="bg-hero-gradient">
      <Box maxWidth="60rem" className="mx-auto py-8 px-6">
        {/* Summary */}
        <Card className="p-6 mb-8 shadow-lg rounded-lg">
          <Text size="5" className="font-bold text-center mb-4">
            Threat Analysis Report
          </Text>

          <Callout.Root color={report.malicious ? "red" : "green"}>
            <Flex gapX="3" align="center">
              <Callout.Icon>
                {report.malicious ? (
                  <Skull color="red" />
                ) : (
                  <ShieldCheck color="green" />
                )}
              </Callout.Icon>
              <Box className="text-center">
            <Text size="4">{report.riskEvaluation}</Text>
            </Box>
            </Flex>
            
          </Callout.Root>
        </Card>

        {/* Detailed Q&A */}
        <Card className="p-6 shadow rounded-lg space-y-4">
          <Text size="4" className="font-semibold mb-4">
            Detailed Q&A
          </Text>

          <Box className="space-y-4">
            {report.entries.map((row, idx) => (
              <Card
                key={idx}
                className="p-5 border border-gray-200 rounded-xl shadow-sm transition-transform hover:scale-[1.01] hover:shadow-md bg-white"
              >
                <Text size="4" className="font-semibold text-gray-800 mb-2 text-justify">
                  Q{idx + 1}: {row.query}
                </Text>
                <br/>
                <Text size="3" className="text-gray-600 leading-relaxed text-justify">
                  {row.answer}
                </Text>
              </Card>
            ))}
          </Box>
        </Card>
        <div className="flex justify-start mb-4 mt-4">
          <Button
            onClick={generatePDF}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
          >
            Download PDF
          </Button>
        </div>
      </Box>
    </div>
  );
};

// Skeleton loader component
const SkeletonLoader = () => (
  <Box className="space-y-4">
    <Box className="h-6 bg-gray-300 rounded-md w-32" />
    <Box className="h-8 bg-gray-300 rounded-md w-64" />
    <Box className="h-8 bg-gray-300 rounded-md w-48" />
  </Box>
);

export default RiskAssesmentPage;
