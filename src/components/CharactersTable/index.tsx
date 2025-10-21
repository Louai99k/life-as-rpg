import usePrismaQuery from "@src/hooks/usePrismaQuery";
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
import PlusIcon from "@src/icons/Plus";
import SearchIcon from "@src/icons/Search";
import CellActions from "./CellActions";

const AddCharacterModal = lazy(() => import("./AddCharacterModal"));
const DeleteCharacterModal = lazy(() => import("./DeleteCharacterModal"));

interface CharactersTableProps {}

const CharactersTable = ({}: CharactersTableProps) => {
  const { data, isLoading, refetch } = usePrismaQuery("characters", "findMany");
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
          selectionMode="single"
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
          <AddCharacterModal
            onSuccess={() => {
              refetch();
              setAddModal(false);
            }}
            onClose={() => setAddModal(false)}
          />
        ) : null}
        {deleteModal !== null ? (
          <DeleteCharacterModal
            onDelete={() => {
              refetch();
              setDeleteModal(null);
            }}
            onClose={() => setDeleteModal(null)}
            uid={deleteModal}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default CharactersTable;
