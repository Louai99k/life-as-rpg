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

import type { items as Item } from "@prisma/client";

interface UpdateItemModalProps {
  onClose: VoidFunction;
  item: Item;
}

const UpdateItemModal = ({ onClose, item }: UpdateItemModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [updateItem, { isLoading }] = usePrismaMutation("items", "update");

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Item
            </ModalHeader>
            <ModalBody>
              <ItemForm
                item={item}
                onSubmit={(data) => {
                  updateItem({
                    data,
                    where: {
                      uid: item.uid,
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

export default UpdateItemModal;
