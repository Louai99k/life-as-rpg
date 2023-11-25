export type IconProps<T = any> = T extends any
  ? {
      fill?: string;
      filled?: string;
      size?: string;
      height?: number;
      width?: number;
    }
  : T & {};
