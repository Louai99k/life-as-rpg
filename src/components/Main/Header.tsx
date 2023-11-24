import { Chip } from "@nextui-org/react";

const Header = () => {
  return (
    <div className="flex items-end py-8 justify-center gap-4">
      <h3 className="text-4xl font-bold">Life As RPG</h3>
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
