import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import PlusIcon from "@src/icons/PlusIcon";
import { lazy, Suspense, useContext, useState } from "react";
import ItemCard from "./ItemCard";
import useSWR from "swr";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import OverviewContext from "../../OverviewContext";
import fetchControllerData from "@src/utils/prisma/fetcher-controller";

import type { ItemWithCharacterItem } from "types/controllers/item";

const AddItemModal = lazy(() => import("./AddItemModal"));
const UpdateItemModal = lazy(() => import("./UpdateItemModal"));
const DeleteItemModal = lazy(() => import("./DeleteItemModal"));

interface AddButtonProps {
  onPress: VoidFunction;
}

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <Card>
      <CardBody>
        <Button
          onPress={onPress}
          className="w-full flex flex-col min-h-card-height h-full"
        >
          <span>Add Item</span>
          <PlusIcon />
        </Button>
      </CardBody>
    </Card>
  );
};

const Items = () => {
  const { character } = useContext(OverviewContext);
  const {
    data: items,
    isLoading,
    mutate,
  } = useSWR("items", () =>
    fetchControllerData("findItemWithCharacter", character.uid),
  );
  const [createCharacterItem, { isLoading: creatingCharacterItem }] =
    usePrismaMutation("character_items", "create");
  const [deleteCharacterItem, { isLoading: deletingCharacterItem }] =
    usePrismaMutation("character_items", "delete");
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState<ItemWithCharacterItem | null>(
    null,
  );
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading ? (
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
        ) : (
          items?.map((item) => (
            <ItemCard
              purchasing={creatingCharacterItem}
              selling={deletingCharacterItem}
              onPurchase={() => {
                createCharacterItem({
                  data: {
                    uid: "",
                    character_ref: character.uid,
                    item_ref: item.uid,
                  },
                }).finally(() => {
                  mutate();
                });
              }}
              onDelete={() => {
                setDeleteModal(item.uid);
              }}
              onUpdate={() => setUpdateModal(item)}
              onSell={() => {
                if (!item.character_item) {
                  return;
                }

                deleteCharacterItem({
                  where: {
                    uid: item.character_item.uid,
                  },
                }).finally(() => {
                  mutate();
                });
              }}
              key={item.uid}
              item={item}
            />
          ))
        )}
        <AddButton
          onPress={() => {
            setAddModal(true);
          }}
        />
      </div>
      <Suspense>
        {addModal ? <AddItemModal onClose={() => setAddModal(false)} /> : null}
        {updateModal ? (
          <UpdateItemModal
            item={updateModal}
            onClose={() => setUpdateModal(null)}
          />
        ) : null}
        {deleteModal ? (
          <DeleteItemModal
            onClose={() => {
              setDeleteModal(null);
            }}
            uid={deleteModal}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default Items;
