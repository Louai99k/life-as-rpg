import { Button } from "@heroui/react";
import DeleteIcon from "@src/icons/DeleteIcon";
import EditIcon from "@src/icons/EditIcon";

interface CellActionsProps {
  onDelete: VoidFunction;
  onEdit: VoidFunction;
}

const CellActions = ({ onDelete, onEdit }: CellActionsProps) => {
  return (
    <>
      <Button
        color="primary"
        className="mr-2"
        variant="bordered"
        size="sm"
        isIconOnly
        onPress={onEdit}
      >
        <EditIcon />
      </Button>
      <Button
        onPress={onDelete}
        color="danger"
        variant="bordered"
        size="sm"
        isIconOnly
      >
        <DeleteIcon />
      </Button>
    </>
  );
};

export default CellActions;
