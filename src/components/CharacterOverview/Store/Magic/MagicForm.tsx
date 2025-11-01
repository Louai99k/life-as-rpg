import { Form, Input, NumberInput, Textarea } from "@heroui/react";
import submitHelper from "@src/utils/form/submitHelper";

import type { Ref } from "react";
import type { magic as Magic } from "@prisma/client";

interface MagicFormProps {
  onSubmit: (data: any) => void;
  submitRef: Ref<HTMLButtonElement>;
  magic?: Magic;
}

const MagicForm = ({ onSubmit, submitRef, magic }: MagicFormProps) => {
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
          placeholder="Enter magic name"
          defaultValue={magic?.name}
        />
        <NumberInput
          isRequired
          name="max_lvl"
          label="Max Level"
          placeholder="Enter magic max level"
          defaultValue={magic?.max_lvl}
        />
      </div>
      <Textarea
        isRequired
        name="description"
        label="Description"
        placeholder="Enter magic description"
        defaultValue={magic?.description}
      />
      <Input
        name="avatar"
        label="Avatar Link"
        placeholder="Enter magic avatar link"
        defaultValue={magic?.avatar || undefined}
      />
      <button className="hidden" type="submit" ref={submitRef} />
    </Form>
  );
};

export default MagicForm;
