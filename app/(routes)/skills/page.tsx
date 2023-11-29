import SkillsPage from "@src/pages/SkillsPage";
import orm from "@src/services/orm";

import type { Skill } from "@src/types/skills";

const getData = async () => {
  const sql = `SELECT * FROM "skills"`;

  const data = await orm<Skill>(sql, []);

  return data;
};

const Page = async () => {
  const data = await getData();

  return <SkillsPage skills={data} />;
};

export default Page;
