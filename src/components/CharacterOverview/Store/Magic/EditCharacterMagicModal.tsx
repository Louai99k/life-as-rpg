import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  NumberInput,
  Chip,
} from "@heroui/react";
import { useRef } from "react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import submitHelper from "@src/utils/form/submitHelper";
import { useSWRConfig } from "swr";

import type { MagicWithCharacterMagic_M } from "types/controllers/magic";

interface EditCharacterMagicModalProps {
  onClose: VoidFunction;
  magic: MagicWithCharacterMagic_M;
}

const EditCharacterMagicModal = ({
  onClose,
  magic,
}: EditCharacterMagicModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const { mutate } = useSWRConfig();
  const [updateCharacterMagic, { isLoading }] = usePrismaMutation(
    "character_magic",
    "update",
  );

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Magic</ModalHeader>
            <ModalBody>
              <Chip>Max Level: {magic.max_lvl}</Chip>
              <Form
                onSubmit={submitHelper((data) => {
                  updateCharacterMagic({
                    data: {
                      lvl: +data.lvl,
                    },
                    where: {
                      uid: magic.character_magic.uid,
                    },
                  }).finally(() => {
                    mutate("magic");
                    onClose();
                  });
                })}
              >
                <NumberInput
                  isRequired
                  maxValue={magic.max_lvl}
                  name="lvl"
                  label="Level"
                  placeholder="Enter magic level"
                  defaultValue={magic.character_magic.lvl}
                />
                <button type="submit" className="hidden" ref={submitRef} />
              </Form>
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

export default EditCharacterMagicModal;
