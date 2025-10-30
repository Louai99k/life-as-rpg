import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useRef } from "react";
import SkillForm from "./SkillForm";
import usePrismaMutation from "@src/hooks/usePrismaMutation";

import type { skills as Skill } from "@prisma/client";

interface UpdateSkillModalProps {
  onClose: VoidFunction;
  skill: Skill;
}

const UpdateSkillModal = ({ onClose, skill }: UpdateSkillModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [updateSkill, { isLoading }] = usePrismaMutation("skills", "update");

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Skill
            </ModalHeader>
            <ModalBody>
              <SkillForm
                skill={skill}
                onSubmit={(data) => {
                  updateSkill({
                    data: {
                      description: data.description,
                      name: data.name,
                      max_lvl: +data.max_lvl,
                      avatar: data.avatar,
                    },
                    where: {
                      uid: skill.uid,
                    },
                  }).finally(() => {
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

export default UpdateSkillModal;
