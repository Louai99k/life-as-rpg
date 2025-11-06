import {
  addToast,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Form,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import useList from "@src/hooks/useList";
import submitHelper from "@src/utils/form/submitHelper";
import PlusIcon from "@src/icons/PlusIcon";
import DeleteIcon from "@src/icons/DeleteIcon";
import capitalize from "lodash/capitalize";
import useSWRImmutable from "swr/immutable";
import fetchData from "@src/utils/prisma/fetcher";
import { REWARD_TYPES, type REWARD_TYPE } from "@src/constants";

import type { Ref } from "react";
import type { goals as Goal, rewards as Reward } from "@prisma/client";
import type { MissionWithRelations } from "types/mission";

interface MissionFormProps {
  onSubmit: (data: any) => void;
  submitRef: Ref<HTMLButtonElement>;
  mission?: MissionWithRelations;
}

type UseList = typeof useList<Partial<Reward>>;

interface RewardFormProps {
  reward: Partial<Reward & { reward_type: REWARD_TYPE }>;
  editReward: ReturnType<UseList>["editItem"];
}

const RewardForm = ({ reward, editReward }: RewardFormProps) => {
  const { data: items, isLoading: itemsLoading } = useSWRImmutable(
    "lookup-items",
    () => fetchData("items", "findMany"),
  );
  const { data: skills, isLoading: skillsLoading } = useSWRImmutable(
    "lookup-skills",
    () => fetchData("skills", "findMany"),
  );
  const { data: magic, isLoading: magicLoading } = useSWRImmutable(
    "lookup-magic",
    () => fetchData("magic", "findMany"),
  );

  if (reward.reward_type === "money") {
    return (
      <div className="max-w-xs">
        <NumberInput
          isRequired
          label="Amount"
          placeholder="Enter amount"
          onValueChange={(v) =>
            editReward("uid", reward.uid, "reward_amount", v)
          }
          defaultValue={reward.reward_amount || undefined}
        />
      </div>
    );
  }

  if (reward.reward_type === "item" && items) {
    const selectedItem = items.find((i) => i.uid === reward.reward_uid);
    return (
      <div className="flex gap-4">
        <Autocomplete
          onSelectionChange={(item) => {
            if (item) {
              editReward("uid", reward.uid, "reward_uid", item.toString());
            }
          }}
          key={`item-select-${reward.uid}`}
          isRequired
          className="flex-1"
          label="Select item"
          isClearable
          isLoading={itemsLoading}
          defaultItems={items}
          defaultSelectedKey={reward.reward_uid || undefined}
        >
          {(item) => (
            <AutocompleteItem key={item.uid}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <NumberInput
          key={`item-qty-${reward.uid}`}
          className="flex-1"
          isRequired
          label="Quantity"
          placeholder="Enter quantity"
          onValueChange={(v) =>
            editReward("uid", reward.uid, "reward_amount", v)
          }
          maxValue={selectedItem ? selectedItem.max_qty : undefined}
          disabled={!!selectedItem === false}
          defaultValue={reward.reward_amount || undefined}
        />
      </div>
    );
  }

  if (reward.reward_type === "magic" && magic) {
    const selectedMagic = magic.find((m) => m.uid === reward.reward_uid);
    return (
      <div className="flex gap-4">
        <Autocomplete
          onSelectionChange={(magic) => {
            if (magic) {
              editReward("uid", reward.uid, "reward_uid", magic.toString());
            }
          }}
          key={`magic-select-${reward.uid}`}
          isRequired
          className="flex-1"
          label="Select magic"
          isClearable
          isLoading={magicLoading}
          defaultItems={magic}
          defaultSelectedKey={reward.reward_uid || undefined}
        >
          {(magic) => (
            <AutocompleteItem key={magic.uid}>{magic.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <NumberInput
          key={`magic-lvl-${reward.uid}`}
          className="flex-1"
          isRequired
          label="Level"
          placeholder="Enter level"
          onValueChange={(v) => editReward("uid", reward.uid, "reward_lvl", v)}
          maxValue={selectedMagic ? selectedMagic.max_lvl : undefined}
          disabled={!!selectedMagic === false}
          defaultValue={reward.reward_lvl || undefined}
        />
      </div>
    );
  }

  if (reward.reward_type === "skill" && skills) {
    const selectedSkill = skills.find((s) => s.uid === reward.reward_uid);
    return (
      <div className="flex gap-4">
        <Autocomplete
          onSelectionChange={(skill) => {
            if (skill) {
              editReward("uid", reward.uid, "reward_uid", skill.toString());
            }
          }}
          key={`skill-select-${reward.uid}`}
          isRequired
          className="flex-1"
          label="Select skill"
          isClearable
          isLoading={skillsLoading}
          defaultItems={skills}
          defaultSelectedKey={reward.reward_uid || undefined}
        >
          {(skill) => (
            <AutocompleteItem key={skill.uid}>{skill.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <NumberInput
          key={`skill-lvl-${reward.uid}`}
          className="flex-1"
          isRequired
          label="Level"
          placeholder="Enter level"
          onValueChange={(v) => editReward("uid", reward.uid, "reward_lvl", v)}
          maxValue={selectedSkill ? selectedSkill.max_lvl : undefined}
          disabled={!!selectedSkill === false}
          defaultValue={reward.reward_lvl || undefined}
        />
      </div>
    );
  }

  return null;
};

const MissionForm = ({ onSubmit, submitRef, mission }: MissionFormProps) => {
  const {
    list: goals,
    add: addGoal,
    remove: removeGoal,
    editItem: editItem,
  } = useList<Partial<Goal>>(mission?.goals);

  const {
    list: rewards,
    add: addReward,
    remove: removeReward,
    editItem: editReward,
  } = useList<Partial<Reward>>(mission?.rewards);

  return (
    <Form
      className="max-h-[60vh] overflow-auto"
      onSubmit={submitHelper((data) => {
        if (goals.length === 0) {
          addToast({
            title: "Goals Missing!",
            description: "At least you need to add one goal",
            variant: "bordered",
            color: "danger",
          });
          return;
        }

        const body = {
          ...data,
          goals,
          rewards: rewards.map((r) => ({
            ...r,
            reward_amount: +(r.reward_amount || 0),
            reward_lvl: +(r.reward_lvl || 0),
          })),
        };

        onSubmit(body);
      })}
    >
      <Input
        isRequired
        name="title"
        label="Title"
        placeholder="Enter mission title"
        defaultValue={mission?.title}
      />
      <Textarea
        isRequired
        name="description"
        label="Description"
        placeholder="Enter mission description"
        defaultValue={mission?.description}
      />
      <div className="grid w-full gap-4 grid-cols-3">
        <Input
          isRequired
          name="type"
          label="Type"
          placeholder="Enter mission type"
          defaultValue={mission?.type}
        />
        <Input
          isRequired
          name="rank"
          label="Rank"
          placeholder="Enter mission rank"
          defaultValue={mission?.rank}
        />
        <NumberInput
          name="xp_reward"
          isRequired
          placeholder="Enter a value"
          defaultValue={mission?.xp_reward || 0}
          label="XP Reward"
        />
      </div>

      {/* Goals Start */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-2xl">Goals</h3>
        {goals.map((goal, i) => (
          <div className="flex px-8 gap-4 items-center" key={goal.uid}>
            <span>{i + 1}.</span>
            <Textarea
              defaultValue={goal.description}
              isRequired
              label="Goal Description"
              onChange={(e) => {
                editItem("uid", goal.uid, "description", e.target.value);
              }}
            />
            <Button onPress={() => removeGoal("uid", goal.uid)} isIconOnly>
              <DeleteIcon />
            </Button>
          </div>
        ))}
        <Button
          onPress={() => {
            const uid = new Date().toISOString();
            addGoal({ uid });
          }}
          startContent={<PlusIcon />}
          className="w-full"
          variant="flat"
        >
          Add Goal
        </Button>
      </div>
      {/* Goals End */}

      {/* Rewards Start */}
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-2xl">Rewards</h3>
        {rewards.map((reward, i) => (
          <div key={reward.uid}>
            <div className="flex gap-4">
              <h3 className="font-bold text-lg mb-4">{i + 1}. Reward</h3>
              <Button
                isIconOnly
                size="sm"
                onPress={() => {
                  removeReward("uid", reward.uid);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
            <div className="mb-4">
              <Select
                onSelectionChange={(type) => {
                  editReward("uid", reward.uid, "reward_type", type.currentKey);
                }}
                className="max-w-xs"
                label="Select reward type"
                isClearable
                isRequired
                defaultSelectedKeys={
                  reward.reward_type ? [reward.reward_type] : undefined
                }
              >
                {Object.values(REWARD_TYPES).map((type) => (
                  <SelectItem key={type}>{capitalize(type)}</SelectItem>
                ))}
              </Select>
            </div>
            {reward.reward_type === REWARD_TYPES.MONEY ||
            !reward.reward_type ? null : (
              <div className="mb-4">
                <Textarea
                  isRequired
                  label="Description"
                  placeholder="Enter reward description"
                  onValueChange={(v) => {
                    editReward("uid", reward.uid, "description", v);
                  }}
                  defaultValue={reward.description || undefined}
                />
              </div>
            )}
            {reward.reward_type ? (
              <RewardForm editReward={editReward} reward={reward as any} />
            ) : null}
            <Divider className="my-4" />
          </div>
        ))}
        <Button
          onPress={() => {
            const uid = new Date().toISOString();
            addReward({ uid });
          }}
          startContent={<PlusIcon />}
          className="w-full"
          variant="flat"
        >
          Add Reward
        </Button>
      </div>
      {/* Rewards End */}

      <button className="hidden" type="submit" ref={submitRef} />
    </Form>
  );
};

export default MissionForm;
