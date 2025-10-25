import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
} from "@heroui/react";
import type { characters as Character } from "@prisma/client";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import submitHelper from "@src/utils/form/submitHelper";
import { useRef } from "react";

interface UpdateCharacterModalProps {
  onClose: VoidFunction;
  character: Character;
}

const UpdateCharacterModal = ({
  onClose,
  character,
}: UpdateCharacterModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [updateCharacter] = usePrismaMutation("characters", "update");

  return (
    <Modal isOpen size="lg" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Character
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={submitHelper((data) => {
                  updateCharacter({
                    where: {
                      uid: character.uid,
                    },
                    data,
                  })
                    .then(() => {
                      onClose();
                    })
                    .catch(() => {
                      onClose();
                    });
                })}
              >
                <Input
                  defaultValue={character.name}
                  isRequired
                  name="name"
                  label="Name"
                  placeholder="Enter character name"
                />
                <button className="hidden" type="submit" ref={submitRef} />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="primary"
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

export default UpdateCharacterModal;
