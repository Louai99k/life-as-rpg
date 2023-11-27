import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import clientORM from "@src/lib/clientORM";
import { useState } from "react";
import { useSWRConfig } from "swr";

interface DeleteModalProps {
  onClose: VoidFunction;
  missionId: number;
}

const DeleteModal = ({ onClose, missionId }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    setLoading(true);
    const sql = "DELETE FROM missions WHERE id = ?";

    try {
      await clientORM(sql, {
        params: [missionId],
      });
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
