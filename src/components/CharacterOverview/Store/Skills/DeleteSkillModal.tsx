import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";

interface DeleteSkillModalProps {
  onClose: VoidFunction;
  uid: string;
}

const DeleteSkillModal = ({ onClose, uid }: DeleteSkillModalProps) => {
  const [deleteSkill] = usePrismaMutation("skills", "delete");

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Skill
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this skill?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => {
                  onClose();
                }}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  deleteSkill({
                    where: {
                      uid,
                    },
                  }).finally(() => {
                    onClose();
                  });
                }}
                size="sm"
                color="primary"
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

export default DeleteSkillModal;
