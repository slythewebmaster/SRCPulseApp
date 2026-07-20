import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { EmptyState } from "@/components/ui/EmptyState";
import { currency } from "@/data/menu";

export default function CartScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { lines, subtotal, updateQuantity, removeItem } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingTop: insets.top + 12, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.secondary, letterSpacing: 1.5 }}>
          YOUR ORDER
        </Text>
        <Text style={[type.h1, { color: colors.text, marginTop: 2 }]}>Cart</Text>
      </View>

      {lines.length === 0 ? (
        <EmptyState
          icon="bag-outline"
          title="Your cart is empty"
          message="Browse the menu and add a few dishes to start your order."
          actionLabel="Browse the menu"
          onAction={() => router.push("/(tabs)/menu")}
        />
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            {lines.map((line) => (
              <View
                key={`${line.itemId}-${line.notes ?? ""}`}
                style={[
                  styles.row,
                  shadow.card,
                  { backgroundColor: colors.surface, borderRadius: radii.lg, marginHorizontal: spacing.lg },
                ]}
              >
                <Image
                  source={{ uri: line.image }}
                  style={[styles.image, { borderRadius: radii.md }]}
                  contentFit="cover"
                  accessibilityLabel={`Photo of ${line.name}`}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fontFamily.displaySemiBold, fontSize: 17, color: colors.text }} numberOfLines={1}>
                    {line.name}
                  </Text>
                  {line.notes ? (
                    <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.textMuted, marginTop: 2 }} numberOfLines={1}>
                      Note: {line.notes}
                    </Text>
                  ) : null}
                  <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 14, color: colors.primary, marginTop: 4 }}>
                    {currency}
                    {(line.price * line.quantity).toFixed(2)}
                  </Text>
                  <View style={styles.rowFooter}>
                    <QuantityStepper
                      quantity={line.quantity}
                      onIncrement={() => updateQuantity(line.itemId, line.quantity + 1)}
                      onDecrement={() => updateQuantity(line.itemId, line.quantity - 1)}
                    />
                    <Text
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${line.name} from cart`}
                      onPress={() => removeItem(line.itemId)}
                      style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.danger }}
                    >
                      Remove
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.summary, { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.summaryRow}>
              <Text style={{ fontFamily: fontFamily.body, fontSize: 14, color: colors.textMuted }}>Subtotal</Text>
              <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.text }}>
                {currency}
                {subtotal.toFixed(2)}
              </Text>
            </View>
            <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.textMuted, marginBottom: 12 }}>
              Service fee and delivery details are confirmed at checkout.
            </Text>
            <Button label="Proceed to checkout" size="lg" fullWidth onPress={() => router.push("/checkout")} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: "#00000010",
  },
  rowFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  summary: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});
