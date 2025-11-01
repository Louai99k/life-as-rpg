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

import type { magic as Magic } from "@prisma/client";

interface UpdateMagicModalProps {
  onClose: VoidFunction;
  magic: Magic;
}

const UpdateMagicModal = ({ onClose, magic }: UpdateMagicModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [updateMagic, { isLoading }] = usePrismaMutation("magic", "update");

  return (
    <Modal isOpen size="4xl" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Magic
            </ModalHeader>
            <ModalBody>
              <MagicForm
                magic={magic}
                onSubmit={(data) => {
                  updateMagic({
                    data: {
                      description: data.description,
                      name: data.name,
                      max_lvl: +data.max_lvl,
                      avatar: data.avatar,
                    },
                    where: {
                      uid: magic.uid,
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

export default UpdateMagicModal;
