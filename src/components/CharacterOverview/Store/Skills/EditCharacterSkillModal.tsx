import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  NumberInput,
  Chip,
} from "@heroui/react";
import { useRef } from "react";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import submitHelper from "@src/utils/form/submitHelper";
import { useSWRConfig } from "swr";

import type { SkillWithCharacterSkill_M } from "types/controllers/skill";

interface EditCharacterSkillModalProps {
  onClose: VoidFunction;
  skill: SkillWithCharacterSkill_M;
}

const EditCharacterSkillModal = ({
  onClose,
  skill,
}: EditCharacterSkillModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const { mutate } = useSWRConfig();
  const [updateCharacterSkill, { isLoading }] = usePrismaMutation(
    "character_skills",
    "update",
  );

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Skill</ModalHeader>
            <ModalBody>
              <Chip>Max Level: {skill.max_lvl}</Chip>
              <Form
                onSubmit={submitHelper((data) => {
                  updateCharacterSkill({
                    data: {
                      lvl: +data.lvl,
                    },
                    where: {
                      uid: skill.character_skill.uid,
                    },
                  }).finally(() => {
                    mutate("skills");
                    onClose();
                  });
                })}
              >
                <NumberInput
                  isRequired
                  maxValue={skill.max_lvl}
                  name="lvl"
                  label="Level"
                  placeholder="Enter skill level"
                  defaultValue={skill.character_skill.lvl}
                />
                <button type="submit" className="hidden" ref={submitRef} />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="primary"
                isLoading={isLoading}
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

export default EditCharacterSkillModal;
