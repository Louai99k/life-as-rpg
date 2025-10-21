import { Chip } from "@heroui/react";

const Header = () => {
  return (
    <div className="flex relative flex-wrap items-end pt-8 justify-center gap-4">
      <h1 className="text-4xl font-bold w-full md:w-auto text-center">
        Life As RPG
      </h1>
      <Chip
        variant="dot"
        classNames={{
          dot: "animate-fast-pulse",
        }}
        color="success"
      >
        Active
      </Chip>
    </div>
  );
};

export default Header;
