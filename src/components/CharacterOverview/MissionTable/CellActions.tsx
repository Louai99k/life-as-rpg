import { Button } from "@heroui/react";
import DeleteIcon from "@src/icons/DeleteIcon";
import EditIcon from "@src/icons/EditIcon";

interface CellActionsProps {
  onDelete?: VoidFunction;
  onEdit?: VoidFunction;
}

const CellActions = ({ onDelete, onEdit }: CellActionsProps) => {
  return (
    <>
      {onEdit ? (
        <Button
          color="primary"
          variant="bordered"
          size="sm"
          isIconOnly
          onPress={onEdit}
        >
          <EditIcon />
        </Button>
      ) : null}
      {onDelete ? (
        <Button
          onPress={onDelete}
          color="danger"
          variant="bordered"
          size="sm"
          isIconOnly
        >
          <DeleteIcon />
        </Button>
      ) : null}
    </>
  );
};

export default CellActions;
