import React from "react";
import { View, type ViewStyle } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";

type ResponsiveContainerProps = {
  children: React.ReactNode;
  maxWidth?: number;
  style?: ViewStyle;
};

/** Centers content and caps its width on tablet/desktop viewports; full-bleed on phones. */
export function ResponsiveContainer({ children, maxWidth = 960, style }: ResponsiveContainerProps) {
  const { isTablet } = useResponsive();

  if (!isTablet) {
    return <View style={style}>{children}</View>;
  }

  return (
    <View style={[{ width: "100%", alignItems: "center" }, style]}>
      <View style={{ width: "100%", maxWidth }}>{children}</View>
    </View>
  );
}
