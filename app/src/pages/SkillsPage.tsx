"use client";

import { Button } from "@nextui-org/react";
import PlusIcon from "@src/icons/PlusIcon";
import { useState } from "react";
import { SWRConfig } from "swr";
import dynamic from "next/dynamic";
import SkillsView from "@src/components/Main/Skills/SkillsView";

import type { Skill } from "@src/types/skills";

const AddSkillModal = dynamic(
  () => import("@src/components/Main/Skills/AddSkillModal")
);

interface SkillsPageProps {
  skills: Skill[];
}

const SkillsPage = ({ skills }: SkillsPageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SWRConfig
      value={{
        fallback: {
          skills,
        },
      }}
    >
      <div className="px-8 mt-8 flex justify-between">
        <h3 className="text-2xl font-bold">Skills:</h3>
        <Button onClick={() => setOpen(true)} startContent={<PlusIcon />}>
          Add Skill
        </Button>
      </div>
      <SkillsView />
      {open ? <AddSkillModal onClose={() => setOpen(false)} /> : null}
    </SWRConfig>
  );
};

export default SkillsPage;
