import type { characters as Character } from "@prisma/client";
import OverviewContext from "./OverviewContext";
import Resources from "./Resources";
import useSWR from "swr";
import fetchData from "@src/utils/prisma/fetcher";

interface CharacterOverviewProps {
  onBack: VoidFunction;
  character: Character;
}

const CharacterOverview = ({ onBack, character }: CharacterOverviewProps) => {
  const { data } = useSWR("characters", () =>
    fetchData("characters", "findFirst", { where: { uid: character.uid } }),
  );

  return (
    <OverviewContext.Provider value={{ character: data }}>
      <div>
        <Resources />
      </div>
    </OverviewContext.Provider>
  );
};

export default CharacterOverview;
