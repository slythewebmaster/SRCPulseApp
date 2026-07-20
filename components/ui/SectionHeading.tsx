import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeading({ eyebrow, title, subtitle, actionLabel, onActionPress }: SectionHeadingProps) {
  const { colors, type, spacing, fontFamily } = useTheme();

  return (
    <View style={[styles.row, { marginBottom: spacing.md, paddingHorizontal: spacing.lg }]}>
      <View style={{ flex: 1 }}>
        {eyebrow ? (
          <Text style={[type.eyebrow, { color: colors.secondary, marginBottom: 6 }]}>
            {eyebrow.toUpperCase()}
          </Text>
        ) : null}
        <Text style={[type.h2, { color: colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={{ fontFamily: fontFamily.body, fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onActionPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          hitSlop={8}
          onPress={onActionPress}
          style={styles.action}
        >
          <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.primary }}>
            {actionLabel}
          </Text>
          <Ionicons name="arrow-forward" size={14} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingLeft: 8,
  },
});
