import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  size?: number;
};

export function RatingStars({ rating, reviewCount, size = 14 }: RatingStarsProps) {
  const { colors, fontFamily } = useTheme();
  const stars = [0, 1, 2, 3, 4];
  const label =
    reviewCount != null
      ? `Rated ${rating} out of 5 from ${reviewCount.toLocaleString()} reviews`
      : `Rated ${rating} out of 5`;

  return (
    <View style={styles.row} accessible accessibilityLabel={label}>
      {stars.map((index) => {
        const filled = rating >= index + 1;
        const half = !filled && rating > index && rating < index + 1;
        return (
          <Ionicons
            key={index}
            name={filled ? "star" : half ? "star-half" : "star-outline"}
            size={size}
            color={colors.star}
          />
        );
      })}
      <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: size - 1, color: colors.text, marginLeft: 4 }}>
        {rating.toFixed(1)}
      </Text>
      {reviewCount != null ? (
        <Text style={{ fontFamily: fontFamily.body, fontSize: size - 1, color: colors.textMuted }}>
          ({reviewCount.toLocaleString()})
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
