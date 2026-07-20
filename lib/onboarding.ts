import AsyncStorage from "@react-native-async-storage/async-storage";

const WELCOME_KEY = "bosphorus.onboarding.hasSeenWelcome.v1";

export async function hasSeenWelcome(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(WELCOME_KEY)) === "true";
  } catch {
    return true;
  }
}

export async function markWelcomeSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(WELCOME_KEY, "true");
  } catch {
    // ignore
  }
}
