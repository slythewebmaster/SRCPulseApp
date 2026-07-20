import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  const { colors, spacing, fontFamily, type } = useTheme();

  return (
    <View style={[styles.container, { paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.surfaceAlt }]}>
        <Ionicons name={icon} size={28} color={colors.textMuted} />
      </View>
      <Text style={[type.h3, { color: colors.text, marginTop: spacing.md, textAlign: "center" }]}>{title}</Text>
      <Text
        style={{
          fontFamily: fontFamily.body,
          fontSize: 14,
          color: colors.textMuted,
          textAlign: "center",
          marginTop: 6,
          lineHeight: 20,
        }}
      >
        {message}
      </Text>
      {actionLabel && onAction ? (
        <View style={{ marginTop: spacing.lg }}>
          <Button label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
