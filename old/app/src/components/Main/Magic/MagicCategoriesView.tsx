import { Button, Card, CardBody, ScrollShadow, cn } from "@nextui-org/react";
import clientORM from "@src/lib/clientORM";
import { useContext, useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import cloneDeep from "lodash/cloneDeep";
import MasterInfoContext from "@src/context/MasterInfoContext";
import LockIcon from "@src/icons/LockIcon";
import UnlockIcon from "@src/icons/UnlockIcon";
import calculateMagicPrice from "@src/utils/game/calculateMagicPrice";

import type { MagicCategory } from "@src/types/magic";

const PurchaseModal = dynamic(() => import("./PurchaseModal"));
const SellModal = dynamic(() => import("./SellModal"));

type PurchaseModalState = {
  category: MagicCategory | null;
  open: boolean;
};

const MagicCategoriesView = () => {
  const { data: magic_categories } = useSWR("magic-categories", () =>
    clientORM<MagicCategory[]>(`SELECT * FROM "magic_categories"`)
  );
  const { player } = useContext(MasterInfoContext);
  const [purchaseModal, setPurchaseModal] = useState<PurchaseModalState>({
    category: null,
    open: false,
  });
  const [sellModal, setSellModal] = useState<PurchaseModalState>({
    category: null,
    open: false,
  });

  if (!player) return null;

  const newMagicPrice = calculateMagicPrice(player.magic.length);
  const prevMagicPrice = calculateMagicPrice(player.magic.length - 1);

  return (
    <div className="px-4 md:px-8 gap-4 grid grid-cols-1 md:grid-cols-3">
      {player && magic_categories
        ? magic_categories.map((category) => {
            const playerMagic = player.magic.find(
              (el) => el.category_code === category.category_code
            );
            return (
              <Card className="cursor-pointer" key={category.id} radius="lg">
                <CardBody className="space-y-2 p-4">
                  <div className="flex items-center justify-center">
                    {playerMagic ? (
                      <UnlockIcon width="100px" height="100px" />
                    ) : (
                      <LockIcon width="100px" height="100px" />
                    )}
                  </div>
                  <div className="flex items-center justify-between cursor-default">
                    <p className="text-lg font-bold">{category.name}</p>
                    {playerMagic ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSellModal({
                            open: true,
                            category: cloneDeep(category),
                          });
                        }}
                        color="warning"
                        className={cn(
                          playerMagic.category_code === "time"
                            ? "hidden"
                            : undefined
                        )}
                      >
                        Sell Magic
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => {
                          setPurchaseModal({
                            open: true,
                            category: cloneDeep(category),
                          });
                        }}
                        isDisabled={player.money < newMagicPrice}
                      >
                        Purchase ({newMagicPrice})
                      </Button>
                    )}
                  </div>
                  <ScrollShadow className="h-[150px]">
                    <p className="cursor-default">{category.description}</p>
                  </ScrollShadow>
                </CardBody>
              </Card>
            );
          })
        : null}
      {purchaseModal.open ? (
        <PurchaseModal
          price={newMagicPrice}
          onClose={() => {
            setPurchaseModal({ open: false, category: null });
          }}
          magic={purchaseModal.category!}
        />
      ) : null}
      {sellModal.open ? (
        <SellModal
          price={Math.floor(prevMagicPrice - prevMagicPrice * 0.3)}
          onClose={() => {
            setSellModal({ open: false, category: null });
          }}
          magic={sellModal.category!}
        />
      ) : null}
    </div>
  );
};

export default MagicCategoriesView;
