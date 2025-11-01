import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";

interface DeleteItemModalProps {
  onClose: VoidFunction;
  uid: string;
}

const DeleteItemModal = ({ onClose, uid }: DeleteItemModalProps) => {
  const [deleteItem] = usePrismaMutation("items", "delete");

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Item
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this item?</p>
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
                  deleteItem({
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

export default DeleteItemModal;
