import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import MasterInfoContext from "@src/context/MasterInfoContext";
import clientORM from "@src/lib/clientORM";
import { useContext, useState } from "react";
import { useSWRConfig } from "swr";

import type { Mission } from "@src/types/mission";

interface DeleteModalProps {
  onClose: VoidFunction;
  mission: Mission;
}

const DeleteModal = ({ onClose, mission }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { player } = useContext(MasterInfoContext);

  const handleDelete = async () => {
    if (!player) return;
    setLoading(true);
    const sql = `DELETE FROM "missions" WHERE "id" = $1`;

    try {
      await clientORM(sql, {
        params: [mission.id],
      });
    } catch (e) {}

    mutate("missions");
    mutate("master-info");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="3xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete A Mission</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this?</p>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button isLoading={loading} color="danger" onPress={handleDelete}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
