import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import PlusIcon from "@src/icons/PlusIcon";
import { lazy, Suspense, useContext, useState } from "react";
import MagicCard from "./MagicCard";
import useSWR from "swr";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import OverviewContext from "../../OverviewContext";
import fetchControllerData from "@src/utils/prisma/fetcher-controller";

import type {
  MagicWithCharacterMagic,
  MagicWithCharacterMagic_M,
} from "types/controllers/magic";

const AddMagicModal = lazy(() => import("./AddMagicModal"));
const UpdateMagicModal = lazy(() => import("./UpdateMagicModal"));
const DeleteMagicModal = lazy(() => import("./DeleteMagicModal"));
const EditCharacterMagicModal = lazy(() => import("./EditCharacterMagicModal"));

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
          <span>Add Magic</span>
          <PlusIcon />
        </Button>
      </CardBody>
    </Card>
  );
};

const Magic = () => {
  const { character } = useContext(OverviewContext);
  const {
    data: magic,
    isLoading,
    mutate,
  } = useSWR("magic", () =>
    fetchControllerData("findMagicWithCharacter", character.uid),
  );
  const [createCharacterMagic, { isLoading: creatingCharacterMagic }] =
    usePrismaMutation("character_magic", "create");
  const [deleteCharacterMagic, { isLoading: deletingCharacterMagic }] =
    usePrismaMutation("character_magic", "delete");
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] =
    useState<MagicWithCharacterMagic | null>(null);
  const [editModal, setEditModal] = useState<MagicWithCharacterMagic_M | null>(
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
          magic?.map((magic) => (
            <MagicCard
              activating={creatingCharacterMagic}
              deactivating={deletingCharacterMagic}
              onActivate={() => {
                createCharacterMagic({
                  data: {
                    uid: "",
                    character_ref: character.uid,
                    magic_ref: magic.uid,
                  },
                }).finally(() => {
                  mutate();
                });
              }}
              onDelete={() => {
                setDeleteModal(magic.uid);
              }}
              onUpdate={() => setUpdateModal(magic)}
              onEdit={() => {
                setEditModal(magic as any);
              }}
              onDeactivate={() => {
                if (!magic.character_magic) {
                  return;
                }

                deleteCharacterMagic({
                  where: {
                    uid: magic.character_magic.uid,
                  },
                }).finally(() => {
                  mutate();
                });
              }}
              key={magic.uid}
              magic={magic}
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
        {addModal ? <AddMagicModal onClose={() => setAddModal(false)} /> : null}
        {updateModal ? (
          <UpdateMagicModal
            magic={updateModal}
            onClose={() => setUpdateModal(null)}
          />
        ) : null}
        {deleteModal ? (
          <DeleteMagicModal
            onClose={() => {
              setDeleteModal(null);
            }}
            uid={deleteModal}
          />
        ) : null}
        {editModal ? (
          <EditCharacterMagicModal
            magic={editModal}
            onClose={() => setEditModal(null)}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default Magic;
