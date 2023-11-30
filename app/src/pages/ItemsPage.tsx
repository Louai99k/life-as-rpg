"use client";

import { SWRConfig } from "swr";
import ItemsView from "@src/components/Main/Items/ItemsView";

import type { Item } from "@src/types/item";

interface ItemsPageProps {
  items: Item[];
}

const ItemsPage = ({ items }: ItemsPageProps) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          items,
        },
      }}
    >
      <div className="px-8 mt-8 mb-4 flex justify-between">
        <h3 className="text-2xl font-bold">Items:</h3>
      </div>
      <ItemsView />
    </SWRConfig>
  );
};

export default ItemsPage;
