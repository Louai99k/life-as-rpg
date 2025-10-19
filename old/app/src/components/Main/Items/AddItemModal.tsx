import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";
import clientORM from "@src/lib/clientORM";

import type { Item } from "@src/types/item";
import type { MagicCategory } from "@src/types/magic";

interface AddItemModalProps {
  onClose: VoidFunction;
}

const AddItemModal = ({ onClose }: AddItemModalProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Omit<Item, "id">>();
  const values = watch();
  const { data: magic_categories } = useSWR("magic-categories", () =>
    clientORM<MagicCategory[]>(`SELECT * FROM "magic_categories"`),
  );

  const onSubmit: SubmitHandler<Omit<Item, "id">> = async (data) => {
    setLoading(true);
    const sql = `INSERT INTO "items" ("name", "item_code", "price", "upgradable", "upgrade_tree", "description", "url", "related_magic") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    try {
      await clientORM(sql, {
        params: [
          data.name,
          data.item_code,
          +data.price,
          data.upgradable || false,
          JSON.parse((data.upgrade_tree || "[]") as any),
          data.description,
          data.url,
          data.related_magic,
        ],
      });
    } catch (e) {}

    mutate("items");
    mutate("master-info");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen size="3xl" onClose={onClose}>
      <ModalContent className="max-h-[90vh] overflow-auto">
        {(onClose) => (
          <>
            <ModalHeader>Add An Item</ModalHeader>
            <ModalBody>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-4 flex-wrap md:flex-nowrap">
                  <Input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    isRequired
                    label="Name"
                    placeholder="Type a name"
                    isInvalid={errors.name ? true : false}
                    errorMessage={errors.name?.message as string}
                  />
                  <Input
                    {...register("item_code", {
                      required: "Code is Required",
                    })}
                    isRequired
                    label="Item Code"
                    placeholder="Type a code"
                    isInvalid={errors.item_code ? true : false}
                    errorMessage={errors.item_code?.message as string}
                  />
                </div>
                <div className="flex gap-4 flex-wrap md:flex-nowrap">
                  <Input
                    {...register("price", {
                      required: "Price is required",
                    })}
                    isRequired
                    label="Price"
                    placeholder="Type a price"
                    type="number"
                    isInvalid={errors.price ? true : false}
                    errorMessage={errors.price?.message as string}
                    className="md:w-1/2"
                  />
                  <Checkbox
                    onChange={(e) => {
                      setValue("upgradable", e.target.checked);
                    }}
                  >
                    Upgradable
                  </Checkbox>
                </div>
                {values.upgradable ? (
                  <Textarea
                    {...register("upgrade_tree", {
                      required: "Required Field",
                    })}
                    isRequired
                    label="Upgrade Tree"
                    placeholder="Enter the tree json"
                    isInvalid={errors.upgrade_tree ? true : false}
                    errorMessage={errors.upgrade_tree?.message as string}
                  />
                ) : null}
                <Textarea
                  {...register("description", { required: "Required Field" })}
                  isRequired
                  label="Description"
                  placeholder="Enter your description"
                  isInvalid={errors.description ? true : false}
                  errorMessage={errors.description?.message as string}
                />
                <Input
                  {...register("url", {
                    required: "URL is Required",
                  })}
                  isRequired
                  label="Item Image Link"
                  placeholder="https://...."
                  type="website"
                  isInvalid={errors.url ? true : false}
                  errorMessage={errors.url?.message as string}
                />
                <Select
                  {...register("related_magic", {
                    required: "Related Magic is required",
                  })}
                  isRequired
                  label="Related Magic"
                  placeholder="Select a magic"
                  isInvalid={errors.related_magic ? true : false}
                  errorMessage={errors.related_magic?.message as string}
                >
                  {(magic_categories || []).map((category) => (
                    <SelectItem
                      key={category.category_code}
                      value={category.category_code}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
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

export default AddItemModal;
