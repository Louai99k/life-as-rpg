import { HeroUIProvider } from "@heroui/react";
import Header from "@src/components/Header";
import { useState } from "react";
import CharactersTable from "@src/components/CharactersTable";

import type { characters as Character } from "@prisma/client";

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  return (
    <HeroUIProvider>
      <Header />
      {selectedCharacter ? null : <CharactersTable />}
    </HeroUIProvider>
  );
};

export default App;
