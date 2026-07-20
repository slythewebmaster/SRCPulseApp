import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/context/CartContext";

// Total bar height (icon + label + top/bottom padding), before the
// safe-area inset is added on native. Includes the 16px of vertical
// padding below, so it must stay comfortably above icon(24) + label(~14) + padding(16).
const BASE_BAR_HEIGHT = 60;

export default function TabsLayout() {
  const { colors, fontFamily } = useTheme();
  const { itemCount } = useCart();
  const insets = useSafeAreaInsets();
  // Let the bar size itself from content + safe-area inset, rather than a
  // hardcoded height, so labels never get clipped (content-box padding on
  // web otherwise pushes the real height past a fixed `height` value).
  const bottomInset = Platform.OS === "web" ? 0 : insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: BASE_BAR_HEIGHT + bottomInset,
          paddingTop: 8,
          paddingBottom: 8 + bottomInset,
        },
        tabBarLabelStyle: { fontFamily: fontFamily.bodySemiBold, fontSize: 11 },
        tabBarBadgeStyle: { backgroundColor: colors.secondary, color: colors.onSecondary, fontFamily: fontFamily.bodyBold },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarAccessibilityLabel: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarAccessibilityLabel: "Menu",
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Order",
          tabBarAccessibilityLabel: "Your order",
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="bag-handle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          tabBarAccessibilityLabel: "Blog",
          tabBarIcon: ({ color, size }) => <Ionicons name="newspaper" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarAccessibilityLabel: "Your profile",
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          // Kept in the tabs group (shares the tab bar chrome) but hidden
          // from the bar itself — reachable via router.push("/contact"),
          // Profile's support links, and Home's directions/call strip.
          href: null,
          title: "Contact",
        }}
      />
    </Tabs>
  );
}
