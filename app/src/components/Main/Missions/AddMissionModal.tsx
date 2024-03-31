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
  Checkbox,
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

const rewardsMap: Record<
  MISSION_RANK,
  { money_reward: number; xp_reward: number }
> = {
  [MISSION_RANK.E]: {
    money_reward: 2_500,
    xp_reward: 25,
  },
  [MISSION_RANK.D]: {
    money_reward: 5_000,
    xp_reward: 50,
  },
  [MISSION_RANK.C]: {
    money_reward: 10_000,
    xp_reward: 100,
  },
  [MISSION_RANK.B]: {
    money_reward: 15_000,
    xp_reward: 150,
  },
  [MISSION_RANK.A]: {
    money_reward: 25_000,
    xp_reward: 250,
  },
  [MISSION_RANK.S]: {
    money_reward: 50_000,
    xp_reward: 500,
  },
  [MISSION_RANK.SS]: {
    money_reward: 100_000,
    xp_reward: 1000,
  },
  [MISSION_RANK.SSS]: {
    money_reward: 150_000,
    xp_reward: 25,
  },
  [MISSION_RANK.L]: {
    money_reward: 200_000,
    xp_reward: 2000,
  },
  [MISSION_RANK.Z]: {
    money_reward: 300_000,
    xp_reward: 3000,
  },
};

const AddMissionModal = ({ onClose }: AddMissionModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const [autoFillRewards, setAutoFillRewards] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<Omit<Mission, "id">>();
  const values = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals",
    rules: { minLength: 1 },
  });

  const onSubmit: SubmitHandler<Omit<Mission, "id">> = async (data) => {
    setLoading(true);
    const sql = `INSERT INTO "missions" ("name", "description", "money_reward", "xp_reward", "goals", "rank") VALUES ($1, $2, $3, $4, $5, $6)`;

    let moneyReward = +data.money_reward,
      xpReward = +data.xp_reward;
    if (autoFillRewards) {
      const { money_reward, xp_reward } = rewardsMap[data.rank];
      moneyReward = money_reward;
      xpReward = xp_reward;
    }

    try {
      await clientORM(sql, {
        params: [
          data.name,
          data.description,
          moneyReward,
          xpReward,
          data.goals,
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
      <ModalContent className="overflow-auto max-h-[90vh]">
        {(onClose) => (
          <>
            <ModalHeader>Add A Mission</ModalHeader>
            <ModalBody>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-4 flex-wrap md:flex-nowrap">
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
                {autoFillRewards ? null : (
                  <div className="flex gap-4 flex-wrap md:flex-nowrap">
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
                )}
                <div className="flex gap-4 flex-wrap md:flex-nowrap">
                  <Checkbox
                    onChange={(e) => {
                      setAutoFillRewards(e.target.checked);
                    }}
                  >
                    Auto Fill
                  </Checkbox>
                  {autoFillRewards ? (
                    <div>
                      Money Reward: {rewardsMap[values.rank]?.money_reward}, XP
                      Reward: {rewardsMap[values.rank]?.xp_reward}
                    </div>
                  ) : null}
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
