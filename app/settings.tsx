import React, { useEffect, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";

const SETTINGS_KEY = "bosphorus.settings.v1";

type Prefs = {
  orderUpdates: boolean;
  promoAlerts: boolean;
};

const DEFAULT_PREFS: Prefs = { orderUpdates: true, promoAlerts: true };

export default function SettingsScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    AsyncStorage.getItem(SETTINGS_KEY)
      .then((stored) => {
        if (stored) setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(stored) });
      })
      .catch(() => {});
  }, []);

  const updatePref = (key: keyof Prefs, value: boolean) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(next)).catch(() => {});
  };

  const confirmDeleteAccount = () => {
    const doDelete = async () => {
      await signOut();
      router.replace("/(tabs)/profile");
    };
    if (Platform.OS === "web") {
      // eslint-disable-next-line no-alert
      if (typeof window !== "undefined" && window.confirm("Delete your account? This can't be undone.")) doDelete();
    } else {
      Alert.alert("Delete account?", "This will sign you out on this device. This can't be undone.", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: doDelete },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Settings" />
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <ResponsiveContainer maxWidth={640}>
          <SectionLabel label="Preferences" />
          <View style={[styles.card, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
            <ToggleRow
              icon="notifications-outline"
              label="Order status updates"
              value={prefs.orderUpdates}
              onChange={(v) => updatePref("orderUpdates", v)}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <ToggleRow
              icon="pricetag-outline"
              label="Promo & offer alerts"
              value={prefs.promoAlerts}
              onChange={(v) => updatePref("promoAlerts", v)}
            />
          </View>

          <SectionLabel label="Account" />
          <View style={[styles.card, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
            <SettingsLink icon="card-outline" label="Payment methods" onPress={() => router.push("/payment-methods")} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingsLink icon="call-outline" label="Contact & support" onPress={() => router.push("/contact")} />
            {user ? (
              <>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <SettingsLink icon="log-out-outline" label="Sign out" onPress={signOut} tone="danger" />
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <SettingsLink icon="trash-outline" label="Delete account" onPress={confirmDeleteAccount} tone="danger" />
              </>
            ) : null}
          </View>

          <SectionLabel label="About" />
          <View style={[styles.card, shadow.card, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
            <View style={styles.aboutRow}>
              <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted }}>Version</Text>
              <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.text }}>
                {Constants.expoConfig?.version ?? "1.0.0"}
              </Text>
            </View>
          </View>

          <Text style={{ fontFamily: fontFamily.body, fontSize: 11, color: colors.textMuted, textAlign: "center", marginTop: spacing.lg }}>
            This is a demo build — preferences are stored on this device only.
          </Text>
        </ResponsiveContainer>
      </ScrollView>
    </View>
  );
}

function SectionLabel({ label }: { label: string }) {
  const { colors, fontFamily, spacing } = useTheme();
  return (
    <Text
      style={{
        fontFamily: fontFamily.bodySemiBold,
        fontSize: 12,
        color: colors.secondary,
        letterSpacing: 1.2,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
      }}
    >
      {label.toUpperCase()}
    </Text>
  );
}

function ToggleRow({
  icon,
  label,
  value,
  onChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const { colors, fontFamily } = useTheme();
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color={colors.text} />
      <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 14, color: colors.text, flex: 1 }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: colors.border }}
        thumbColor="#FFFFFF"
        accessibilityLabel={label}
      />
    </View>
  );
}

function SettingsLink({
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
  const { colors, fontFamily } = useTheme();
  const color = tone === "danger" ? colors.danger : colors.text;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.row}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 14, color, flex: 1 }}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
});
