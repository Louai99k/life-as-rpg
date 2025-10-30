import type { characters as Character } from "@prisma/client";
import OverviewContext from "./OverviewContext";
import Resources from "./Resources";
import useSWR from "swr";
import fetchData from "@src/utils/prisma/fetcher";
import MissionsTable from "./MissionTable";
import { Button, Skeleton } from "@heroui/react";
import BackIcon from "@src/icons/BackIcon";
import Store from "./Store";

interface CharacterOverviewProps {
  onBack: VoidFunction;
  character: Character;
}

const CharacterOverview = ({ onBack, character }: CharacterOverviewProps) => {
  const { data, isLoading } = useSWR(`characters/${character.uid}`, () =>
    fetchData("characters", "findFirst", { where: { uid: character.uid } }),
  );

  if (!data || isLoading) {
    return <Skeleton className="flex rounded-full w-12 h-12" />;
  }

  return (
    <OverviewContext.Provider value={{ character: data }}>
      <div className="text-center mt-8">
        <Button onPress={onBack} startContent={<BackIcon />} variant="ghost">
          Back To Character Selection
        </Button>
      </div>
      <Resources />
      <MissionsTable />
      <Store />
    </OverviewContext.Provider>
  );
};

export default CharacterOverview;
