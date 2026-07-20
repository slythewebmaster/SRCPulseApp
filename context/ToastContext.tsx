import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { AccessibilityInfo, Animated, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);
const DISPLAY_MS = 3200;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (text: string) => {
      setMessage(text);
      AccessibilityInfo.announceForAccessibility?.(text);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      timeoutRef.current = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
          setMessage(null);
        });
      }, DISPLAY_MS);
    },
    [opacity]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message ? <ToastView message={message} opacity={opacity} /> : null}
    </ToastContext.Provider>
  );
}

function ToastView({ message, opacity }: { message: string; opacity: Animated.Value }) {
  const { colors, radii, fontFamily } = useTheme();
  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      style={[
        styles.toast,
        {
          opacity,
          backgroundColor: colors.text,
          borderRadius: radii.pill,
        },
      ]}
    >
      <Text style={{ fontFamily: fontFamily.bodyMedium, fontSize: 14, color: colors.background }}>
        {message}
      </Text>
    </Animated.View>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 110,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
