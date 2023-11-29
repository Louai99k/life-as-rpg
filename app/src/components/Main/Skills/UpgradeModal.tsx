import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  cn,
} from "@nextui-org/react";
import clientORM from "@src/lib/clientORM";
import { useContext, useState } from "react";
import { useSWRConfig } from "swr";
import MasterInfoContext from "@src/context/MasterInfoContext";
import calculateSkillUpgradePrice from "@src/utils/game/calculateSkillUpgradePrice";

import type { Skill } from "@src/types/skills";

interface UpgradeModalProps {
  onClose: VoidFunction;
  skill: Skill;
}

const UpgradeModal = ({ onClose, skill }: UpgradeModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { player } = useContext(MasterInfoContext);
  const [upgradeWith, setUpgradeWith] = useState<"money" | "lvl_points" | null>(
    null
  );
  const playerSkill = player?.skills[skill.skill_code];

  const moneyRequired = calculateSkillUpgradePrice(
    playerSkill?.lvl ? playerSkill.lvl + 1 : 0
  );

  const handleSubmit = async () => {
    if (!player || !upgradeWith) return;

    setLoading(true);

    const sql = `UPDATE "players" SET "skills" = $1, "${upgradeWith}" = $2 WHERE "id" = $3`;

    const oldSkill = player.skills[skill.skill_code] || { lvl: 0 };
    const newSkills = {
      ...player.skills,
      [skill.skill_code]: {
        ...oldSkill,
        lvl: oldSkill.lvl + 1,
      },
    };

    const amount = upgradeWith === "money" ? moneyRequired : 1;

    try {
      await clientORM(sql, {
        params: [newSkills, player[upgradeWith] - amount, player.id],
      });
    } catch (e) {}

    mutate("master-info");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="lg" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              Upgrade {skill.name} To Level {(playerSkill?.lvl || 0) + 1} !
            </ModalHeader>
            <ModalBody className="flex-row gap-8">
              <Checkbox
                classNames={{
                  base: cn(
                    "rounded border transition",
                    upgradeWith === "money"
                      ? "border-yellow-500 bg-yellow-900"
                      : "hover:border-yellow-500 hover:bg-yellow-900 border-content2"
                  ),
                  wrapper: "hidden",
                }}
                onChange={(e) => {
                  setUpgradeWith(e.target.checked ? "money" : null);
                }}
                isDisabled={moneyRequired > (player?.money || 0)}
              >
                With Money ({player ? moneyRequired : "Calculating..."})
              </Checkbox>
              <Checkbox
                classNames={{
                  base: cn(
                    "rounded border transition",
                    upgradeWith === "lvl_points"
                      ? "border-primary bg-primary-50"
                      : "border-content2 hover:border-primary hover:bg-primary-50"
                  ),
                  wrapper: "hidden",
                }}
                isDisabled={1 > (player?.lvl_points || 0)}
                onChange={(e) => {
                  setUpgradeWith(e.target.checked ? "lvl_points" : null);
                }}
              >
                With LvL Points (1 LvL Points)
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                color="primary"
                onPress={handleSubmit}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpgradeModal;
