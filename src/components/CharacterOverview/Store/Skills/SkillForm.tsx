import { Form, Input, NumberInput, Textarea } from "@heroui/react";
import submitHelper from "@src/utils/form/submitHelper";

import type { Ref } from "react";
import type { skills as Skill } from "@prisma/client";

interface SkillFormProps {
  onSubmit: (data: any) => void;
  submitRef: Ref<HTMLButtonElement>;
  skill?: Skill;
}

const SkillForm = ({ onSubmit, submitRef, skill }: SkillFormProps) => {
  return (
    <Form
      className="max-h-[60vh] overflow-auto"
      onSubmit={submitHelper((data) => {
        onSubmit({
          ...data,
          max_lvl: +data.max_lvl,
        });
      })}
    >
      <div className="grid w-full gap-4 grid-cols-2">
        <Input
          isRequired
          name="name"
          label="Name"
          placeholder="Enter skill name"
          defaultValue={skill?.name}
        />
        <NumberInput
          isRequired
          name="max_lvl"
          label="Max Level"
          placeholder="Enter skill max level"
          defaultValue={skill?.max_lvl}
        />
      </div>
      <Textarea
        isRequired
        name="description"
        label="Description"
        placeholder="Enter skill description"
        defaultValue={skill?.description}
      />
      <Input
        name="avatar"
        label="Avatar Link"
        placeholder="Enter skill avatar link"
        defaultValue={skill?.avatar || undefined}
      />
      <button className="hidden" type="submit" ref={submitRef} />
    </Form>
  );
};

export default SkillForm;
