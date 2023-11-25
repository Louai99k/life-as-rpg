import type { IconProps } from "@src/types/misc";

const PhysicsIcon = ({ height, width }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 14 14"
    >
      <g
        fill="none"
        className="stroke-primary"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="7" cy="2.5" r="2"></circle>
        <path d="M10.5 8a3.5 3.5 0 0 0-7 0v1.5H5l.5 4h3l.5-4h1.5Z"></path>
      </g>
    </svg>
  );
};

export default PhysicsIcon;
