import { HeroUIProvider } from "@heroui/react";
import Header from "@src/components/Header";
import { useState } from "react";
import CharactersTable from "@src/components/CharactersTable";
import CharacterOverview from "./components/CharacterOverview";

import type { characters as Character } from "@prisma/client";

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  return (
    <HeroUIProvider>
      <Header />
      {selectedCharacter ? (
        <CharacterOverview
          character={selectedCharacter}
          onBack={() => {
            setSelectedCharacter(null);
          }}
        />
      ) : (
        <CharactersTable
          onSelect={(c) => {
            setSelectedCharacter(c);
          }}
        />
      )}
    </HeroUIProvider>
  );
};

export default App;
