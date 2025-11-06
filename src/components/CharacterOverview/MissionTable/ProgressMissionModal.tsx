import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
  Chip,
} from "@heroui/react";
import usePrismaController from "@src/hooks/usePrismaController";
import fetchData from "@src/utils/prisma/fetcher";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import { REWARD_TYPES } from "@src/constants";
import { formatCurrency } from "@src/utils/text";

import type {
  items as Item,
  magic as Magic,
  rewards as Reward,
  skills as Skill,
} from "@prisma/client";
import type { MissionWithRelations } from "types/mission";

interface ProgressMissionModalProps {
  onClose: VoidFunction;
  mission: MissionWithRelations;
}

interface RewardItemProps {
  reward: Reward;
  items: Item[];
  magic: Magic[];
  skills: Skill[];
}

const getSelectedGoals = (goals: MissionWithRelations["goals"]) =>
  goals.filter((g) => g.done === 1).map((g) => g.uid);

const getFromLookup = (r: Reward, lookup: { uid: string; name: string }[]) =>
  lookup.find((l) => l.uid === r.reward_uid)?.name;

const RewardItem = ({ reward, items, skills, magic }: RewardItemProps) => {
  if (reward.reward_type === REWARD_TYPES.MONEY) {
    return (
      <Chip color="warning">
        Money: {formatCurrency(reward.reward_amount!)}
      </Chip>
    );
  }

  if (reward.reward_type === REWARD_TYPES.SKILL) {
    return (
      <div>
        <div className="flex gap-4">
          <Chip color="primary">Skill: {getFromLookup(reward, skills)}</Chip>
          <Chip color="primary">Level {reward.reward_lvl}</Chip>
        </div>
        <p className="mt-4">Description: {reward.description}</p>
      </div>
    );
  }

  if (reward.reward_type === REWARD_TYPES.MAGIC) {
    return (
      <div>
        <div className="flex gap-4">
          <Chip color="secondary">Magic: {getFromLookup(reward, magic)}</Chip>
          <Chip color="secondary">Level {reward.reward_lvl}</Chip>
        </div>
        <p className="mt-4">Description: {reward.description}</p>
      </div>
    );
  }

  if (reward.reward_type === REWARD_TYPES.ITEM) {
    return (
      <div>
        <div className="flex gap-4">
          <Chip color="warning">Item: {getFromLookup(reward, items)}</Chip>
          <Chip color="warning">Quantity: {reward.reward_amount}</Chip>
        </div>
        <p className="mt-4">Description: {reward.description}</p>
      </div>
    );
  }

  return <></>;
};

const ProgressMissionModal = ({
  onClose,
  mission,
}: ProgressMissionModalProps) => {
  const { data: items } = useSWRImmutable("lookup-items", () =>
    fetchData("items", "findMany"),
  );
  const { data: skills } = useSWRImmutable("lookup-skills", () =>
    fetchData("skills", "findMany"),
  );
  const { data: magic } = useSWRImmutable("lookup-magic", () =>
    fetchData("magic", "findMany"),
  );
  const [selectedGoals, setSelectedGoals] = useState(
    getSelectedGoals(mission.goals),
  );
  const [progressMission, { isLoading }] = usePrismaController(
    "progressMission",
    [
      "missions",
      `characters/${mission.character_ref}`,
      "skills",
      "magic",
      "items",
    ],
  );

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Progress Mission
            </ModalHeader>
            <ModalBody>
              <p>{mission.description}</p>
              <h3 className="text-lg">Rewards:</h3>
              {items && skills && magic ? (
                <div className="flex flex-col gap-4">
                  {mission.rewards.map((r, i) => (
                    <>
                      <div key={r.uid}>
                        <h3 className="font-bold text-lg mb-4">
                          {i + 1}. Reward
                        </h3>
                        <RewardItem
                          items={items}
                          skills={skills}
                          magic={magic}
                          reward={r}
                        />
                      </div>
                    </>
                  ))}
                  <Chip color="success">XP Reward: {mission.xp_reward}</Chip>
                </div>
              ) : null}
              <CheckboxGroup
                value={selectedGoals}
                label="Goals:"
                onValueChange={setSelectedGoals}
              >
                {mission.goals.map((goal) => (
                  <Checkbox key={goal.uid} value={goal.uid}>
                    {goal.description}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="primary"
                isLoading={isLoading}
                onPress={() => {
                  progressMission({
                    doneGoals: selectedGoals,
                    uid: mission.uid,
                  }).finally(() => {
                    onClose();
                  });
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProgressMissionModal;
