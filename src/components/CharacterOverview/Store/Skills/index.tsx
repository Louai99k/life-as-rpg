import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import PlusIcon from "@src/icons/PlusIcon";
import { lazy, Suspense, useContext, useState } from "react";
import SkillCard from "./SkillCard";
import useSWR from "swr";
import usePrismaMutation from "@src/hooks/usePrismaMutation";
import OverviewContext from "../../OverviewContext";
import fetchControllerData from "@src/utils/prisma/fetcher-controller";

import type {
  SkillWithCharacterSkill,
  SkillWithCharacterSkill_M,
} from "types/controllers/skill";

const AddSkillModal = lazy(() => import("./AddSkillModal"));
const UpdateSkillModal = lazy(() => import("./UpdateSkillModal"));
const DeleteSkillModal = lazy(() => import("./DeleteSkillModal"));
const EditCharacterSkillModal = lazy(() => import("./EditCharacterSkillModal"));

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
          <span>Add Skill</span>
          <PlusIcon />
        </Button>
      </CardBody>
    </Card>
  );
};

const Skills = () => {
  const { character } = useContext(OverviewContext);
  const {
    data: skills,
    isLoading,
    mutate,
  } = useSWR("skills", () =>
    fetchControllerData("findSkillWithCharacter", character.uid),
  );
  const [createCharacterSkill, { isLoading: creatingCharacterSkill }] =
    usePrismaMutation("character_skills", "create");
  const [deleteCharacterSkill, { isLoading: deletingCharacterSkill }] =
    usePrismaMutation("character_skills", "delete");
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] =
    useState<SkillWithCharacterSkill | null>(null);
  const [editModal, setEditModal] = useState<SkillWithCharacterSkill_M | null>(
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
          skills?.map((skill) => (
            <SkillCard
              activating={creatingCharacterSkill}
              deactivating={deletingCharacterSkill}
              onActivate={() => {
                createCharacterSkill({
                  data: {
                    uid: "",
                    character_ref: character.uid,
                    skill_ref: skill.uid,
                  },
                }).finally(() => {
                  mutate();
                });
              }}
              onDelete={() => {
                setDeleteModal(skill.uid);
              }}
              onUpdate={() => setUpdateModal(skill)}
              onEdit={() => {
                setEditModal(skill as any);
              }}
              onDeactivate={() => {
                if (!skill.character_skill) {
                  return;
                }

                deleteCharacterSkill({
                  where: {
                    uid: skill.character_skill.uid,
                  },
                }).finally(() => {
                  mutate();
                });
              }}
              key={skill.uid}
              skill={skill}
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
        {addModal ? <AddSkillModal onClose={() => setAddModal(false)} /> : null}
        {updateModal ? (
          <UpdateSkillModal
            skill={updateModal}
            onClose={() => setUpdateModal(null)}
          />
        ) : null}
        {deleteModal ? (
          <DeleteSkillModal
            onClose={() => {
              setDeleteModal(null);
            }}
            uid={deleteModal}
          />
        ) : null}
        {editModal ? (
          <EditCharacterSkillModal
            skill={editModal}
            onClose={() => setEditModal(null)}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default Skills;
