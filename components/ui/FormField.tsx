import React from "react";
import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoComplete?: "name" | "tel" | "email" | "off";
  textContentType?: "name" | "telephoneNumber" | "emailAddress" | "none";
};

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required,
  multiline,
  keyboardType,
  autoComplete = "off",
  textContentType = "none",
}: FormFieldProps) {
  const { colors, radii, spacing, fontFamily } = useTheme();

  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={{ fontFamily: fontFamily.bodySemiBold, fontSize: 13, color: colors.text, marginBottom: 6 }}>
        {label}
        {required ? <Text style={{ color: colors.danger }}> *</Text> : null}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        textContentType={textContentType}
        accessibilityLabel={label}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            borderRadius: radii.md,
            color: colors.text,
            fontFamily: fontFamily.body,
            minHeight: multiline ? 96 : 48,
            textAlignVertical: multiline ? "top" : "center",
          },
        ]}
      />
      {error ? (
        <Text style={{ fontFamily: fontFamily.body, fontSize: 12, color: colors.danger, marginTop: 4 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
});
