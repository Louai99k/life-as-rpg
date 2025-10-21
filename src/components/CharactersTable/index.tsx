import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button,
} from "@heroui/react";
import useColumns from "./useColumns";
import { lazy, Suspense, useMemo, useState } from "react";
import PlusIcon from "@src/icons/PlusIcon";
import SearchIcon from "@src/icons/SearchIcon";
import CellActions from "./CellActions";
import type { characters as Character } from "@prisma/client";
import useSWR from "swr";
import fetchData from "@src/utils/prisma/fetcher";

const AddCharacterModal = lazy(() => import("./AddCharacterModal"));
const DeleteCharacterModal = lazy(() => import("./DeleteCharacterModal"));
const UpdateCharacterModal = lazy(() => import("./UpdateCharacterModal"));

interface CharactersTableProps {
  onSelect: (c: Character) => void;
}

const CharactersTable = ({ onSelect }: CharactersTableProps) => {
  const { data, isLoading } = useSWR("characters", () =>
    fetchData("characters", "findMany"),
  );
  const columns = useColumns();
  const [filterValue, setFilterValue] = useState<string>("");
  const filteredData = useMemo(() => {
    if (!filterValue || !data) {
      return data;
    }

    return data.filter((c) =>
      c.name.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }, [filterValue, setFilterValue, data]);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [updateModal, setUpdateModal] = useState<Character | null>(null);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={(value) =>
              value ? setFilterValue(value) : setFilterValue("")
            }
          />
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
  }, [filterValue, setFilterValue, addModal, setAddModal]);

  return (
    <>
      <div className="mt-8 px-8">
        <Table
          aria-label="Characters Table"
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
          <TableBody isLoading={isLoading} items={filteredData || []}>
            {(item) => (
              <TableRow
                onClick={() => {
                  onSelect(item);
                }}
                key={item.uid}
              >
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
          <AddCharacterModal onClose={() => setAddModal(false)} />
        ) : null}
        {deleteModal !== null ? (
          <DeleteCharacterModal
            onClose={() => setDeleteModal(null)}
            uid={deleteModal}
          />
        ) : null}
        {updateModal !== null ? (
          <UpdateCharacterModal
            onClose={() => setDeleteModal(null)}
            character={updateModal}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default CharactersTable;
