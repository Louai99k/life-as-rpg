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
  Pagination,
} from "@nextui-org/react";
import DeleteIcon from "@src/icons/DeleteIcon";
import ProgressIcon from "@src/icons/ProgressIcon";
import clientORM from "@src/lib/clientORM";
import { useState, useMemo } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import cloneDeep from "lodash/cloneDeep";
import CompletedIcon from "@src/icons/CompletedIcon";
import InfoIcon from "@src/icons/InfoIcon";
import RewardIcon from "@src/icons/RewardIcon";

import type { Mission } from "@src/types/mission";

const DeleteModal = dynamic(() => import("./DeleteModal"));
const ProgressModal = dynamic(() => import("./ProgressModal"));

type DeleteModalState = {
  mission: null | Mission;
  open: boolean;
};

type ProgressModalState = {
  mission: null | Mission;
  open: boolean;
};

interface MissionsTableProps {
  showDoneMissions: boolean;
}

const ROWS_PER_PAGE = 10;

const MissionsTable = ({ showDoneMissions }: MissionsTableProps) => {
  const { data: missions = [], isLoading } = useSWR("missions", () =>
    clientORM<Mission[]>(`SELECT * FROM "missions"`)
  );
  const filteredMissions = useMemo(
    () =>
      missions.filter(
        (el) =>
          (showDoneMissions && el.is_completed) ||
          (!showDoneMissions && !el.is_completed)
      ),
    [missions, showDoneMissions]
  );
  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredMissions.length / ROWS_PER_PAGE);
  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return filteredMissions.slice(start, end);
  }, [page, filteredMissions]);

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    mission: null,
    open: false,
  });
  const [progressModal, setProgressModal] = useState<ProgressModalState>({
    mission: null,
    open: false,
  });

  return (
    <>
      <Table
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        aria-label="Missions Table"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn className="hidden md:table-cell">
            Description
          </TableColumn>
          <TableColumn>Progress</TableColumn>
          <TableColumn>Goals</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading && !missions}
          loadingContent={<Spinner />}
          items={items}
        >
          {(mission) => {
            return (
              <TableRow>
                <TableCell>{mission.id}</TableCell>
                <TableCell>{mission.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {mission.description}
                </TableCell>
                <TableCell>% {mission.overall_progress}</TableCell>
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
                          {mission.goals.map((goal, i) => (
                            <div
                              className="flex justify-between gap-4 items-center"
                              key={i}
                            >
                              <p className="w-max max-w-md text-justify">
                                {goal.description}
                              </p>
                              {goal.completed ? (
                                <CompletedIcon />
                              ) : (
                                <InfoIcon />
                              )}
                            </div>
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
                        setDeleteModal({
                          mission: cloneDeep(mission),
                          open: true,
                        });
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
                      }}
                      variant="ghost"
                      isIconOnly
                      isDisabled={mission.is_completed}
                    >
                      <ProgressIcon />
                    </Button>
                  </Tooltip>
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button variant="ghost" isIconOnly>
                        <RewardIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col gap-4 p-4">
                        <p className="w-max max-w-md text-justify">
                          Money Reward: {mission.money_reward}
                        </p>
                        <p className="w-max max-w-md text-justify">
                          XP Reward: {mission.xp_reward}
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {deleteModal.open ? (
        <DeleteModal
          onClose={() => {
            setDeleteModal({ mission: null, open: false });
          }}
          mission={deleteModal.mission as Mission}
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
