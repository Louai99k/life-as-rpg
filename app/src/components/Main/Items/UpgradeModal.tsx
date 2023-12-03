import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  cn,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import MasterInfoContext from "@src/context/MasterInfoContext";

import type { Item, ItemUpgrade } from "@src/types/item";
import type { PlayerItem } from "@src/types/player";
import clientORM from "@src/lib/clientORM";
import { useSWRConfig } from "swr";

interface UpgradeModalProps {
  onClose: VoidFunction;
  item: Item;
  playerItem: PlayerItem;
}

type UpgradesState = (
  | { price: number; upgrade_code: string }
  | { upgrade_code: string; upgraded: true }
)[];

const UpgradeModal = ({ onClose, playerItem, item }: UpgradeModalProps) => {
  const [loading, setLoading] = useState(false);
  const [upgrades, setUpgrades] = useState<UpgradesState>(
    playerItem.upgrades.map((el) => ({ ...el, upgraded: true }))
  );
  const { mutate } = useSWRConfig();
  const { player } = useContext(MasterInfoContext);

  if (!player) return null;

  const finalPrice = upgrades.reduce((finalPrice, upgrade) => {
    if ("price" in upgrade) return finalPrice + upgrade.price;
    return finalPrice;
  }, 0);

  const handleSubmit = async () => {
    setLoading(true);

    const sql = `UPDATE "players" SET "money" = $1, "items" = $2 WHERE "id" = $3`;

    const newItems = player.items.map((pItem) => {
      if (pItem.item_code === item.item_code) {
        return {
          ...pItem,
          upgrades: upgrades.map((upgrade) => ({
            upgrade_code: upgrade.upgrade_code,
          })),
        };
      }
      return pItem;
    });

    try {
      await clientORM(sql, {
        params: [player.money - finalPrice, newItems, player.id],
      });
    } catch (error) {}

    mutate("master-info");
    setLoading(false);
    onClose();
  };

  const renderNodes = (
    nodes: ItemUpgrade[],
    level = 1,
    levelUnlocked = true
  ) => {
    return nodes.map((node, i) => {
      const prevNode = nodes[i - 1] || null;
      let upgradable = false;
      if (level === 1 && !prevNode) {
        upgradable = true;
      } else if (level === 1 && prevNode) {
        const prevPlayerItemUpgrade = upgrades.find(
          (el) => el.upgrade_code === prevNode.upgrade_code
        );
        upgradable = Boolean(prevPlayerItemUpgrade);
      } else if (level !== 1) {
        upgradable = levelUnlocked;
      }
      const isLast = i === nodes.length - 1;
      const drawLine = (level === 1 && !isLast) || node.nodes;
      const playerItemUpgrade = upgrades.find(
        (el) => el.upgrade_code === node.upgrade_code
      );
      return (
        <div
          key={node.upgrade_code}
          className={`w-full flex items-center flex-col basis-1/${nodes.length}`}
        >
          <Tooltip content={node.description}>
            <div>
              <Checkbox
                classNames={{
                  wrapper: "hidden",
                  base: cn(
                    "rounded border transition",
                    playerItemUpgrade
                      ? "border-content2 border-primary bg-primary-50 cursor-default pointer-events-none"
                      : "border-content2 hover:border-primary hover:bg-primary-50"
                  ),
                }}
                isDisabled={!upgradable}
                onChange={(e) => {
                  if (e.target.checked) {
                    setUpgrades((prev) => [
                      ...prev,
                      { upgrade_code: node.upgrade_code, price: +node.price },
                    ]);
                  } else {
                    setUpgrades((prev) =>
                      prev.filter((el) => el.upgrade_code !== node.upgrade_code)
                    );
                  }
                }}
              >
                {node.name}
              </Checkbox>
            </div>
          </Tooltip>
          {drawLine ? (
            <div className="w-[4px] rounded bg-zinc-600 h-12 my-2" />
          ) : null}
          {node.nodes ? (
            <div className="w-full flex justify-center">
              {renderNodes(node.nodes, level + 1, Boolean(playerItemUpgrade))}
            </div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <Modal scrollBehavior="inside" isOpen size="5xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Upgrade Item</ModalHeader>
            <ModalBody className="w-screen md:w-auto">
              <div className="min-w-[500px]">
                {renderNodes(item.upgrade_tree)}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                color="warning"
                onPress={handleSubmit}
                isDisabled={finalPrice === 0 || finalPrice > player.money}
              >
                Upgrade{finalPrice > 0 ? ` (${finalPrice})` : ""}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpgradeModal;
