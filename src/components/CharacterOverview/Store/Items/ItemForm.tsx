import { Checkbox, Form, Input, NumberInput, Textarea } from "@heroui/react";
import submitHelper from "@src/utils/form/submitHelper";

import { useState, type Ref } from "react";
import type { items as Item } from "@prisma/client";

interface ItemFormProps {
  onSubmit: (data: any) => void;
  submitRef: Ref<HTMLButtonElement>;
  item?: Item;
}

const ItemForm = ({ onSubmit, submitRef, item }: ItemFormProps) => {
  const [inStore, setInStore] = useState(item ? item.in_store === 1 : true);

  return (
    <Form
      className="max-h-[60vh] overflow-auto"
      onSubmit={submitHelper((data) => {
        onSubmit({
          ...data,
          max_qty: +data.max_qty,
          in_store: inStore ? 1 : 0,
          store_price: +data.store_price || 0,
        });
      })}
    >
      <div className="grid w-full gap-4 grid-cols-2">
        <Input
          isRequired
          name="name"
          label="Name"
          placeholder="Enter item name"
          defaultValue={item?.name}
        />
        <NumberInput
          isRequired
          name="max_qty"
          label="Max Quantity"
          placeholder="Enter item max quantity"
          defaultValue={item?.max_qty}
          maxValue={9999}
        />
      </div>
      <div className="my-4 grid w-full gap-4 grid-cols-2">
        <Checkbox
          defaultSelected={inStore}
          name="in_store"
          onValueChange={setInStore}
        >
          Item in Store?
        </Checkbox>
        {inStore ? (
          <NumberInput
            isRequired
            name="store_price"
            label="Store Price"
            placeholder="Enter item price in store"
            defaultValue={item?.store_price || undefined}
          />
        ) : null}
      </div>
      <Textarea
        isRequired
        name="description"
        label="Description"
        placeholder="Enter item description"
        defaultValue={item?.description}
      />
      <Input
        name="avatar"
        label="Avatar Link"
        placeholder="Enter item avatar link"
        defaultValue={item?.avatar || undefined}
      />
      <button className="hidden" type="submit" ref={submitRef} />
    </Form>
  );
};

export default ItemForm;
