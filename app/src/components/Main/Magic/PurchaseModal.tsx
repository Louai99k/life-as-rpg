import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import clientORM from "@src/lib/clientORM";

interface PurchaseModalProps {
  onClose: VoidFunction;
  price: number;
}

const PurchaseModal = ({ onClose, price }: PurchaseModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleSubmit = async () => {
    setLoading(true);
    const sql = "";

    try {
      await clientORM(sql, {
        params: [],
      });
    } catch (e) {}

    mutate("master-info");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="md" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Unlock Magic Category</ModalHeader>
            <ModalBody>Are you sure?</ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                color="warning"
                onPress={handleSubmit}
              >
                Purchase For {price}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PurchaseModal;
