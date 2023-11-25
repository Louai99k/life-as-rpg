import MainPage from "@src/pages/MainPage";
import { notFound } from "next/navigation";
import urlGenerator from "@src/utils/urlGenerator";

import type { Player } from "@src/types/player";

const getMasterStats = async (): Promise<Player | null> => {
  const res = await fetch(urlGenerator("master-info"), {
    cache: "no-cache",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
};

const Page = async () => {
  const data = await getMasterStats();

  if (!data) {
    notFound();
  }

  return <MainPage player={data} />;
};

export default Page;
