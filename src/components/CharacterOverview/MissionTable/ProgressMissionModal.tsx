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
import { useState } from "react";

import type { MissionWithRelations } from "types/mission";

interface ProgressMissionModalProps {
  onClose: VoidFunction;
  mission: MissionWithRelations;
}

const getSelectedGoals = (goals: MissionWithRelations["goals"]) =>
  goals.filter((g) => g.done === 1).map((g) => g.uid);

const ProgressMissionModal = ({
  onClose,
  mission,
}: ProgressMissionModalProps) => {
  const [selectedGoals, setSelectedGoals] = useState(
    getSelectedGoals(mission.goals),
  );
  const [progressMission, { isLoading }] = usePrismaController(
    "progressMission",
    ["missions", `characters/${mission.character_ref}`],
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
              <Chip color="success">XP Reward: {mission.xp_reward}</Chip>
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
