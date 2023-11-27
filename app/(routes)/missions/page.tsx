import MissionsPage from "@src/pages/MissionsPage";
import orm from "@src/services/orm";
import dbDataSanitizer from "@src/utils/dbDataSanitizer";

import type { Mission } from "@src/types/mission";

const getData = async () => {
  const sql = "SELECT * FROM missions";

  const data = await orm(sql, []);

  return dbDataSanitizer(data, {
    jsonFields: ["goals"],
    booleanFields: ["is_completed"],
  }) as Mission[];
};

const Page = async () => {
  const data = await getData();

  return <MissionsPage missions={data} />;
};

export default Page;
