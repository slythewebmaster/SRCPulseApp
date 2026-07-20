import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";
import { BosphorusLogo } from "@/components/BosphorusLogo";

export default function SignInScreen() {
  const { colors, spacing, fontFamily } = useTheme();
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setSubmitting(true);
    const result = await signIn({ email, password });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)/profile");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenHeader title="Sign In" />
        <ScrollView contentContainerStyle={{ padding: spacing.lg }} showsVerticalScrollIndicator={false}>
          <ResponsiveContainer maxWidth={480}>
            <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
              <BosphorusLogo variant="mark" size={56} color={colors.primary} />
              <Text style={{ fontFamily: fontFamily.body, fontSize: 14, color: colors.textMuted, marginTop: spacing.sm, textAlign: "center" }}>
                Sign in to track your orders and save your details.
              </Text>
            </View>

            <FormField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
            />
            {error ? (
              <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.danger, marginBottom: spacing.sm }}>
                {error}
              </Text>
            ) : null}

            <Button label="Sign In" onPress={handleSubmit} size="lg" fullWidth loading={submitting} />

            <View style={{ marginTop: spacing.md, alignItems: "center" }}>
              <Text
                accessibilityRole="link"
                accessibilityLabel="Create an account"
                onPress={() => router.replace("/auth/sign-up")}
                style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.primary }}
              >
                New here? Create an account
              </Text>
            </View>
            <View style={{ marginTop: spacing.md, alignItems: "center" }}>
              <Text
                accessibilityRole="link"
                accessibilityLabel="Continue as guest"
                onPress={() => (router.canGoBack() ? router.back() : router.replace("/(tabs)"))}
                style={{ fontFamily: fontFamily.bodyMedium, fontSize: 13, color: colors.textMuted }}
              >
                Continue as guest
              </Text>
            </View>

            <Text
              style={{
                fontFamily: fontFamily.body,
                fontSize: 11,
                color: colors.textMuted,
                textAlign: "center",
                marginTop: spacing.xl,
              }}
            >
              Demo sign-in — accounts are stored only on this device, not on a real server.
            </Text>
          </ResponsiveContainer>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
