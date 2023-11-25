import MainPage from "@src/pages/MainPage";
import { notFound } from "next/navigation";

import type { Player } from "@src/types/player";

const getMasterStats = async (): Promise<Player | undefined> => {
  const res = await fetch(
    "http://localhost:3000/api/player-info?isMaster=true",
    {
      cache: "no-cache",
    }
  );

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
