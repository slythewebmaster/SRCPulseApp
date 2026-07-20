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

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? palettes.dark : palettes.light;
  const [fontsLoaded, fontError] = useFonts(fontsToLoad);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CartProvider>
          <ToastProvider>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
              <StatusBar style={scheme === "dark" ? "light" : "dark"} />
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="menu/[itemId]" options={{ presentation: "card" }} />
                <Stack.Screen name="blog/[slug]" options={{ presentation: "card" }} />
                <Stack.Screen name="promos" options={{ presentation: "card" }} />
                <Stack.Screen name="checkout" options={{ presentation: "card" }} />
                <Stack.Screen name="order-confirmation" options={{ presentation: "card", gestureEnabled: false }} />
              </Stack>
            </View>
          </ToastProvider>
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
