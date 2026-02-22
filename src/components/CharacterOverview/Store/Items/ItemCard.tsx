import {
  Button,
  Card,
  CardBody,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import EditIcon from "@src/icons/EditIcon";
import DeleteIcon from "@src/icons/DeleteIcon";

import type { ItemWithCharacterItem } from "types/controllers/item";

interface ItemCardProps {
  item: ItemWithCharacterItem;
  selling?: boolean;
  onUpdate: VoidFunction;
  onDelete: VoidFunction;
  onPurchase: VoidFunction;
  onSell: VoidFunction;
}

const ItemCard = ({
  item,
  selling = false,
  onUpdate,
  onDelete,
  onPurchase,
  onSell,
}: ItemCardProps) => {
  const canBuy = item.in_store
    ? item.character_item
      ? item.max_qty > item.character_item.qty
      : true
    : false;

  return (
    <Card>
      <CardBody>
        {/* Avatar */}
        <div className="relative group cursor-pointer">
          {item.avatar ? (
            <Image
              isZoomed
              src={item.avatar}
              classNames={{
                wrapper:
                  "w-full h-card-height overflow-hidden flex items-center",
                img: "w-full h-full object-cover object-center min-h-full min-w-full",
              }}
            />
          ) : (
            <div className="w-full h-card-height bg-zinc-700 rounded-medium" />
          )}
          <div className="absolute z-50 opacity-0 group-hover:opacity-100 flex transition-all gap-2 top-2 right-2">
            <Button
              size="sm"
              color="primary"
              variant="bordered"
              className="rounded-full"
              isIconOnly
              onPress={onUpdate}
            >
              <EditIcon />
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="bordered"
              className="rounded-full"
              isIconOnly
              onPress={onDelete}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>

        {/* Name */}
        <div className="mt-4">
          <strong>{item.name}</strong>
        </div>

        {/* Description */}
        <Popover placement="top">
          <PopoverTrigger>
            <div className="mt-4 cursor-pointer line-clamp-4 text-small">
              <p>{item.description}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-1/2">
            <p>{item.description}</p>
          </PopoverContent>
        </Popover>

        {/* Actions */}
        <div className="mt-4">
          {item.character_item ? (
            <div className="flex gap-4">
              <Button
                isLoading={selling}
                variant="bordered"
                onPress={onSell}
                color="warning"
                className="flex-1"
              >
                Sell
              </Button>
              {canBuy ? (
                <Button onPress={onPurchase} color="warning" className="flex-1">
                  Buy More
                </Button>
              ) : null}
            </div>
          ) : canBuy ? (
            <Button onPress={onPurchase} color="warning" className="w-full">
              Buy
            </Button>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
