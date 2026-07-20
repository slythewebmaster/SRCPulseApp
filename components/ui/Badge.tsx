import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type BadgeProps = {
  label: string;
  tone?: "accent" | "secondary" | "success" | "muted";
};

export function Badge({ label, tone = "accent" }: BadgeProps) {
  const { colors, radii, fontFamily } = useTheme();

  const backgrounds: Record<NonNullable<BadgeProps["tone"]>, string> = {
    accent: colors.accent,
    secondary: colors.secondary,
    success: colors.success,
    muted: colors.surfaceAlt,
  };
  const textColors: Record<NonNullable<BadgeProps["tone"]>, string> = {
    accent: colors.onAccent,
    secondary: colors.onSecondary,
    success: "#FFFFFF",
    muted: colors.textMuted,
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: backgrounds[tone], borderRadius: radii.pill },
      ]}
    >
      <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 11, color: textColors[tone] }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
});
