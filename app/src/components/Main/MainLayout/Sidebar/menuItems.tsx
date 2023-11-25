import ItemsIcon from "@src/icons/ItemsIcon";
import MagicIcon from "@src/icons/MagicIcon";
import MissionsIcon from "@src/icons/MissionsIcon";
import PhysicsIcon from "@src/icons/PhysicsIcon";
import SkillsIcon from "@src/icons/SkillsIcon";

type MenuItem = {
  label: string;
  icon: React.ReactNode;
};

const menuItems = () => {
  const items: MenuItem[] = [
    {
      label: "Missions",
      icon: <MissionsIcon />,
    },
    {
      label: "Skills",
      icon: <SkillsIcon />,
    },
    {
      label: "Magic",
      icon: <MagicIcon />,
    },
    {
      label: "Physics",
      icon: <PhysicsIcon />,
    },
    {
      label: "Items",
      icon: <ItemsIcon />,
    },
  ];

  return items;
};

export default menuItems;
