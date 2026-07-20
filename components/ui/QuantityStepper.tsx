import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
};

export function QuantityStepper({ quantity, onIncrement, onDecrement, min = 0 }: QuantityStepperProps) {
  const { colors, radii, fontFamily } = useTheme();
  const canDecrement = quantity > min;

  return (
    <View style={[styles.row, { borderColor: colors.border, borderRadius: radii.pill }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        disabled={!canDecrement}
        hitSlop={8}
        onPress={onDecrement}
        style={[styles.btn, { opacity: canDecrement ? 1 : 0.35 }]}
      >
        <Ionicons name="remove" size={16} color={colors.text} />
      </Pressable>
      <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 14, color: colors.text, minWidth: 20, textAlign: "center" }}>
        {quantity}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        hitSlop={8}
        onPress={onIncrement}
        style={styles.btn}
      >
        <Ionicons name="add" size={16} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    gap: 4,
    paddingHorizontal: 4,
  },
  btn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
