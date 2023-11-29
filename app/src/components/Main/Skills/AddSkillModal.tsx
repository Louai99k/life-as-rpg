import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import PlusIcon from "@src/icons/PlusIcon";
import { MISSION_RANK } from "@src/types/enum";
import { useRef, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import get from "lodash/get";
import { useSWRConfig } from "swr";
import clientORM from "@src/lib/clientORM";
import randomstring from "randomstring";

import type { Mission } from "@src/types/mission";
import { Skill } from "@src/types/skills";

interface AddSkillModalProps {
  onClose: VoidFunction;
}

const AddSkillModal = ({ onClose }: AddSkillModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Skill, "id">>();

  const onSubmit: SubmitHandler<Omit<Skill, "id">> = async (data) => {
    setLoading(true);
    const sql = `INSERT INTO "skills" ("name", "description", "skill_code", "lvls_available") VALUES ($1, $2, $3, $4)`;

    try {
      await clientORM(sql, {
        params: [
          data.name,
          data.description,
          data.skill_code,
          +data.lvls_available,
        ],
      });
    } catch (e) {}

    mutate("skills");
    mutate("master-info");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="3xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add A Skill</ModalHeader>
            <ModalBody>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-4">
                  <Input
                    {...register("skill_code", {
                      required: "Code is required",
                    })}
                    isRequired
                    label="Skill Code"
                    placeholder="Type a code"
                    isInvalid={errors.skill_code ? true : false}
                    errorMessage={errors.skill_code?.message as string}
                  />
                  <Input
                    {...register("lvls_available", {
                      required: "Required Field",
                    })}
                    isRequired
                    label="LvLs Available"
                    placeholder="Type a how much level can be upgraded"
                    type="number"
                    isInvalid={errors.lvls_available ? true : false}
                    errorMessage={errors.lvls_available?.message as string}
                  />
                </div>
                <Input
                  {...register("name", { required: "Name is required" })}
                  isRequired
                  label="Name"
                  placeholder="Type a name"
                  isInvalid={errors.name ? true : false}
                  errorMessage={errors.name?.message as string}
                />
                <Textarea
                  {...register("description", { required: "Required Field" })}
                  isRequired
                  label="Description"
                  placeholder="Enter your description"
                  isInvalid={errors.description ? true : false}
                  errorMessage={errors.description?.message as string}
                />
                <button type="submit" ref={submitRef} className="hidden" />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                color="success"
                className="text-white"
                onPress={() => submitRef.current?.click()}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddSkillModal;
