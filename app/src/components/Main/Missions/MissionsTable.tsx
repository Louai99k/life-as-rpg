import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Tooltip,
} from "@nextui-org/react";
import DeleteIcon from "@src/icons/DeleteIcon";
import ProgressIcon from "@src/icons/ProgressIcon";
import clientORM from "@src/lib/clientORM";
import { Mission } from "@src/types/mission";
import { useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import cloneDeep from "lodash/cloneDeep";

const DeleteModal = dynamic(() => import("./DeleteModal"));
const ProgressModal = dynamic(() => import("./ProgressModal"));

type DeleteModalState = {
  id: null | number;
  open: boolean;
};

type ProgressModalState = {
  mission: null | Mission;
  open: boolean;
};

const MissionsTable = () => {
  const { data: missions, isLoading } = useSWR("missions", () =>
    clientORM<Mission[]>("SELECT * FROM missions")
  );

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    id: null,
    open: false,
  });

  const [progressModal, setProgressModal] = useState<ProgressModalState>({
    mission: null,
    open: false,
  });

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Progress</TableColumn>
          <TableColumn>Goals</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading && !missions}
          loadingContent={<Spinner />}
          items={missions!}
        >
          {(mission) => {
            const parsedGoals = JSON.parse(
              mission.goals as any
            ) as Mission["goals"];
            return (
              <TableRow>
                <TableCell>{mission.id}</TableCell>
                <TableCell>{mission.name}</TableCell>
                <TableCell>{mission.description}</TableCell>
                <TableCell>{mission.overall_progress}</TableCell>
                <TableCell>
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button>See Goals</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="pt-2">
                        <p>
                          <strong>Goals:</strong>
                        </p>
                        <div className="flex flex-col gap-2 py-4">
                          {parsedGoals.map((goal, i) => (
                            <p key={i} className="w-max max-w-md text-justify">
                              {goal.description}
                            </p>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className="flex gap-4">
                  <Tooltip content="Delete this mission with all it's progress">
                    <Button
                      onClick={() => {
                        setDeleteModal({ id: mission.id, open: true });
                      }}
                      variant="ghost"
                      isIconOnly
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Change the progress of this mission">
                    <Button
                      onClick={() => {
                        setProgressModal({
                          mission: cloneDeep(mission),
                          open: true,
                        });
                        console.log(mission);
                      }}
                      variant="ghost"
                      isIconOnly
                    >
                      <ProgressIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {deleteModal.open ? (
        <DeleteModal
          onClose={() => {
            setDeleteModal({ id: null, open: false });
          }}
          missionId={deleteModal.id as number}
        />
      ) : null}
      {progressModal.open ? (
        <ProgressModal
          onClose={() => {
            setProgressModal({ mission: null, open: false });
          }}
          mission={progressModal.mission as Mission}
        />
      ) : null}
    </>
  );
};

export default MissionsTable;
