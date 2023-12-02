import KiIcon from "@src/icons/KiIcon";
import LvLPointsIcon from "@src/icons/LvLPointsIcon";
import MoneyIcon from "@src/icons/MoneyIcon";
import XPIcon from "@src/icons/XPIcon";

import type { Player } from "@src/types/player";
import calculateXP from "@src/utils/game/calculateXP";

type ItemType =
  | {
      label: string;
      icon: React.ReactNode;
      dataIndex: "money" | "lvl_points" | "ki";
      tooltipContent: string;
    }
  | {
      render: (player: Player) => React.ReactNode;
      tooltipContent: string;
    };

const items = (): ItemType[] => {
  return [
    {
      label: "Money",
      icon: <MoneyIcon />,
      dataIndex: "money",
      tooltipContent: "Money",
    },
    {
      label: "LvL Points",
      tooltipContent: "LvL Points",
      icon: <LvLPointsIcon />,
      dataIndex: "lvl_points",
    },
    {
      render: (player) => (
        <div className="flex gap-1">
          <span>
            <XPIcon />
          </span>
          <div className="flex flex-col">
            <span>
              Level: <strong className="cursor-pointer">{player.lvl}</strong>
            </span>
            <span className="text-[10px] text-zinc-500">
              XP: {player.xp} / {calculateXP(player.lvl + 1)}
            </span>
          </div>
        </div>
      ),
      tooltipContent: "Level",
    },
    {
      label: "Ki",
      tooltipContent: "Ki",
      icon: <KiIcon />,
      dataIndex: "ki",
    },
  ];
};

export default items;
