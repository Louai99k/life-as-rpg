import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import { useSWRConfig } from "swr";

interface DeleteCharacterModalProps {
  onClose: VoidFunction;
  uid: string;
}

const DeleteCharacterModal = ({ onClose, uid }: DeleteCharacterModalProps) => {
  const { mutate } = useSWRConfig();
  const [deleteCharacter] = usePrismaMutation("missions", "delete");

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Mission
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this mission?</p>
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
                      mutate("missions");
                      onClose();
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
