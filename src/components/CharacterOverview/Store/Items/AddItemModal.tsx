import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useRef } from "react";
import ItemForm from "./ItemForm";
import usePrismaMutation from "@src/hooks/usePrismaMutation";

interface AddItemModalProps {
  onClose: VoidFunction;
}

const AddItemModal = ({ onClose }: AddItemModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [createItem, { isLoading }] = usePrismaMutation("items", "create");

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Item</ModalHeader>
            <ModalBody>
              <ItemForm
                onSubmit={(data) => {
                  createItem(data).finally(() => {
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

export default AddItemModal;
