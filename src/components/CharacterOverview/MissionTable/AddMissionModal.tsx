import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useContext, useRef } from "react";
import MissionForm from "./MissionForm";
import OverviewContext from "../OverviewContext";
import usePrismaController from "@src/hooks/usePrismaController";

interface AddMissionModalProps {
  onClose: VoidFunction;
}

const AddMissionModal = ({ onClose }: AddMissionModalProps) => {
  const { character } = useContext(OverviewContext);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [createMission, { isLoading }] = usePrismaController(
    "createMission",
    "missions",
  );

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Mission
            </ModalHeader>
            <ModalBody>
              <MissionForm
                onSubmit={(data) => {
                  createMission({
                    description: data.description,
                    xp_reward: +data.xp_reward,
                    type: data.type,
                    character_ref: character.uid,
                    rank: data.rank,
                    title: data.title,
                    goals: data.goals,
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

export default AddMissionModal;
