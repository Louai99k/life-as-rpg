import { Chip } from "@nextui-org/react";
import MasterInfoContext from "@src/context/MasterInfoContext";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";

const CalculateModal = dynamic(() => import("./CalculateModal"));

const Header = () => {
  const { player } = useContext(MasterInfoContext);
  const [calculateModal, setCalculateModal] = useState(false);

  return (
    <div className="flex flex-wrap items-end pt-8 justify-center gap-4">
      <h1 className="text-4xl font-bold w-full md:w-auto text-center">
        Life As RPG
      </h1>
      <Chip
        variant="dot"
        classNames={{
          dot: "animate-fast-pulse",
        }}
        color={player ? "success" : "warning"}
      >
        {player ? "Active" : "Connecting"}
      </Chip>
      <Chip className="cursor-pointer" onClick={() => setCalculateModal(true)}>
        Calculate
      </Chip>
      {calculateModal ? (
        <CalculateModal onClose={() => setCalculateModal(false)} />
      ) : null}
    </div>
  );
};

export default Header;
