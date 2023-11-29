import clientORM from "@src/lib/clientORM";
import useSWR from "swr";

const SkillsView = () => {
  const { data: skills, isLoading } = useSWR("skills", () =>
    clientORM(`SELECT * FROM "skills"`)
  );

  return <div className="px-8">Enter</div>;
};

export default SkillsView;
