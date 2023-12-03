import { Button, Card, CardBody, Skeleton, Tooltip } from "@nextui-org/react";
import items from "./items";
import get from "lodash/get";
import { useContext } from "react";
import MasterInfoContext from "@src/context/MasterInfoContext";
import InfoIcon from "@src/icons/InfoIcon";

interface ResourcesProps {}

const Resources = ({}: ResourcesProps) => {
  const { player } = useContext(MasterInfoContext);

  return (
    <div className="md:px-8 mt-8 mx-auto w-[80%] flex justify-center gap-4 flex-wrap">
      {items().map((item, i) => (
        <Card className="basis-[200px] flex-grow" key={i}>
          <CardBody className="flex-row justify-between items-center">
            {player ? (
              "render" in item ? (
                item.render(player)
              ) : (
                <div className="flex gap-1">
                  <span>{item.icon}</span>
                  <span>{item.label}:</span>
                  <strong className="cursor-pointer">
                    {get(player, item.dataIndex)}
                  </strong>
                </div>
              )
            ) : (
              <>
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </>
            )}

            <Tooltip content={item.tooltipContent}>
              <div>
                <InfoIcon />
              </div>
            </Tooltip>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Resources;
