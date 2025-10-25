import { createContext } from "react";

import type { characters as Character } from "@prisma/client";

interface OverviewContextType {
  character: Character;
}

const OverviewContext = createContext({} as OverviewContextType);

export default OverviewContext;
