import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart, type OrderType } from "@/context/CartContext";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { currency } from "@/data/menu";

const ORDER_TYPES: Array<{ id: OrderType; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { id: "dine-in", label: "Dine-in", icon: "restaurant-outline" },
  { id: "pickup", label: "Pickup", icon: "walk-outline" },
  { id: "delivery", label: "Delivery", icon: "bicycle-outline" },
];

export default function CheckoutScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { lines, subtotal, placeOrder } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const serviceFee = useMemo(() => Math.round(subtotal * 0.05 * 100) / 100, [subtotal]);
  const total = useMemo(() => Math.round((subtotal + serviceFee) * 100) / 100, [subtotal, serviceFee]);

  if (lines.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenHeader title="Checkout" />
        <EmptyState
          icon="bag-outline"
          title="Nothing to check out"
          message="Add a few dishes to your cart before checking out."
          actionLabel="Browse the menu"
          onAction={() => router.replace("/(tabs)/menu")}
        />
      </View>
    );
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!phone.trim()) nextErrors.phone = "Please enter a phone number so we can reach you.";
    else if (phone.trim().replace(/[^0-9]/g, "").length < 9) nextErrors.phone = "Enter a valid phone number.";
    if (orderType === "delivery" && !address.trim()) nextErrors.address = "Please enter a delivery address.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    const combinedNotes = orderType === "delivery" && address.trim() ? `Deliver to: ${address.trim()}${notes ? ` — ${notes}` : ""}` : notes || undefined;
    setTimeout(() => {
      placeOrder({ orderType, customerName: name.trim(), contactPhone: phone.trim(), notes: combinedNotes });
      setSubmitting(false);
      router.replace("/order-confirmation");
    }, 600);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenHeader title="Checkout" />
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
          <Text style={[type.h3, { color: colors.text, marginBottom: 10 }]}>How would you like your order?</Text>
          <View style={styles.orderTypeRow}>
            {ORDER_TYPES.map((option) => {
              const active = orderType === option.id;
              return (
                <Pressable
                  key={option.id}
                  accessibilityRole="button"
                  accessibilityLabel={option.label}
                  accessibilityState={{ selected: active }}
                  onPress={() => setOrderType(option.id)}
                  style={[
                    styles.orderTypeCard,
                    shadow.card,
                    {
                      backgroundColor: active ? colors.primary : colors.surface,
                      borderRadius: radii.md,
                    },
                  ]}
                >
                  <Ionicons name={option.icon} size={20} color={active ? colors.onPrimary : colors.text} />
                  <Text
                    style={{
                      fontFamily: fontFamily.bodySemiBold,
                      fontSize: 12,
                      color: active ? colors.onPrimary : colors.text,
                      marginTop: 6,
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={{ marginTop: spacing.lg }}>
            <FormField
              label="Full name"
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              required
              error={errors.name}
              autoComplete="name"
              textContentType="name"
            />
            <FormField
              label="Phone number"
              value={phone}
              onChangeText={setPhone}
              placeholder="e.g. 020 123 4567"
              required
              error={errors.phone}
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
            {orderType === "delivery" ? (
              <FormField
                label="Delivery address"
                value={address}
                onChangeText={setAddress}
                placeholder="Street, area, landmark"
                required
                error={errors.address}
              />
            ) : null}
            <FormField
              label="Notes (optional)"
              value={notes}
              onChangeText={setNotes}
              placeholder={orderType === "dine-in" ? "Table preference, allergies…" : "Any other details…"}
              multiline
            />
          </View>

          <View style={[styles.summaryCard, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
            <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.text, marginBottom: 10 }}>
              Order summary ({lines.reduce((sum, l) => sum + l.quantity, 0)} items)
            </Text>
            {lines.map((line) => (
              <View key={`${line.itemId}-${line.notes ?? ""}`} style={styles.summaryLine}>
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
            <View style={styles.summaryLine}>
              <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted }}>Subtotal</Text>
              <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.text }}>
                {currency}
                {subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted }}>Service fee (5%)</Text>
              <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.text }}>
                {currency}
                {serviceFee.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.summaryLine, { marginTop: 4 }]}>
              <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 16, color: colors.text }}>Total</Text>
              <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 16, color: colors.primary }}>
                {currency}
                {total.toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.textMuted, marginTop: 12, textAlign: "center" }}>
            This is a demo checkout — no payment is processed. Pay in person or via cash/card {orderType === "delivery" ? "on delivery" : "at the counter"}.
          </Text>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: insets.bottom + 12 }]}>
          <Button label={`Place order — ${currency}${total.toFixed(2)}`} onPress={handleSubmit} size="lg" fullWidth loading={submitting} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  orderTypeRow: {
    flexDirection: "row",
    gap: 10,
  },
  orderTypeCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  summaryCard: {
    padding: 16,
    marginTop: 24,
  },
  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
