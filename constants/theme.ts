// Bosphorus Restaurant & Cafe — design tokens.
// Palette evokes the strait at dusk: deep teal water, warm gold light, terracotta spice.

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const fontFamily = {
  displayLight: "Cormorant_300Light",
  display: "Cormorant_500Medium",
  displaySemiBold: "Cormorant_600SemiBold",
  displayBold: "Cormorant_700Bold",
  body: "Montserrat_400Regular",
  bodyMedium: "Montserrat_500Medium",
  bodySemiBold: "Montserrat_600SemiBold",
  bodyBold: "Montserrat_700Bold",
} as const;

export const fontsToLoad = {
  Cormorant_300Light: require("@expo-google-fonts/cormorant/300Light/Cormorant_300Light.ttf"),
  Cormorant_500Medium: require("@expo-google-fonts/cormorant/500Medium/Cormorant_500Medium.ttf"),
  Cormorant_600SemiBold: require("@expo-google-fonts/cormorant/600SemiBold/Cormorant_600SemiBold.ttf"),
  Cormorant_700Bold: require("@expo-google-fonts/cormorant/700Bold/Cormorant_700Bold.ttf"),
  Montserrat_400Regular: require("@expo-google-fonts/montserrat/400Regular/Montserrat_400Regular.ttf"),
  Montserrat_500Medium: require("@expo-google-fonts/montserrat/500Medium/Montserrat_500Medium.ttf"),
  Montserrat_600SemiBold: require("@expo-google-fonts/montserrat/600SemiBold/Montserrat_600SemiBold.ttf"),
  Montserrat_700Bold: require("@expo-google-fonts/montserrat/700Bold/Montserrat_700Bold.ttf"),
};

export type ThemeColors = typeof lightColors;

const lightColors = {
  background: "#FBF7EF",
  surface: "#FFFFFF",
  surfaceAlt: "#F3ECDC",
  text: "#1C2422",
  textMuted: "#5C6664",
  border: "#E7DFCC",
  primary: "#10454F",
  onPrimary: "#FFFFFF",
  accent: "#C9974B",
  onAccent: "#1C2422",
  secondary: "#B5502B",
  onSecondary: "#FFFFFF",
  success: "#2F7D5A",
  danger: "#C0392B",
  onDanger: "#FFFFFF",
  ring: "#10454F",
  overlay: "rgba(12, 24, 22, 0.55)",
  star: "#C9974B",
};

const darkColors: ThemeColors = {
  background: "#0B1615",
  surface: "#12211F",
  surfaceAlt: "#183028",
  text: "#F3EFE6",
  textMuted: "#A7B3AF",
  border: "#22332F",
  primary: "#5FB6C2",
  onPrimary: "#0B1615",
  accent: "#D9A75A",
  onAccent: "#1C2422",
  secondary: "#E08A5F",
  onSecondary: "#1C2422",
  success: "#4CAE84",
  danger: "#E36858",
  onDanger: "#1C2422",
  ring: "#5FB6C2",
  overlay: "rgba(0, 0, 0, 0.65)",
  star: "#D9A75A",
};

export const palettes = {
  light: lightColors,
  dark: darkColors,
};

export const shadow = {
  card: {
    shadowColor: "#0B1615",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  floating: {
    shadowColor: "#0B1615",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
} as const;

export const type = {
  display: { fontFamily: fontFamily.displaySemiBold, fontSize: 40, lineHeight: 46 },
  h1: { fontFamily: fontFamily.displaySemiBold, fontSize: 32, lineHeight: 38 },
  h2: { fontFamily: fontFamily.displaySemiBold, fontSize: 26, lineHeight: 32 },
  h3: { fontFamily: fontFamily.displayBold, fontSize: 20, lineHeight: 26 },
  eyebrow: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, lineHeight: 16, letterSpacing: 1.5 },
  body: { fontFamily: fontFamily.body, fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: fontFamily.body, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fontFamily.bodySemiBold, fontSize: 14, lineHeight: 20 },
  price: { fontFamily: fontFamily.bodyBold, fontSize: 16, lineHeight: 20 },
} as const;
