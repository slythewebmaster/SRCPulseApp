import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { MenuItem } from "@/data/menu";

const STORAGE_KEY = "bosphorus.cart.lines.v1";
const HISTORY_KEY = "bosphorus.order-history.v1";
const MAX_HISTORY = 20;

export type CartLine = {
  itemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
};

export type OrderType = "dine-in" | "pickup" | "delivery";

export type PlacedOrder = {
  orderNumber: string;
  placedAt: string;
  orderType: OrderType;
  lines: CartLine[];
  subtotal: number;
  serviceFee: number;
  total: number;
  customerName: string;
  contactPhone: string;
  notes?: string;
  paymentMethodLabel: string;
};

type CheckoutDetails = {
  orderType: OrderType;
  customerName: string;
  contactPhone: string;
  notes?: string;
  paymentMethodLabel: string;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Pick<MenuItem, "id" | "name" | "price" | "image">, quantity?: number, notes?: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  lastOrder: PlacedOrder | null;
  orderHistory: PlacedOrder[];
  placeOrder: (details: CheckoutDetails) => PlacedOrder;
};

const SERVICE_FEE_RATE = 0.05;

const CartContext = createContext<CartContextValue | undefined>(undefined);

function generateOrderNumber() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `BSP-${random}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<PlacedOrder[]>([]);
  const hasHydratedCart = useRef(false);
  const hasHydratedHistory = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored) as CartLine[];
          if (Array.isArray(parsed)) setLines(parsed);
        }
      })
      .catch(() => {})
      .finally(() => {
        hasHydratedCart.current = true;
      });

    AsyncStorage.getItem(HISTORY_KEY)
      .then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored) as PlacedOrder[];
          if (Array.isArray(parsed)) {
            setOrderHistory(parsed);
            if (parsed.length > 0) setLastOrder(parsed[0]);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        hasHydratedHistory.current = true;
      });
  }, []);

  useEffect(() => {
    if (!hasHydratedCart.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lines)).catch(() => {});
  }, [lines]);

  useEffect(() => {
    if (!hasHydratedHistory.current) return;
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(orderHistory)).catch(() => {});
  }, [orderHistory]);

  const addItem = useCallback<CartContextValue["addItem"]>((item, quantity = 1, notes) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.itemId === item.id && line.notes === notes);
      if (existing) {
        return prev.map((line) =>
          line === existing ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [
        ...prev,
        { itemId: item.id, name: item.name, price: item.price, image: item.image, quantity, notes },
      ];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.itemId !== itemId);
      }
      return prev.map((line) => (line.itemId === itemId ? { ...line, quantity } : line));
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setLines((prev) => prev.filter((line) => line.itemId !== itemId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [lines]
  );

  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  const placeOrder = useCallback<CartContextValue["placeOrder"]>(
    (details) => {
      const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
      const order: PlacedOrder = {
        orderNumber: generateOrderNumber(),
        placedAt: new Date().toISOString(),
        orderType: details.orderType,
        lines,
        subtotal,
        serviceFee,
        total: Math.round((subtotal + serviceFee) * 100) / 100,
        customerName: details.customerName,
        contactPhone: details.contactPhone,
        notes: details.notes,
        paymentMethodLabel: details.paymentMethodLabel,
      };
      setLastOrder(order);
      setOrderHistory((prev) => [order, ...prev].slice(0, MAX_HISTORY));
      setLines([]);
      return order;
    },
    [lines, subtotal]
  );

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    lastOrder,
    orderHistory,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
