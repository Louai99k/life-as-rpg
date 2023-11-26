import MissionsPage from "@src/pages/MissionsPage";
import orm from "@src/services/orm";
import { Mission } from "@src/types/mission";

const getData = async () => {
  const sql = "SELECT * FROM missions";

  const data = await orm(sql, []);

  return data as Mission[];
};

const Page = async () => {
  const data = await getData();

  return <MissionsPage missions={data} />;
};

export default Page;
