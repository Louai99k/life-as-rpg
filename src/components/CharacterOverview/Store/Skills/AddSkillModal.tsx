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

interface AddSkillModalProps {
  onClose: VoidFunction;
}

const AddSkillModal = ({ onClose }: AddSkillModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [createSkill, { isLoading }] = usePrismaMutation("skills", "create");

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Skill</ModalHeader>
            <ModalBody>
              <SkillForm
                onSubmit={(data) => {
                  createSkill({
                    data: {
                      ...data,
                      max_lvl: +data.max_lvl,
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

export default AddSkillModal;
