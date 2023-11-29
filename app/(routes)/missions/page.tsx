import MissionsPage from "@src/pages/MissionsPage";
import orm from "@src/services/orm";

import type { Mission } from "@src/types/mission";

const getData = async () => {
  const sql = "SELECT * FROM missions";

  const data = await orm<Mission>(sql, []);

  return data;
};

const Page = async () => {
  const data = await getData();

  return <MissionsPage missions={data} />;
};

export default Page;
