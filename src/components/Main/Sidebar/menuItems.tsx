type MenuItem = {
  label: string;
};

const menuItems = () => {
  const items: MenuItem[] = [
    {
      label: "Skills",
    },
    {
      label: "Magic",
    },
    {
      label: "Physics",
    },
    {
      label: "Items",
    },
  ];

  return items;
};

export default menuItems;
