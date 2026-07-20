import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

type ScreenHeaderProps = {
  title: string;
  transparent?: boolean;
  rightSlot?: React.ReactNode;
};

export function ScreenHeader({ title, transparent, rightSlot }: ScreenHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, fontFamily } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 8,
          backgroundColor: transparent ? "transparent" : colors.background,
          borderBottomColor: transparent ? "transparent" : colors.border,
          borderBottomWidth: transparent ? 0 : StyleSheet.hairlineWidth,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={12}
        onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        style={[
          styles.iconBtn,
          { backgroundColor: transparent ? "rgba(12,24,22,0.45)" : colors.surfaceAlt },
        ]}
      >
        <Ionicons name="arrow-back" size={20} color={transparent ? "#FFFFFF" : colors.text} />
      </Pressable>
      <Text
        style={[
          styles.title,
          { color: transparent ? "#FFFFFF" : colors.text, fontFamily: fontFamily.displaySemiBold },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View style={styles.right}>{rightSlot}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 20,
  },
  right: {
    minWidth: 40,
    alignItems: "flex-end",
  },
});
