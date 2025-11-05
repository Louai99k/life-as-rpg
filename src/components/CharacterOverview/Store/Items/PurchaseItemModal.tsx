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

import type { characters as Character } from "@prisma/client";
import type { ItemWithCharacterItem } from "types/controllers/item";

interface PurchaseItemModalProps {
  onClose: VoidFunction;
  item: ItemWithCharacterItem;
  character: Character;
  onConfirm: (qty: number) => void;
  purchasing?: boolean;
}

const PurchaseItemModal = ({
  onClose,
  item,
  character,
  onConfirm,
  purchasing = false,
}: PurchaseItemModalProps) => {
  const [qty, setQty] = useState(1);
  const totalPrice = qty * item.store_price;
  const disabled = character.money < totalPrice;

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Buy Item</ModalHeader>
            <ModalBody>
              {item.character_item ? (
                <Chip>Having: {item.character_item.qty}</Chip>
              ) : null}
              <NumberInput
                value={qty}
                onValueChange={(v) => (v ? setQty(v) : null)}
                minValue={1}
                maxValue={
                  item.character_item
                    ? item.max_qty - item.character_item.qty
                    : item.max_qty
                }
                label="Quantity to purchase"
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
                isLoading={purchasing}
                isDisabled={disabled}
                onPress={() => {
                  onConfirm(qty);
                }}
                size="sm"
                color="warning"
              >
                {disabled ? "No Enough Money" : "Buy"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PurchaseItemModal;
