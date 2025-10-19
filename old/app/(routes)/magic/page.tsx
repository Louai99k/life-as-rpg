import MagicPage from "@src/pages/MagicPage";
import orm from "@src/services/orm";

import type { MagicCategory } from "@src/types/magic";

const getData = async () => {
  const sql = `SELECT * FROM "magic_categories"`;

  const data = await orm<MagicCategory>(sql, []);

  return data;
};

const Page = async () => {
  const data = await getData();

  return <MagicPage categories={data} />;
};

export default Page;
