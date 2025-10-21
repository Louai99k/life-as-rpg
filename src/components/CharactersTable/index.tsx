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
import { Suspense, useMemo, useState } from "react";
import PlusIcon from "@src/icons/Plus";
import SearchIcon from "@src/icons/Search";
import AddCharacterModal from "./AddCharacterModal";

interface CharactersTableProps {}

const CharactersTable = ({}: CharactersTableProps) => {
  const { data, isLoading, refetch } = usePrismaQuery("characters", "findMany");
  const columns = useColumns();
  const [filterValue, setFilterValue] = useState<string>("");
  const [addModal, setAddModal] = useState(false);

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
              <TableColumn
                width={column.key === "name" ? "90%" : undefined}
                key={column.key}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody isLoading={isLoading} items={data || []}>
            {(item) => (
              <TableRow key={item.uid}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
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
      </Suspense>
    </>
  );
};

export default CharactersTable;
