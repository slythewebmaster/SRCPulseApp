import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { Button } from "@/components/ui/Button";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
import { promos } from "@/data/promos";

export default function PromosScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const router = useRouter();
  const { highlight } = useLocalSearchParams<{ highlight?: string }>();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Promotions" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <ResponsiveContainer maxWidth={800}>
        <Text
          style={{
            fontFamily: fontFamily.body,
            fontSize: 14,
            color: colors.textMuted,
            paddingHorizontal: spacing.lg,
            marginBottom: spacing.lg,
            lineHeight: 20,
          }}
        >
          Standing offers and seasonal set menus at Bosphorus Restaurant &amp; Cafe. Mention the code when ordering, or apply it at checkout.
        </Text>

        {promos.map((promo) => {
          const isHighlighted = highlight === promo.id;
          return (
            <View
              key={promo.id}
              style={[
                styles.card,
                shadow.card,
                {
                  backgroundColor: colors.surface,
                  borderRadius: radii.lg,
                  marginHorizontal: spacing.lg,
                  marginBottom: spacing.lg,
                  borderWidth: isHighlighted ? 2 : 0,
                  borderColor: colors.accent,
                },
              ]}
            >
              <Image
                source={{ uri: promo.image }}
                style={[styles.image, { borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg }]}
                contentFit="cover"
                transition={200}
                accessibilityLabel={`Promotional photo for ${promo.title}`}
              />
              <View style={{ padding: spacing.md }}>
                <View style={[styles.badge, { backgroundColor: colors.accent, borderRadius: radii.pill }]}>
                  <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 11, color: colors.onAccent }}>
                    {promo.badge}
                  </Text>
                </View>
                <Text style={[type.h3, { color: colors.text, marginTop: 10, fontSize: 20 }]}>{promo.title}</Text>
                <Text style={{ fontFamily: fontFamily.body, fontSize: 14, color: colors.textMuted, marginTop: 6, lineHeight: 20 }}>
                  {promo.detail}
                </Text>
                <View style={styles.metaRow}>
                  <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                  <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 12, color: colors.textMuted }}>
                    {promo.validity}
                  </Text>
                </View>
                {promo.code ? (
                  <View style={styles.metaRow}>
                    <Ionicons name="pricetag-outline" size={14} color={colors.textMuted} />
                    <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 12, color: colors.textMuted }}>
                      Code: {promo.code}
                    </Text>
                  </View>
                ) : null}
                <View style={{ marginTop: spacing.md }}>
                  <Button label="Order now" onPress={() => router.push("/(tabs)/menu")} />
                </View>
              </View>
            </View>
          );
        })}
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#00000010",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
});
