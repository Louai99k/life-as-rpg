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
import { Icon } from "@iconify/react";

import type { MagicWithCharacterMagic } from "types/controllers/magic";

interface MagicCardProps {
  magic: MagicWithCharacterMagic;
  activating?: boolean;
  deactivating?: boolean;
  onUpdate: VoidFunction;
  onDelete: VoidFunction;
  onActivate: VoidFunction;
  onDeactivate: VoidFunction;
  onEdit: VoidFunction;
}

const MagicCard = ({
  magic,
  activating = false,
  deactivating = false,
  onUpdate,
  onDelete,
  onActivate,
  onEdit,
  onDeactivate,
}: MagicCardProps) => {
  return (
    <Card>
      <CardBody>
        {/* Avatar */}
        <div className="relative group cursor-pointer">
          {magic.avatar ? (
            magic.avatar.startsWith("https://") ? (
              <Image
                isZoomed
                src={magic.avatar}
                classNames={{
                  wrapper:
                    "w-full h-card-height overflow-hidden flex items-center",
                  img: "w-full h-full object-cover object-center min-h-full min-w-full",
                }}
              />
            ) : (
              <div className="w-full h-card-height bg-zinc-700 rounded-medium items-center justify-center flex">
                <Icon fontSize={64} icon={magic.avatar} />
              </div>
            )
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
          <strong>{magic.name}</strong>
          {magic.character_magic ? (
            <span> (Level: {magic.character_magic.lvl})</span>
          ) : null}
        </div>

        {/* Description */}
        <Popover placement="top">
          <PopoverTrigger>
            <div className="mt-4 cursor-pointer line-clamp-4 text-small">
              <p>{magic.description}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-1/2">
            <p>{magic.description}</p>
          </PopoverContent>
        </Popover>

        {/* Actions */}
        <div className="mt-4">
          {magic.character_magic ? (
            <div className="flex gap-4">
              <Button
                variant="bordered"
                onPress={onEdit}
                color="primary"
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                isLoading={deactivating}
                variant="bordered"
                onPress={onDeactivate}
                color="danger"
                className="flex-1"
              >
                Deactivate
              </Button>
            </div>
          ) : (
            <Button
              isLoading={activating}
              onPress={onActivate}
              color="primary"
              className="w-full"
            >
              Activate
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MagicCard;
