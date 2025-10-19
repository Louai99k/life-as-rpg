import ItemsPage from "@src/pages/ItemsPage";
import orm from "@src/services/orm";

import type { Item } from "@src/types/item";

const getData = async () => {
  const sql = `SELECT * FROM "items"`;

  const data = await orm<Item>(sql, []);

  return data;
};

const Page = async () => {
  const data = await getData();

  return <ItemsPage items={data} />;
};

export default Page;
