"use client";

import { SWRConfig } from "swr";
import MagicCategoriesView from "@src/components/Main/Magic/MagicCategoriesView";

import type { MagicCategory } from "@src/types/magic";

interface MagicPageProps {
  categories: MagicCategory[];
}

const MagicPage = ({ categories }: MagicPageProps) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "magic-categories": categories,
        },
      }}
    >
      <div className="px-8 mt-8 mb-4 flex justify-between">
        <h3 className="text-2xl font-bold">Magic Categories:</h3>
      </div>
      <MagicCategoriesView />
    </SWRConfig>
  );
};

export default MagicPage;
