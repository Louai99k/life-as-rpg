import menuItems from "./menuItems";

import type useExpand from "./hooks/useExpand";

type UseExpandReturnType = ReturnType<typeof useExpand>;
interface SidebarProps extends UseExpandReturnType {}

const spanClass = "py-4 rounded border w-full text-center cursor-pointer";

const Sidebar = ({ onExpand, expand, onCollapse }: SidebarProps) => {
  return (
    <div className="flex h-full flex-col justify-between pt-2 px-2 pb-8">
      <div className="flex flex-col w-full items-center gap-2">
        <span className={spanClass}>Logo</span>
        {menuItems().map((item, i) => (
          <span key={i} className={spanClass}>
            {item.label}
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
        collapse
      </button>
    </div>
  );
};

export default Sidebar;
