import { Button, Card, CardBody, Skeleton } from "@nextui-org/react";
import items from "./items";
import get from "lodash/get";
import PlusIcon from "@src/icons/PlusIcon";
import { useContext } from "react";
import MasterInfoContext from "@src/context/MasterInfoContext";

interface ResourcesProps {}

const Resources = ({}: ResourcesProps) => {
  const { player } = useContext(MasterInfoContext);

  return (
    <div className="px-8 mt-8 mx-auto w-[80%] flex justify-center gap-4 flex-wrap">
      {items().map((item, i) => (
        <Card className="basis-[200px] flex-grow" key={i}>
          <CardBody className="flex-row justify-between items-center">
            {player ? (
              <div className="flex gap-1">
                <span>{item.icon}</span>
                <span>{item.label}:</span>
                <strong className="cursor-pointer">
                  {get(player, item.dataIndex)}
                </strong>
              </div>
            ) : (
              <>
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </>
            )}

            <Button isIconOnly>
              <PlusIcon />
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Resources;
