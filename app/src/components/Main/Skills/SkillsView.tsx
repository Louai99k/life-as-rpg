import { Button, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import StarIcon from "@src/icons/StarIcon";
import clientORM from "@src/lib/clientORM";
import { Skill } from "@src/types/skills";
import { useContext, useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import cloneDeep from "lodash/cloneDeep";
import MasterInfoContext from "@src/context/MasterInfoContext";
import LockIcon from "@src/icons/LockIcon";

const UpgradeModal = dynamic(() => import("./UpgradeModal"));

type UpgradeModalState = {
  skill: Skill | null;
  open: boolean;
};

const SkillsView = () => {
  const { data: skills } = useSWR("skills", () =>
    clientORM<Skill[]>(`SELECT * FROM "skills"`)
  );
  const { player } = useContext(MasterInfoContext);
  const [upgradeModal, setUpgradeModal] = useState<UpgradeModalState>({
    skill: null,
    open: false,
  });

  return (
    <div className="px-8 gap-4 grid grid-cols-4">
      {player && skills
        ? skills.map((skill) => {
            const playerSkill = player.skills[skill.skill_code];
            return (
              <Card className="cursor-pointer" key={skill.id} radius="lg">
                <CardBody className="space-y-2 p-4">
                  <div className="flex items-center justify-center">
                    {playerSkill ? (
                      <h3 className="w-[100px] h-[100px] text-4xl flex justify-center items-center">
                        LvL {playerSkill.lvl}
                      </h3>
                    ) : (
                      <LockIcon width="100px" height="100px" />
                    )}
                  </div>
                  <div className="flex items-center justify-between cursor-default">
                    <p className="text-lg font-bold">{skill.name}</p>
                    <Button
                      size="sm"
                      onClick={() => {
                        setUpgradeModal({
                          open: true,
                          skill: cloneDeep(skill),
                        });
                      }}
                    >
                      Upgrade
                    </Button>
                  </div>
                  <ScrollShadow className="h-[100px]">
                    <p className="cursor-default">{skill.description}</p>
                  </ScrollShadow>
                </CardBody>
              </Card>
            );
          })
        : null}
      {upgradeModal.open ? (
        <UpgradeModal
          skill={upgradeModal.skill!}
          onClose={() => {
            setUpgradeModal({ open: false, skill: null });
          }}
        />
      ) : null}
    </div>
  );
};

export default SkillsView;
