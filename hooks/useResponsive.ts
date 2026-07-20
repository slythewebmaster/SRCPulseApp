import { useWindowDimensions } from "react-native";

export const breakpoints = {
  tablet: 768,
  desktop: 1024,
} as const;

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= breakpoints.tablet;
  const isDesktop = width >= breakpoints.desktop;

  return {
    width,
    height,
    isTablet,
    isDesktop,
    columns: isDesktop ? 3 : isTablet ? 2 : 1,
  };
}
