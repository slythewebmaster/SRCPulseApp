import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Badge } from "@/components/ui/Badge";
import { currency, type MenuItem } from "@/data/menu";

type MenuItemCardProps = {
  item: MenuItem;
  onPress: () => void;
  onAdd: () => void;
};

export function MenuItemCard({ item, onPress, onAdd }: MenuItemCardProps) {
  const { colors, radii, spacing, shadow, fontFamily, type } = useTheme();

  return (
    <View
      style={[
        styles.card,
        shadow.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          marginHorizontal: spacing.lg,
          marginBottom: spacing.md,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View details for ${item.name}, ${currency}${item.price}`}
        onPress={onPress}
        style={({ pressed }) => [styles.infoRow, { opacity: pressed ? 0.85 : 1 }]}
      >
        <Image
          source={{ uri: item.image }}
          style={[styles.image, { borderRadius: radii.md }]}
          contentFit="cover"
          transition={200}
          accessibilityLabel={`Photo of ${item.name}`}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.headerRow}>
            <Text style={[type.h3, { color: colors.text, flex: 1 }]} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[type.price, { color: colors.primary }]}>
              {currency}
              {item.price}
            </Text>
          </View>
          <Text
            style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, lineHeight: 18 }}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          {item.tags?.length ? (
            <View style={styles.tags}>
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} label={tag} tone={tag === "Spicy" ? "secondary" : "muted"} />
              ))}
            </View>
          ) : null}
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Add ${item.name} to cart`}
        hitSlop={8}
        onPress={onAdd}
        style={[styles.addBtn, { backgroundColor: colors.primary, borderRadius: radii.pill }]}
      >
        <Ionicons name="add" size={18} color={colors.onPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    paddingRight: 40,
  },
  image: {
    width: 88,
    height: 88,
    backgroundColor: "#00000010",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  tags: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    marginTop: 8,
  },
  addBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
