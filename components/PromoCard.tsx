import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import type { Promo } from "@/data/promos";

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = Math.min(screenWidth * 0.78, 320);

type PromoCardProps = {
  promo: Promo;
  onPress: () => void;
};

export function PromoCard({ promo, onPress }: PromoCardProps) {
  const { colors, radii, shadow, fontFamily } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${promo.title}. ${promo.badge}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        shadow.floating,
        { width: CARD_WIDTH, borderRadius: radii.lg, opacity: pressed ? 0.92 : 1 },
      ]}
    >
      <Image source={{ uri: promo.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={200} />
      <LinearGradient
        colors={["transparent", "rgba(11,22,21,0.85)"]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.badge, { backgroundColor: colors.accent, borderRadius: radii.pill }]}>
        <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 11, color: colors.onAccent }}>
          {promo.badge}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={{ fontFamily: fontFamily.displaySemiBold, fontSize: 20, color: "#FFFFFF" }} numberOfLines={2}>
          {promo.title}
        </Text>
        <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: "#F1EEE5", marginTop: 4 }} numberOfLines={1}>
          {promo.validity}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    overflow: "hidden",
    backgroundColor: "#00000015",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  content: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 14,
  },
});
