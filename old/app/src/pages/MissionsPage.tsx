"use client";

import MissionsTable from "@src/components/Main/Missions/MissionsTable";
import { SWRConfig } from "swr";
import { Button, Switch } from "@nextui-org/react";
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
  const [showDoneMissions, setShowDoneMissions] = useState(false);

  return (
    <SWRConfig
      value={{
        fallback: {
          missions,
        },
      }}
    >
      <div className="px-4 md:px-8 mt-8 mb-4">
        <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">Missions</h3>
          <div className="flex gap-4 flex-col md:flex-row">
            <Button
              onClick={() => setOpen(true)}
              color="primary"
              startContent={<PlusIcon />}
            >
              Add Mission
            </Button>
            <Switch onChange={(e) => setShowDoneMissions(e.target.checked)}>
              Show Done Missions
            </Switch>
          </div>
        </div>
        <MissionsTable showDoneMissions={showDoneMissions} />
      </div>
      {open ? <AddMissionModal onClose={() => setOpen(false)} /> : null}
    </SWRConfig>
  );
};

export default MissionsPage;
