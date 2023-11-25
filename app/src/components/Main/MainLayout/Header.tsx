import { Chip } from "@nextui-org/react";
import MasterInfoContext from "@src/context/MasterInfoContext";
import { useContext } from "react";

const Header = () => {
  const { player } = useContext(MasterInfoContext);

  return (
    <div className="flex items-end pt-8 justify-center gap-4">
      <h1 className="text-4xl font-bold">Life As RPG</h1>
      <Chip
        variant="dot"
        classNames={{
          dot: "animate-fast-pulse",
        }}
        color={player ? "success" : "warning"}
      >
        {player ? "Active" : "Connecting"}
      </Chip>
    </div>
  );
};

export default Header;
