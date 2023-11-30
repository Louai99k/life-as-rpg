import { Button, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import clientORM from "@src/lib/clientORM";
import { useContext, useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import cloneDeep from "lodash/cloneDeep";
import MasterInfoContext from "@src/context/MasterInfoContext";
import LockIcon from "@src/icons/LockIcon";

import type { Item } from "@src/types/item";
import UnlockIcon from "@src/icons/UnlockIcon";
import PurchaseModal from "./PurchaseModal";

const UpgradeModal = dynamic(() => import("./UpgradeModal"));

type UpgradeModalState = {
  open: boolean;
};

type PurchaseModalState = {
  open: boolean;
  item: Item | null;
};

const ItemsView = () => {
  const { data: items } = useSWR("items", () =>
    clientORM<Item[]>(`SELECT * FROM "items"`)
  );
  const { player } = useContext(MasterInfoContext);
  const [upgradeModal, setUpgradeModal] = useState<UpgradeModalState>({
    open: false,
  });
  const [purchaseModal, setPurchaseModal] = useState<PurchaseModalState>({
    open: false,
    item: null,
  });

  if (!player) return null;

  return (
    <div className="px-8 gap-4 grid grid-cols-4">
      {items
        ? items.map((item) => {
            const playerItem = player.items.find(
              (el) => el.item_code === item.item_code
            );
            return (
              <Card className="cursor-pointer" key={item.id} radius="lg">
                <CardBody className="space-y-2 p-4">
                  <div className="flex items-center justify-center">
                    {playerItem ? (
                      <UnlockIcon width="100px" height="100px" />
                    ) : (
                      <LockIcon width="100px" height="100px" />
                    )}
                  </div>
                  <div className="flex items-center justify-between cursor-default">
                    <p className="text-lg font-bold">{item.name}</p>
                    {/* Upgrade Or Purchase Buttons */}
                  </div>
                  <ScrollShadow className="h-[100px]">
                    <p className="cursor-default">{item.description}</p>
                  </ScrollShadow>
                </CardBody>
              </Card>
            );
          })
        : null}
      {upgradeModal.open ? (
        <UpgradeModal
          onClose={() => {
            setUpgradeModal({ open: false });
          }}
        />
      ) : null}
      {purchaseModal.open ? (
        <PurchaseModal
          onClose={() => {
            setPurchaseModal({ open: false, item: null });
          }}
          item={purchaseModal.item!}
        />
      ) : null}
    </div>
  );
};

export default ItemsView;
