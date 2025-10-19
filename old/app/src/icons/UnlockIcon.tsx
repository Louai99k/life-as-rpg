import type { IconProps } from "@src/types/misc";

const UnlockIcon = ({ height, width }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
    >
      <path
        className="fill-primary"
        d="M12 17q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17Zm-6 5q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h7V6q0-2.075 1.463-3.537T18 1q2.075 0 3.538 1.463T23 6h-2q0-1.25-.875-2.125T18 3q-1.25 0-2.125.875T15 6v2h3q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22H6Z"
      ></path>
    </svg>
  );
};

export default UnlockIcon;
