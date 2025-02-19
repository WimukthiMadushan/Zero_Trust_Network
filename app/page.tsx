import RealTimeAccessTable from "./RealTimeAccessTable";
import BarChart from "./BarChart";
import { Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex className="space-x-2 p-2 flex-col sm:flex-row sm:justify-center md:gap-2">
      <RealTimeAccessTable />
      <BarChart />
    </Flex>
  );
}
