import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import PlusIcon from "@src/icons/PlusIcon";
import { lazy, Suspense, useContext, useState } from "react";
import ItemCard from "./ItemCard";
import useSWR, { useSWRConfig } from "swr";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import OverviewContext from "../../OverviewContext";
import fetchControllerData from "@src/utils/prisma/fetcher-controller";

import type {
  ItemWithCharacterItem,
  ItemWithCharacterItem_M,
} from "types/controllers/item";

const AddItemModal = lazy(() => import("./AddItemModal"));
const UpdateItemModal = lazy(() => import("./UpdateItemModal"));
const DeleteItemModal = lazy(() => import("./DeleteItemModal"));
const PurchaseItemModal = lazy(() => import("./PurchaseItemModal"));
const SellItemModal = lazy(() => import("./SellItemModal"));

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
  const { mutate: generalMutate } = useSWRConfig();
  const [createCharacterItem, { isLoading: creatingCharacterItem }] =
    usePrismaMutation("character_items", "create");
  const [deleteCharacterItem, { isLoading: deletingCharacterItem }] =
    usePrismaMutation("character_items", "delete");
  const [updateCharacterItem, { isLoading: updatingCharacterItem }] =
    usePrismaMutation("character_items", "update");
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState<ItemWithCharacterItem | null>(
    null,
  );
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [purchasingModal, setPurchasingModal] =
    useState<ItemWithCharacterItem | null>(null);
  const [sellModal, setSellModal] = useState<ItemWithCharacterItem_M | null>(
    null,
  );

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
              selling={deletingCharacterItem}
              onPurchase={() => {
                setPurchasingModal(item);
              }}
              onDelete={() => {
                setDeleteModal(item.uid);
              }}
              onUpdate={() => setUpdateModal(item)}
              onSell={() => {
                setSellModal(item as any);
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
        {purchasingModal ? (
          <PurchaseItemModal
            item={purchasingModal}
            onClose={() => setPurchasingModal(null)}
            onConfirm={(qty) => {
              if (purchasingModal.character_item) {
                updateCharacterItem({
                  data: {
                    qty: purchasingModal.character_item.qty + qty,
                  },
                  where: {
                    uid: purchasingModal.character_item.uid,
                  },
                }).finally(() => {
                  mutate();
                  generalMutate(`characters/${character.uid}`);
                  setPurchasingModal(null);
                });
                return;
              }

              createCharacterItem({
                data: {
                  uid: "",
                  character_ref: character.uid,
                  item_ref: purchasingModal.uid,
                  qty,
                },
              }).finally(() => {
                mutate();
                generalMutate(`characters/${character.uid}`);
                setPurchasingModal(null);
              });
            }}
            purchasing={creatingCharacterItem}
            character={character}
          />
        ) : null}
        {sellModal ? (
          <SellItemModal
            item={sellModal}
            onClose={() => setSellModal(null)}
            onConfirm={(qty) => {
              if (qty >= sellModal.character_item.qty) {
                deleteCharacterItem({
                  where: {
                    uid: sellModal.character_item.uid,
                  },
                }).finally(() => {
                  mutate();
                  generalMutate(`characters/${character.uid}`);
                  setSellModal(null);
                });
                return;
              }

              updateCharacterItem({
                data: {
                  qty: sellModal.character_item.qty - qty,
                },
                where: {
                  uid: sellModal.character_item.uid,
                },
              }).finally(() => {
                mutate();
                generalMutate(`characters/${character.uid}`);
                setSellModal(null);
              });
            }}
            selling={deletingCharacterItem || updatingCharacterItem}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default Items;
