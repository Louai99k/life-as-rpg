import { Button, Card, CardBody } from "@heroui/react";
import { lazy, Suspense, useContext, useState } from "react";
import get from "lodash/get";
import OverviewContext from "../OverviewContext";
import useItems from "./useItems";
import EditIcon from "@src/icons/EditIcon";

import type { characters as Character } from "@prisma/client";

const ResourceEditModal = lazy(() => import("./ResourceEditModal"));

interface ModalState {
  character: Character;
  resource: "money" | "lvl" | "lvl_points" | "ki" | "max_ki" | "xp";
}

const Resources = () => {
  const { character } = useContext(OverviewContext);
  const items = useItems();
  const [resourceModal, setResourceModal] = useState<ModalState | null>(null);

  return (
    <>
      <div className="mt-8 mx-auto px-4 md:px-8 w-full md:w-[90%] flex justify-center gap-4 flex-wrap">
        {items.map((item, i) => (
          <Card className="basis-[400px] max-w-1/2 flex-grow" key={i}>
            <CardBody className="flex-row justify-between items-center">
              <div className="flex items-center gap-1">
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}:</span>
                <strong className="text-sm">
                  {get(character, item.dataIndex)}
                </strong>
              </div>
              <Button
                onPress={() => {
                  if (!character) {
                    return;
                  }
                  setResourceModal({
                    character,
                    resource: item.dataIndex as any,
                  });
                }}
                size="sm"
                variant="flat"
                isIconOnly
              >
                <EditIcon className="text-primary-300 text-lg" />
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <Suspense>
        {resourceModal ? (
          <ResourceEditModal
            character={resourceModal.character}
            resource={resourceModal.resource}
            onClose={() => setResourceModal(null)}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default Resources;
