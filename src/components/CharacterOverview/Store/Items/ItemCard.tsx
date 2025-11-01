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
  purchasing?: boolean;
  selling?: boolean;
  onUpdate: VoidFunction;
  onDelete: VoidFunction;
  onPurchase: VoidFunction;
  onSell: VoidFunction;
}

const ItemCard = ({
  item,
  purchasing = false,
  selling = false,
  onUpdate,
  onDelete,
  onPurchase,
  onSell,
}: ItemCardProps) => {
  return (
    <Card>
      <CardBody>
        {/* Avatar */}
        <div className="relative group cursor-pointer">
          {item.avatar ? (
            <Image
              isZoomed
              className="w-full h-card-height"
              src={item.avatar}
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
            <Button
              isLoading={selling}
              variant="bordered"
              onPress={onSell}
              color="warning"
              className="w-full"
            >
              Sell
            </Button>
          ) : (
            <Button
              isLoading={purchasing}
              onPress={onPurchase}
              color="warning"
              className="w-full"
            >
              Purchase
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
