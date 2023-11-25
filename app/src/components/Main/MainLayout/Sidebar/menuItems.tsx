import ItemsIcon from "@src/icons/ItemsIcon";
import MagicIcon from "@src/icons/MagicIcon";
import MissionsIcon from "@src/icons/MissionsIcon";
import PhysicsIcon from "@src/icons/PhysicsIcon";
import SkillsIcon from "@src/icons/SkillsIcon";

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  link: string;
};

const menuItems = () => {
  const items: MenuItem[] = [
    {
      label: "Missions",
      icon: <MissionsIcon />,
      link: "/missions",
    },
    {
      label: "Skills",
      icon: <SkillsIcon />,
      link: "/skills",
    },
    {
      label: "Magic",
      icon: <MagicIcon />,
      link: "/magic",
    },
    {
      label: "Physics",
      icon: <PhysicsIcon />,
      link: "/physics",
    },
    {
      label: "Items",
      icon: <ItemsIcon />,
      link: "/items",
    },
  ];

  return items;
};

export default menuItems;
