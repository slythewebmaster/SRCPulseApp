import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";

type BosphorusLogoProps = {
  size?: number;
  color?: string;
  variant?: "mark" | "full";
  wordmarkColor?: string;
};

/**
 * Vector reproduction of the Bosphorus Restaurant & Cafe mark: a serving
 * dome with rising steam, flanked by suspension-bridge cables (the Bosphorus
 * Bridge), with the wordmark set beneath it.
 */
export function BosphorusLogo({ size = 72, color, variant = "full", wordmarkColor }: BosphorusLogoProps) {
  const { colors, fontFamily } = useTheme();
  const strokeColor = color ?? colors.text;
  const textColor = wordmarkColor ?? strokeColor;
  const height = size * 0.78;

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={height} viewBox="0 0 200 156" fill="none">
        {/* Steam */}
        <Path
          d="M100 4 C 92 14, 108 20, 100 30 C 94 36, 104 42, 100 48"
          stroke={strokeColor}
          strokeWidth={3.2}
          strokeLinecap="round"
          fill="none"
        />
        {/* Dome */}
        <Path
          d="M42 96 C 42 60, 68 40, 100 40 C 132 40, 158 60, 158 96"
          stroke={strokeColor}
          strokeWidth={3.4}
          strokeLinecap="round"
          fill="none"
        />
        <Line x1={30} y1={96} x2={170} y2={96} stroke={strokeColor} strokeWidth={3.4} strokeLinecap="round" />

        {/* Bridge towers */}
        <Line x1={62} y1={96} x2={62} y2={132} stroke={strokeColor} strokeWidth={2.6} strokeLinecap="round" />
        <Line x1={138} y1={96} x2={138} y2={132} stroke={strokeColor} strokeWidth={2.6} strokeLinecap="round" />

        {/* Suspension cables, left tower */}
        <Path d="M62 100 C 40 108, 22 118, 12 132" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" fill="none" />
        <Line x1={62} y1={104} x2={34} y2={132} stroke={strokeColor} strokeWidth={1.4} strokeLinecap="round" />
        <Line x1={62} y1={112} x2={48} y2={132} stroke={strokeColor} strokeWidth={1.4} strokeLinecap="round" />

        {/* Suspension cables, right tower */}
        <Path d="M138 100 C 160 108, 178 118, 188 132" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" fill="none" />
        <Line x1={138} y1={104} x2={166} y2={132} stroke={strokeColor} strokeWidth={1.4} strokeLinecap="round" />
        <Line x1={138} y1={112} x2={152} y2={132} stroke={strokeColor} strokeWidth={1.4} strokeLinecap="round" />

        {/* Deck / base line */}
        <Line x1={10} y1={132} x2={190} y2={132} stroke={strokeColor} strokeWidth={3} strokeLinecap="round" />
        <Circle cx={6} cy={132} r={3.2} fill={strokeColor} />
        <Circle cx={194} cy={132} r={3.2} fill={strokeColor} />
      </Svg>

      {variant === "full" ? (
        <View style={styles.wordmarkWrap}>
          <Text
            style={[
              styles.wordmark,
              { color: textColor, fontFamily: fontFamily.displayBold, fontSize: size * 0.3 },
            ]}
          >
            BOSPHORUS
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: textColor, fontFamily: fontFamily.displayLight, fontSize: size * 0.15 },
            ]}
          >
            Restaurant &amp; Cafe
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
  },
  wordmarkWrap: {
    alignItems: "center",
    marginTop: 2,
  },
  wordmark: {
    letterSpacing: 3,
  },
  subtitle: {
    fontStyle: "italic",
    marginTop: -2,
  },
});
