import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";
import { BosphorusLogo } from "@/components/BosphorusLogo";
import { markWelcomeSeen } from "@/lib/onboarding";

export default function WelcomeScreen() {
  const { spacing, fontFamily } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleContinue = async () => {
    await markWelcomeSeen();
    router.replace("/(tabs)");
  };

  const handleSignIn = async () => {
    await markWelcomeSeen();
    router.push("/auth/sign-in");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://loremflickr.com/1200/1800/istanbul,turkish,restaurant" }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        accessibilityLabel="Bosphorus Restaurant & Cafe ambience"
      />
      <LinearGradient colors={["rgba(11,22,21,0.35)", "rgba(11,22,21,0.92)"]} style={StyleSheet.absoluteFillObject} />

      <View style={[styles.content, { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xl, paddingHorizontal: spacing.lg }]}>
        <View style={styles.brandWrap}>
          <BosphorusLogo variant="full" size={110} color="#FFFFFF" wordmarkColor="#FFFFFF" />
        </View>

        <View>
          <Text style={{ fontFamily: fontFamily.displayBold, fontSize: 34, lineHeight: 40, color: "#FFFFFF", textAlign: "center" }}>
            Welcome to Bosphorus
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.body,
              fontSize: 15,
              lineHeight: 22,
              color: "#F1EEE5",
              textAlign: "center",
              marginTop: spacing.sm,
            }}
          >
            Turkish flavours from the shores of the Bosphorus, brought to Labone. Order ahead, book a table, and
            follow our kitchen — all in one place.
          </Text>

          <View style={{ marginTop: spacing.xl, gap: 12 }}>
            <Button label="Get Started" onPress={handleContinue} size="lg" fullWidth />
            <Button
              label="I already have an account"
              variant="outline"
              onPress={handleSignIn}
              size="lg"
              fullWidth
              textColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1615",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  brandWrap: {
    alignItems: "center",
    marginTop: 24,
  },
});
