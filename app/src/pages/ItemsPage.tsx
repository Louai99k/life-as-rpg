"use client";

import { SWRConfig } from "swr";
import ItemsView from "@src/components/Main/Items/ItemsView";

import type { Item } from "@src/types/item";
import { Button } from "@nextui-org/react";
import PlusIcon from "@src/icons/PlusIcon";
import { useState } from "react";
import dynamic from "next/dynamic";

const AddItemModal = dynamic(
  () => import("@src/components/Main/Items/AddItemModal")
);

interface ItemsPageProps {
  items: Item[];
}

const ItemsPage = ({ items }: ItemsPageProps) => {
  const [open, setOpen] = useState(false);

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
        <Button onClick={() => setOpen(true)} startContent={<PlusIcon />}>
          Add Item
        </Button>
      </div>
      <ItemsView />
      {open ? <AddItemModal onClose={() => setOpen(false)} /> : null}
    </SWRConfig>
  );
};

export default ItemsPage;
