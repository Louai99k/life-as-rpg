import { Button, cn } from "@nextui-org/react";
import CloseIcon from "@src/icons/CloseIcon";
import menuItems from "./menuItems";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface MobilSidebarProps {
  onClose: VoidFunction;
  translateCSS: string;
}

const MobilSidebar = ({ onClose, translateCSS }: MobilSidebarProps) => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-screen h-screen bg-black z-50 flex flex-col gap-4 py-4 px-2 transition",
        translateCSS
      )}
    >
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Life As RPG</h3>
        <Button onClick={onClose} size="sm" isIconOnly>
          <CloseIcon />
        </Button>
      </div>
      <Link className="w-full" href="/main">
        <Button
          className="w-full justify-start"
          startContent={
            <div className="relative w-8 h-8 ">
              <Image fill src="/logo.png" alt="" />
            </div>
          }
          variant={pathname === "/main" ? "shadow" : "bordered"}
        >
          Main Page
        </Button>
      </Link>
      {menuItems().map((item, i) => {
        const isActive = pathname === item.link;
        return (
          <Link className="w-full" key={i} href={item.link}>
            <Button
              className="w-full justify-start"
              startContent={item.icon}
              variant={isActive ? "shadow" : "bordered"}
            >
              {item.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default MobilSidebar;
