import { createContext } from "react";

import type { Player } from "@src/types/player";

interface MasterInfoContextType {
  player: Player | undefined;
}

const MasterInfoContext = createContext({} as MasterInfoContextType);

export default MasterInfoContext;
