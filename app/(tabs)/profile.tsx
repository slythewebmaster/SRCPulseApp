import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
import { currency } from "@/data/menu";

const ORDER_TYPE_LABEL: Record<string, string> = {
  "dine-in": "Dine-in",
  pickup: "Pickup",
  delivery: "Delivery",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { user, signOut, updateProfile } = useAuth();
  const { orderHistory } = useCart();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  const startEdit = () => {
    setName(user?.name ?? "");
    setPhone(user?.phone ?? "");
    setEditing(true);
  };

  const saveEdit = async () => {
    await updateProfile({ name: name.trim(), phone: phone.trim() || undefined });
    setEditing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <ResponsiveContainer maxWidth={700}>
          <View style={{ paddingTop: insets.top + 12, paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
            <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.secondary, letterSpacing: 1.5 }}>
              YOUR ACCOUNT
            </Text>
            <Text style={[type.h1, { color: colors.text, marginTop: 2 }]}>Profile</Text>
          </View>

          {!user ? (
            <View
              style={[
                styles.card,
                shadow.card,
                { backgroundColor: colors.surface, borderRadius: radii.lg, marginHorizontal: spacing.lg, alignItems: "center" },
              ]}
            >
              <Ionicons name="person-circle-outline" size={48} color={colors.textMuted} />
              <Text style={[type.h3, { color: colors.text, marginTop: spacing.sm, textAlign: "center" }]}>
                You're browsing as a guest
              </Text>
              <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, textAlign: "center", marginTop: 4 }}>
                Sign in to save your details and see your order history.
              </Text>
              <View style={{ marginTop: spacing.md, gap: 10, width: "100%" }}>
                <Button label="Sign In" onPress={() => router.push("/auth/sign-in")} fullWidth />
                <Button label="Create Account" variant="outline" onPress={() => router.push("/auth/sign-up")} fullWidth />
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.card,
                shadow.card,
                { backgroundColor: colors.surface, borderRadius: radii.lg, marginHorizontal: spacing.lg },
              ]}
            >
              {editing ? (
                <View>
                  <FormField label="Full name" value={name} onChangeText={setName} placeholder="Your name" />
                  <FormField label="Phone" value={phone} onChangeText={setPhone} placeholder="Your phone number" keyboardType="phone-pad" />
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={{ flex: 1 }}>
                      <Button label="Cancel" variant="outline" onPress={() => setEditing(false)} fullWidth />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Button label="Save" onPress={saveEdit} fullWidth />
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.profileRow}>
                  <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                    <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 18, color: colors.onPrimary }}>
                      {initials(user.name) || "U"}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fontFamily.displaySemiBold, fontSize: 19, color: colors.text }}>{user.name}</Text>
                    <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{user.email}</Text>
                    {user.phone ? (
                      <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted }}>{user.phone}</Text>
                    ) : null}
                  </View>
                  <Pressable accessibilityRole="button" accessibilityLabel="Edit profile" hitSlop={8} onPress={startEdit}>
                    <Ionicons name="create-outline" size={20} color={colors.primary} />
                  </Pressable>
                </View>
              )}
            </View>
          )}

          <View style={{ marginTop: spacing.lg, paddingHorizontal: spacing.lg }}>
            <Text style={[type.h3, { color: colors.text, marginBottom: spacing.sm }]}>Order history</Text>
            {orderHistory.length === 0 ? (
              <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted }}>
                No orders yet — your placed orders will show up here.
              </Text>
            ) : (
              orderHistory.map((order) => (
                <View
                  key={order.orderNumber + order.placedAt}
                  style={[styles.orderRow, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.md }]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.text }}>
                      {order.orderNumber} · {ORDER_TYPE_LABEL[order.orderType]}
                    </Text>
                    <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
                      {new Date(order.placedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} ·{" "}
                      {order.lines.reduce((sum, l) => sum + l.quantity, 0)} items · {order.paymentMethodLabel}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: fontFamily.bodyBold, fontSize: 14, color: colors.primary }}>
                    {currency}
                    {order.total.toFixed(2)}
                  </Text>
                </View>
              ))
            )}
          </View>

          <View style={{ marginTop: spacing.lg, paddingHorizontal: spacing.lg, gap: 10 }}>
            <ProfileLink icon="card-outline" label="Payment methods" onPress={() => router.push("/payment-methods")} />
            <ProfileLink icon="settings-outline" label="Settings" onPress={() => router.push("/settings")} />
            <ProfileLink icon="call-outline" label="Contact & support" onPress={() => router.push("/contact")} />
            {user ? (
              <ProfileLink icon="log-out-outline" label="Sign out" onPress={signOut} tone="danger" />
            ) : null}
          </View>
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

function ProfileLink({
  icon,
  label,
  onPress,
  tone = "default",
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  tone?: "default" | "danger";
}) {
  const { colors, radii, shadow, fontFamily } = useTheme();
  const color = tone === "danger" ? colors.danger : colors.text;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.linkRow, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.md }]}
    >
      <Ionicons name={icon} size={18} color={color} />
      <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 14, color, flex: 1 }}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
});
