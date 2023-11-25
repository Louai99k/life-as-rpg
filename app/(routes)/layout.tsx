import MainLayout from "@src/components/Main/MainLayout";
import { notFound } from "next/navigation";
import "./globals.css";
import urlGenerator from "@src/utils/urlGenerator";

import type { Player } from "@src/types/player";

interface RootLayoutProps extends React.PropsWithChildren {}

export const metadata = {
  title: "Life As RPG",
};

const getMasterStats = async (): Promise<Player | null> => {
  const res = await fetch(urlGenerator("master-info"), {
    cache: "no-cache",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const data = await getMasterStats();

  if (!data) {
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <MainLayout player={data}>{children}</MainLayout>
      </body>
    </html>
  );
};

export default RootLayout;
