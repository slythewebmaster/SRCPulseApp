import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  icon,
  iconPosition = "left",
  fullWidth,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const { colors, radii, fontFamily } = useTheme();
  const isDisabled = disabled || loading;

  const backgrounds: Record<Variant, string> = {
    primary: colors.primary,
    secondary: colors.accent,
    outline: "transparent",
    ghost: "transparent",
  };
  const textColors: Record<Variant, string> = {
    primary: colors.onPrimary,
    secondary: colors.onAccent,
    outline: colors.primary,
    ghost: colors.primary,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled }}
      hitSlop={8}
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: backgrounds[variant],
          borderRadius: radii.pill,
          paddingVertical: size === "lg" ? 16 : 12,
          paddingHorizontal: size === "lg" ? 28 : 20,
          borderWidth: variant === "outline" ? 1.5 : 0,
          borderColor: colors.primary,
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
          width: fullWidth ? "100%" : undefined,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={textColors[variant]} />
        ) : (
          <>
            {icon && iconPosition === "left" ? icon : null}
            <Text
              style={{
                fontFamily: fontFamily.bodySemiBold,
                fontSize: size === "lg" ? 16 : 14,
                color: textColors[variant],
              }}
              numberOfLines={1}
            >
              {label}
            </Text>
            {icon && iconPosition === "right" ? icon : null}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
