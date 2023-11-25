import KiIcon from "@src/icons/KiIcon";
import LvLPointsIcon from "@src/icons/LvLPointsIcon";
import MoneyIcon from "@src/icons/MoneyIcon";
import XPIcon from "@src/icons/XPIcon";

import type { Player } from "@src/types/player";

type ItemType = {
  label: string;
  icon: React.ReactNode;
  dataIndex: keyof Player;
};

const items = (): ItemType[] => {
  return [
    {
      label: "Money",
      icon: <MoneyIcon />,
      dataIndex: "money",
    },
    {
      label: "LvL Points",
      icon: <LvLPointsIcon />,
      dataIndex: "lvl_points",
    },
    {
      label: "XP",
      icon: <XPIcon />,
      dataIndex: "xp",
    },
    {
      label: "Ki",
      icon: <KiIcon />,
      dataIndex: "ki",
    },
  ];
};

export default items;
