import { useColorScheme } from "react-native";
import { palettes, radii, spacing, type, shadow, fontFamily } from "@/constants/theme";

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const colors = isDark ? palettes.dark : palettes.light;

  return { colors, isDark, spacing, radii, type, shadow, fontFamily };
}
