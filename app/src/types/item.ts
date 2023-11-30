export type ItemUpgrade = {
  upgrade_code: string;
  description: string;
  price: number;
  nodes?: ItemUpgrade[];
};

export type Item = {
  id: number;
  name: string;
  description: string;
  item_code: string;
  upgradable: boolean;
  upgrade_tree: [];
  price: number;
};
