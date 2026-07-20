import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { BosphorusLogo } from "@/components/BosphorusLogo";
import { currency } from "@/data/menu";
import { restaurant } from "@/data/restaurant";

const ORDER_TYPE_LABEL: Record<string, string> = {
  "dine-in": "Dine-in",
  pickup: "Pickup",
  delivery: "Delivery",
};

export default function OrderConfirmationScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { lastOrder } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (!lastOrder) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", padding: spacing.lg }}>
        <Text style={{ fontFamily: fontFamily.body, color: colors.textMuted, textAlign: "center" }}>
          No recent order found.
        </Text>
        <View style={{ marginTop: spacing.lg }}>
          <Button label="Back to Home" onPress={() => router.replace("/(tabs)")} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: insets.top + spacing.xl, paddingBottom: 40 }}>
        <View style={styles.center}>
          <BosphorusLogo variant="mark" size={48} color={colors.textMuted} />
          <View style={[styles.checkCircle, { backgroundColor: colors.success, marginTop: spacing.md }]}>
            <Ionicons name="checkmark" size={36} color="#FFFFFF" />
          </View>
          <Text style={[type.h1, { color: colors.text, marginTop: spacing.lg, textAlign: "center" }]}>
            Order placed!
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: 14,
              color: colors.textMuted,
              textAlign: "center",
              marginTop: 6,
              maxWidth: 320,
            }}
          >
            Thank you, {lastOrder.customerName.split(" ")[0]}. We&rsquo;ve received your {ORDER_TYPE_LABEL[lastOrder.orderType].toLowerCase()} order and will be in touch at {lastOrder.contactPhone} if needed.
          </Text>
          <View style={[styles.orderNumberPill, { backgroundColor: colors.surfaceAlt, borderRadius: radii.pill }]}>
            <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 16, color: colors.primary, letterSpacing: 1 }}>
              {lastOrder.orderNumber}
            </Text>
          </View>
        </View>

        <View style={[styles.summaryCard, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
          <View style={styles.summaryRow}>
            <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.textMuted }}>ORDER TYPE</Text>
            <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.text }}>
              {ORDER_TYPE_LABEL[lastOrder.orderType]}
            </Text>
          </View>
          {lastOrder.notes ? (
            <View style={styles.summaryRow}>
              <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.textMuted }}>NOTES</Text>
              <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.text, flex: 1, textAlign: "right" }}>
                {lastOrder.notes}
              </Text>
            </View>
          ) : null}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {lastOrder.lines.map((line) => (
            <View key={`${line.itemId}-${line.notes ?? ""}`} style={styles.summaryRow}>
              <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, flex: 1 }} numberOfLines={1}>
                {line.quantity} × {line.name}
              </Text>
              <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.text }}>
                {currency}
                {(line.price * line.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.summaryRow}>
            <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 16, color: colors.text }}>Total paid</Text>
            <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 16, color: colors.primary }}>
              {currency}
              {lastOrder.total.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.textMuted, textAlign: "center", marginTop: 16 }}>
          Questions about your order? Call us at {restaurant.phoneDisplay}.
        </Text>

        <View style={{ marginTop: spacing.xl, gap: 12 }}>
          <Button label="Back to Home" onPress={() => router.replace("/(tabs)")} size="lg" fullWidth />
          <Button label="View menu again" variant="outline" onPress={() => router.replace("/(tabs)/menu")} size="lg" fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  orderNumberPill: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  summaryCard: {
    padding: 16,
    marginTop: 32,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
});
