import { Button } from "@heroui/react";
import DeleteIcon from "@src/icons/Delete";
import EditIcon from "@src/icons/Edit";

interface CellActionsProps {
  onDelete: VoidFunction;
}

const CellActions = ({ onDelete }: CellActionsProps) => {
  return (
    <>
      <Button
        color="primary"
        className="mr-2"
        variant="bordered"
        size="sm"
        isIconOnly
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
