"use client";

import Header from "./Header";
import Resources from "./Resources";
import Sidebar from "./Sidebar";
import useExpand from "./Sidebar/hooks/useExpand";
import clsx from "clsx";
import { SWRConfig } from "swr";

import type { Player } from "@src/types/player";

interface MainLayoutProps extends React.PropsWithChildren {
  player: Player;
}

const MainLayout = ({ player, children }: MainLayoutProps) => {
  const UseExpandRet = useExpand();
  const { expand } = UseExpandRet;

  return (
    <SWRConfig
      value={{
        fallback: {
          "master-info": player,
        },
      }}
    >
      <div className="flex h-screen">
        <div
          className={clsx(
            "h-full bg-zinc-900 transition-all",
            expand ? "w-1/6" : "w-[75px]"
          )}
        >
          <Sidebar {...UseExpandRet} />
        </div>
        <div
          className={clsx(
            "transition-all",
            expand ? "w-5/6" : "w-[calc(100%-75px)]"
          )}
        >
          <Header />
          <Resources />
          {children}
        </div>
      </div>
    </SWRConfig>
  );
};

export default MainLayout;
