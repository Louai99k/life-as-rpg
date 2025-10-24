import {
  addToast,
  Button,
  Form,
  Input,
  NumberInput,
  Textarea,
} from "@heroui/react";
import useList from "@src/hooks/useList";
import submitHelper from "@src/utils/form/submitHelper";
import PlusIcon from "@src/icons/PlusIcon";
import DeleteIcon from "@src/icons/DeleteIcon";

import type { Ref } from "react";
import type { goals as Goal } from "@prisma/client";

interface MissionFormProps {
  onSubmit: (data: any) => void;
  submitRef: Ref<HTMLButtonElement>;
}

const MissionForm = ({ onSubmit, submitRef }: MissionFormProps) => {
  const {
    list: goals,
    add: addGoal,
    remove: removeGoal,
    editItem: editItem,
  } = useList<Partial<Goal>>();

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
        };

        onSubmit(body);
      })}
    >
      <Input
        isRequired
        name="title"
        label="Title"
        placeholder="Enter mission title"
      />
      <Textarea
        isRequired
        name="description"
        label="Description"
        placeholder="Enter mission description"
      />
      <div className="grid w-full gap-4 grid-cols-3">
        <Input
          isRequired
          name="type"
          label="Type"
          placeholder="Enter mission type"
        />
        <Input
          isRequired
          name="rank"
          label="Rank"
          placeholder="Enter mission rank"
        />
        <NumberInput
          name="xp_reward"
          isRequired
          placeholder="Enter a value"
          defaultValue={0}
          label="XP Reward"
        />
      </div>
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
      <button className="hidden" type="submit" ref={submitRef} />
    </Form>
  );
};

export default MissionForm;
