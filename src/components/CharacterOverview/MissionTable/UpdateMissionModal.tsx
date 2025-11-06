import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useRef } from "react";
import MissionForm from "./MissionForm";
import usePrismaController from "@src/hooks/usePrismaController";

import type { MissionWithRelations } from "types/mission";

interface UpdateCharacterModalProps {
  onClose: VoidFunction;
  mission: MissionWithRelations;
}

const UpdateCharacterModal = ({
  onClose,
  mission,
}: UpdateCharacterModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [updateMission, { isLoading }] = usePrismaController(
    "updateMission",
    "missions",
  );

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Mission
            </ModalHeader>
            <ModalBody>
              <MissionForm
                mission={mission}
                onSubmit={(data) => {
                  updateMission({
                    description: data.description,
                    xp_reward: +data.xp_reward,
                    type: data.type,
                    rank: data.rank,
                    title: data.title,
                    goals: data.goals,
                    uid: mission.uid,
                  })
                    .then(() => {
                      onClose();
                    })
                    .catch(() => {
                      onClose();
                    });
                }}
                submitRef={submitRef}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="primary"
                isLoading={isLoading}
                onPress={() => {
                  submitRef.current?.click();
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

export default UpdateCharacterModal;
