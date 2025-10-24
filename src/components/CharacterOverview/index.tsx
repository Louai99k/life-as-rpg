import type { characters as Character } from "@prisma/client";
import OverviewContext from "./OverviewContext";
import Resources from "./Resources";
import useSWR from "swr";
import fetchData from "@src/utils/prisma/fetcher";
import MissionsTable from "./MissionTable";
import { Button } from "@heroui/react";
import BackIcon from "@src/icons/BackIcon";

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
      <div className="text-center mt-8">
        <Button onPress={onBack} startContent={<BackIcon />} variant="ghost">
          Back To Character Selection
        </Button>
      </div>
      <div>
        <Resources />
      </div>
      <div>
        <MissionsTable />
      </div>
    </OverviewContext.Provider>
  );
};

export default CharacterOverview;
