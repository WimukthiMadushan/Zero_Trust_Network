import { dummyData , tableHeaders} from "@/app/Data/LogDetails";
import RealTimeAccessTable from "./RealTimeAccessTable";
import BarChart from "./BarChart";
import { Flex } from "@radix-ui/themes";


export default function Home() {
  return (
    <>
      <Flex className="flex space-x-3 p-4">
        <RealTimeAccessTable userLoginData={dummyData} tableHeaders={tableHeaders} />
        <BarChart />  
      </Flex>
    </>
  );
}
