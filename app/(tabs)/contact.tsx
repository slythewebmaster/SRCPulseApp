import React, { useState } from "react";
import { KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/context/ToastContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { RatingStars } from "@/components/ui/RatingStars";
import { BosphorusLogo } from "@/components/BosphorusLogo";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
import { restaurant } from "@/data/restaurant";

const TOPICS = ["General inquiry", "Order issue", "Reservation", "Feedback"] as const;
type Topic = (typeof TOPICS)[number];

export default function ContactScreen() {
  const { colors, spacing, radii, shadow, fontFamily, type } = useTheme();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();

  const [topic, setTopic] = useState<Topic>("General inquiry");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!message.trim()) nextErrors.message = "Tell us a little about your message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast("Message sent — we'll get back to you shortly");
      setName("");
      setEmail("");
      setMessage("");
    }, 600);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          <ResponsiveContainer maxWidth={700}>
          <View style={{ paddingTop: insets.top + 12, paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
            <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.secondary, letterSpacing: 1.5 }}>
              GET IN TOUCH
            </Text>
            <Text style={[type.h1, { color: colors.text, marginTop: 2 }]}>Contact Us</Text>
          </View>

          <View
            style={[
              styles.infoCard,
              shadow.card,
              { backgroundColor: colors.surface, borderRadius: radii.lg, marginHorizontal: spacing.lg },
            ]}
          >
            <View style={{ alignItems: "center", marginBottom: spacing.sm }}>
              <BosphorusLogo variant="mark" size={56} color={colors.primary} />
            </View>
            <View style={styles.infoHeaderRow}>
              <Text style={[type.h3, { color: colors.text, fontSize: 19 }]}>{restaurant.name}</Text>
              <RatingStars rating={restaurant.rating} reviewCount={restaurant.reviewCount} />
            </View>
            <View style={styles.badgeRow}>
              {restaurant.serviceOptions.map((option) => (
                <Badge key={option} label={option} tone="muted" />
              ))}
            </View>

            <InfoRow icon="location-outline" label={restaurant.addressLine} sub={restaurant.addressLandmark} />
            <InfoRow icon="pin-outline" label={`Plus code: ${restaurant.plusCode}`} />
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={`Call ${restaurant.phoneDisplay}`}
              onPress={() => Linking.openURL(`tel:${restaurant.phoneTel}`)}
            >
              <InfoRow icon="call-outline" label={restaurant.phoneDisplay} interactive />
            </Pressable>
            <InfoRow icon="time-outline" label={restaurant.hoursNote} />

            <View style={styles.actionsRow}>
              <View style={{ flex: 1 }}>
                <Button
                  label="Get directions"
                  variant="outline"
                  icon={<Ionicons name="navigate-outline" size={16} color={colors.primary} />}
                  onPress={() => Linking.openURL(restaurant.mapsQuery)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  label="Order on Bolt"
                  icon={<Ionicons name="bicycle-outline" size={16} color={colors.onPrimary} />}
                  onPress={() => Linking.openURL(restaurant.boltFoodUrl)}
                />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.xl }}>
            <Text style={[type.h3, { color: colors.text }]}>Send us a message</Text>
            <Text style={{ fontFamily: fontFamily.body, fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: spacing.md }}>
              Have an issue with an order, a reservation request, or general feedback? Let us know below.
            </Text>

            <View style={styles.topicRow}>
              {TOPICS.map((option) => {
                const active = topic === option;
                return (
                  <Pressable
                    key={option}
                    accessibilityRole="button"
                    accessibilityLabel={option}
                    accessibilityState={{ selected: active }}
                    onPress={() => setTopic(option)}
                    style={[
                      styles.topicPill,
                      {
                        backgroundColor: active ? colors.primary : colors.surfaceAlt,
                        borderRadius: radii.pill,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: fontFamily.bodySemiBold,
                        fontSize: 12,
                        color: active ? colors.onPrimary : colors.text,
                      }}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={{ marginTop: spacing.md }}>
              <FormField label="Full name" value={name} onChangeText={setName} placeholder="Your name" required error={errors.name} autoComplete="name" textContentType="name" />
              <FormField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                required
                error={errors.email}
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
              />
              <FormField
                label="Message"
                value={message}
                onChangeText={setMessage}
                placeholder={topic === "Order issue" ? "Order number and what went wrong…" : "How can we help?"}
                required
                error={errors.message}
                multiline
              />
            </View>

            <Button label="Send message" onPress={handleSubmit} size="lg" fullWidth loading={submitting} />

            {submitted ? (
              <View style={[styles.successBanner, { backgroundColor: colors.success + "1A", borderRadius: radii.md }]}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.success, flex: 1 }}>
                  Thanks — your message has been sent. We usually reply within one business day.
                </Text>
              </View>
            ) : null}
          </View>
          </ResponsiveContainer>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

function InfoRow({
  icon,
  label,
  sub,
  interactive,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub?: string;
  interactive?: boolean;
}) {
  const { colors, fontFamily } = useTheme();
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={17} color={colors.textMuted} style={{ marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: interactive ? fontFamily.bodySemiBold : fontFamily.bodyMedium,
            fontSize: 14,
            color: interactive ? colors.primary : colors.text,
          }}
        >
          {label}
        </Text>
        {sub ? (
          <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
            {sub}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    padding: 16,
  },
  infoHeaderRow: {
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  topicRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  topicPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    marginTop: 12,
  },
});
