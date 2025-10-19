import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import calculateXP from "@src/utils/game/calculateXP";

interface CalculateModalProps {
  onClose: VoidFunction;
}

const CalculateModal = ({ onClose }: CalculateModalProps) => {
  const [lvl, setLvL] = useState<null | number>(null);

  return (
    <Modal isOpen size="3xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Calculate Levels</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h3>Calculate XP Required From Level:</h3>
                  <Input
                    onChange={(e) => setLvL(e.target.valueAsNumber || null)}
                    type="number"
                    label="Level"
                    placeholder="60..."
                  />
                  <p>
                    XP Required:{" "}
                    <strong>{lvl ? calculateXP(lvl) : null}</strong>
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CalculateModal;
