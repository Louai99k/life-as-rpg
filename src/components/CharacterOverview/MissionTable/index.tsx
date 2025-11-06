import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Chip,
  Switch,
} from "@heroui/react";
import useColumns from "./useColumns";
import {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PlusIcon from "@src/icons/PlusIcon";
import CellActions from "./CellActions";
import useSWR from "swr";
import fetchData from "@src/utils/prisma/fetcher";
import OverviewContext from "../OverviewContext";
import CheckIcon from "@src/icons/CheckIcon";

import type { MissionWithRelations } from "types/mission";

const AddMissionModal = lazy(() => import("./AddMissionModal"));
const DeleteMissionModal = lazy(() => import("./DeleteMissionModal"));
const UpdateMissionModal = lazy(() => import("./UpdateMissionModal"));
const ProgressMissionModal = lazy(() => import("./ProgressMissionModal"));

const MissionsTable = () => {
  const [hideDone, setHideDone] = useState(true);
  const { character } = useContext(OverviewContext);
  const { data, isLoading, mutate } = useSWR<MissionWithRelations[]>(
    "missions",
    () =>
      fetchData("missions", "findMany", {
        where: {
          character_ref: character.uid,
          ...(hideDone ? { is_completed: 0 } : {}),
        },
      }) as never,
  );
  const columns = useColumns();
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [updateModal, setUpdateModal] = useState<MissionWithRelations | null>(
    null,
  );
  const [progressModal, setProgressModal] =
    useState<MissionWithRelations | null>(null);

  useEffect(() => {
    return () => {
      mutate();
    };
  }, [hideDone]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <span>Missions Table</span>
          <div className="flex gap-3">
            <Switch
              isSelected={hideDone}
              onValueChange={(v) => {
                setHideDone(v);
              }}
            >
              Hide Done
            </Switch>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
              onPress={() => setAddModal(true)}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [addModal, setAddModal, hideDone, setHideDone]);

  return (
    <>
      <div className="mt-8 px-8">
        <Table
          aria-label="Missions Table"
          topContent={topContent}
          classNames={{
            td: "cursor-pointer",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody isLoading={isLoading} items={data || []}>
            {(item) => (
              <TableRow
                onClick={() => {
                  if (item.is_completed === 1) {
                    return;
                  }

                  setProgressModal(item);
                }}
                key={item.uid}
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey !== "actions" ? (
                      getKeyValue(item, columnKey)
                    ) : (
                      <div className="flex items-center gap-2">
                        <CellActions
                          onDelete={() => {
                            setDeleteModal(item.uid);
                          }}
                          onEdit={
                            item.is_completed === 1
                              ? undefined
                              : () => {
                                  setUpdateModal(item);
                                }
                          }
                        />
                        {item.is_completed === 1 ? (
                          <Chip startContent={<CheckIcon />} color="success">
                            Done
                          </Chip>
                        ) : null}
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Suspense>
        {addModal ? (
          <AddMissionModal onClose={() => setAddModal(false)} />
        ) : null}
        {deleteModal !== null ? (
          <DeleteMissionModal
            onClose={() => setDeleteModal(null)}
            uid={deleteModal}
          />
        ) : null}
        {updateModal !== null ? (
          <UpdateMissionModal
            onClose={() => setUpdateModal(null)}
            mission={updateModal}
          />
        ) : null}
        {progressModal !== null ? (
          <ProgressMissionModal
            onClose={() => setProgressModal(null)}
            mission={progressModal}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default MissionsTable;
