import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  NumberInput,
  Chip,
} from "@heroui/react";
import { formatCurrency } from "@src/utils/text";
import { useState } from "react";

import type { ItemWithCharacterItem_M } from "types/controllers/item";

interface SellItemModalProps {
  onClose: VoidFunction;
  item: ItemWithCharacterItem_M;
  onConfirm: (qty: number) => void;
  selling?: boolean;
}

const SellItemModal = ({
  onClose,
  item,
  onConfirm,
  selling = false,
}: SellItemModalProps) => {
  const [qty, setQty] = useState(1);
  const totalPrice = Math.floor((qty * item.store_price) / 2);

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Sell Item</ModalHeader>
            <ModalBody>
              <Chip>Having: {item.character_item.qty}</Chip>
              <NumberInput
                value={qty}
                onValueChange={(v) => (v ? setQty(v) : null)}
                minValue={1}
                maxValue={item.character_item.qty}
                label="Quantity to sell"
              />
              <p>Total: {formatCurrency(totalPrice)}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => {
                  onClose();
                }}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                isLoading={selling}
                onPress={() => {
                  onConfirm(qty);
                }}
                size="sm"
                color="warning"
              >
                Sell
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SellItemModal;
