import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useContext, useMemo, useState } from "react";
import { useSWRConfig } from "swr";
import clientORM from "@src/lib/clientORM";
import MasterInfoContext from "@src/context/MasterInfoContext";

import type { Item } from "@src/types/item";

interface SellModalProps {
  onClose: VoidFunction;
  item: Item;
}

const SellModal = ({ onClose, item }: SellModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { player } = useContext(MasterInfoContext);

  const sellPrice = useMemo(() => {
    return Math.floor(item.price - item.price * 0.3);
  }, [item.price]);

  if (!player) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const sql = `UPDATE "players" SET "items" = $1, "money" = $2 WHERE "id" = $3`;

    const newItems = player.items.filter(
      (el) => el.item_code !== item.item_code
    );

    try {
      await clientORM(sql, {
        params: [newItems, player.money + sellPrice, player.id],
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
            <ModalHeader>Sell {item.name}</ModalHeader>
            <ModalBody>Are you sure?</ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button isLoading={loading} color="danger" onPress={handleSubmit}>
                Sell For {sellPrice}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SellModal;
