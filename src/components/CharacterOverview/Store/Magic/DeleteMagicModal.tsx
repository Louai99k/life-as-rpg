import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";

interface DeleteMagicModalProps {
  onClose: VoidFunction;
  uid: string;
}

const DeleteMagicModal = ({ onClose, uid }: DeleteMagicModalProps) => {
  const [deleteMagic] = usePrismaMutation("magic", "delete");

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Magic
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this magic?</p>
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
                  deleteMagic({
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

export default DeleteMagicModal;
