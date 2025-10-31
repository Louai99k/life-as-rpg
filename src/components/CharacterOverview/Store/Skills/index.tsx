import { Button, Card, CardBody, Skeleton } from "@heroui/react";
import PlusIcon from "@src/icons/PlusIcon";
import { lazy, Suspense, useState } from "react";
import SkillCard from "./SkillCard";
import type { skills as Skill } from "@prisma/client";
import useSWR from "swr";
import fetchData from "@src/utils/prisma/fetcher";

const AddSkillModal = lazy(() => import("./AddSkillModal"));
const UpdateSkillModal = lazy(() => import("./UpdateSkillModal"));
const DeleteSkillModal = lazy(() => import("./DeleteSkillModal"));

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
  const { data: skills, isLoading } = useSWR("skills", () =>
    fetchData("skills", "findMany"),
  );
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState<Skill | null>(null);
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
              onDelete={() => {
                setDeleteModal(skill.uid);
              }}
              onUpdate={() => setUpdateModal(skill)}
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
      </Suspense>
    </>
  );
};

export default Skills;
