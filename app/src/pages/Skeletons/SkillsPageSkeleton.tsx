"use client";

import { Button } from "@nextui-org/react";
import PlusIcon from "@src/icons/PlusIcon";

const SkillsPageSkeleton = () => {
  return (
    <>
      <div className="px-8 mt-8 flex justify-between">
        <h3 className="text-2xl font-bold">Skills</h3>
        <Button startContent={<PlusIcon />}>Add Skill</Button>
      </div>
      {/* <SkillsView /> */}
    </>
  );
};

export default SkillsPageSkeleton;
