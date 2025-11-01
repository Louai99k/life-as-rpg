import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useRef } from "react";
import MagicForm from "./MagicForm";
import usePrismaMutation from "@src/hooks/usePrismaMutation";

interface AddMagicModalProps {
  onClose: VoidFunction;
}

const AddMagicModal = ({ onClose }: AddMagicModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [createMagic, { isLoading }] = usePrismaMutation("magic", "create");

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Magic</ModalHeader>
            <ModalBody>
              <MagicForm
                onSubmit={(data) => {
                  createMagic({
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

export default AddMagicModal;
