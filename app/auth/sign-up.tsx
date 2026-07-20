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

export default function SignUpScreen() {
  const { colors, spacing, fontFamily } = useTheme();
  const { signUp } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Please choose a password.";
    else if (password.length < 6) nextErrors.password = "Use at least 6 characters.";
    if (confirmPassword !== password) nextErrors.confirmPassword = "Passwords don't match.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    const result = await signUp({ name, email, password, phone: phone || undefined });
    setSubmitting(false);
    if (!result.ok) {
      setErrors({ email: result.error });
      return;
    }
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)/profile");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScreenHeader title="Create Account" />
        <ScrollView contentContainerStyle={{ padding: spacing.lg }} showsVerticalScrollIndicator={false}>
          <ResponsiveContainer maxWidth={480}>
            <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
              <BosphorusLogo variant="mark" size={56} color={colors.primary} />
              <Text style={{ fontFamily: fontFamily.body, fontSize: 14, color: colors.textMuted, marginTop: spacing.sm, textAlign: "center" }}>
                Save your details for faster checkout next time.
              </Text>
            </View>

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
              label="Phone (optional)"
              value={phone}
              onChangeText={setPhone}
              placeholder="e.g. 020 123 4567"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
            <FormField label="Password" value={password} onChangeText={setPassword} placeholder="At least 6 characters" required error={errors.password} />
            <FormField label="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Re-enter your password" required error={errors.confirmPassword} />

            <Button label="Create Account" onPress={handleSubmit} size="lg" fullWidth loading={submitting} />

            <View style={{ marginTop: spacing.md, alignItems: "center" }}>
              <Text
                accessibilityRole="link"
                accessibilityLabel="Sign in instead"
                onPress={() => router.replace("/auth/sign-in")}
                style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.primary }}
              >
                Already have an account? Sign in
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
              Demo sign-up — accounts are stored only on this device, not on a real server.
            </Text>
          </ResponsiveContainer>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
