import menuItems from "./menuItems";
import Logo from "@src/components/UI/Logo";
import { Button, Tooltip } from "@nextui-org/react";
import CollapseIcon from "@src/icons/CollapseIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";

import type useExpand from "./hooks/useExpand";

type UseExpandReturnType = ReturnType<typeof useExpand>;
interface SidebarProps extends UseExpandReturnType {}

const Sidebar = ({ onExpand, expand, onCollapse }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col justify-between items-center pt-2 px-2 pb-8">
      <div className="flex flex-col w-full items-center gap-2">
        <Logo />
        {menuItems().map((item, i) => {
          const isActive = pathname === item.link;
          if (expand) {
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
          }
          return (
            <Tooltip placement="right" key={i} content={item.label}>
              <Link href={item.link}>
                <Button variant={isActive ? "shadow" : "bordered"} isIconOnly>
                  {item.icon}
                </Button>
              </Link>
            </Tooltip>
          );
        })}
      </div>
      {expand ? (
        <Button
          className="w-full justify-start"
          startContent={<CollapseIcon />}
          variant="bordered"
          onClick={onCollapse}
        >
          Collapse
        </Button>
      ) : (
        <Tooltip placement="right" content="Collapse">
          <Button onClick={onExpand} isIconOnly>
            <CollapseIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default Sidebar;
