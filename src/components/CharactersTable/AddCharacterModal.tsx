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
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import submitHelper from "@src/utils/form/submitHelper";
import { useRef } from "react";
import { useSWRConfig } from "swr";

interface AddCharacterModalProps {
  onClose: VoidFunction;
}

const AddCharacterModal = ({ onClose }: AddCharacterModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [createCharacter] = usePrismaMutation("characters", "create");
  const { mutate } = useSWRConfig();

  return (
    <Modal isOpen size="lg" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Character
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={submitHelper((data) => {
                  const body = data as any;
                  createCharacter({
                    data: body,
                  })
                    .then(() => {
                      mutate("characters");
                      onClose();
                    })
                    .catch(() => {
                      onClose();
                    });
                })}
              >
                <Input
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

export default AddCharacterModal;
