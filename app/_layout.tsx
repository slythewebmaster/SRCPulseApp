import { useEffect, useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, View } from "react-native";
import { fontsToLoad, palettes } from "@/constants/theme";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { PaymentMethodsProvider } from "@/context/PaymentMethodsContext";
import { BosphorusLogo } from "@/components/BosphorusLogo";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? palettes.dark : palettes.light;
  const [fontsLoaded, fontError] = useFonts(fontsToLoad);
  const ready = fontsLoaded || fontError;

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [ready]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!ready) {
    // Matches app.json's splash background — covers the gap before native
    // splash hides, and is the *only* splash shown on web (no native splash there).
    return (
      <View style={{ flex: 1, backgroundColor: "#10454F", alignItems: "center", justifyContent: "center" }}>
        <BosphorusLogo variant="mark" size={80} color="#F4E9C9" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <PaymentMethodsProvider>
            <CartProvider>
              <ToastProvider>
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                  <StatusBar style={scheme === "dark" ? "light" : "dark"} />
                  <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="welcome" options={{ animation: "fade" }} />
                    <Stack.Screen name="auth/sign-in" options={{ presentation: "card" }} />
                    <Stack.Screen name="auth/sign-up" options={{ presentation: "card" }} />
                    <Stack.Screen name="menu/[itemId]" options={{ presentation: "card" }} />
                    <Stack.Screen name="blog/[slug]" options={{ presentation: "card" }} />
                    <Stack.Screen name="promos" options={{ presentation: "card" }} />
                    <Stack.Screen name="checkout" options={{ presentation: "card" }} />
                    <Stack.Screen name="order-confirmation" options={{ presentation: "card", gestureEnabled: false }} />
                    <Stack.Screen name="settings" options={{ presentation: "card" }} />
                    <Stack.Screen name="payment-methods" options={{ presentation: "card" }} />
                  </Stack>
                </View>
              </ToastProvider>
            </CartProvider>
          </PaymentMethodsProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
