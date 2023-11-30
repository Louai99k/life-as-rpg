import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import { useSWRConfig } from "swr";
import clientORM from "@src/lib/clientORM";
import MasterInfoContext from "@src/context/MasterInfoContext";

import type { Item } from "@src/types/item";

interface PurchaseModalProps {
  onClose: VoidFunction;
  item: Item;
}

const PurchaseModal = ({ onClose, item }: PurchaseModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { player } = useContext(MasterInfoContext);

  if (!player) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const sql = `UPDATE "players" SET "items" = $1, "money" = $2 WHERE "id" = $3`;

    const newItems = [
      ...player.magic,
      { item_code: item.item_code, upgrades: [] },
    ];

    try {
      await clientORM(sql, {
        params: [newItems, player.money - item.price, player.id],
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
            <ModalHeader>Unlock Item</ModalHeader>
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
                Purchase For {item.price}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PurchaseModal;
