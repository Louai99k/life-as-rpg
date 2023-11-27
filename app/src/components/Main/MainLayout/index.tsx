"use client";

import MasterInfoContext from "@src/context/MasterInfoContext";
import Header from "./Header";
import Resources from "./Resources";
import Sidebar from "./Sidebar";
import useExpand from "./Sidebar/hooks/useExpand";
import clsx from "clsx";
import useSWR from "swr";
import { Player } from "@src/types/player";
import clientORM from "@src/lib/clientORM";

interface MainLayoutProps extends React.PropsWithChildren {}

const MainLayout = ({ children }: MainLayoutProps) => {
  const UseExpandRet = useExpand();
  const { expand } = UseExpandRet;
  const { data: player } = useSWR("master-info", () =>
    clientORM<Player>("SELECT * FROM players WHERE is_master = ?", {
      params: [1],
      isSingle: true,
    })
  );

  return (
    <MasterInfoContext.Provider value={{ player }}>
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
    </MasterInfoContext.Provider>
  );
};

export default MainLayout;
