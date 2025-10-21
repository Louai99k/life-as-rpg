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

interface AddCharacterModalProps {
  onClose: VoidFunction;
  onSuccess: VoidFunction;
}

const AddCharacterModal = ({ onClose, onSuccess }: AddCharacterModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [createCharacter] = usePrismaMutation("characters", "create");

  return (
    <Modal isOpen size="lg" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Character Modal
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={submitHelper((data) => {
                  const body = data as any;
                  createCharacter({
                    data: body,
                  })
                    .then(() => {
                      onSuccess();
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
