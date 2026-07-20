import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { usePaymentMethods, type MobileMoneyMethod } from "@/context/PaymentMethodsContext";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";

const NETWORKS: MobileMoneyMethod["network"][] = ["MTN", "Vodafone Cash", "AirtelTigo Money"];

export default function PaymentMethodsScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { methods, addCard, addMobileMoney, removeMethod } = usePaymentMethods();
  const [addMode, setAddMode] = useState<"none" | "card" | "mobile-money">("none");

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const [network, setNetwork] = useState<MobileMoneyMethod["network"]>("MTN");
  const [momoPhone, setMomoPhone] = useState("");
  const [momoError, setMomoError] = useState<string | undefined>();

  const resetForms = () => {
    setCardholderName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardErrors({});
    setMomoPhone("");
    setMomoError(undefined);
    setAddMode("none");
  };

  const handleAddCard = () => {
    const digits = cardNumber.replace(/\D/g, "");
    const nextErrors: Record<string, string> = {};
    if (!cardholderName.trim()) nextErrors.cardholderName = "Enter the name on the card.";
    if (digits.length < 12) nextErrors.cardNumber = "Enter a valid card number.";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) nextErrors.expiry = "Use MM/YY format.";
    if (cvv.length < 3) nextErrors.cvv = "Enter the 3-digit CVV.";
    setCardErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    addCard({ cardholderName, cardNumber, expiry });
    resetForms();
  };

  const handleAddMomo = () => {
    if (momoPhone.replace(/\D/g, "").length < 9) {
      setMomoError("Enter a valid mobile money number.");
      return;
    }
    addMobileMoney({ network, phone: momoPhone });
    resetForms();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenHeader title="Payment Methods" />
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          <ResponsiveContainer maxWidth={640}>
            <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, marginBottom: spacing.md }}>
              Demo only — card and mobile money details are stored on this device for the checkout preview. No real
              payment is ever processed.
            </Text>

            {methods.length === 0 ? (
              <EmptyState
                icon="card-outline"
                title="No saved payment methods"
                message="Add a card or mobile money number to speed up checkout."
              />
            ) : (
              methods.map((method) => (
                <View
                  key={method.id}
                  style={[styles.methodRow, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}
                >
                  <View style={[styles.methodIcon, { backgroundColor: colors.surfaceAlt }]}>
                    <Ionicons
                      name={method.type === "card" ? "card-outline" : "phone-portrait-outline"}
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.text }}>
                      {method.label}
                    </Text>
                    {method.type === "card" ? (
                      <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
                        Expires {method.expiry}
                      </Text>
                    ) : null}
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${method.label}`}
                    hitSlop={8}
                    onPress={() => removeMethod(method.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                  </Pressable>
                </View>
              ))
            )}

            <View style={{ marginTop: spacing.lg }}>
              <Text style={[type.h3, { color: colors.text, marginBottom: spacing.sm }]}>Add a payment method</Text>
              <View style={styles.addRow}>
                <View style={{ flex: 1 }}>
                  <Button
                    label="Add Card"
                    variant={addMode === "card" ? "primary" : "outline"}
                    onPress={() => setAddMode(addMode === "card" ? "none" : "card")}
                    icon={<Ionicons name="card-outline" size={16} color={addMode === "card" ? colors.onPrimary : colors.primary} />}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    label="Add Mobile Money"
                    variant={addMode === "mobile-money" ? "primary" : "outline"}
                    onPress={() => setAddMode(addMode === "mobile-money" ? "none" : "mobile-money")}
                    icon={
                      <Ionicons
                        name="phone-portrait-outline"
                        size={16}
                        color={addMode === "mobile-money" ? colors.onPrimary : colors.primary}
                      />
                    }
                  />
                </View>
              </View>

              {addMode === "card" ? (
                <View style={[styles.form, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
                  <FormField label="Name on card" value={cardholderName} onChangeText={setCardholderName} placeholder="As shown on the card" required error={cardErrors.cardholderName} />
                  <FormField label="Card number" value={cardNumber} onChangeText={setCardNumber} placeholder="1234 5678 9012 3456" required error={cardErrors.cardNumber} keyboardType="number-pad" />
                  <View style={styles.splitRow}>
                    <View style={{ flex: 1 }}>
                      <FormField label="Expiry" value={expiry} onChangeText={setExpiry} placeholder="MM/YY" required error={cardErrors.expiry} keyboardType="number-pad" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <FormField label="CVV" value={cvv} onChangeText={setCvv} placeholder="123" required error={cardErrors.cvv} keyboardType="number-pad" />
                    </View>
                  </View>
                  <Button label="Save Card" onPress={handleAddCard} fullWidth />
                </View>
              ) : null}

              {addMode === "mobile-money" ? (
                <View style={[styles.form, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
                  <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.text, marginBottom: 8 }}>
                    Network
                  </Text>
                  <View style={styles.networkRow}>
                    {NETWORKS.map((n) => {
                      const active = network === n;
                      return (
                        <Pressable
                          key={n}
                          accessibilityRole="button"
                          accessibilityLabel={n}
                          accessibilityState={{ selected: active }}
                          onPress={() => setNetwork(n)}
                          style={[
                            styles.networkPill,
                            { backgroundColor: active ? colors.primary : colors.surfaceAlt, borderRadius: radii.pill },
                          ]}
                        >
                          <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: active ? colors.onPrimary : colors.text }}>
                            {n}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  <FormField label="Mobile money number" value={momoPhone} onChangeText={setMomoPhone} placeholder="e.g. 024 123 4567" required error={momoError} keyboardType="phone-pad" />
                  <Button label="Save Mobile Money" onPress={handleAddMomo} fullWidth />
                </View>
              ) : null}
            </View>
          </ResponsiveContainer>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    marginBottom: 10,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addRow: {
    flexDirection: "row",
    gap: 10,
  },
  form: {
    padding: 16,
    marginTop: 14,
  },
  splitRow: {
    flexDirection: "row",
    gap: 12,
  },
  networkRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  networkPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});
