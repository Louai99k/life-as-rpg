import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";

interface DeleteCharacterModalProps {
  onClose: VoidFunction;
  onDelete: VoidFunction;
  uid: string;
}

const DeleteCharacterModal = ({
  onClose,
  onDelete,
  uid,
}: DeleteCharacterModalProps) => {
  const [deleteCharacter] = usePrismaMutation("characters", "delete");

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Character
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this character?</p>
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
                  deleteCharacter({
                    where: {
                      uid,
                    },
                  })
                    .then(() => {
                      onDelete();
                    })
                    .catch(() => {
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

export default DeleteCharacterModal;
