import { Chip } from "@nextui-org/react";
import MasterInfoContext from "@src/context/MasterInfoContext";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import BurgerIcon from "@src/icons/BurgerIcon";

const CalculateModal = dynamic(() => import("./CalculateModal"));
const MobilSidebar = dynamic(() => import("./Sidebar/MobilSidebar"));

const Header = () => {
  const { player } = useContext(MasterInfoContext);
  const [calculateModal, setCalculateModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex md:hidden relative flex-wrap items-end pt-8 justify-center gap-4">
      <div className="absolute top-1 left-2 pt-8">
        <span onClick={() => setOpenSidebar(true)}>
          <BurgerIcon width="2.5rem" height="2.5rem" />
        </span>
      </div>
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
      <MobilSidebar
        translateCSS={openSidebar ? "translate-x-0" : "translate-x-[-100%]"}
        onClose={() => setOpenSidebar(false)}
      />
    </div>
  );
};

export default Header;
