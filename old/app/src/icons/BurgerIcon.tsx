import type { IconProps } from "@src/types/misc";

const BurgerIcon = ({ height, width }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        className="stroke-primary"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 6h18M3 12h18M3 18h18"
      ></path>
    </svg>
  );
};

export default BurgerIcon;
