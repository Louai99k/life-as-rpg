import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  NumberInput,
} from "@heroui/react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import submitHelper from "@src/utils/form/submitHelper";
import get from "lodash/get";
import { useMemo, useRef } from "react";

import type { characters as Character } from "@prisma/client";
import { useSWRConfig } from "swr";

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

const ResourceEditModal = ({
  onClose,
  character,
  resource,
}: ResourceEditModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [updateCharacter] = usePrismaMutation("characters", "update");
  const { mutate } = useSWRConfig();

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
              <Form
                onSubmit={submitHelper((data) => {
                  updateCharacter({
                    where: {
                      uid: character.uid,
                    },
                    data: {
                      [resource]: +data[resource],
                    },
                  })
                    .then(() => {
                      mutate("characters");
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
                  label={lookup.label}
                  placeholder={`Enter character ${lookup.label}`}
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
