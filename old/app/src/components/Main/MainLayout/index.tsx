"use client";

import MasterInfoContext from "@src/context/MasterInfoContext";
import Header from "./Header";
import Resources from "./Resources";
import Sidebar from "./Sidebar";
import useExpand from "./Sidebar/hooks/useExpand";
import useSWR from "swr";
import clientORM from "@src/lib/clientORM";
import { cn } from "@nextui-org/react";

import type { Player } from "@src/types/player";

interface MainLayoutProps extends React.PropsWithChildren {}

const MainLayout = ({ children }: MainLayoutProps) => {
  const UseExpandRet = useExpand();
  const { expand } = UseExpandRet;
  const { data: player } = useSWR("master-info", () =>
    clientORM<Player>(`SELECT * FROM "players" WHERE "is_master" = $1`, {
      params: [true],
      isSingle: true,
    })
  );

  return (
    <MasterInfoContext.Provider value={{ player }}>
      <div className="flex h-screen overflow-auto">
        <div
          className={cn(
            "h-full bg-zinc-900 transition-all hidden md:block",
            expand ? "md:w-1/6" : "md:w-[75px]"
          )}
        >
          <Sidebar {...UseExpandRet} />
        </div>
        <div
          className={cn(
            "transition-all w-full",
            expand ? "md:w-5/6" : "md:w-[calc(100%-75px)]"
          )}
        >
          <Header />
          <Resources />
          {children}
        </div>
      </div>
    </MasterInfoContext.Provider>
  );
};

export default MainLayout;
