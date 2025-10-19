import type { IconProps } from "@src/types/misc";

const LvLPointsIcon = ({ height, width }: IconProps) => {
  return (
    <svg
      width={width || 24}
      height={height || 24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-primary"
        d="M17 16V7H8V5h11v11h-2Zm-5 5v-9H3v-2h11v11h-2Z"
      ></path>
    </svg>
  );
};

export default LvLPointsIcon;
