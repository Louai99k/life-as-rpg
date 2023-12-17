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
import { MagicCategory } from "@src/types/magic";

interface SellModalProps {
  onClose: VoidFunction;
  price: number;
  magic: MagicCategory;
}

const SellModal = ({ onClose, price, magic }: SellModalProps) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { player } = useContext(MasterInfoContext);

  if (!player) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const sql = `UPDATE "players" SET "magic" = $1, "money" = $2 WHERE "id" = $3`;

    const newMagic = player.magic.filter(
      (el) => el.category_code !== magic.category_code
    );

    try {
      await clientORM(sql, {
        params: [newMagic, player.money + price, player.id],
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
            <ModalHeader>Sell Magic Category</ModalHeader>
            <ModalBody>Are you sure?</ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button isLoading={loading} color="danger" onPress={handleSubmit}>
                Sell For {price}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SellModal;
