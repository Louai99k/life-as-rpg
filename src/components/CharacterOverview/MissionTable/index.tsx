import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@heroui/react";
import useColumns from "./useColumns";
import { lazy, Suspense, useMemo, useState } from "react";
import PlusIcon from "@src/icons/PlusIcon";
import CellActions from "./CellActions";
import type { missions as Mission } from "@prisma/client";
import useSWR from "swr";
import fetchData from "@src/utils/prisma/fetcher";

const AddMissionModal = lazy(() => import("./AddMissionModal"));
const DeleteMissionModal = lazy(() => import("./DeleteMissionModal"));
const UpdateMissionModal = lazy(() => import("./UpdateMissionModal"));

const MissionsTable = () => {
  const { data, isLoading } = useSWR("missions", () =>
    fetchData("missions", "findMany"),
  );
  const columns = useColumns();
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [updateModal, setUpdateModal] = useState<Mission | null>(null);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <span>Missions Table</span>
          <div className="flex gap-3">
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
  }, [addModal, setAddModal]);

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
              <TableRow key={item.uid}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey !== "actions" ? (
                      getKeyValue(item, columnKey)
                    ) : (
                      <CellActions
                        onDelete={() => {
                          setDeleteModal(item.uid);
                        }}
                        onEdit={() => {
                          setUpdateModal(item);
                        }}
                      />
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
      </Suspense>
    </>
  );
};

export default MissionsTable;
