import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import clientORM from "@src/lib/clientORM";
import { useState } from "react";
import { useSWRConfig } from "swr";

import type { Mission } from "@src/types/mission";

interface ProgressModalProps {
  onClose: VoidFunction;
  mission: Mission;
}

const ProgressModal = ({ onClose, mission }: ProgressModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleProgress = async () => {
    setLoading(true);
    const sql = "";

    try {
      await clientORM(sql);
    } catch (e) {}

    mutate("missions");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="3xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Show Your Progress</ModalHeader>
            <ModalBody>
              <CheckboxGroup
                label="Choose Completed Goals"
                defaultValue={mission.goals
                  .filter((el) => el.completed)
                  .map((el) => el.uid)}
              >
                {mission.goals.map((goal, i) => (
                  <Checkbox key={i} value={goal.uid}>
                    {goal.description}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                color="primary"
                onPress={handleProgress}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProgressModal;
