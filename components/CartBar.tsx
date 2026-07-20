import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";
import { currency } from "@/data/menu";

export function CartBar() {
  const { itemCount, subtotal } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, radii, shadow, fontFamily } = useTheme();

  if (itemCount === 0) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View order, ${itemCount} items, ${currency}${subtotal.toFixed(2)}`}
      onPress={() => router.push("/(tabs)/cart")}
      style={[
        styles.bar,
        shadow.floating,
        {
          backgroundColor: colors.primary,
          borderRadius: radii.pill,
          bottom: insets.bottom + 78,
        },
      ]}
    >
      <View style={[styles.countPill, { backgroundColor: colors.onPrimary }]}>
        <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 12, color: colors.primary }}>{itemCount}</Text>
      </View>
      <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.onPrimary, flex: 1 }}>
        View order
      </Text>
      <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 14, color: colors.onPrimary }}>
        {currency}
        {subtotal.toFixed(2)}
      </Text>
      <Ionicons name="chevron-forward" size={16} color={colors.onPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  countPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
});
