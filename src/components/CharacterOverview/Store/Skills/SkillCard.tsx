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

import type { SkillWithCharacterSkill } from "types/controllers/skill";

interface SkillCardProps {
  skill: SkillWithCharacterSkill;
  activating?: boolean;
  deactivating?: boolean;
  onUpdate: VoidFunction;
  onDelete: VoidFunction;
  onActivate: VoidFunction;
  onDeactivate: VoidFunction;
  onEdit: VoidFunction;
}

const SkillCard = ({
  skill,
  activating = false,
  deactivating = false,
  onUpdate,
  onDelete,
  onActivate,
  onEdit,
  onDeactivate,
}: SkillCardProps) => {
  return (
    <Card>
      <CardBody>
        {/* Avatar */}
        <div className="relative group cursor-pointer">
          {skill.avatar ? (
            <Image
              isZoomed
              className="w-full h-card-height"
              src={skill.avatar}
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
          <strong>{skill.name}</strong>
          {skill.character_skill ? (
            <span> (Level: {skill.character_skill.lvl})</span>
          ) : null}
        </div>

        {/* Description */}
        <Popover placement="top">
          <PopoverTrigger>
            <div className="mt-4 cursor-pointer line-clamp-4 text-small">
              <p>{skill.description}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-1/2">
            <p>{skill.description}</p>
          </PopoverContent>
        </Popover>

        {/* Actions */}
        <div className="mt-4">
          {skill.character_skill ? (
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

export default SkillCard;
