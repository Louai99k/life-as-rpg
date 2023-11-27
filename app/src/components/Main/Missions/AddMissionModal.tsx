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

interface AddMissionModalProps {
  onClose: VoidFunction;
}

const AddMissionModal = ({ onClose }: AddMissionModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Omit<Mission, "id">>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals",
    rules: { minLength: 1 },
  });

  const onSubmit: SubmitHandler<Omit<Mission, "id">> = async (data) => {
    setLoading(true);
    const sql =
      "INSERT INTO missions ('name', 'description', 'money_reward', 'xp_reward', 'goals', 'rank') VALUES (?, ?, ?, ?, ?, ?)";

    try {
      await clientORM(sql, {
        params: [
          data.name,
          data.description,
          +data.money_reward,
          +data.xp_reward,
          JSON.stringify(data.goals),
          data.rank,
        ],
      });
    } catch (e) {}

    mutate("missions");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="3xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add A Mission</ModalHeader>
            <ModalBody>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-4">
                  <Input
                    {...register("name", { required: "Name is required" })}
                    isRequired
                    label="Name"
                    placeholder="Type a name"
                    isInvalid={errors.name ? true : false}
                    errorMessage={errors.name?.message as string}
                  />
                  <Select
                    {...register("rank", { required: "Rank is required" })}
                    isRequired
                    label="Mission Rank"
                    placeholder="Select a rank"
                    isInvalid={errors.rank ? true : false}
                    errorMessage={errors.rank?.message as string}
                  >
                    {Object.values(MISSION_RANK).map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex gap-4">
                  <Input
                    {...register("money_reward", {
                      required: "Required Field",
                    })}
                    isRequired
                    label="Money Reward"
                    type="number"
                    placeholder="Enter an amount"
                    isInvalid={errors.money_reward ? true : false}
                    errorMessage={errors.money_reward?.message as string}
                  />
                  <Input
                    {...register("xp_reward", {
                      required: "Required Field",
                    })}
                    isRequired
                    label="XP Reward"
                    type="number"
                    placeholder="Enter an amount"
                    isInvalid={errors.xp_reward ? true : false}
                    errorMessage={errors.xp_reward?.message as string}
                  />
                </div>
                <Textarea
                  {...register("description", { required: "Required Field" })}
                  isRequired
                  label="Description"
                  placeholder="Enter your description"
                  isInvalid={errors.description ? true : false}
                  errorMessage={errors.description?.message as string}
                />
                {fields.map((_, i) => {
                  const descriptionPath = `goals.${i}.description` as any;
                  return (
                    <div key={i} className="flex items-center">
                      <div className="basis-5/6 flex flex-col gap-4">
                        <Textarea
                          {...register(descriptionPath, {
                            required: "Required Field",
                          })}
                          isRequired
                          label="Description"
                          placeholder="Enter your description"
                          isInvalid={
                            get(errors, descriptionPath) ? true : false
                          }
                          errorMessage={
                            get(errors, descriptionPath)?.message as string
                          }
                        />
                      </div>
                      <div className="basis-1/6 flex items-center justify-center">
                        <Button onClick={() => remove(i)} isIconOnly>
                          -
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <Button
                  onClick={() => {
                    append({
                      description: "",
                      completed: false,
                      uid: randomstring.generate({
                        capitalization: "uppercase",
                        length: 10,
                      }),
                    });
                  }}
                  endContent={<PlusIcon />}
                  className="w-full"
                >
                  Add Goal
                </Button>
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

export default AddMissionModal;
