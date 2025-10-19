export type ItemUpgrade = {
  upgrade_code: string;
  description: string;
  name: string;
  price: string;
  nodes?: ItemUpgrade[];
};

export type Item = {
  id: number;
  name: string;
  description: string;
  item_code: string;
  upgradable: boolean;
  upgrade_tree: ItemUpgrade[];
  price: number;
  url: string;
  related_magic: string;
};
