import { useMemo } from "react";
import KiIcon from "@src/icons/KiIcon";
import LvLPointsIcon from "@src/icons/LvLPointsIcon";
import MoneyIcon from "@src/icons/MoneyIcon";
import XPIcon from "@src/icons/XPIcon";

import type { characters as Character } from "@prisma/client";

type ItemType = {
  label: string;
  icon: React.ReactNode;
  dataIndex: keyof Character;
};

const useItems = () => {
  const items = useMemo(() => {
    const items: ItemType[] = [];

    items.push(
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
        label: "Level",
        icon: <XPIcon />,
        dataIndex: "lvl",
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
      {
        label: "Max Ki",
        icon: <KiIcon />,
        dataIndex: "max_ki",
      },
    );

    return items;
  }, []);

  return items;
};

export default useItems;
