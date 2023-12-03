import { Button, Card, CardBody, Chip, ScrollShadow } from "@nextui-org/react";
import clientORM from "@src/lib/clientORM";
import { useContext, useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import MasterInfoContext from "@src/context/MasterInfoContext";
import LockIcon from "@src/icons/LockIcon";
import PurchaseModal from "./PurchaseModal";
import Image from "next/image";
import cloneDeep from "lodash/cloneDeep";

import type { Item } from "@src/types/item";
import type { PlayerItem } from "@src/types/player";

const UpgradeModal = dynamic(() => import("./UpgradeModal"));

type UpgradeModalState = {
  open: boolean;
  item: Item | null;
  playerItem: PlayerItem | null;
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
    item: null,
    playerItem: null,
  });
  const [purchaseModal, setPurchaseModal] = useState<PurchaseModalState>({
    open: false,
    item: null,
  });

  if (!player) return null;

  return (
    <div className="px-4 md:px-8 gap-4 grid grid-cols-1 md:grid-cols-4">
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
                      <div className="relative w-full h-[100px]">
                        <Image
                          fill
                          src={item.url}
                          alt="any"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <LockIcon width="100px" height="100px" />
                    )}
                  </div>
                  <div className="flex items-center justify-between cursor-default">
                    <p className="text-lg font-bold">{item.name}</p>
                    {playerItem && item.upgradable ? (
                      <Button
                        onClick={() => {
                          setUpgradeModal({
                            open: true,
                            playerItem: cloneDeep(playerItem),
                            item: cloneDeep(item),
                          });
                        }}
                        size="sm"
                      >
                        Upgrade
                      </Button>
                    ) : !playerItem ? (
                      <Button
                        onClick={() => {
                          setPurchaseModal({
                            item: cloneDeep(item),
                            open: true,
                          });
                        }}
                        size="sm"
                      >
                        Purchase
                      </Button>
                    ) : (
                      <Chip color="secondary" size="sm">
                        Owned
                      </Chip>
                    )}
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
            setUpgradeModal({ open: false, item: null, playerItem: null });
          }}
          item={upgradeModal.item!}
          playerItem={upgradeModal.playerItem!}
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
