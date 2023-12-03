"use client";

import MissionsTable from "@src/components/Main/Missions/MissionsTable";
import { SWRConfig } from "swr";
import { Button } from "@nextui-org/react";
import PlusIcon from "@src/icons/PlusIcon";
import dynamic from "next/dynamic";
import { useState } from "react";

import type { Mission } from "@src/types/mission";

const AddMissionModal = dynamic(
  () => import("@src/components/Main/Missions/AddMissionModal")
);

interface MissionsPageProps {
  missions: Mission[];
}

const MissionsPage = ({ missions }: MissionsPageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SWRConfig
      value={{
        fallback: {
          missions,
        },
      }}
    >
      <div className="px-4 md:px-8 mt-8 mb-4">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold mb-4">Missions</h3>
          <Button
            onClick={() => setOpen(true)}
            color="primary"
            startContent={<PlusIcon />}
          >
            Add Mission
          </Button>
        </div>
        <MissionsTable />
      </div>
      {open ? <AddMissionModal onClose={() => setOpen(false)} /> : null}
    </SWRConfig>
  );
};

export default MissionsPage;
