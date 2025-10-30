import { Button, Card, CardBody } from "@heroui/react";
import { CARD_IMAGE_HEIGHT } from "@src/constants";
import EditIcon from "@src/icons/EditIcon";
import DeleteIcon from "@src/icons/DeleteIcon";

import type { skills as Skill } from "@prisma/client";

interface SkillCardProps {
  skill: Skill;
  onUpdate: VoidFunction;
  onDelete: VoidFunction;
}

const SkillCard = ({ skill, onUpdate, onDelete }: SkillCardProps) => {
  return (
    <Card>
      <CardBody>
        {/* Avatar */}
        <div className="relative group cursor-pointer">
          {skill.avatar ? (
            <div
              className={`w-full h-[${CARD_IMAGE_HEIGHT}px] bg-zinc-700 rounded-medium`}
            />
          ) : (
            <div
              className={`w-full h-[${CARD_IMAGE_HEIGHT}px] bg-zinc-700 rounded-medium`}
            />
          )}
          <div className="absolute opacity-0 group-hover:opacity-100 flex transition-all gap-2 top-2 right-2">
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
        </div>

        {/* Description */}
        <div className="mt-4 line-clamp-4 text-small">
          <p>{skill.description}</p>
        </div>

        {/* Actions */}
        <div className="mt-4">
          <Button color="primary" className="w-full">
            Activate
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default SkillCard;
