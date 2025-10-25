import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import submitHelper from "@src/utils/form/submitHelper";
import get from "lodash/get";
import { useMemo, useRef, useState } from "react";

import type { characters as Character } from "@prisma/client";

interface ResourceEditModalProps {
  onClose: VoidFunction;
  character: Character;
  resource: "money" | "lvl" | "lvl_points" | "ki" | "max_ki" | "xp";
}

const ResourceMap = (character: Character) => ({
  money: {
    title: `Edit ${character.name} Money`,
    label: "Money",
  },
  lvl: {
    title: `Edit ${character.name} Level`,
    label: "Level",
  },
  lvl_points: {
    title: `Edit ${character.name} LvL Points`,
    label: "LvL Points",
  },
  ki: {
    title: `Edit ${character.name} Ki`,
    label: "Ki",
  },
  max_ki: {
    title: `Edit ${character.name} Max Ki`,
    label: "Max Ki",
  },
  xp: {
    title: `Edit ${character.name} XP`,
    label: "XP",
  },
});

const DIRECT = "direct";
const ADD = "adding";
const SUB = "subtract";

const options = [
  {
    key: DIRECT,
    label: "Direct Editing",
  },
  {
    key: ADD,
    label: "Adding to value",
  },
  {
    key: SUB,
    label: "Subtracting from value",
  },
];

const ResourceEditModal = ({
  onClose,
  character,
  resource,
}: ResourceEditModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [updateCharacter] = usePrismaMutation("characters", "update");
  const [editingMethod, setEditingMethod] = useState(options[0].key);

  const lookup = useMemo(() => {
    const resLookup = ResourceMap(character)[resource];

    return resLookup;
  }, [character, resource]);

  return (
    <Modal isOpen size="lg" onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {lookup.title}
            </ModalHeader>
            <ModalBody>
              <Select
                className="max-w-xs"
                label="Editing Method"
                placeholder="Select a method"
                selectedKeys={[editingMethod]}
                onSelectionChange={(keys) => setEditingMethod(keys.currentKey!)}
              >
                {options.map((opt) => (
                  <SelectItem key={opt.key}>{opt.label}</SelectItem>
                ))}
              </Select>
              <Form
                onSubmit={submitHelper((data) => {
                  const value = +data[resource];
                  const original = character[resource];
                  const updateData: any = {};
                  switch (editingMethod) {
                    case ADD:
                      updateData[resource] = original + value;
                      break;
                    case SUB:
                      updateData[resource] = Math.max(original - value, 0);
                      break;
                    default:
                      updateData[resource] = value;
                  }

                  updateCharacter({
                    where: {
                      uid: character.uid,
                    },
                    data: updateData,
                  })
                    .then(() => {
                      onClose();
                    })
                    .catch(() => {
                      onClose();
                    });
                })}
              >
                <NumberInput
                  defaultValue={get(character, resource)}
                  isRequired
                  name={resource}
                  label={
                    editingMethod === ADD
                      ? `Adding to ${lookup.label}`
                      : editingMethod === SUB
                        ? `Subtracting from ${lookup.label}`
                        : lookup.label
                  }
                  placeholder="Enter a value"
                />
                <button className="hidden" type="submit" ref={submitRef} />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="primary"
                onPress={() => {
                  submitRef.current?.click();
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResourceEditModal;
