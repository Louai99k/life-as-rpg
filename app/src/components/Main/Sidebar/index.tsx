import menuItems from "./menuItems";
import Logo from "@src/components/UI/Logo";

import type useExpand from "./hooks/useExpand";

type UseExpandReturnType = ReturnType<typeof useExpand>;
interface SidebarProps extends UseExpandReturnType {}

const spanClass = "py-4 rounded border w-full text-center cursor-pointer";

const Sidebar = ({ onExpand, expand, onCollapse }: SidebarProps) => {
  return (
    <div className="flex h-full flex-col justify-between pt-2 px-2 pb-8">
      <div className="flex flex-col w-full items-center gap-2">
        <Logo />
        {menuItems().map((item, i) => (
          <span key={i} className={spanClass}>
            {expand ? item.label : item.label.slice(0, 3)}
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          if (expand) {
            onCollapse();
          } else {
            onExpand();
          }
        }}
      >
        {expand ? "collapse" : "clps"}
      </button>
    </div>
  );
};

export default Sidebar;
