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
} from "@nextui-org/react";
import clientORM from "@src/lib/clientFetcher";
import { Mission } from "@src/types/mission";
import useSWR from "swr";

const MissionsTable = () => {
  const { data: missions, isLoading } = useSWR("missions", () =>
    clientORM<Mission[]>("SELECT * FROM missions")
  );

  return (
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
                          <div
                            className="flex justify-between gap-8 items-center"
                            key={i}
                          >
                            <span className="w-max max-w-md text-justify">
                              {goal.description}
                            </span>
                            <span>0 / {goal.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default MissionsTable;
