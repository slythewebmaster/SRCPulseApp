import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Demo-only saved payment methods. Card numbers are masked to the last 4
 * digits before ever being stored — this app never processes real payments
 * or talks to a payment gateway; it only simulates the checkout UX.
 */

export type CardMethod = {
  id: string;
  type: "card";
  label: string;
  last4: string;
  expiry: string;
};

export type MobileMoneyMethod = {
  id: string;
  type: "mobile-money";
  label: string;
  network: "MTN" | "Vodafone Cash" | "AirtelTigo Money";
  phone: string;
};

export type SavedPaymentMethod = CardMethod | MobileMoneyMethod;

const STORAGE_KEY = "bosphorus.payment-methods.v1";

type PaymentMethodsContextValue = {
  methods: SavedPaymentMethod[];
  addCard: (input: { cardholderName: string; cardNumber: string; expiry: string }) => SavedPaymentMethod;
  addMobileMoney: (input: { network: MobileMoneyMethod["network"]; phone: string }) => SavedPaymentMethod;
  removeMethod: (id: string) => void;
};

const PaymentMethodsContext = createContext<PaymentMethodsContextValue | undefined>(undefined);

export function PaymentMethodsProvider({ children }: { children: React.ReactNode }) {
  const [methods, setMethods] = useState<SavedPaymentMethod[]>([]);
  const hasHydrated = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored) as SavedPaymentMethod[];
          if (Array.isArray(parsed)) setMethods(parsed);
        }
      })
      .catch(() => {})
      .finally(() => {
        hasHydrated.current = true;
      });
  }, []);

  useEffect(() => {
    if (!hasHydrated.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(methods)).catch(() => {});
  }, [methods]);

  const addCard = useCallback<PaymentMethodsContextValue["addCard"]>(({ cardholderName, cardNumber, expiry }) => {
    const digitsOnly = cardNumber.replace(/\D/g, "");
    const last4 = digitsOnly.slice(-4);
    const method: CardMethod = {
      id: `card_${Date.now()}`,
      type: "card",
      label: `${cardholderName.trim() || "Card"} •••• ${last4}`,
      last4,
      expiry,
    };
    setMethods((prev) => [...prev, method]);
    return method;
  }, []);

  const addMobileMoney = useCallback<PaymentMethodsContextValue["addMobileMoney"]>(({ network, phone }) => {
    const method: MobileMoneyMethod = {
      id: `momo_${Date.now()}`,
      type: "mobile-money",
      label: `${network} — ${phone}`,
      network,
      phone,
    };
    setMethods((prev) => [...prev, method]);
    return method;
  }, []);

  const removeMethod = useCallback((id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return (
    <PaymentMethodsContext.Provider value={{ methods, addCard, addMobileMoney, removeMethod }}>
      {children}
    </PaymentMethodsContext.Provider>
  );
}

export function usePaymentMethods() {
  const ctx = useContext(PaymentMethodsContext);
  if (!ctx) {
    throw new Error("usePaymentMethods must be used within a PaymentMethodsProvider");
  }
  return ctx;
}
