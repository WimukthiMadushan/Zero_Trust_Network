import { dummyData , tableHeaders} from "@/app/Data/LogDetails";
import RealTimeAccessTable from "./RealTimeAccessTable";


export default function Home() {
  return (
    <div className="p-4">
      <RealTimeAccessTable dummyData={ dummyData} tableHeaders={tableHeaders}/>
    </div>
  );
}
